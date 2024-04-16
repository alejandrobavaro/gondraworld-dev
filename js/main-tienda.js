//<!------------1ER PARTE-------------------->

// Lista de productos
const productos = [
  {
    id: 1,
    nombre: "Remera Gondra World W-B-1",
    precio: 20000.99,
    imagen: "../img/06-tiendagondraworld/tienda1-.png"
  },
  {
    id: 2,
    nombre: "Remera Almango A-G-1 Ponele Onda",
    precio: 18.50,
    imagen: "../img/06-tiendagondraworld/tienda2-.png"
  },




  // Agrega más productos aquí con la misma estructura de objetos



];



// Array para almacenar los productos en el carrito
let carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
    // Buscar si el producto ya está en el carrito
    const productoExistente = carrito.find(producto => producto.id === id);

    if (productoExistente) {
        // Si el producto ya está en el carrito, incrementar su cantidad
        productoExistente.cantidad++;
    } else {
        // Si el producto no está en el carrito, agregarlo
        const producto = productos.find(producto => producto.id === id);
        carrito.push({ ...producto, cantidad: 1 });
    }

    // Actualizar la visualización del carrito en la página
    actualizarVisualizacionCarrito();
}



//<!----------------------------------------->

function renderizarProductos() {
  const productosContainer = document.getElementById("productos-container");
  productosContainer.innerHTML = "";

  productos.forEach(producto => {
    const productoHTML = `
      <div class="col">
        <div class="card">
          <div class="card-body card4">
            <img src="${producto.imagen}" class="card-img-top img-fluid" alt="${producto.nombre}" />
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">Precio: $${producto.precio.toFixed(2)}</p>
            <button class="botonComprar" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
          </div>
        </div>
      </div>
    `;
    productosContainer.innerHTML += productoHTML;
  });
}


document.addEventListener("DOMContentLoaded", function() {
  renderizarProductos();
});



//<!------------2DA PARTE-------------------->



function renderizarProductos() {
  const productosContainer = document.getElementById("productos-container");
  productosContainer.innerHTML = "";

  productos.forEach(producto => {
    const productoHTML = `
      <div class="producto">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <button class="agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
      </div>
    `;
    productosContainer.innerHTML += productoHTML;
  });
}

// Llama a la función para renderizar los productos
renderizarProductos();



//<!------------3ERA PARTE-------------------->

document.addEventListener("click", function(event) {
  if (event.target.classList.contains("agregar-carrito")) {
    const id = parseInt(event.target.dataset.id);
    const producto = productos.find(producto => producto.id === id);
    agregarAlCarrito(producto);
  }
});

function agregarAlCarrito(producto) {
  carrito.push(producto);
  renderizarCarrito();
}



//<!------------4TA PARTE-------------------->

function renderizarCarrito() {
  const listaCarrito = document.getElementById("lista-carrito");
  listaCarrito.innerHTML = "";

  carrito.forEach((producto, index) => {
    const productoCarritoHTML = `
      <li>${producto.nombre} - $${producto.precio} <button class="eliminar-producto" data-id="${index}">Eliminar</button></li>
    `;
    listaCarrito.innerHTML += productoCarritoHTML;
  });

  // Calcula y actualiza el total del carrito
  const totalCarrito = carrito.reduce((total, producto) => total + producto.precio, 0);
  const totalCarritoElemento = document.getElementById("total-carrito");
  totalCarritoElemento.textContent = `$${totalCarrito.toFixed(2)}`;

  // Agregar evento clic a los botones "Eliminar"
  const botonesEliminar = document.querySelectorAll(".eliminar-producto");
  botonesEliminar.forEach(boton => {
    boton.addEventListener("click", function(event) {
      const index = parseInt(event.target.dataset.id);
      eliminarProductoDelCarrito(index);
    });
  });
}


function eliminarProductoDelCarrito(index) {
  carrito.splice(index, 1);
  renderizarCarrito();
}
