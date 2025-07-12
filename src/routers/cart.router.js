import { Router } from "express";
import CartManager from "../CartManager.js";

const router = Router();
const cartManager = new CartManager("./src/carts.json");

router.post("/", async (req, res) => {
  const newCart = await cartManager.createCart();
  res.json({ message: "Carrito creado", cart: newCart });
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(cid);
  if (!cart) {
    return res.status(404).json({ message: "Carrito no encontrado" });
  }
  res.json({ cart });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  await cartManager.addProductToCart(cid, pid);
  res.json({ message: "Producto agregado al carrito" });
});

export default router;
