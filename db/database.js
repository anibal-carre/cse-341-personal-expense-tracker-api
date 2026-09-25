const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);

let database;

async function connectDatabase() {
    try {
        await client.connect();

        database = client.db('contacts');

        console.log('Connected to MongoDB');

        return database;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

function getDatabase() {
    if (!database) {
        throw new Error('Database has not been initialized.');
    }

    return database;
}

module.exports = {
    connectDatabase,
    getDatabase
};