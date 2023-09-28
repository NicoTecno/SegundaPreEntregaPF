// Dependencies
import mongoose from "mongoose";
import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import productManager from "./dao/manager/ProductManager.js";

//data
// import dataProducts from './data/products.json' assert {type: 'json'};

import productModel from "./dao/models/products.model.js";

// Routes
import viewsRouter from "./routes/views.router.js";
import viewsCartsRouter from "./routes/views.cart.router.js";
import productsRouter from "./routes/products.router.js";
import realTimeProductsRouter from "./routes/realTimeProducts.router.js";
import chatRouter from "./routes/chat.router.js";
import cartsRouter from "./routes/carts.router.js";
// Config

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));
// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.redirect("/products");
});

// api
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// mongoose.connect(
//   "mongodb+srv://nicodominguez1468:nicodb2023@cluster0.oyw1bco.mongodb.net/?retryWrites=true&w=majority"
// );

const MongoUrl =
  "mongodb+srv://nicodominguez1468:nicodb2023@cluster0.oyw1bco.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);
try {
  await mongoose.connect(MongoUrl);
} catch {
  console.error(`Database connection failed: ${error}`);
}

//insert product data if necessary
try {
  await productModel.insertMany(dataProducts);
} catch (err) {
  console.log(`error al insertar data: ${err} `);
}

const httpServer = app.listen(port, () => {
  console.log(`Escuchando por el puerto ${port}`);
});
const socketServer = new Server(httpServer);

//Routers
app.use("/products", viewsRouter);
app.use("/carts", viewsCartsRouter);
app.use("/realTimeProducts", realTimeProductsRouter(socketServer));
app.use("/chat", chatRouter(socketServer));
