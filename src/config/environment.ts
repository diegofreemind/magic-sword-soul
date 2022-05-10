import { config } from 'dotenv';

config();

export const environmentConfig = {
  port: process.env.PORT,
  logLevel: process.env.LOG_LEVEL,
  exceptionsLogFile: process.env.EXCEPTIONS_LOG,
  rejectionsLogFile: process.env.REJECTIONS_LOG,
  autoGenerateQuantity: Number(process.env.AUTO_GENERATE_QUANTITY),
  autoGenerateCharacters:
    Number(process.env.AUTO_GENERATE_CHARACTER) === 0 ? false : true,
};
