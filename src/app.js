import express from "express";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import productsRouter from "./routers/product.router.js";
import cartRouter from "./routers/cart.router.js";
import viewsRouter from "./routers/views.router.js";

// Inicializamos variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// 🔌 Conexión directa con mongoose
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
  }
};

connectMongoDB(); // Ejecutamos conexión

// Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

// Ruta catch-all para manejo 404
app.use("*", (req, res) => {
  res.status(404).render("error", { message: "Página no encontrada" });
});

// Server
app.listen(PORT, () => {
  console.log(`✅ Servidor iniciado en http://localhost:${PORT}`);
});
