//Conectamos websocket con el cliente

const socket = io();
const formNewproduct = document.getElementById("formNewProduct");
formNewproduct.addEventListener("submit", (event) => {
  event.preventDefault();
    // Obtenemos los datos del formulario
  // y los enviamos al servidor a través del socket
  const formData = new FormData(formNewproduct);
  const productData = {};
    formData.forEach((value, key) => {
    productData[key] = value;
});
socket.emit("newProduct", productData);
})
socket.on("productAdded", (newProduct) => {
    const productList = document.getElementById("productList");
    productList.innerHTML += `
    <li>
        <h2>${newProduct.title}</h2>
        <p>Precio: ${newProduct.price}</p>
        <p>Descripción: ${newProduct.description}</p>
        <p>Código: ${newProduct.code}</p>
        <p>Stock: ${newProduct.stock}</p>
    </li>`;
});