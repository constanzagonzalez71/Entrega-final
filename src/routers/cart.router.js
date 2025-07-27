import { Router } from "express";
import {
  createCart,
  getCartById,
  addProductToCart,
  removeProductFromCart,
  clearCart,
} from "./controllers/cart.Controller.js";

const router = Router();

// 🛒 Crear nuevo carrito
router.post("/", createCart);

// 🔍 Obtener carrito por ID
router.get("/:cid", getCartById);

// ➕ Agregar producto al carrito
router.post("/:cid/product/:pid", addProductToCart);

// ❌ Eliminar producto del carrito
router.delete("/:cid/product/:pid", removeProductFromCart);

// 🧹 Vaciar carrito completo
router.delete("/:cid", clearCart);

export default router;
