const express = require('express');

const router = express.Router();

const expensesController = require('../controllers/expenses.controller');

const {
    validateExpense
} = require('../middleware/validation');

/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: Expense management
 */

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Get all expenses
 *     tags: [Expenses]
 *     responses:
 *       200:
 *         description: List of expenses
 *       500:
 *         description: Internal server error
 */
router.get('/', expensesController.getAllExpenses);

/**
 * @swagger
 * /expenses/{id}:
 *   get:
 *     summary: Get an expense by ID
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB expense ID
 *     responses:
 *       200:
 *         description: Expense found
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', expensesController.getExpenseById);

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Create a new expense
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       201:
 *         description: Expense created
 *       400:
 *         description: Validation failed
 *       500:
 *         description: Internal server error
 */
router.post(
    '/',
    validateExpense,
    expensesController.createExpense
);

/**
 * @swagger
 * /expenses/{id}:
 *   put:
 *     summary: Update an expense
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB expense ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       204:
 *         description: Expense updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Internal server error
 */
router.put(
    '/:id',
    validateExpense,
    expensesController.updateExpense
);

/**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: Delete an expense
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB expense ID
 *     responses:
 *       204:
 *         description: Expense deleted successfully
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', expensesController.deleteExpense);

module.exports = router;