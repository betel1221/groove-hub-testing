// src/utils/logger.js

const isDevelopment = process.env.NODE_ENV === 'development';

const logger = {
  // Use a different console method for each log level
  log: (...args) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  info: (...args) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
  warn: (...args) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },
  error: (...args) => {
    // Always log errors, regardless of environment
    console.error(...args);
  },
};

export default logger;