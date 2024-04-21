// Función para cargar el mini carrito
function cargarMiniCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    const listaMiniCarrito = document.getElementById("listaMiniCarrito");
    const totalMiniCarrito = document.getElementById("totalMiniCarrito");
  
    listaMiniCarrito.innerHTML = "";
    let total = 0;
  
    carrito.forEach((producto) => {
      const item = document.createElement("li");
      item.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
      listaMiniCarrito.appendChild(item);
      total += producto.precio;
    });
  
    totalMiniCarrito.textContent = `Total: $${total.toFixed(2)}`;
  }
  
  // Llamar a cargar el mini carrito al cargar la página
  document.addEventListener("DOMContentLoaded", function() {
    cargarMiniCarrito();
  });
  
  // Actualizar el mini carrito cuando se agregue o elimine un producto
  function actualizarCarrito() {
    cargarMiniCarrito();
    calcularTotalCarrito();
    cargarProductosCarrito();
  }
  
  // Actualizar el mini carrito al agregar un producto
  function agregarAlCarrito(producto) {
    let carrito = localStorage.getItem("carrito");
    if (!carrito) {
      carrito = [];
    } else {
      carrito = JSON.parse(carrito);
    }
  
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
  
    actualizarCarrito();
  }
  
  // Eliminar del carrito desde el mini carrito
  function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
  
    actualizarCarrito();
  }
  
  // Llamar a actualizar el carrito al hacer clic en el botón de eliminar en el mini carrito
  const botonesEliminarMiniCarrito = document.querySelectorAll(".botonEliminar");
  botonesEliminarMiniCarrito.forEach((boton, index) => {
    boton.addEventListener("click", function() {
      eliminarDelCarrito(index);
    });
  });
  