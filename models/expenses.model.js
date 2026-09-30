const { ObjectId } = require('mongodb');

const { getDatabase } = require('../db/database');

const collectionName = 'expenses';

function getCollection() {
    return getDatabase().collection(collectionName);
}

async function getAllExpenses() {
    return await getCollection()
        .find()
        .sort({ date: -1 })
        .toArray();
}

async function getExpenseById(id) {
    if (!ObjectId.isValid(id)) {
        return null;
    }

    return await getCollection().findOne({
        _id: new ObjectId(id)
    });
}

async function createExpense(expense) {
    const result = await getCollection().insertOne(expense);

    return result.insertedId;
}

async function updateExpense(id, expense) {
    if (!ObjectId.isValid(id)) {
        return false;
    }

    const result = await getCollection().updateOne(
        {
            _id: new ObjectId(id)
        },
        {
            $set: expense
        }
    );

    return result.matchedCount > 0;
}

async function deleteExpense(id) {
    if (!ObjectId.isValid(id)) {
        return false;
    }

    const result = await getCollection().deleteOne({
        _id: new ObjectId(id)
    });

    return result.deletedCount > 0;
}

module.exports = {
    getAllExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense
};