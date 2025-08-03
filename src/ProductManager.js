import ProductModel from "../models/product.model.js";

export default class ProductManager {
  async getProducts() {
    return await ProductModel.find().lean();
  }

  async getProductById(productId) {
    return await ProductModel.findById(productId).lean();
  }

  async addProduct(newProduct) {
    try {
      const exists = await ProductModel.findOne({ code: newProduct.code });
      if (exists) throw new Error("El código ya existe");

      const product = await ProductModel.create(newProduct);
      return product;
    } catch (error) {
      throw new Error("Error al agregar producto: " + error.message);
    }
  }

  async deleteProductById(productId) {
    const result = await ProductModel.deleteOne({ _id: productId });
    if (result.deletedCount === 0)
      throw new Error("Producto no encontrado para eliminar");
    return true;
  }

  async updateProduct(productId, updateFields) {
    const updated = await ProductModel.findByIdAndUpdate(
      productId,
      updateFields,
      { new: true }
    );
    if (!updated) throw new Error("Producto no encontrado para actualizar");
    return updated;
  }
}
