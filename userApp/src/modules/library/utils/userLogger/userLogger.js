require('dotenv').config();

const { createLogger, transports, format } = require('winston');
require('winston-mongodb');

const mongoURL = process.env.MONGO_URL;

// helper: only enable mongo if valid
const enableMongo = mongoURL && mongoURL.startsWith("mongodb");

const userLogger = createLogger({
    transports: [
        new transports.Console({
            level: "info",
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        }),

        new transports.Console({
            level: "error",
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        }),

        new transports.File({
            filename: 'logs/userLogger/userLogs.log',
            level: "info",
            maxsize: 5242880,
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(info =>
                    `level ${info.level}: ${info.timestamp} ${info.message}`
                )
            ),
        }),

        ...(enableMongo ? [
            new transports.MongoDB({
                level: "info",
                db: mongoURL,
                collection: 'userLogs',
                options: {
                    useUnifiedTopology: true,
                },
                format: format.combine(
                    format.timestamp(),
                    format.json()
                )
            })
        ] : [])
    ]
});

module.exports = userLogger;