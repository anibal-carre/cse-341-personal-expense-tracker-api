require('dotenv').config();

const express = require('express');
const cors = require('cors');


const { connectDatabase } = require('./db/database');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


async function startServer() {
    try {
        await connectDatabase();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();