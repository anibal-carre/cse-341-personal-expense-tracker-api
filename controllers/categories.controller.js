const categoriesModel = require('../models/categories.model');

async function getAllCategories(req, res) {
    try {
        const categories = await categoriesModel.getAllCategories();

        return res.status(200).json(categories);
    } catch (error) {
        console.error('Error getting categories:', error);

        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
}

async function getCategoryById(req, res) {
    try {
        const category = await categoriesModel.getCategoryById(
            req.params.id
        );

        if (!category) {
            return res.status(404).json({
                message: 'Category not found.'
            });
        }

        return res.status(200).json(category);
    } catch (error) {
        console.error('Error getting category:', error);

        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
}

async function createCategory(req, res) {
    try {
        const category = {
            name: req.body.name.trim(),
            description: req.body.description.trim()
        };

        const id = await categoriesModel.createCategory(category);

        return res.status(201).json({
            message: 'Category created successfully.',
            id: id.toString()
        });
    } catch (error) {
        console.error('Error creating category:', error);

        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
}

async function updateCategory(req, res) {
    try {
        const category = {
            name: req.body.name.trim(),
            description: req.body.description.trim()
        };

        const updated = await categoriesModel.updateCategory(
            req.params.id,
            category
        );

        if (!updated) {
            return res.status(404).json({
                message: 'Category not found.'
            });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Error updating category:', error);

        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
}

async function deleteCategory(req, res) {
    try {
        const deleted = await categoriesModel.deleteCategory(
            req.params.id
        );

        if (!deleted) {
            return res.status(404).json({
                message: 'Category not found.'
            });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Error deleting category:', error);

        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};