import { createPool } from "mysql2/promise";
import { config } from "dotenv";
config();

let hostname = (process.env.APP_ENV === "production") ? process.env.DB_HOSTNAME_PROD : process.env.DB_HOSTNAME_DEV;

const connection = createPool({
    host: hostname,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
})

export {
    hostname,
    connection
}
