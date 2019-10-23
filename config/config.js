import lodash from 'lodash'
import winston from 'winston';

const config = require('./config.json');
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const finalConfig = lodash.merge(defaultConfig, environmentConfig);

global.gConfig = finalConfig;

global.gLogger = winston.createLogger({
    level: global.gConfig.LOG_LEVEL,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
        })
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({filename: 'app.log'})
    ]
  });
  
global.gLogger.log(global.gConfig.LOG_LEVEL, `global.gConfig: ${JSON.stringify(global.gConfig, undefined, global.gConfig.JSON_INDENTATION)}`);

