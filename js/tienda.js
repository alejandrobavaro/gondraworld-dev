document.addEventListener("DOMContentLoaded", function () {
  const contenedorProductos = document.querySelector(".row.row-cols-1.row-cols-md-4.g-4");
  const listaMiniCarrito = document.getElementById("listaMiniCarrito");
  const totalMiniCarrito = document.getElementById("totalMiniCarrito");
  const contadorCarrito = document.getElementById("contadorCarrito");
  const btnVaciarCarrito = document.getElementById("btnVaciarCarrito");
  const detalleProductoAgregado = document.getElementById("detalleProductoAgregado");


  // Array de productos (simulación, puedes obtenerlo de una API o base de datos)
  const productos = [
    {
      id: 1,
      nombre: "Remera Gondra World W-B-1",
      precio: 20000.99,
      imagen: "../img/06-tiendagondraworld/tienda1-.png",
    },
    {
      id: 2,
      nombre: "Remera Almango A-G-1 Ponele Onda",
      precio: 18000.50,
      imagen: "../img/06-tiendagondraworld/tienda2-.png",
    },
    {
      id: 3,
      nombre: "Remera Gondra World W-G-2",
      imagen: "../img/06-tiendagondraworld/tienda3-.png",
      precio: 11210,
    },
    {
      id: 4,
      nombre: "Remera Almango A-B-2 Fundidos",
      imagen: "../img/06-tiendagondraworld/tienda4-.png",
      precio: 16200,
    },
    {
      id: 5,
      nombre: "Remera Puchulita P-B-1",
      imagen: "../img/06-tiendagondraworld/tienda5-.png",
      precio: 15130,
    },
    {
      id: 6,
      nombre: "Remera Almango D-2-C Fiesta",
      imagen: "../img/06-tiendagondraworld/tienda6-.png",
      precio: 15200,
    },
    {
      id: 7,
      nombre: "Remera Almango D-4-A Logo Antiguo",
      imagen: "../img/06-tiendagondraworld/tienda7-.png",
      precio: 13250,
    },
    {
      id: 8,
      nombre: "Remera Almango A-Gorro D-5-A",
      imagen: "../img/06-tiendagondraworld/tienda8-.png",
      precio: 16200,
    },
    {
      id: 9,
      nombre: "Remera Gondra Estudio D-4-B",
      imagen: "../img/06-tiendagondraworld/tienda9-.png",
      precio: 17100,
    },
    {
      id: 10,
      nombre: "Remera Almango D-6-A Logo Descontrol",
      imagen: "../img/06-tiendagondraworld/tienda10-.png",
      precio: 13210,
    },
    {
      id: 11,
      nombre: "Remera Almango Ale Gondra D-3-B",
      imagen: "../img/06-tiendagondraworld/tienda11-.png",
      precio: 16540,
    },
    {
      id: 12,
      nombre: "Remera Almango D-6-B Sexotica",
      imagen: "../img/06-tiendagondraworld/tienda12-.png",
      precio: 15250,
    }
  ];

  // Función para cargar los productos en el DOM
  function cargarProductos() {
    productos.forEach((producto) => {
      const productoHTML = `
        <div class="col producto" id="producto${producto.id}" data-id="${producto.id}">
          <div class="card">
            <div class="card-body card4">
              <section>
                <h5 class="objetoCentrado1"><i class="bi bi-activity"></i> (Producto por encargo) <i class="bi bi-activity"></i></h5>
              </section>
              <img src="${producto.imagen}" class="card-img-top img-fluid" alt="${producto.nombre}" />
              <h5 class="card-title">${producto.nombre}</h5>
              <h4 class="objetoCentrado1 tituloPrecio1">Precio:<span>
                  <span class="tituloImportante2 objetoCentrado1"> $${producto.precio.toFixed(2)} </span>
                </span></h4>
            
              <!-- Select para color -->
              <label for="selectColor${producto.id}" class="objetoCentrado1 tituloPequeño1"><i class="bi bi-activity"></i> ELIGE COLOR <i class="bi bi-activity"></i></label>
              <select id="selectColor${producto.id}" class="form-select mb-3">
                <option value="Negro">Negro</option>
                <option value="Blanco">Blanco</option>
                <option value="Gris-claro">Gris Claro</option>
                <option value="Gris-oscuro">Gris Oscuro</option>
                <option value="Rojo">Rojo</option>
                <option value="Naranja">Naranja</option>
              </select>
            
              <!-- Select para talla -->
              <label for="selectTalla${producto.id}" class="objetoCentrado1 tituloPequeño1"><i class="bi bi-activity"></i> ELIGE TALLE <i class="bi bi-activity"></i></label>
              <select id="selectTalla${producto.id}" class="form-select">
                <option value="x-small">X-Small</option>
                <option value="xx-small">XX-Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="x-large">X-Large</option>
                <option value="xx-large">XX-Large</option>
              </select>
            
              <!-- Botón "Encargar" -->
              <div class="d-grid gap-2 col-6 mx-auto">
                <button class="btn btn-primary botonEncargar" data-producto-id="${producto.id}">
                  <i class="bi bi-shift-fill"></i> Encargar 
                </button>
              </div>
            
            </div>
          </div>
        </div>
      `;

      contenedorProductos.insertAdjacentHTML("beforeend", productoHTML);
    });
  }

  // Llamar a la función para cargar los productos cuando la página esté lista
  cargarProductos();


  // Función para manejar clics en los botones "Encargar"
  function handleEncargarClick(event) {
    event.preventDefault();
    const botonEncargar = event.target.closest('.botonEncargar');
    if (botonEncargar) {
      const productoId = botonEncargar.getAttribute("data-producto-id");
      const color = document.getElementById(`selectColor${productoId}`).value;
      const talla = document.getElementById(`selectTalla${productoId}`).value;

      const productoSeleccionado = productos.find((producto) => producto.id == productoId);
      if (productoSeleccionado) {
        const productoEncargado = {
          id: productoSeleccionado.id,
          nombre: productoSeleccionado.nombre,
          precio: productoSeleccionado.precio,
          imagen: productoSeleccionado.imagen,
          color: color,
          talla: talla
        };
        agregarAlCarrito(productoEncargado);
      } else {
        console.error("Producto no encontrado");
      }
    }
  }

  // Agregar evento de clic para manejar el botón "Encargar"
  contenedorProductos.addEventListener('click', function (event) {
    const botonEncargar = event.target.closest('.botonEncargar');
    if (botonEncargar) {
      handleEncargarClick(event);
    }
  });



// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
  mostrarDetalleProductoAgregado(producto);

  
  // Mostrar Toast de confirmación
  Toastify({
    text: `${producto.nombre} agregado al carrito`,
    duration: 3000,
    gravity: "top",
    position: "left",
    stopOnFocus: true,
    className: "iconoToastify", // Clase CSS personalizada
  }).showToast();
}





  // Función para mostrar los detalles del producto agregado en el mini carrito
  function mostrarDetalleProductoAgregado(producto) {
    const detalleProductoHTML = `
      <div class="card">
        <img src="${producto.imagen}" class="card-img-top img-fluid" alt="${producto.nombre}" />
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">Color: ${producto.color}</p>
          <p class="card-text">Talla: ${producto.talla}</p>
        </div>
      </div>
    `;
    detalleProductoAgregado.innerHTML = detalleProductoHTML;
  }

  // Función para cargar el carrito previamente guardado en localStorage al cargar la página
  function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.forEach((producto) => {
      agregarAlCarrito(producto);
    });
  }

  // Función para cargar el mini carrito
  function cargarMiniCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    listaMiniCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {
      // Crear elemento li para cada producto en el carrito
      const itemHTML = `
        <li class="estilo-lista">
          <div class="d-flex align-items-center">
            <img src="${producto.imagen}" class="me-3" alt="${producto.nombre}" style="max-width: 60px;">
            <div>
              <h6 class="mb-0 tituloPequeño4">${producto.nombre}</h6>
              <small class="text-muted1">Color: ${producto.color}, Talla: ${producto.talla}</small>
            </div>
          </div>
          <div>
            <span class="badge rounded-pill">$${producto.precio.toFixed(2)}</span>
            <p><button class="btn btn-sm btn-danger ms-2 btn-eliminar  seguirComprando1" data-index="${index}">
              <i class="bi bi-trash"></i> </button></p>
              </div>
        </li>
      `;

      listaMiniCarrito.insertAdjacentHTML("beforeend", itemHTML);
      total += producto.precio; // Sumar al total el precio de este producto
    });

    totalMiniCarrito.textContent = `Total: $${total.toFixed(2)}`;
    contadorCarrito.textContent = `Cantidad de Productos: ${carrito.length}`;
  }

  // Función para eliminar un producto del carrito
  function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();

    // Enviamos un evento personalizado cuando se elimina un producto
    const eliminarEvento = new CustomEvent("productoEliminado", {
      detail: { index }, // Detalles del producto eliminado (puede ser el ID u otra identificación)
    });
    document.dispatchEvent(eliminarEvento); // Disparamos el evento para notificar a otras páginas
  }

  // Función para vaciar el carrito
  function vaciarCarrito() {
    localStorage.removeItem("carrito");
    actualizarCarrito();
  }

  // Función para actualizar el carrito
  function actualizarCarrito() {
    cargarMiniCarrito();
    calcularTotalCarrito();
  }

  // Función para calcular el total del carrito
  function calcularTotalCarrito() {
    let total = 0;
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.forEach((producto) => {
      total += producto.precio;
    });
    totalMiniCarrito.textContent = `Total: $${total.toFixed(2)}`;
  }

  // Escuchar clics en botones de eliminar y manejarlos
  listaMiniCarrito.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-eliminar")) {
      const index = event.target.getAttribute("data-index");
      eliminarDelCarrito(index);
    }
  });

  // Escuchar clics en botón Vaciar Carrito
  btnVaciarCarrito.addEventListener("click", function () {
    vaciarCarrito();
  });


  // Función para manejar clics en el botón "COMPRAR"
  function handleComprarClick(event) {
    event.preventDefault();
    const botonComprar = event.target.closest("#btnComprar");
    if (botonComprar) {
      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      if (carrito.length > 0) {
        sessionStorage.setItem("carrito", JSON.stringify(carrito));
        window.location.href = "./tienda-pago.html";
      } else {
        console.error("No hay productos en el carrito para comprar.");
      }
    }
  }

  // Agregar evento de clic para manejar el botón "Comprar"
  document.getElementById("btnComprar").addEventListener("click", handleComprarClick);


  // Cargar el carrito al abrir la página
  cargarMiniCarrito();

  // Escuchar el evento productoEliminado para sincronizar la eliminación entre páginas
  document.addEventListener("productoEliminado", function (event) {
    const index = event.detail.index;
    eliminarDelCarrito(index);
  });

});
