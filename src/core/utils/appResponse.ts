import { Response } from 'express';

export function AppResponse(
  res: Response,
  data: Record<string, string[]> | unknown | string | null,
  message: string,
  statusCode: number = 200
) {
  res.status(statusCode).json({
    status: 'success',
    data: data ?? null,
    message: message ?? 'Success',
  });
}
