// Código JavaScript para la tienda

document.addEventListener("DOMContentLoaded", function () {
  // Array de productos (simulación, puedes obtenerlo de una API o base de datos)
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

  // Función para cargar los productos en el DOM
  function cargarProductos() {
    const contenedorProductos = document.querySelector(".row.row-cols-1.row-cols-md-4.g-4");

    productos.forEach((producto) => {
      const productoHTML = `
      <div class="col producto" id="producto${producto.id}" data-id="${producto.id}">
        <div class="card">
          <div class="card-body card4">
            <section>
              <h6 class="objetoCentrado1"><i class="bi bi-activity"></i> (Producto por encargo) <i class="bi bi-activity"></i></h6>
            </section>
                    <img src="${producto.imagen}" class="card-img-top img-fluid" alt="${producto.nombre}" />
            <h5 class="card-title">${producto.nombre}</h5>
            <h4 class="objetoCentrado1 tituloPrecio1">Precio:<span>
                <h3 class="tituloImportante2 objetoCentrado1"> $${producto.precio.toFixed(2)} </h3>
              </span></h4>

            <button class="botonComprar">
                        <a class="botonComprar1 btn btn-primary" href="tienda-carrito.html?id=${producto.id}">    <i class="bi bi-shift-fill"></i>  Encargar  
           <i class="bi bi-shift-fill"></i>
          </a>
          </button>
          
            <section class="objetoCentrado1">
              <h6 class="tituloPequeño1"></h6>
              <img src="${producto.color}" alt=""> COLOR DISPONIBLE <i class="bi bi-hand-index-thumb-fill"></i>
            </section>
          </div>
        </div>
      </div>
      `;
      contenedorProductos.insertAdjacentHTML("beforeend", productoHTML);
    });
  }

  // Función para manejar clics en el botón "Encargar"
  function handleEncargarClick(event) {
    const botonEncargar = event.target;
    if (botonEncargar.classList.contains("botonComprar")) {
      const productoId = botonEncargar.getAttribute("data-producto-id");

      // Construir la URL con el ID del producto
      const urlTiendaCarrito = `tienda-carrito.html?id=${productoId}`;
      // Redirigir a la página "tienda-carrito.html" con el ID del producto en la URL
      window.location.href = urlTiendaCarrito;
    }
  }

  // Llamar a la función para cargar los productos cuando la página esté lista
  cargarProductos();

  // Escuchar clics en cualquier parte del documento y manejarlos
  document.addEventListener("click", handleEncargarClick);

});





//----------------------------------------------------------//

// Nuevo código para manejar la clase seleccionado
// Obtener el elemento por su ID
const producto2 = document.getElementById('producto2');

// Agregar un evento click para alternar la clase seleccionado
producto2.addEventListener('click', function () {
  this.classList.toggle('seleccionado');
});


