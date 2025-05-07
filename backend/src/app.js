import express from 'express';
import cors from 'cors';
// import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import path from "path";

// routes 
import mainSliderRoutes from "./routes/herosection.js";
import createcollection from './routes/createcollection.js';
// import getAllCollection from './routes/listcollection.js';
import productRoutes from "./routes/addproduct.js";
import orderRoutes from './routes/order.js';

// Load environment variables
dotenv.config();

const app = express();
// app.use(bodyParser.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Fix __dirname usage

// const __dirname = path.resolve();
// const buildPath = path.join(__dirname, "../frontend/dist");

// Serve static files from React build folder

// app.use(express.static(buildPath));

// Fallback for React Routing (SPA)

// app.get("*", (req, res) => {
//     res.sendFile(path.join(buildPath, "index.html"));
// })


// Serve uploaded images as static files
app.use("/uploads", express.static(path.join(process.cwd(), "src/uploads")));

// ----------- Use API Routes -----------

// mainSliderRoutes (Hero section)
app.use("/api/h1/receive", mainSliderRoutes);

// collection routes 
app.use("/api/collections", createcollection);
// app.use("/api/collections", getAllCollection);

// product routes
app.use("/api/addproduct", productRoutes);
app.use("/api/getAllProducts", productRoutes);
app.use("/api/products", productRoutes);  // route for mounting for product routes
app.use('/api', productRoutes);

app.use("/api/orders", orderRoutes);

// Root API endpoint
app.get("/api", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Welcome to the Backend API"
    });
});


export { app };
