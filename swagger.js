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
            securitySchemes: {
                sessionAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'connect.sid',
                    description:
                        'Authentication session cookie.'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            example: '68c1a2b3c4d5e6f789012345'
                        },
                        name: {
                            type: 'string',
                            example: 'Anibal'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'anibal@example.com'
                        }
                    }
                },

                RegisterRequest: {
                    type: 'object',
                    required:
                        [
                            'name',
                            'email',
                            'password'
                        ],
                    properties: {
                        name: {
                            type: 'string',
                            example: 'Anibal'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'anibal@example.com'
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            minLength: 8,
                            example: 'Password123!'
                        }
                    }
                },

                LoginRequest: {
                    type: 'object',
                    required:
                        [
                            'email',
                            'password'
                        ],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'anibal@example.com'
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            example: 'Password123!'
                        }
                    }
                },

                AuthResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Login successful.'
                        },
                        user: {
                            $ref: '#/components/schemas/User'
                        }
                    }
                },

                MessageResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Logout successful.'
                        }
                    }
                },

                ExpenseRequest: {
                    type: 'object',
                    required:
                        [
                            'description',
                            'amount',
                            'category',
                            'date',
                            'paymentMethod',
                            'isRecurring'
                        ],
                    properties: {
                        description: {
                            type: 'string',
                            example: 'Supermarket'
                        },
                        amount: {
                            type: 'number',
                            format: 'double',
                            minimum: 0.01,
                            example: 125.50
                        },
                        category: {
                            type: 'string',
                            example: 'Food'
                        },
                        date: {
                            type: 'string',
                            format: 'date',
                            example: '2026-10-05'
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

                Expense: {
                    allOf: [
                        {
                            $ref: '#/components/schemas/ExpenseRequest'
                        },
                        {
                            type: 'object',
                            properties: {
                                _id: {
                                    type: 'string',
                                    example: '68c1a2b3c4d5e6f789012345'
                                },
                                userId: {
                                    type: 'string',
                                    example: '68c1a2b3c4d5e6f789012345'
                                }
                            }
                        }
                    ]
                },

                CategoryRequest: {
                    type: 'object',
                    required:
                        [
                            'name',
                            'description'
                        ],
                    properties: {
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

                Category: {
                    allOf: [
                        {
                            $ref: '#/components/schemas/CategoryRequest'
                        },
                        {
                            type: 'object',
                            properties: {
                                _id: {
                                    type: 'string',
                                    example: '68c1a2b3c4d5e6f789012345'
                                }
                            }
                        }
                    ]
                },

                CreatedResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Expense created successfully.'
                        },
                        id: {
                            type: 'string',
                            example: '68c1a2b3c4d5e6f789012345'
                        }
                    }
                },

                Error: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Authentication required.'
                        }
                    }
                },

                ValidationError: {
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
                            },
                            example: [
                                'Description is required.',
                                'Amount must be a number greater than 0.'
                            ]
                        }
                    }
                },
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