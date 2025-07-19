const socket = io();

// Manejo del envío de formulario
document.getElementById("formNewProduct").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const product = Object.fromEntries(formData.entries());

  product.price = parseFloat(product.price);
  product.stock = parseInt(product.stock);

  // Emitir producto nuevo al servidor
  socket.emit("newProduct", product);

  e.target.reset();

  // Mostrar notificación Bootstrap
  const toastElement = document.getElementById("alertBox");
  const toast = new bootstrap.Toast(toastElement);
  toast.show();
});

// Actualizar la lista cuando se emite el evento
socket.on("updatedProducts", (products) => {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `
      <h5>${product.title}</h5>
      <p>
        <strong>💲Precio:</strong> ${product.price} <br>
        <strong>📝 Descripción:</strong> ${product.description} <br>
        <strong>📦 Stock:</strong> ${product.stock} <br>
        <strong>🧾 Código:</strong> ${product.code} <br>
        <strong>📂 Categoría:</strong> ${product.category}
      </p>
    `;
    list.appendChild(li);
  });
});
