const bcrypt = require('bcryptjs');

const usersModel = require('../models/users.model');

async function register(req, res) {
    try {
        const {
            name,
            email,
            password
        } = req.body;

        const existingUser = await usersModel.getUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({
                message: 'A user with this email already exists.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            provider: 'local',
            createdAt: new Date()
        };

        const userId = await usersModel.createUser(user);

        req.session.user = {
            id: userId.toString(),
            name: user.name,
            email: user.email
        };

        return res.status(201).json({
            message: 'Account created successfully.',
            user: req.session.user
        });
    } catch (error) {
        console.error('Registration error:', error);

        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
}

async function login(req, res) {
    try {
        const {
            email,
            password
        } = req.body;

        const user = await usersModel.getUserByEmail(email);

        if (!user || !user.password) {
            return res.status(401).json({
                message: 'Invalid email or password.'
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatches) {
            return res.status(401).json({
                message: 'Invalid email or password.'
            });
        }

        req.session.user = {
            id: user._id.toString(),
            name: user.name,
            email: user.email
        };

        return res.status(200).json({
            message: 'Login successful.',
            user: req.session.user
        });
    } catch (error) {
        console.error('Login error:', error);

        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
}

function logout(req, res) {
    req.session.destroy((error) => {
        if (error) {
            console.error('Logout error:', error);

            return res.status(500).json({
                message: 'Could not log out.'
            });
        }

        res.clearCookie('connect.sid');

        return res.status(200).json({
            message: 'Logout successful.'
        });
    });
}

function getCurrentUser(req, res) {
    return res.status(200).json({
        user: req.session.user
    });
}

async function githubCallback(
    accessToken,
    refreshToken,
    profile,
    done
) {
    try {
        let user = await usersModel.getUserByGithubId(
            profile.id
        );

        if (!user) {
            const email =
                profile.emails?.[0]?.value ||
                `${profile.username}@github.local`;

            const existingUser =
                await usersModel.getUserByEmail(email);

            if (existingUser) {
                await usersModel.updateUserGithubId(
                    existingUser._id.toString(),
                    profile.id
                );

                user = existingUser;
            } else {
                const userId = await usersModel.createUser({
                    name:
                        profile.displayName ||
                        profile.username ||
                        'GitHub User',
                    email: email.toLowerCase(),
                    githubId: profile.id,
                    provider: 'github',
                    createdAt: new Date()
                });

                user = await usersModel.getUserById(
                    userId.toString()
                );
            }
        }

        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}

module.exports = {
    register,
    login,
    logout,
    getCurrentUser,
    githubCallback
};