function validateRegistration(req, res, next) {
    const {
        name,
        email,
        password
    } = req.body;

    const errors = [];

    if (
        typeof name !== 'string' ||
        name.trim() === ''
    ) {
        errors.push('Name is required.');
    }

    if (
        typeof email !== 'string' ||
        email.trim() === ''
    ) {
        errors.push('Email is required.');
    } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
        errors.push('Email must be valid.');
    }

    if (
        typeof password !== 'string' ||
        password.length < 8
    ) {
        errors.push(
            'Password must contain at least 8 characters.'
        );
    }

    if (errors.length > 0) {
        return res.status(400).json({
            message: 'Validation failed.',
            errors
        });
    }

    next();
}


function validateLogin(req, res, next) {
    const {
        email,
        password
    } = req.body;

    const errors = [];

    if (
        typeof email !== 'string' ||
        email.trim() === ''
    ) {
        errors.push('Email is required.');
    }

    if (
        typeof password !== 'string' ||
        password === ''
    ) {
        errors.push('Password is required.');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            message: 'Validation failed.',
            errors
        });
    }

    next();
}


function validateExpense(req, res, next) {
    const {
        description,
        amount,
        category,
        date,
        paymentMethod,
        isRecurring,
        notes
    } = req.body;

    const errors = [];

    if (
        typeof description !== 'string' ||
        description.trim() === ''
    ) {
        errors.push('Description is required.');
    }

    if (
        typeof amount !== 'number' ||
        !Number.isFinite(amount) ||
        amount <= 0
    ) {
        errors.push(
            'Amount must be a number greater than 0.'
        );
    }

    if (
        typeof category !== 'string' ||
        category.trim() === ''
    ) {
        errors.push('Category is required.');
    }

    if (
        typeof date !== 'string' ||
        date.trim() === '' ||
        Number.isNaN(Date.parse(date))
    ) {
        errors.push('Date must be a valid date.');
    }

    if (
        typeof paymentMethod !== 'string' ||
        paymentMethod.trim() === ''
    ) {
        errors.push(
            'Payment method is required.'
        );
    }

    if (typeof isRecurring !== 'boolean') {
        errors.push(
            'isRecurring must be a boolean.'
        );
    }

    if (
        notes !== undefined &&
        typeof notes !== 'string'
    ) {
        errors.push(
            'Notes must be a string.'
        );
    }

    if (errors.length > 0) {
        return res.status(400).json({
            message: 'Validation failed.',
            errors
        });
    }

    next();
}


function validateCategory(req, res, next) {
    const {
        name,
        description
    } = req.body;

    const errors = [];

    if (
        typeof name !== 'string' ||
        name.trim() === ''
    ) {
        errors.push('Name is required.');
    }

    if (
        typeof description !== 'string' ||
        description.trim() === ''
    ) {
        errors.push(
            'Description is required.'
        );
    }

    if (errors.length > 0) {
        return res.status(400).json({
            message: 'Validation failed.',
            errors
        });
    }

    next();
}


module.exports = {
    validateRegistration,
    validateLogin,
    validateExpense,
    validateCategory
};