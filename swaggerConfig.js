import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Force API',
            version: '1.0.0',
            description: 'Force API documentation',
        },
    },
    apis: ['apiDocs.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec; 
