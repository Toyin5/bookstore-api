import {  Response, ErrorRequestHandler } from 'express';
import AppError from '../../core/utils/appError';
import env from '../../core/configs/environment';
import logger from '../../core/configs/logger';


const handleJWTError = () => {
	return new AppError('Invalid token. Please log in again!', 401);
};

const handleJWTExpiredError = () => {
	return new AppError('Your token has expired!', 401);
};

const handleTimeoutError = () => {
	return new AppError('Request timeout', 408);
};

const sendErrorDev = (err: AppError, res: Response) => {
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		stack: err.stack,
		error: err.data,
	});
};

const sendErrorProd = (err: AppError, res: Response) => {
	if (err?.isOperational) {
		logger.error('Error: ', err);
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
			error: err.data,
		});
	} else {
		logger.error('Error: ', err);
		res.status(500).json({
			status: 'error',
			message: 'Something went very wrong!',
		});
	}
};

const errorHandler:ErrorRequestHandler = (err, req, res, _) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'Error';

	if (env.NODE_ENV === 'development') {
		logger.error(`${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
		sendErrorDev(err, res);
	} else {
		let error = err;
		if ('timeout' in err && err.timeout) error = handleTimeoutError();
		if (err.name === 'JsonWebTokenError') error = handleJWTError();
		if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();
		sendErrorProd(error, res);
	}
};

export default errorHandler;