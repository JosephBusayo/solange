import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { products } from './data/Products.js';
import connectDatabase from './config/MongoDb.js';

dotenv.config();
//connectDatabase()
const app = express();
const PORT = process.env.PORT || 5000;

// Database Configuration

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/products', (req, res) => {
    res.json(products)
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id)
    res.json(product)
}); 

// Start the server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});