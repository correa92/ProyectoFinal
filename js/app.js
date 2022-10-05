import {crearCartelera,
  filtrarPeli,
  eliminarPeliculasCartelera,
  buscarPelicula,
  eliminarError,
  filtrarIdioma,
  traerBtn,
  main
} from "./Cartelera.js";
// import {Pelicula} from "./Pelicula.js";
import {mostrarCarrito, actualizaCantidad, escuchaBtnEliminar, revisaLocalStorage, controladorTicket} from "./Carrito.js";
import { pedirUsuario } from "./Cliente.js";

//-------------------------------variables---------------------------------

export let peliculasEnCartelera =[];
  
export let carritoCompra = [];

document.body.onload = function () {  

  const obtenerDatos = async () => {

    try {
      const response = await fetch("./data.json");
      const data = await response.json();
      //cada pelicula lo agrego al array peliculasEnCartelera
      for (const elem of data) {
        peliculasEnCartelera.push(elem);
      }
      
      //una vez que se termina de cargar los elementos de peliculasEnCartelera, actualizo para pagina principal para mostrarlos
      crearCartelera(peliculasEnCartelera);
    } catch (error) {
      console.log(error);
    }
  };

  
  //-----------------------------------------------Programa Principal-----------------------------------------------------------------------------
  //solicito los datos al servidor
  obtenerDatos();
  //muestro el contenido principal
  main();

  pedirUsuario();
  //revisa el localStorage que tenga productos y actualiza la cantidad de productos en la pantalla principal
  revisaLocalStorage();
 //Muestro en la pantalla principal las peliculas disponibles
  crearCartelera(peliculasEnCartelera);

  //-----------------------------------------------botones--------------------------------

  //----------------------funciones para el boton 2D-------------------
  let filtro2D = document.getElementById("btn-2D");
  //escucho el boton 2D
  filtro2D.addEventListener("click", () => { 
    // elimino del DOM todas las peliculas de la cartelera
    eliminarPeliculasCartelera();
    //filtro las peliculas que esten en esta categoria
    filtrarPeli("btn-2D", "2D",peliculasEnCartelera);
    //en el caso que halla un cartel de error generado por otra funcion elimino este cartel
    eliminarError("busqueda");
    //traigo los botones de comprar de las peliculas y si selecciono un boton ejecuto la funcion agregarAlCarrito (que esta dentro de traerBtn)
    traerBtn();
      
    // si el boton 2D no está activado, entonces pongo la cartelera completa
    (!filtro2D.classList.contains("btn-activado")) && crearCartelera(peliculasEnCartelera);

  });


  //----------------------funciones para el boton 3D-------------------
  let filtro3D = document.getElementById("btn-3D");
  filtro3D.addEventListener("click", () => {
    filtrarPeli("btn-3D", "3D",peliculasEnCartelera);
    eliminarError("busqueda");
    traerBtn();
    eliminarPeliculasCartelera();
    (!filtro3D.classList.contains("btn-activado")) && crearCartelera(peliculasEnCartelera);
  });


  //----------------------funciones para el boton 4D-------------------
  let filtro4D = document.getElementById("btn-4D");
  filtro4D.addEventListener("click", () => {
    filtrarPeli("btn-4D", "4D",peliculasEnCartelera);
    eliminarError("busqueda");
    //traigo los botones de comprar de las peliculas
    traerBtn();
    eliminarPeliculasCartelera();
    (!filtro4D.classList.contains("btn-activado")) && crearCartelera(peliculasEnCartelera);
  });


  //----------------------funciones para el boton 5D-------------------
  let filtro5D = document.getElementById("btn-5D");
  filtro5D.addEventListener("click", () => {
    filtrarPeli("btn-5D", "5D",peliculasEnCartelera);
    //si hay carteles de errores los elimino
    eliminarError("busqueda");
    //traigo los botones de comprar de las peliculas
    traerBtn();
    eliminarPeliculasCartelera();
    (!filtro5D.classList.contains("btn-activado")) && crearCartelera(peliculasEnCartelera);
  });


  //----------------------funciones para el input buscar-------------------
  let peliculaBuscada = "";
  let input = document.getElementById("buscador");
  input.addEventListener("input", () => {
    eliminarError("busqueda");
    peliculaBuscada = input.value;
    peliculaBuscada = peliculaBuscada.toUpperCase();
  });


  //----------------------funciones para el boton buscar-------------------
  let botonBuscar = document.getElementById("btn-buscar");
  botonBuscar.addEventListener("click", () => {
    let contenedor = document.getElementById("peliculas-contenedor");
    contenedor.innerHTML = "";
    eliminarError("busqueda");
    buscarPelicula(peliculaBuscada,peliculasEnCartelera);
    //traigo los botones de comprar de las peliculas
    traerBtn();
  });


  //----------------------funciones para el boton subtitulo-------------------
  let btnSubtitulo = document.getElementById("btn-subtitulo");
  btnSubtitulo.addEventListener("click", () => {
    //filtro las peliculas que esten en esta categoria
    filtrarIdioma("btn-subtitulo", "INGLÉS-SUBTITULADO",peliculasEnCartelera);
    //en el caso que halla un cartel de error generado por otra funcion elimino este cartel
    eliminarError("busqueda");
    // elimino del DOM todas las peliculas de la cartelera
    eliminarPeliculasCartelera();
    (!btnSubtitulo.classList.contains("btn-activado")) &&  crearCartelera(peliculasEnCartelera);
  });


  //----------------------funciones para el boton español-------------------
  let btnSubtituloLatino = document.getElementById("btn-espaniol");
  btnSubtituloLatino.addEventListener("click", () => {
    //filtro las peliculas que esten en esta categoria
    filtrarIdioma("btn-espaniol", "LATINO",peliculasEnCartelera);
    //en el caso que halla un cartel de error generado por otra funcion elimino este cartel
    eliminarError("busqueda");
    // elimino del DOM todas las peliculas de la cartelera
    eliminarPeliculasCartelera();
    (!btnSubtituloLatino.classList.contains("btn-activado")) && crearCartelera(peliculasEnCartelera);
  });


  //----------------------funciones para el boton reset-------------------
  let btnReset = document.getElementById("btn-reset");
  btnReset.addEventListener("click", () => {
    let contenedor = document.getElementById("peliculas-contenedor");
    eliminarError("busqueda");
    contenedor.innerHTML = "";
    crearCartelera(peliculasEnCartelera);
  });

  // --------------------------------------------------------------------carrito de compras-----------------------------------------------------------

  let btnCarrito = document.getElementById("carrito");
  btnCarrito.addEventListener("click", () => {
    btnCarrito.classList.add("activo");

    //el boton del carrito activa la ventana del carrito
    mostrarCarrito(carritoCompra);
    //se habilita el controlador
    controladorTicket();
    //se habilita los botones de eliminar
    escuchaBtnEliminar();
    
  });


//con este bloque salgo del carrito de compras
  let btnSalir = document.getElementById("btn-salir-carrito");
  btnSalir.addEventListener("click", () => {
    let contenedor = document.getElementById("contenedor-carrito");
    // desactiva la ventana del carrito
    contenedor.classList.remove("activo");
  });

  //vaciar carrito
  let btnVaciar = document.getElementById("btn-vaciar");
  btnVaciar.addEventListener("click", () => {

    if( carritoCompra.length!=0){

      Swal.fire({
        title: `¿Vaciar Carrito?`,
        text: "Se eliminaran las películas del carrito",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "No vaciar",
        confirmButtonText: "Sí, vaciar!"
    
      }).then((result) => {
    
        if (result.isConfirmed) {
          carritoCompra = [];
          localStorage.removeItem('carrito');
          mostrarCarrito(carritoCompra);
          //se actualiza el valor del carrito en la pantalla principal
          actualizaCantidad(carritoCompra);
    
          Swal.fire({
            title: "Eliminado!",
            text: "El carrito se vació correctamente.",
            icon: "success",
            timer: 3500,
            showConfirmButton: false
          }
          );
        }
      });//fin Swal.fire
    }else{
      Swal.fire({
        title: `Vacío`,
        text: "El carrito se encuentra vacío",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Entendido"
      })

    }


  });// fin vaciar Carrito


// confirmar compra del carrito
  let btnConfirmar = document.getElementById("btn-confirmar-compra");
  btnConfirmar.addEventListener("click", () => {
    mostrarCarrito(carritoCompra);

    if(carritoCompra.length != 0){

      Swal.fire({
        title: `¿Confirmar Compra?`,
        text: "Se confirmará la compra de los productos del carrito.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "No comprar",
        confirmButtonText: "Sí, comprar!"
    
      }).then((result) => {
    
        if (result.isConfirmed) {
          carritoCompra = [];
          localStorage.removeItem('carrito');
          mostrarCarrito(carritoCompra);
          //se actualiza el valor del carrito en la pantalla principal
          actualizaCantidad(carritoCompra);
    
          Swal.fire({
            title: "Felicitaciones!",
            text: "La compra se realizó correctamente.",
            icon: "success",
            timer: 3500,
            showConfirmButton: false
          }
          );
        }
      });// fin SwalFire
    }else{
      Swal.fire({
        title: `Error`,
        text: "Debe ingresar productos al carrito!.",
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Entendido"
      })
    }
    
  });

}; //onload


