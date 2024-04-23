document.addEventListener("DOMContentLoaded", function () {
    const listaCarrito = document.getElementById("listaCarrito");
    const detalleProducto = document.getElementById("detalleProducto");
  
    // Función para mostrar el carrito
    function mostrarCarrito() {
      const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
      listaCarrito.innerHTML = "";
  
      carrito.forEach((producto, index) => {
        const itemCarrito = document.createElement("li");
        itemCarrito.className = "elementoHijo"; // Agregar la clase para el diseño en filas pequeñas
        itemCarrito.innerHTML = `
          <div class="row">
            <div class="col-md-4">
              <img src="${producto.imagen}" class="img-fluid" alt="${producto.nombre}" />
            </div>
            <div class="col-md-8">
              <h5>${producto.nombre}</h5>
              <p><strong>Color:</strong> ${producto.color}</p>
              <p><strong>Talla:</strong> ${producto.talla}</p>
              <p><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
              <p><button class="btnEliminar btn btn-danger btn-sm" data-index="${index}">Eliminar</button></p>
            </div>
          </div>
          <hr />
        `;
        listaCarrito.appendChild(itemCarrito);
      });
  
      // Calcular total
      const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
      const totalHTML = `<p class="card objetoCentrado1">Total: $${total.toFixed(2)}</p>`;
      listaCarrito.innerHTML += totalHTML;
  
      // Botón Eliminar
      const botonesEliminar = document.querySelectorAll(".btnEliminar");
      botonesEliminar.forEach((btnEliminar) => {
        btnEliminar.addEventListener("click", (event) => {
          const index = parseInt(event.target.getAttribute("data-index"));
          eliminarProducto(index);
        });
      });
    }
  
    // Función para eliminar un producto del carrito
    function eliminarProducto(index) {
      let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
      carrito = carrito.filter((_, i) => i !== index);
      sessionStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarrito();
    }
  
    // Función para mostrar el detalle del producto
    function mostrarDetalle() {
      const detalle = JSON.parse(sessionStorage.getItem("detalle")) || {};
      const detalleHTML = `
        <h4>Detalle del Producto:</h4>
        <p><strong>Nombre:</strong> ${detalle.nombre}</p>
        <p><strong>Precio:</strong> $${detalle.precio.toFixed(2)}</p>
        <p><strong>Color:</strong> ${detalle.color}</p>
        <p><strong>Talla:</strong> ${detalle.talla}</p>
      `;
      detalleProducto.innerHTML = detalleHTML;
    }
  
    // Llamar a las funciones para mostrar el carrito y detalle
    mostrarCarrito();
    mostrarDetalle();
  });
  