import { connection, hostname } from './src/config/db.js';
import express, { json, urlencoded } from 'express';
import { urlRoutes } from './src/routes/urlRoutes.routes.js';
const app = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(urlencoded({extended: true}));
app.use('/url', urlRoutes)

// Get all urls
app.get('/', async (req, res) => {
    try {
        const [rows] = await connection.execute(
            "SELECT  * FROM url_maps LIMIT 10 OFFSET 1"
        )

        if (rows.length === 0) {
            res.status(400).json({
                status: false,
                data: {},
                message: "There are no urls available for retrieval"
            })
        }

        res.status(200).json({
            status: true,
            data: rows,
            message: "All url maps retrieved succsessfully"
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            data: {},
            message: "An unexpected error occurred"
        })
    }
})

app.listen(port, () => {
    console.log(`server started on port ${port}\nVisit ${hostname}:${port}`);
})

