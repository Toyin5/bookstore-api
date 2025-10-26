import { sequelize } from '../core/database/sequelize';
import { beforeAll } from '@jest/globals';

beforeAll(async () => {
  // Connect to test database
  await sequelize.authenticate();
}, 30000);
