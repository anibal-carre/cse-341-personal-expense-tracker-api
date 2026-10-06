const express = require('express');

const router = express.Router();

const categoriesController = require('../controllers/categories.controller');

const {
    validateCategory
} = require('../middleware/validation');

const {
    requireAuth
} = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Operations for managing expense categories
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     description: Returns all expense categories available to the authenticated user.
 *     tags:
 *       - Categories
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       401:
 *         description: Authentication required
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
router.get(
    '/',
    requireAuth,
    categoriesController.getAllCategories
);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     description: Returns a specific expense category.
 *     tags:
 *       - Categories
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the category
 *         schema:
 *           type: string
 *           example: 68c1a2b3c4d5e6f789012345
 *     responses:
 *       200:
 *         description: Category found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Category not found
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
router.get(
    '/:id',
    requireAuth,
    categoriesController.getCategoryById
);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     description: Creates a new expense category.
 *     tags:
 *       - Categories
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       description: Category information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryRequest'
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreatedResponse'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Authentication required
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
    '/',
    requireAuth,
    validateCategory,
    categoriesController.createCategory
);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category
 *     description: Updates an existing expense category.
 *     tags:
 *       - Categories
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the category
 *         schema:
 *           type: string
 *           example: 68c1a2b3c4d5e6f789012345
 *     requestBody:
 *       required: true
 *       description: Updated category information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryRequest'
 *     responses:
 *       204:
 *         description: Category updated successfully
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Category not found
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
router.put(
    '/:id',
    requireAuth,
    validateCategory,
    categoriesController.updateCategory
);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     description: Deletes an existing expense category.
 *     tags:
 *       - Categories
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the category
 *         schema:
 *           type: string
 *           example: 68c1a2b3c4d5e6f789012345
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Category not found
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
router.delete(
    '/:id',
    requireAuth,
    categoriesController.deleteCategory
);

module.exports = router;