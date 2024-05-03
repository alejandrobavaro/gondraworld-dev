document.addEventListener("DOMContentLoaded", function () {
  const listaCarrito = document.getElementById("listaCarrito");
  const detalleProducto = document.getElementById("detalleProducto");

  // Función para mostrar el carrito
  function mostrarCarrito() {
    const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    listaCarrito.innerHTML = "";

    carrito.forEach((producto, index) => {
      const itemCarrito = document.createElement("li");
      itemCarrito.className = "elementoHijo";
      itemCarrito.innerHTML = `
      <div class="gridPadre"
      <div class="card objetoCentrado1">
        <div class="row">
          <div class="col-md-5">
            <img src="${producto.imagen}" class="img-fluid" alt="${producto.nombre}" />
          </div>
          
          <div class="col">
            <h5>${producto.nombre}</h5>
            
            <p><strong>Color:</strong> ${producto.color}</p>
            <p><strong>Talla:</strong> ${producto.talla}</p>
            <p><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
            <p><button class="btnEliminar btn btn-danger btn-sm" data-index="${index}">  <i class="bi bi-trash"></i></button></p>
          </div>
        </div>       
        </div>      
        </div>   
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

  function eliminarProducto(index) {
    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    carrito = carrito.filter((_, i) => i !== index);
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();

    // Actualizar localStorage para sincronización
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Disparar evento personalizado para notificar a otras páginas
    const eliminarEvento = new CustomEvent("productoEliminado", {
      detail: { index },
    });
    document.dispatchEvent(eliminarEvento);
  }

  // Escuchar el evento personalizado para actualizar el carrito cuando se elimina un producto
  document.addEventListener("productoEliminado", function (event) {
    const index = event.detail.index; // Obtener el índice del producto eliminado
    eliminarProducto(index); // Llamar a la función para eliminar el producto del carrito
  });

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

  // Agregar SweetAlert al botón de Pagar
  document.getElementById("btnPagar").addEventListener("click", function () {
    // Mostrar SweetAlert para confirmar el pago
    Swal.fire({
      title: "Proceso de Pago",
      text: "Ahora vamos a realizar todo el proceso de tu pago. ¿Deseas continuar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "No, volver a la tienda",
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirigir al enlace de PayPal
        window.open("https://www.paypal.com/paypalme/alegondramusic?country.x=AR&locale.x=es_XC", "_blank");
      } else {
        // Volver a la tienda
        window.location.href = "./tienda.html";
      }
    });
  });

  // Llamar a las funciones para mostrar el carrito y detalle
  mostrarCarrito();
  mostrarDetalle();
});
