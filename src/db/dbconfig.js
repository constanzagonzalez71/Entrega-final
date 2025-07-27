import mongoose from "mongoose";
import Product from "../models/product.model.js";

const connectMongoDB = async () => {
  try {
    if (!process.env.URI_MONGODB) {
      console.error("❌ URI de MongoDB no definida en el entorno");
      return;
    }

    await mongoose.connect(process.env.URI_MONGODB);
    await Product.syncIndexes();

    console.log(`✅ Conectado a MongoDB en: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB!", error.message);
  }
};

export default connectMongoDB;
