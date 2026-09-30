const { ObjectId } = require('mongodb');

const { getDatabase } = require('../db/database');

const collectionName = 'categories';

function getCollection() {
    return getDatabase().collection(collectionName);
}

async function getAllCategories() {
    return await getCollection()
        .find()
        .sort({ name: 1 })
        .toArray();
}

async function getCategoryById(id) {
    if (!ObjectId.isValid(id)) {
        return null;
    }

    return await getCollection().findOne({
        _id: new ObjectId(id)
    });
}

async function createCategory(category) {
    const result = await getCollection().insertOne(category);

    return result.insertedId;
}

async function updateCategory(id, category) {
    if (!ObjectId.isValid(id)) {
        return false;
    }

    const result = await getCollection().updateOne(
        {
            _id: new ObjectId(id)
        },
        {
            $set: category
        }
    );

    return result.matchedCount > 0;
}

async function deleteCategory(id) {
    if (!ObjectId.isValid(id)) {
        return false;
    }

    const result = await getCollection().deleteOne({
        _id: new ObjectId(id)
    });

    return result.deletedCount > 0;
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};