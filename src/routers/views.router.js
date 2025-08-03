import express from "express";
import ProductModel from "../models/product.model.js";

const viewsRouter = express.Router();

//  Vista principal con paginación
viewsRouter.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const products = await ProductModel.find().skip(skip).limit(limit);
    const total = await ProductModel.countDocuments();

    res.render("home", {
      products,
      pagination: {
        page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error al obtener productos:", error.message);
    res.status(500).render("error", { message: "Error cargando productos" });
  }
});

//  Vista para productos en tiempo real
viewsRouter.get("/realTimeProducts", async (req, res) => {
  try {
    res.render("realTimeProducts", {
      title: "Productos en tiempo real",
    });
  } catch (error) {
    console.error("Error en realTimeProducts:", error.message);
    res.status(500).render("error", { message: "Error en productos en vivo" });
  }
});

export default viewsRouter;
