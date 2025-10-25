import { Sequelize } from 'sequelize';
import logger from '../configs/logger';
import env from '../configs/environment';

export const sequelize = new Sequelize(encodeURI(env.POSTGRES_URL), {
  database: 'postgres',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const databaseConnect = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection established');
  } catch (error) {
    logger.error(error);
  }
};

export default databaseConnect;
