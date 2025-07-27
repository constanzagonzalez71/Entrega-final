import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: String,
    code: { type: String, unique: true, required: true },
    price: {
      type: Number,
      required: true,
      min: [0, "El precio debe ser igual o mayor a 0"],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "El stock no puede ser negativo"],
    },
    category: {
      type: String,
      required: true,
      enum: ["lana", "accesorios", "cursos"],
    },
    thumbnails: {
      type: [String],
      validate: {
        validator: (arr) => arr.every((url) => url.startsWith("http")),
        message: "Las URLs de thumbnails deben comenzar con http",
      },
    },
    status: {
      type: String,
      enum: ["visible", "oculto", "agotado"],
      default: "visible",
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

//  Plugin de paginación
productSchema.plugin(mongoosePaginate);

// Método de disponibilidad
productSchema.methods.isAvailable = function () {
  return this.stock > 0 && this.status === "visible";
};

//  Middleware opcional
productSchema.pre("save", function (next) {
  if (this.price < 0) {
    console.warn(`⚠️ Producto con precio negativo detectado: ${this.code}`);
  }
  next();
});

export default mongoose.model("Product", productSchema);
