const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',

        info: {
            title: 'Expense Tracker API',
            version: '1.0.0',
            description:
                'REST API for managing personal expenses and expense categories.'
        },

        servers: [
            {
                url: '/',
                description: 'Current server'
            }
        ],

        tags: [
            {
                name: 'Expenses',
                description: 'Operations for managing expenses'
            },
            {
                name: 'Categories',
                description: 'Operations for managing expense categories'
            }
        ],

        components: {
            schemas: {
                Expense: {
                    type: 'object',
                    required: [
                        'description',
                        'amount',
                        'category',
                        'date',
                        'paymentMethod',
                        'isRecurring',
                        'notes'
                    ],
                    properties: {
                        _id: {
                            type: 'string',
                            readOnly: true,
                            example: '68c1a2b3c4d5e6f789012345'
                        },

                        description: {
                            type: 'string',
                            example: 'Supermarket'
                        },

                        amount: {
                            type: 'number',
                            format: 'double',
                            example: 125.5
                        },

                        category: {
                            type: 'string',
                            example: 'Food'
                        },

                        date: {
                            type: 'string',
                            format: 'date',
                            example: '2026-09-25'
                        },

                        paymentMethod: {
                            type: 'string',
                            example: 'Credit Card'
                        },

                        isRecurring: {
                            type: 'boolean',
                            example: false
                        },

                        notes: {
                            type: 'string',
                            example: 'Weekly groceries'
                        }
                    }
                },

                Category: {
                    type: 'object',
                    required: [
                        'name',
                        'description'
                    ],
                    properties: {
                        _id: {
                            type: 'string',
                            readOnly: true,
                            example: '68c1a2b3c4d5e6f789012345'
                        },

                        name: {
                            type: 'string',
                            example: 'Food'
                        },

                        description: {
                            type: 'string',
                            example: 'Food and grocery expenses'
                        }
                    }
                },

                Error: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Validation failed.'
                        },

                        errors: {
                            type: 'array',
                            items: {
                                type: 'string'
                            }
                        }
                    }
                }
            }
        }
    },

    apis: [
        './routes/*.routes.js'
    ]
};

module.exports = swaggerJsdoc(options);