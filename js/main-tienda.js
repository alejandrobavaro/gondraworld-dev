document.addEventListener("DOMContentLoaded", function() {
    // Referencia al contenedor de productos
    const productosContainer = document.getElementById("productos-container");
    // Referencia al contador de productos en el carrito
    const carritoCount = document.getElementById("carrito-count");
    // Array para almacenar los productos en el carrito
    let carrito = [];
  
    // Renderizar productos
    function renderizarProductos() {
      // Aquí puedes agregar lógica para obtener los productos, por ejemplo, de una base de datos
      const productos = [
        { id: 1, nombre: "Producto 1", precio: 10 },
        { id: 2, nombre: "Producto 2", precio: 20 },
        { id: 3, nombre: "Producto 3", precio: 30 }
      ];
  
      // Limpiamos el contenedor antes de agregar los productos
      productosContainer.innerHTML = "";
  
      // Iteramos sobre cada producto y creamos su representación HTML
      productos.forEach(producto => {
        const productoHTML = `
          <div class="col">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">Precio: $${producto.precio}</p>
                <button class="btn btn-primary agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
              </div>
            </div>
          </div>
        `;
        // Agregamos el producto al contenedor
        productosContainer.innerHTML += productoHTML;
      });
    }
  
    // Agregar evento click a los botones "Agregar al carrito"
    productosContainer.addEventListener("click", function(event) {
      if (event.target.classList.contains("agregar-carrito")) {
        // Obtener el ID del producto
        const id = parseInt(event.target.dataset.id);
        // Llamar a la función para agregar el producto al carrito
        agregarAlCarrito(id);
      }
    });
  
    // Función para agregar un producto al carrito
    function agregarAlCarrito(id) {
      // Buscar si el producto ya está en el carrito
      const productoExistente = carrito.find(producto => producto.id === id);
  
      if (productoExistente) {
        // Si el producto ya está en el carrito, incrementar su cantidad
        productoExistente.cantidad++;
      } else {
        // Si el producto no está en el carrito, agregarlo
        carrito.push({ id: id, cantidad: 1 });
      }
  
      // Actualizar el contador de productos en el carrito
      actualizarContadorCarrito();
    }
  
    // Función para actualizar el contador de productos en el carrito
    function actualizarContadorCarrito() {
      // Calcular la cantidad total de productos en el carrito
      const cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);
      // Actualizar el contador de productos en el carrito
      carritoCount.textContent = cantidadTotal;
    }
  
    // Renderizar productos al cargar la página
    renderizarProductos();
  });

  // funcionalidad carrito de compras

  // Esperamos a que el contenido del DOM esté cargado
document.addEventListener("DOMContentLoaded", function () {
            // Referencia al contenedor de productos
            const productosContainer = document.getElementById("productos-container");
            // Referencia al contador de productos en el carrito
            const carritoCount = document.getElementById("carrito-count");
            // Array para almacenar los productos en el carrito
            let carrito = [];

            // Renderizar productos
            function renderizarProductos() {
                // Aquí puedes agregar lógica para obtener los productos, por ejemplo, de una base de datos
                const productos = [
                    { id: 1, nombre: "Producto 1", precio: 10 },
                    { id: 2, nombre: "Producto 2", precio: 20 },
                    { id: 3, nombre: "Producto 3", precio: 30 }
                ];

                // Limpiamos el contenedor antes de agregar los productos
                productosContainer.innerHTML = "";

                // Iteramos sobre cada producto y creamos su representación HTML
                productos.forEach(producto => {
                    const productoHTML = `
          <div class="col">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">Precio: $${producto.precio}</p>
                <button class="btn btn-primary agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
              </div>
            </div>
          </div>
        `;
                    // Agregamos el producto al contenedor
                    productosContainer.innerHTML += productoHTML;
                });
            }

            // Agregar evento click a los botones "Agregar al carrito"
            productosContainer.addEventListener("click", function (event) {
                if (event.target.classList.contains("agregar-carrito")) {
                    // Obtener el ID del producto
                    const id = parseInt(event.target.dataset.id);
                    // Llamar a la función para agregar el producto al carrito
                    agregarAlCarrito(id);
                }
            });

            // Función para agregar un producto al carrito
            function agregarAlCarrito(id) {
                // Buscar si el producto ya está en el carrito
                const productoExistente = carrito.find(producto => producto.id === id);

                if (productoExistente) {
                    // Si el producto ya está en el carrito, incrementar su cantidad
                    productoExistente.cantidad++;
                } else {
                    // Si el producto no está en el carrito, agregarlo
                    carrito.push({ id: id, cantidad: 1 });
                }

                // Actualizar el contador de productos en el carrito
                actualizarContadorCarrito();
            }

            // Función para actualizar el contador de productos en el carrito
            function actualizarContadorCarrito() {
                // Calcular la cantidad total de productos en el carrito
                const cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);
                // Actualizar el contador de productos en el carrito
                carritoCount.textContent = cantidadTotal;
            }

            // Renderizar productos al cargar la página
            renderizarProductos();
        });
