// src/utils/logger.js

const isDevelopment = import.meta.env.MODE === 'development';

const logger = {
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
    // Always show errors
    console.error(...args);
  },
};

export default logger;
