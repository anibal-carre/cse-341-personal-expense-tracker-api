const express = require('express');

const router = express.Router();

const expensesController = require('../controllers/expenses.controller');

const {
    validateExpense
} = require('../middleware/validation');

const {
    requireAuth
} = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: Operations for managing user expenses
 */

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Get all expenses
 *     description: Returns all expenses belonging to the authenticated user.
 *     tags:
 *       - Expenses
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: List of expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
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
    expensesController.getAllExpenses
);

/**
 * @swagger
 * /expenses/{id}:
 *   get:
 *     summary: Get an expense by ID
 *     description: Returns a specific expense belonging to the authenticated user.
 *     tags:
 *       - Expenses
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the expense
 *         schema:
 *           type: string
 *           example: 68c1a2b3c4d5e6f789012345
 *     responses:
 *       200:
 *         description: Expense found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Expense not found
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
    expensesController.getExpenseById
);

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Create a new expense
 *     description: Creates a new expense for the authenticated user.
 *     tags:
 *       - Expenses
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       description: Expense information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExpenseRequest'
 *     responses:
 *       201:
 *         description: Expense created successfully
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
    validateExpense,
    expensesController.createExpense
);

/**
 * @swagger
 * /expenses/{id}:
 *   put:
 *     summary: Update an expense
 *     description: Updates an expense belonging to the authenticated user.
 *     tags:
 *       - Expenses
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the expense
 *         schema:
 *           type: string
 *           example: 68c1a2b3c4d5e6f789012345
 *     requestBody:
 *       required: true
 *       description: Updated expense information
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExpenseRequest'
 *     responses:
 *       204:
 *         description: Expense updated successfully
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
 *         description: Expense not found
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
    validateExpense,
    expensesController.updateExpense
);

/**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: Delete an expense
 *     description: Deletes an expense belonging to the authenticated user.
 *     tags:
 *       - Expenses
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the expense
 *         schema:
 *           type: string
 *           example: 68c1a2b3c4d5e6f789012345
 *     responses:
 *       204:
 *         description: Expense deleted successfully
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Expense not found
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
    expensesController.deleteExpense
);

module.exports = router;