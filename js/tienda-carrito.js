document.addEventListener("DOMContentLoaded", function () {
  // Función para obtener el ID del producto de la URL
  function obtenerIdProductoDeURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const idProducto = urlParams.get("id");
    return idProducto;
  }

  // Función para cargar y mostrar la información del producto
  function cargarProducto() {
    const idProducto = obtenerIdProductoDeURL();
    if (!idProducto) {
      // Si no se proporciona un ID de producto, redirigir a la tienda
      window.location.href = "tienda.html";
      return;
    }

    // Array de productos (simulación)
    const productos = [
      {
        id: 1,
        nombre: "Remera Gondra World W-B-1",
        precio: 20000.99,
        imagen: "../img/06-tiendagondraworld/tienda1-.png",
        color: "../img/06-tiendagondraworld/color4-blanco.png",
      },
      {
        id: 2,
        nombre: "Remera Almango A-G-1 Ponele Onda",
        precio: 18000.50,
        imagen: "../img/06-tiendagondraworld/tienda2-.png",
        color: "../img/06-tiendagondraworld/color2-grisoscuro.png",
      },
      {
        id: 3,
        nombre: "Remera Gondra World W-G-2",
        imagen: "../img/06-tiendagondraworld/tienda3-.png",
        precio: 11210,
        color: "../img/06-tiendagondraworld/color2-grisoscuro.png",
      },
      {
        id: 4,
        nombre: "Remera Almango A-B-2 Fundidos",
        imagen: "../img/06-tiendagondraworld/tienda4-.png",
        precio: 16200,
        color: "../img/06-tiendagondraworld/color4-blanco.png",
      },
      {
        id: 5,
        nombre: "Remera Puchulita P-B-1",
        imagen: "../img/06-tiendagondraworld/tienda5-.png",
        precio: 15130,
        color: "../img/06-tiendagondraworld/color4-blanco.png",
      },
      {
        id: 6,
        nombre: "Remera Almango D-2-C Fiesta",
        imagen: "../img/06-tiendagondraworld/tienda6-.png",
        precio: 15200,
        color: "../img/06-tiendagondraworld/color4-blanco.png",
      },
      {
        id: 7,
        nombre: "Remera Almango D-4-A Logo Antiguo",
        imagen: "../img/06-tiendagondraworld/tienda7-.png",
        precio: 13250,
        color: "../img/06-tiendagondraworld/color4-blanco.png",
      },
      {
        id: 8,
        nombre: "Remera Almango A-Gorro D-5-A",
        imagen: "../img/06-tiendagondraworld/tienda8-.png",
        precio: 16200,
        color: "../img/06-tiendagondraworld/color3-negro.png",
      },
      {
        id: 9,
        nombre: "Remera Gondra Estudio D-4-B",
        imagen: "../img/06-tiendagondraworld/tienda9-.png",
        precio: 17100,
        color: "../img/06-tiendagondraworld/color3-negro.png",
      },
      {
        id: 10,
        nombre: "Remera Almango D-6-A Logo Descontrol",
        imagen: "../img/06-tiendagondraworld/tienda10-.png",
        precio: 13210,
        color: "../img/06-tiendagondraworld/color3-negro.png",
      },
      {
        id: 11,
        nombre: "Remera Almango Ale Gondra D-3-B",
        imagen: "../img/06-tiendagondraworld/tienda11-.png",
        precio: 16540,
        color: "../img/06-tiendagondraworld/color2-grisoscuro.png",
      },
      {
        id: 12,
        nombre: "Remera Almango D-6-B Sexotica",
        imagen: "../img/06-tiendagondraworld/tienda12-.png",
        precio: 15250,
        color: "../img/06-tiendagondraworld/color1-verde.png",
      }
    ];





    // Encontrar el producto con el ID correspondiente
    const productoEncontrado = productos.find((producto) => producto.id === parseInt(idProducto));

    if (!productoEncontrado) {
      // Si no se encuentra el producto, redirigir a la tienda
      window.location.href = "tienda.html";
      return;
    }

    // Mostrar la información del producto encontrado
    const contenedorProducto = document.getElementById("imagenProducto");
    contenedorProducto.innerHTML = `
      <div class="card">
        <div class="card-body card4">
          <h5 class="card-title">${productoEncontrado.nombre}</h5>
          <img src="${productoEncontrado.imagen}" class="card-img-top img-fluid" alt="${productoEncontrado.nombre}" />
          <h4 class="objetoCentrado1 tituloPrecio1">Precio: $${productoEncontrado.precio.toFixed(2)}</h4>
          <section class="objetoCentrado1">
            <h6 class=" tituloPequeño1"></h6>
            <img src="${productoEncontrado.color}" alt=""> COLOR DISPONIBLE <i class="bi bi-hand-index-thumb-fill"></i>
          </section>
          <button class="botonComprar1">Agregar al carrito</button>
        </div>
      </div>
    `;

    // Agregar evento al botón de agregar al carrito
    const botonAgregarCarrito = document.querySelector(".botonComprar1");
    botonAgregarCarrito.addEventListener("click", function () {
      agregarAlCarrito(productoEncontrado);
    });
  }


// Función para calcular y actualizar el total del carrito
function calcularTotalCarrito(carrito) {
  let total = 0;
  carrito.forEach((producto) => {
    total += producto.precio;
  });

  const totalElement = document.getElementById("totalCarrito");
  totalElement.innerText = `$${total.toFixed(2)}`;
}


  // Función para agregar un producto al carrito
  function agregarAlCarrito(producto) {
    // Obtener el carrito desde el almacenamiento local (si existe)
    let carrito = localStorage.getItem("carrito");
    if (!carrito) {
      // Si no hay carrito en el almacenamiento local, crear uno vacío
      carrito = [];
    } else {
      // Si hay carrito, convertirlo de JSON a objeto JavaScript
      carrito = JSON.parse(carrito);
    }

    // Agregar el producto al carrito
    carrito.push(producto);

    // Guardar el carrito actualizado en el almacenamiento local
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Actualizar el contador de productos en el carrito
    actualizarContadorCarrito(carrito.length);

    // Volver a cargar los productos en el carrito
    cargarProductosCarrito();

    // Calcular y actualizar el total del carrito
    calcularTotalCarrito(carrito);

  }




  // Función para actualizar el contador de productos en el carrito
  function actualizarContadorCarrito(cantidadProductos) {
    const contadorCarrito = document.getElementById("contadorCarrito");
    contadorCarrito.innerText = cantidadProductos;
  }

  // Función para cargar los productos en el carrito
  function cargarProductosCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const listaProductos = document.getElementById("listaProductos");
    listaProductos.innerHTML = ""; // Limpiar la lista antes de volver a llenarla

    carrito.forEach((producto, index) => {
      const itemProducto = document.createElement("div");
      itemProducto.classList.add("itemProducto");
      itemProducto.innerHTML = `
      <div class="card">
        <div class="card-body card4"> 
          <div class="productoCarrito">
            <img class="imagen-limitada1" src="${producto.imagen}" alt="${producto.nombre}" class="imagenProductoCarrito">
            <div class="infoProductoCarrito">
              <h6 class="nombreProductoCarrito">${producto.nombre}</h6>
              <p class="precioProductoCarrito">$${producto.precio.toFixed(2)}</p>
            </div>
          </div>
          <button class="botonEliminar">Eliminar</button> <!-- Eliminada la clase "botonComprar" -->
        </div>
      </div> `;


      listaProductos.appendChild(itemProducto);
    });

    // Agregar evento para el botón de eliminar
    const botonesEliminar = document.querySelectorAll(".botonEliminar"); // Cambiado de ".botonEliminar.botonComprar" a ".botonEliminar"

    botonesEliminar.forEach((boton) => {
      boton.addEventListener("click", function () {
        const index = parseInt(boton.getAttribute("data-index"));
        eliminarDelCarrito(index);
      });
    });
  }

  // Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const productoEliminado = carrito.splice(index, 1)[0]; // Eliminar el producto en el índice especificado y obtener el producto eliminado
  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarProductosCarrito(); // Volver a cargar la lista de productos en el carrito
  actualizarContadorCarrito(carrito.length); // Actualizar el contador

  // Restar el precio del producto eliminado del total
  let total = parseFloat(document.getElementById("totalCarrito").innerText.slice(1)); // Obtener el total actual del carrito
  total -= productoEliminado.precio; // Restar el precio del producto eliminado
  document.getElementById("totalCarrito").innerText = `$${total.toFixed(2)}`; // Actualizar el total mostrado
}


  // Llamar a la función para cargar y mostrar el producto cuando la página esté lista
  cargarProducto();
  cargarProductosCarrito();
});