import { config } from 'dotenv';

config();

export const environmentConfig = {
  port: process.env.PORT,
  autoGenerateQuantity: Number(process.env.AUTO_GENERATE_QUANTITY),
  autoGenerateCharacters:
    Number(process.env.AUTO_GENERATE_CHARACTER) === 0 ? false : true,
};
