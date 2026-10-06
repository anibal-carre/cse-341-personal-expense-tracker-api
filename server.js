require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy =
    require('passport-github2').Strategy;
const swaggerUi = require('swagger-ui-express');

const {
    connectDatabase
} = require('./db/database');

const usersModel =
    require('./models/users.model');

const authController =
    require('./controllers/auth.controller');

const authRoutes =
    require('./routes/auth.routes');

const expensesRoutes =
    require('./routes/expenses.routes');

const categoriesRoutes =
    require('./routes/categories.routes');

const swaggerDocument =
    require('./swagger');

const app = express();

const PORT =
    process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
    try {
        const user =
            await usersModel.getUserById(id);

        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

passport.use(
    new GitHubStrategy(
        {
            clientID:
                process.env.GITHUB_CLIENT_ID,

            clientSecret:
                process.env.GITHUB_CLIENT_SECRET,

            callbackURL:
                process.env.GITHUB_CALLBACK_URL
        },

        authController.githubCallback
    )
);

app.get('/', (req, res) => {
    res.status(200).json({
        message:
            'Expense Tracker API is running',
        documentation:
            '/api-docs'
    });
});

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(
        swaggerDocument
    )
);

app.use(
    '/auth',
    authRoutes
);

app.use(
    '/expenses',
    expensesRoutes
);

app.use(
    '/categories',
    categoriesRoutes
);

async function startServer() {
    try {
        await connectDatabase();

        app.listen(PORT, () => {
            console.log(
                `Server running on port ${PORT}`
            );
        });
    } catch (error) {
        console.error(
            'Failed to start server:',
            error
        );

        process.exit(1);
    }
}

startServer();