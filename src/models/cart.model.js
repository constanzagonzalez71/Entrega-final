
import mongoose from "mongoose";

const productSubSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true, //  Para mejorar búsquedas por producto
    },
    quantity: {
      type: Number,
      default: 1,
      min: [1, "La cantidad mínima es 1"],
      max: [100, "La cantidad máxima permitida es 100"], //  Límites opcionales para proteger el sistema
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    products: {
      type: [productSubSchema],
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "El carrito no puede estar vacío",
      },
    },
  },
  { timestamps: true }
);

//  Método opcional para contar productos totales
cartSchema.methods.getTotalItems = function () {
  return this.products.reduce((acc, p) => acc + p.quantity, 0);
};

export default mongoose.model("Cart", cartSchema);

