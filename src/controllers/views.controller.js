import ProductModel from "../models/product.model.js";

// Renderiza la vista 'home' con los productos desde MongoDB
export const renderHomeView = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.render("home", { products });
  } catch (error) {
    res.status(500).render("error", { message: "Error cargando productos" });
  }
};

// Renderiza la vista 'realTimeProducts' con datos actualizados
export const renderRealTimeView = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.render("realTimeProducts", { products });
  } catch (error) {
    res.status(500).render("error", { message: "Error en productos en vivo" });
  }
};
