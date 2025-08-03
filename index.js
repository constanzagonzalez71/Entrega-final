import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import app from "./app.js";
import socketHandler from "./socketHandler.js";
import dotenv from "dotenv";

// Carga variables de entorno
dotenv.config();
const PORT = process.env.PORT || 8080;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce";

// Crear servidor HTTP para habilitar Socket.IO
const server = http.createServer(app);
const io = new Server(server);

// Socket.IO logic modularizada
socketHandler(io);

// Conectar a MongoDB y lanzar servidor
mongoose
  .connect(MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar con MongoDB:", err);
  });

// Manejo de errores en servidor
server.on("error", (err) => {
  console.error("🔥 Error en el servidor:", err);
});
