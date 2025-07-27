import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: String,
    code: { type: String, unique: true, required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0 },
    category: {
      type: String,
      required: true,
      enum: ["lana", "accesorios", "cursos",]
    },
    thumbnails: [String],
  },
  { timestamps: true }
);

// 🧭 Plugin de paginación
productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);
