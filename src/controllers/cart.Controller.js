import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

//  Crear un nuevo carrito vacío
export const createCart = async (req, res) => {
  try {
    const newCart = new Cart({ products: [] });
    await newCart.save();
    res.status(201).json({ status: "success", data: newCart });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", error: "Error al crear el carrito" });
  }
};

//  Obtener carrito por ID
export const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid).populate("products.product");
    if (!cart) {
      return res
        .status(404)
        .json({ status: "error", error: "Carrito no encontrado" });
    }
    res.json({ status: "success", data: cart });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", error: "Error al obtener el carrito" });
  }
};

// ➕ Agregar producto al carrito
export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) {
      return res
        .status(404)
        .json({ status: "error", error: "Carrito no encontrado" });
    }

    const product = await Product.findById(pid);
    if (!product || product.stock <= 0) {
      return res
        .status(404)
        .json({ status: "error", error: "Producto no disponible" });
    }

    const existingItem = cart.products.find(
      (p) => p.product.toString() === pid
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();
    res.json({
      status: "success",
      message: "Producto agregado al carrito",
      data: cart,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", error: "Error al agregar producto al carrito" });
  }
};

//  Actualizar cantidad de producto
export const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res
        .status(400)
        .json({ status: "error", error: "Cantidad inválida" });
    }

    const cart = await Cart.findById(cid);
    if (!cart) {
      return res
        .status(404)
        .json({ status: "error", error: "Carrito no encontrado" });
    }

    const productItem = cart.products.find((p) => p.product.toString() === pid);
    if (!productItem) {
      return res
        .status(404)
        .json({ status: "error", error: "Producto no está en el carrito" });
    }

    productItem.quantity = quantity;
    await cart.save();
    res.json({
      status: "success",
      message: "Cantidad actualizada",
      data: cart,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", error: "Error al actualizar la cantidad" });
  }
};

//  Eliminar producto del carrito
export const removeProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) {
      return res
        .status(404)
        .json({ status: "error", error: "Carrito no encontrado" });
    }

    cart.products = cart.products.filter((p) => p.product.toString() !== pid);
    await cart.save();
    res.json({
      status: "success",
      message: "Producto eliminado del carrito",
      data: cart,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        status: "error",
        error: "Error al eliminar producto del carrito",
      });
  }
};

//  Vaciar el carrito por completo
export const clearCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) {
      return res
        .status(404)
        .json({ status: "error", error: "Carrito no encontrado" });
    }

    cart.products = [];
    await cart.save();
    res.json({ status: "success", message: "Carrito vaciado", data: cart });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", error: "Error al vaciar el carrito" });
  }
};
