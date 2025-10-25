import { ZodType, ZodError } from 'zod';
import AppError from './appError';

export const validate = <T>(data: unknown, schema: ZodType<T, any, any>): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const formatted = error.issues.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      }));
      throw new AppError('Validation Error', 499, formatted);
    }

    throw error;
  }
};
