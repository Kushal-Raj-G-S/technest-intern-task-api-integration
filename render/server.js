import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());

const API_KEY = process.env.NEWSAPI_KEY;

app.get('/news', async (req, res) => {
    const { category } = req.query;
    const query = category || 'technology';
    const url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
