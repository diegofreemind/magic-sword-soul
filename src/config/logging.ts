import { createLogger, format, transports } from 'winston';
import { environmentConfig } from './environment';

export const logger = createLogger({
  level: environmentConfig.logLevel,
  transports: [new transports.Console()],
  format: format.combine(format.timestamp(), format.simple()),
  exceptionHandlers: [new transports.File({ filename: 'exceptions.log' })],
  rejectionHandlers: [new transports.File({ filename: 'rejections.log' })],
});
