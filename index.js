import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import app from "./app.js";
import socketHandler from "./socketHandler.js";

const server = http.createServer(app);
const io = new Server(server);
socketHandler(io);

// MongoDB + servidor
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => {
    server.listen(8080, () => {
      console.log("🚀 Servidor corriendo en http://localhost:8080");
    });
  })
  .catch((err) => console.error("❌ Error al conectar MongoDB", err));
