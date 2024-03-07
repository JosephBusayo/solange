import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDatabase from './config/MongoDb.js';
//import ImportData from './seed.js';
import productRoute from './Routes/productRoute.js';
import userRoute from './Routes/userRoute.js';
import { errorHandler, notFound } from './Middleware/error.js';
import orderRoute from './Routes/orderRoute.js';

dotenv.config();
connectDatabase()
const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
//app.use("/api/import", ImportData)
app.use("/api/products", productRoute)
app.use("/api/users", userRoute)
app.use("/api/orders", orderRoute)
app.get("/api/confiq/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})

//Error handling
app.use(notFound)
app.use(errorHandler)

// Start the server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});