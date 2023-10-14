import pgsql from 'pg';
import { config } from 'dotenv';
import metadado from './entries/metadado.js';
import { env } from 'process';

const envPath = "./.env"
config({ path: envPath})
const db = new pgsql.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

db.on('connect', (client) => {
    console.log('Conectado ao PostgreSQL');
    client.release();
});

db.on('error', (err, client) => {
    console.error('Erro na conexão:', err);
    if (client) {
        client.release();
    }
});

console.log(db)
console.log(process.env.DB_PASSWORD)
