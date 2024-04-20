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
  
      // Array de productos (simulación, puedes obtenerlo de una API o base de datos)
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
            <button class="botonComprar">Agregar al carrito</button>
          </div>
        </div>
      `;



      
    }
  




    // Llamar a la función para cargar y mostrar el producto cuando la página esté lista
    cargarProducto();
  });
  