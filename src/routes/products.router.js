import { Router } from "express";
import ProductManager from "../ProductManager.js";


const router = Router();
const productManager = new ProductManager("./src/products.json");

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", { products });
});

router.post("/", async (req, res) => {
  const newProduct = req.body;
  await productManager.addProduct(newProduct);
  res.redirect("/api/products");
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const updatedProduct = req.body;
  await productManager.updateProductById(pid, updatedProduct);
  res.json({ message: "Producto actualizado" });
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  await productManager.deleteProductById(pid);
  res.json({ message: "Producto eliminado" });
});

export default router;
