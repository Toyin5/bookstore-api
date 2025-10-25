import { NextFunction, Request, Response } from 'express';

type requestHandler = (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;

const wrapAsync = (fn: requestHandler) => {
	return (req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch(next);
	};
};

export { wrapAsync };