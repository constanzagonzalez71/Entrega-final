// src/routers/views.router.js
import express from "express";
import ProductModel from "../models/product.js";

const viewsRouter = express.Router();

// Vista principal con lista de productos
viewsRouter.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.render("home", { products });
  } catch (error) {
    console.error("Error al obtener los productos:", error.message);
    res.status(500).render("error", { message: "Error cargando productos" });
  }
});

// Vista de productos en tiempo real
viewsRouter.get("/realTimeProducts", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.render("realTimeProducts", { products });
  } catch (error) {
    console.error("Error en realTimeProducts:", error.message);
    res.status(500).render("error", { message: "Error en productos en vivo" });
  }
});

export default viewsRouter;
