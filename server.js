import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDatabase from './config/MongoDb.js';
import productRoute from './Routes/productRoute.js';
import userRoute from './Routes/userRoute.js';
import { errorHandler, notFound } from './Middleware/error.js';
import orderRoute from './Routes/orderRoute.js';
import { upload, handleUpload } from './config/cloudinaryConfig.js';
import Product from './Models/product.js';
import cartRoute from './Routes/cartRoutes.js';


dotenv.config();
connectDatabase()
const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post("/api/products", upload.single("img"), async (req, res) => {
    try {
        const { name, desc, price, countInStock } = req.body
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);

        const newProduct = new Product({
            name, desc, price, countInStock, image: cldRes.url
        })

        if (newProduct) {
            await newProduct.save();
            res.status(201).json({
                newProduct
            })
        }

    } catch (error) {
        console.log(error);
        res.send({
            message: error.message,
        });
    }
});


// Routes
app.use("/api/products", productRoute)
app.use('/api/cart', cartRoute);
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