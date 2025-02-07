import 'dotenv/config';
import mysql from 'mysql2/promise';

const caCert = process.env.DB_CA_CERT;      //remove when testing

export const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    ssl: {                                  //remove when testing
        ca: caCert,                         //remove when testing
        rejectUnauthorized: true,           //remove when testing
    }                                       //remove when testing
})