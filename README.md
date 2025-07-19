🛍️ Real-Time Products App
Aplicación web desarrollada con Node.js, Express, Handlebars y Socket.IO para gestionar productos en tiempo real. Los usuarios pueden visualizar productos, agregar nuevos desde un formulario y ver actualizaciones instantáneas sin recargar la página.

🚀 Tecnologías utilizadas
- Node.js – entorno de ejecución JavaScript
- Express.js – framework para backend
- Handlebars – motor de plantillas para vistas dinámicas
- Socket.IO – comunicación en tiempo real
- Bootstrap 5 – estilos y componentes visuales
- JavaScript – lógica del cliente
- FileSystem (fs) – persistencia de datos en JSON
⚙️ Funcionalidades
🔧 Backend
- Rutas /api/products y /api/cart para APIs REST.
- Rutas / y /realTimeProducts para vistas con Handlebars.
- Clase ProductManager con métodos CRUD sobre products.json.
📡 Tiempo real con Socket.IO
- Evento newProduct: el cliente envía un nuevo producto.
- Evento updatedProducts: el servidor emite la lista actualizada.
- Cliente escucha y renderiza los productos sin recargar.
🧾 Formulario de producto
- Campos: título, precio, descripción, stock, código y categoría.
- Validación mediante required en inputs.
- Envío de datos y render dinámico con Bootstrap Toast como confirmación.

💻 Vista realTimeProducts.handlebars
- Formulario con inputs estilizados por Bootstrap.
- Lista de productos renderizada mediante {{#each products}}.
- Notificación visual de éxito con componente Toast Bootstrap.
- Scripts de conexión a Socket.IO y lógica del cliente.

📜 Código cliente public/js/index.js
- Escucha el envío del formulario.
- Emite nuevo producto al servidor.
- Recibe lista actualizada y modifica el DOM.
- Muestra un toast Bootstrap al agregar.


