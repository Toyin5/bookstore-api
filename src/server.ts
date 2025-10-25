import app from "./app";
import "dotenv/config";
import logger from "./core/configs/logger";
import env from "./core/configs/environment";
import databaseConnect from "./core/database/sequelize";

try {
  app.listen(env.PORT, async () => {
    await databaseConnect();
    logger.info(`Server running on http://localhost:${env.PORT}`);
  });
} catch (error) {
  logger.error(`Error starting server: ${(error as Error).message}`);
  process.exit(1);
}
