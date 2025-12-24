const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'bunnyera.log');

const logger = {
    info: (message) => {
        const log = `[INFO] ${new Date().toISOString()} - ${message}\n`;
        fs.appendFileSync(logFile, log);
        console.log(log.trim());
    },
    error: (message) => {
        const log = `[ERROR] ${new Date().toISOString()} - ${message}\n`;
        fs.appendFileSync(logFile, log);
        console.error(log.trim());
    }
};

module.exports = logger;
