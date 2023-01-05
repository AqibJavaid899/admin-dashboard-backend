import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import salesRoutes from "./routes/sales.js";
import managementRoutes from "./routes/management.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import { dataUser, dataProduct, dataProductStat } from "./data/index.js";

// CONFIGURATION SETUP
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTES MIDDLEWARE
app.use("/client", clientRoutes);
app.use("/sales", salesRoutes);
app.use("/management", managementRoutes);
app.use("/general", generalRoutes);

// MONGO_DB ATLAS CONNECTION and PORT SETUP
const PORT = process.env.PORT || 9000;

// To Remove the Mongoose Deprecation Warning in the Console
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGODB_ATLAS_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`));
    // To Dump all of the User and Product Data into the MongoDB in one go
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // User.insertMany(dataUser);
  })
  .catch((error) => console.log(`\n\n${error} did not connect.`));
