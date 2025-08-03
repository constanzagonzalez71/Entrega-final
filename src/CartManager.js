

  import CartModel from "../models/cart.model.js";

  export default class CartManager {
    async createCart() {
      const newCart = await CartModel.create({ products: [] });
      return newCart;
    }

    async getCartById(cartId) {
      return await CartModel.findById(cartId).populate("products.product");
    }

    async addProductToCart(cartId, productId, quantity = 1) {
      const cart = await CartModel.findById(cartId);
      if (!cart) return null;

      const existing = cart.products.find(
        (p) => p.product.toString() === productId
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await cart.save();
      return await this.getCartById(cartId); // Con populate
    }
  }