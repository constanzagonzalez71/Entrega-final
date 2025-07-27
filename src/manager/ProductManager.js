// src/managers/ProductManager.js
// ⚠️ Este ProductManager usa persistencia local (JSON) y quedó como referencia técnica.
// Ya fue reemplazado por MongoDB + Mongoose en la entrega final.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Ruta dinámica al archivo JSON
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "../data/products.json");

class ProductManager {
  constructor() {
    this.pathFile = dataPath;
  }

  async getProducts() {
    try {
      const fileData = await fs.promises.readFile(this.pathFile, "utf-8");
      const products = JSON.parse(fileData);
      return products;
    } catch (error) {
      console.error("Error al leer el archivo de productos:", error);
      throw new Error("Error al traer los productos - " + error.message);
    }
  }

  generateNewId(products) {
    return products.length > 0 ? products[products.length - 1].id + 1 : 1;
  }

  async addProduct(newProduct) {
    try {
      const products = await this.getProducts();
      const newId = this.generateNewId(products);

      const product = { id: newId, ...newProduct };
      products.push(product);

      await fs.promises.writeFile(
        this.pathFile,
        JSON.stringify(products, null, 2),
        "utf-8"
      );
      return product;
    } catch (error) {
      throw new Error("Error al añadir el producto - " + error.message);
    }
  }

  async deleteProductById(idProduct) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex(
        (prod) => prod.id === parseInt(idProduct)
      );

      if (index === -1)
        throw new Error(`Producto con id: ${idProduct} no encontrado`);

      products.splice(index, 1);

      await fs.promises.writeFile(
        this.pathFile,
        JSON.stringify(products, null, 2),
        "utf-8"
      );
      return products;
    } catch (error) {
      throw new Error(`Error al eliminar el producto: ${error.message}`);
    }
  }

  async updateProductById(idProduct, updatedProduct) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex(
        (prod) => prod.id === parseInt(idProduct)
      );

      if (index === -1)
        throw new Error(`Producto con id: ${idProduct} no encontrado`);

      products[index] = { ...products[index], ...updatedProduct };

      await fs.promises.writeFile(
        this.pathFile,
        JSON.stringify(products, null, 2),
        "utf-8"
      );
      return products[index];
    } catch (error) {
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  }
}

export default ProductManager;
