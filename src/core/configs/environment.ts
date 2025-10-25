import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().min(1).max(65535).default(3000), // Port must be between 1 and 65535
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  POSTGRES_URL: z.string("Database URL must be a valid URL"),
  PRIVATE_KEY: z.string().min(1, "Private key is required"),
  PUBLIC_KEY: z.string().min(1, "Public key is required"),
});


const env = envSchema.parse(process.env);

export default env;
export { envSchema };
export type Env = z.infer<typeof envSchema>;