import { sql_query } from "./mysql.js";
import express, { json } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(json())

const PORT = process.env.DOCKER_NODE_PORT || 7766;

app.get('/', async (req, res) => {
    res.json({ status: true, message: "Our node.js app works on Docker!" })
});
app.get('/test-config', async (req, res) => {
    try {
        const results = {
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            dataabase: process.env.MYSQL_DATABASE,
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD
        }
        res.json({ status: 'success', message: results });
        res.end;
    } catch (e) {
        res.json({ status: 'error', message: e.message });
        res.end;
    }

});
app.get('/test-query', async (req, res) => {
    try {
        const results = await sql_query(`
          SELECT * FROM test_mysql
      `);
        res.json({ status: 'success', message: results });
        res.end;
    } catch (e) {
        res.json({ status: 'error', message: e.message });
        res.end;
    }

});

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
