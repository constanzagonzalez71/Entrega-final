// src/controllers/cart.controller.js
import CartModel from "../models/cart.js";
import ProductModel from "../models/product.js";

export const getCartById = async (req, res) => {
  try {
    const cart = await CartModel.findById(req.params.cid).populate(
      "products.product"
    );
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
};

export const createCart = async (req, res) => {
  try {
    const newCart = await CartModel.create({ products: [] });
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el carrito" });
  }
};

export const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cart = await CartModel.findById(cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    const product = await ProductModel.findById(pid);
    if (!product)
      return res.status(404).json({ error: "Producto no encontrado" });

    const existing = cart.products.find((p) => p.product.equals(pid));
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar producto al carrito" });
  }
};

export const removeProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cart = await CartModel.findById(cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    cart.products = cart.products.filter((p) => !p.product.equals(pid));
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto del carrito" });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await CartModel.findById(req.params.cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    cart.products = [];
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error al vaciar el carrito" });
  }
};
