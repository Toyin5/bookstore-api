import swaggerJsdoc from 'swagger-jsdoc';
import env from './environment';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bookstore API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Bookstore application',
    },
    servers: [
      {
        url: `http://localhost:{${env.PORT}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/api/routers/*.ts', './src/core/interfaces/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
