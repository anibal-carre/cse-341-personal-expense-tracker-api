const expensesModel = require('../models/expenses.model');

async function getAllExpenses(req, res) {
    try {
        const expenses = await expensesModel.getAllExpenses();

        return res.status(200).json(expenses);
    } catch (error) {
        console.error('Error getting expenses:', error);

        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
}

async function getExpenseById(req, res) {
    try {
        const expense = await expensesModel.getExpenseById(
            req.params.id
        );

        if (!expense) {
            return res.status(404).json({
                message: 'Expense not found.'
            });
        }

        return res.status(200).json(expense);
    } catch (error) {
        console.error('Error getting expense:', error);

        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
}

async function createExpense(req, res) {
    try {
        const expense = {
            description: req.body.description.trim(),
            amount: req.body.amount,
            category: req.body.category.trim(),
            date: req.body.date.trim(),
            paymentMethod: req.body.paymentMethod.trim(),
            isRecurring: req.body.isRecurring,
            notes: req.body.notes?.trim() || ''
        };

        const id = await expensesModel.createExpense(expense);

        return res.status(201).json({
            message: 'Expense created successfully.',
            id: id.toString()
        });
    } catch (error) {
        console.error('Error creating expense:', error);

        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
}

async function updateExpense(req, res) {
    try {
        const expense = {
            description: req.body.description.trim(),
            amount: req.body.amount,
            category: req.body.category.trim(),
            date: req.body.date.trim(),
            paymentMethod: req.body.paymentMethod.trim(),
            isRecurring: req.body.isRecurring,
            notes: req.body.notes?.trim() || ''
        };

        const updated = await expensesModel.updateExpense(
            req.params.id,
            expense
        );

        if (!updated) {
            return res.status(404).json({
                message: 'Expense not found.'
            });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Error updating expense:', error);

        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
}

async function deleteExpense(req, res) {
    try {
        const deleted = await expensesModel.deleteExpense(
            req.params.id
        );

        if (!deleted) {
            return res.status(404).json({
                message: 'Expense not found.'
            });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Error deleting expense:', error);

        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
}

module.exports = {
    getAllExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense
};