import { connection } from '../config/db.js';
import { generateDbId, generateId } from '../utils/url.util.js';

export const mapUrl = async (req, res) => {
    const { initialUrl } = req.body;
    const newUrl = generateId(7);
    const id = generateDbId();

    try {
        const urlMap = await connection.execute(
            "INSERT INTO url_maps (id, newUrl, baseUrl) VALUES (?, ?, ?)",
            [id, newUrl, initialUrl]
        )

        if (urlMap) {
            return res.status(201).json({
                status: true,
                data: {
                    id: id,
                    shortUrl: generateId(8),
                    baseUrl: initialUrl,
                    clicks: 0
                },
                message: "Url mapped successfully"
            })
        }

    } catch (error) {
        return res.status(400).json({
            status: false,
            data: error,
            message: "An error occurred. Try again later"
        })
    }
}

// This is more like an admin function to view the details of a url map
export const getUrl = async (req, res) => {
    const { url } = req.params;

    try {
        const [rows] = await connection.execute(
            "SELECT * from url_maps WHERE newurl = ?",
            [url]
        )

        if (rows.length === 0) {
            return res.status(400).json({
                status: false,
                data: {},
                message: "Url does not exist"
            });
        }

        return res.status(200).json({
            status: true,
            data: rows[0],
            message: "Url details gotten sucessfully"
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            data:error,
            message: "An error occurred while fetching url details"
        });
    }
}

// This is the function that allows various users to view a url map
export const redirectUrl = async (req, res) => {
    const {url} = req.params;

    try {
        const [rows] = await connection.execute(
            "SELECT * FROM url_maps WHERE newUrl= ?",
            [url]
        )

        if (rows.length === 0) {
            return res.status(400).json({
                status: false,
                data: {},
                message: "Url does not exist"
            });
        }

       await connection.execute(
            "UPDATE url_maps SET clicks=clicks + 1 WHERE newUrl=?",
            [url]
        )

        return res.status(200).json({
            status: true,
            data: rows[0].baseUrl,
            message: "Url details retrieved successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            data: {},
            message: "An error occurred while fetching user details"
        });
    }
}