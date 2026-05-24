require('dotenv').config();

const { createLogger, transports, format } = require('winston');
require('winston-mongodb');

const mongoURL = process.env.MONGO_URL;

const transportList = [
    // Console logs
    new transports.Console({
        level: "info",
        format: format.combine(
            format.timestamp(),
            format.json()
        )
    }),

    // File logs
    new transports.File({
        filename: 'logs/logger.log',
        level: "info",
        maxsize: 5242880,
        format: format.combine(
            format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
            format.printf(info =>
                `level ${info.level}: ${info.timestamp} ${info.message}`
            )
        ),
    })
];

// ONLY ADD MONGODB IF URL EXISTS
if (mongoURL) {
    transportList.push(
        new transports.MongoDB({
            level: "info",
            db: mongoURL,
            collection: 'logsData',
            options: {
                useUnifiedTopology: true,
            },
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        })
    );
}

const logger = createLogger({
    transports: transportList
});

module.exports = logger;