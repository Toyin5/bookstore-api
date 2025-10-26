import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import errorHandler from './api/requestHandlers/errorHandler';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './core/configs/swagger';
import { createServer } from 'node:http';
import authRouter from './api/routers/auth';
import { AppResponse } from './core/utils/appResponse';
import AppError from './core/utils/appError';
import { deserializeUser } from './api/middlewares/authenticate';
import bookRouter from './api/routers/book';
import cartRouter from './api/routers/cart';
import orderRouter from './api/routers/order';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  })
);

export const httpServer = createServer(app);

app.use(helmet());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(deserializeUser);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRouter);
app.use('/api/books', bookRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);

app.get('/health', (_, res) => {
  AppResponse(res, null, 'Bookstore API is running');
});

// Handle undefined Routes
// express v5
app.use('*catchall', (req, res, next) => {
  throw new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
});

app.use(errorHandler);

export default app;
