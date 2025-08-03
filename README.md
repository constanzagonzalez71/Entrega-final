# 🛍️ Ecommerce Backend con Express, MongoDB y Socket.IO

Este proyecto es una API RESTful con vistas dinámicas para un ecommerce. Permite la gestión de productos y carritos de compras, integrando tecnologías modernas como MongoDB, Mongoose, Express y WebSockets (Socket.IO) para funcionalidades en tiempo real.

## 🚀 Tecnologías Utilizadas

- **Node.js** y **Express** – Para construir el servidor backend.
- **MongoDB** con **Mongoose** – Para la persistencia de datos.
- **Socket.IO** – Para actualizaciones en tiempo real en las vistas.
- **Express-Handlebars** – Como motor de plantillas para las vistas.
- **dotenv** – Para gestión de variables de entorno.

✨ Funcionalidades
🔹 Productos
Crear, leer, actualizar y eliminar productos.

Validaciones con express-validator.

Vista principal (/) con productos paginados.

Vista /realTimeProducts con actualizaciones en vivo vía WebSockets.

🔹 Carritos
Crear un carrito vacío.

Agregar productos a un carrito.

Obtener el contenido de un carrito por ID.

🔹 Vistas
Motor de plantillas Handlebars.

Página home y vista real-time renderizadas dinámicamente.

📡 WebSockets
Cuando se agrega un producto, la vista /realTimeProducts se actualiza en vivo sin necesidad de recargar.

🧪 Próximas mejoras
Implementar sistema de usuarios y login.

Agregar filtros y ordenamientos a las vistas.

Agregar tests automatizados 

🧑‍💻 Autor
Constanza Nidia González

📍 Proyecto académico de Backend I - Coderhouse





