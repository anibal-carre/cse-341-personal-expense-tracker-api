const express = require('express');
const passport = require('passport');

const router = express.Router();

const authController = require('../controllers/auth.controller');

const {
    validateRegistration,
    validateLogin
} = require('../middleware/validation');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User registration, login, logout, and OAuth authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Create a new user account
 *     description: Creates a new user account and automatically starts an authenticated session.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       description: User registration information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       409:
 *         description: A user with this email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
    '/register',
    validateRegistration,
    authController.register
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in with email and password
 *     description: Authenticates an existing user and creates an authenticated session.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       description: User login credentials
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
    '/login',
    validateLogin,
    authController.login
);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out the current user
 *     description: Destroys the current authenticated session.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       500:
 *         description: Could not log out
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
    '/logout',
    authController.logout
);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get the current authenticated user
 *     description: Returns the information of the user associated with the current session.
 *     tags:
 *       - Authentication
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: Current authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
    '/me',
    (req, res, next) => {
        if (!req.session || !req.session.user) {
            return res.status(401).json({
                message: 'Authentication required.'
            });
        }

        next();
    },
    authController.getCurrentUser
);

/**
 * @swagger
 * /auth/github:
 *   get:
 *     summary: Start GitHub OAuth authentication
 *     description: Redirects the user to GitHub to authenticate with OAuth.
 *     tags:
 *       - Authentication
 *     responses:
 *       302:
 *         description: Redirect to GitHub authentication
 */
router.get(
    '/github',
    passport.authenticate('github', {
        scope: ['user:email']
    })
);

/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     summary: GitHub OAuth callback
 *     description: Handles the response from GitHub after authentication.
 *     tags:
 *       - Authentication
 *     responses:
 *       302:
 *         description: Redirects the authenticated user to the API documentation
 *       401:
 *         description: GitHub authentication failed
 */
router.get(
    '/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/api-docs'
    }),
    (req, res) => {
        req.session.user = {
            id: req.user._id.toString(),
            name: req.user.name,
            email: req.user.email
        };

        res.redirect('/api-docs');
    }
);

module.exports = router;