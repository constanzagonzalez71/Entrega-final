import express from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import { engine } from "express-handlebars";  
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./ProductManager.js";
import http from "http";


const app = express();
const server = http.createServer(app);
const io = new Server(server); 


// Configuración del motor de plantillas Handlebars

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//puerto servidor
const PORT = 8080;
// habilitamos json
app.use(express.json());
// habilitamos carpeta public
app.use(express.static("public"));

//endpoints

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/", viewsRouter);

// Configuración del Socket.IO
const productManager = new  ProductManager("./src/data/products.json");

io.on("connection", (socket)=> {
  console.log("Nuevo cliente conectado");
  
  socket.on("newProduct", async(productData) => {
     
    try {
     const newProduct = await productManager.addProduct(productData);
      
      io.emit("productAdded", newProduct);
    } catch (error) {
      console.error("Error al agregar el producto:");      
      
  }
  });
});

// Iniciamos el servidor
server.listen(PORT, () => console.log(`Servidor iniciado: http:/localhost:${PORT}`));




