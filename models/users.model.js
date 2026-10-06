const { ObjectId } = require('mongodb');

const { getDatabase } = require('../db/database');

const collectionName = 'users';

function getCollection() {
    return getDatabase().collection(collectionName);
}

async function getUserById(id) {
    if (!ObjectId.isValid(id)) {
        return null;
    }

    return await getCollection().findOne({
        _id: new ObjectId(id)
    });
}

async function getUserByEmail(email) {
    return await getCollection().findOne({
        email: email.toLowerCase()
    });
}

async function getUserByGithubId(githubId) {
    return await getCollection().findOne({
        githubId
    });
}

async function createUser(user) {
    const result = await getCollection().insertOne(user);

    return result.insertedId;
}

async function updateUserGithubId(id, githubId) {
    if (!ObjectId.isValid(id)) {
        return false;
    }

    const result = await getCollection().updateOne(
        {
            _id: new ObjectId(id)
        },
        {
            $set: {
                githubId
            }
        }
    );

    return result.matchedCount > 0;
}

module.exports = {
    getUserById,
    getUserByEmail,
    getUserByGithubId,
    createUser,
    updateUserGithubId
};