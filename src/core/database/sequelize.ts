import { Sequelize } from 'sequelize';
import logger from '../configs/logger';
import env from '../configs/environment';
import { SequelizeStorage, Umzug } from 'umzug';

export const sequelize = new Sequelize(encodeURI(env.POSTGRES_URL), {
    database: 'postgres',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

const umzug = new Umzug({
  migrations: {glob: 'migrations/*.js'},
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({sequelize}),
  logger: logger,
})

const databaseConnect = async (): Promise<void> => {
    try {
        console.log("DB UrRL", encodeURI(env.POSTGRES_URL))
        await sequelize.authenticate();
        logger.info('Database connection established');

        logger.info('Applying migrations...');
        await umzug.up()
        logger.info('Models loaded and associations created');
  } catch (error) {
    logger.error(error);
  }
};

export default databaseConnect;