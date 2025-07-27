import { Router } from "express";
import mongoose from "mongoose";
import {
  createCart,
  getCartById,
  addProductToCart,
  removeProductFromCart,
  updateProductQuantity,
  clearCart,
} 
from '../controllers/cart.Controller.js';

const router = Router();

// 🛡️ Middleware para validar ObjectId
const validateObjectId = (paramName) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[paramName])) {
    return res.status(400).json({ error: `ID de ${paramName} inválido` });
  }
  next();
};

//  Crear nuevo carrito
router.post("/", createCart);

//  Obtener carrito por ID
router.get("/:cid", validateObjectId("cid"), getCartById);

// ➕ Agregar producto al carrito
router.post(
  "/:cid/product/:pid",
  validateObjectId("cid"),
  validateObjectId("pid"),
  addProductToCart
);

// Actualizar cantidad de producto en carrito
router.put(
  "/:cid/product/:pid",
  validateObjectId("cid"),
  validateObjectId("pid"),
  updateProductQuantity
);

//  Eliminar producto específico del carrito
router.delete(
  "/:cid/product/:pid",
  validateObjectId("cid"),
  validateObjectId("pid"),
  removeProductFromCart
);

//  Vaciar carrito completo
router.delete("/:cid/clear", validateObjectId("cid"), clearCart);

export default router;