import fs from "fs/promises";
import path from "path";

const cartsPath = path.resolve("./src/carts.json");

export default class CartManager {
  constructor() {
    this.path = cartsPath;
  }

  async getCarts() {
    const data = await fs.readFile(this.path, "utf-8");
    return JSON.parse(data);
  }

  async saveCarts(carts) {
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
  }

  async createCart() {
    const carts = await this.getCarts();
    const newCart = {
      id: Date.now().toString(),
      products: [],
    };
    carts.push(newCart);
    await this.saveCarts(carts);
    return newCart;
  }

  async getCartById(cid) {
    const carts = await this.getCarts();
    return carts.find((cart) => cart.id === cid);
  }

  async addProductToCart(cid, pid) {
    const carts = await this.getCarts();
    const cart = carts.find((cart) => cart.id === cid);
    if (!cart) return null;

    const existing = cart.products.find((p) => p.product === pid);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await this.saveCarts(carts);
    return cart;
  }

  async removeProductFromCart(cid, pid) {
    const carts = await this.getCarts();
    const cart = carts.find((cart) => cart.id === cid);
    if (!cart) return null;

    cart.products = cart.products.filter((p) => p.product !== pid);
    await this.saveCarts(carts);
    return cart;
  }

  async updateProductQuantity(cid, pid, quantity) {
    const carts = await this.getCarts();
    const cart = carts.find((cart) => cart.id === cid);
    if (!cart) return null;

    const productInCart = cart.products.find((p) => p.product === pid);
    if (productInCart) {
      productInCart.quantity = quantity;
    }

    await this.saveCarts(carts);
    return cart;
  }

  async replaceCartProducts(cid, newProducts) {
    const carts = await this.getCarts();
    const cart = carts.find((cart) => cart.id === cid);
    if (!cart) return null;

    cart.products = newProducts;
    await this.saveCarts(carts);
    return cart;
  }

  async clearCart(cid) {
    const carts = await this.getCarts();
    const cart = carts.find((cart) => cart.id === cid);
    if (!cart) return null;

    cart.products = [];
    await this.saveCarts(carts);
    return cart;
  }
}
