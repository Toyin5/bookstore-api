import 'dotenv/config';
import { envSchema } from '../configs/environment';
import logger from '../configs/logger';
import { z } from 'zod';


const result = envSchema.safeParse(process.env);
if (!result.success) {
  logger.error('❌ Invalid environment variables:', z.treeifyError(result.error));
  process.exit(1);
}
