import {crearCartelera,
  filtrarPeli,
  eliminarPeliculasCartelera,
  buscarPelicula,
  eliminarError,
  filtrarIdioma,
  traerBtn,
  main
} from "./Cartelera.js";
import {Pelicula} from "./Pelicula.js";
import {mostrarCarrito, actualizaCantidad, escuchaBtnEliminar, revisaLocalStorage, actualizarLocalStorage, controladorTicket} from "./Carrito.js";
import { pedirUsuario } from "./Cliente.js";

//-------------------------------variables---------------------------------
  
  const formatosDisponibles = ["2D", "3D", "4D", "5D"];
  const precioPorSala = [500, 600, 700, 800];
  const generosDisponibles = ["ACCIÓN","SUSPENSO","TERROR","COMEDIA","ROMANTICA","INFANTIL"];
  const idiomasDisponibles = ["INGLÉS-SUBTITULADO", "LATINO"];

  let peli1 = new Pelicula(0,"THOR, AMOR Y TRUENO",formatosDisponibles[1],generosDisponibles[0],"02/10/2022",idiomasDisponibles[1],1,precioPorSala[1],"./img/thor-amor-y-trueno-500x760.jpg");
  let peli2 = new Pelicula(1,"JACK EN LA CAJA MALDITA",formatosDisponibles[0],"TERROR","08/12/2021",idiomasDisponibles[0],2,precioPorSala[0],"./img/jack-en-la-caja-maldita-2-el-despertar.jpg");
  let peli3 = new Pelicula(2,"TOP GUN MAVERICK",formatosDisponibles[3],"INFANTIL","12/06/2022",idiomasDisponibles[1],3,precioPorSala[3],"./img/top-gun-2-maverick-500x760.jpg");
  let peli4 = new Pelicula(3,"EL PERRO SAMURAI",formatosDisponibles[0],"INFANTIL","02/04/2022",idiomasDisponibles[1],4,precioPorSala[0],"./img/el-perro-samurai-500x760.jpg");
  let peli5 = new Pelicula(4,"AFTER, AMOR INFINITO",formatosDisponibles[2],"ROMANTICA","23/10/2021",idiomasDisponibles[0],5,precioPorSala[2],"./img/after-amor-infinito-500x760.jpg");
  let peli6 = new Pelicula(5,"INVITACION AL INFIERNO",formatosDisponibles[3],"TERROR","26/12/2022",idiomasDisponibles[0],6,precioPorSala[3],"./img/invitacion-al-infierno-500x760.jpg");
  let peli7 = new Pelicula(6,"TREN BALA",formatosDisponibles[1],"ACCIÓN","20/09/2022",idiomasDisponibles[1],7,precioPorSala[1],"./img/tren-bala-500x760.jpg");
  let peli8 = new Pelicula(7,"PRINCESA POR ACCIDENTE",formatosDisponibles[1],"INFANTIL","09/10/2022",idiomasDisponibles[1],8,precioPorSala[1],"./img/princesa-por-accidente-500x760.jpg");

  export let peliculasEnCartelera = [peli1,peli2,peli3,peli4,peli5,peli6,peli7,peli8];
  
  // export let carritoCompra = carrito;
  export let carritoCompra = [];

document.body.onload = function () {  


  //-----------------------------------------------Programa Principal-----------------------------------------------------------------------------
  //muestro el contenido principal
  main();
  pedirUsuario();
  //revisa el localStorage que tenga productos y actualiza la cantidad de productos en la pantalla principal
  revisaLocalStorage();
 //Muestro en la pantalla principal las peliculas disponibles
  crearCartelera(peliculasEnCartelera);

  //-----------------------------------------------botones-------------------

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

  let btnCarrito = document.getElementById("icono-carrito");
  btnCarrito.addEventListener("click", () => {
    btnCarrito.classList.add("activo");

    //el boton del carrito activa la venta del carrito
    mostrarCarrito(carritoCompra);
    controladorTicket();
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
    //pregunto al usuario si quiere vaciar el carrito
    let confirmar = confirm("¿Seguro desea vaciar el carrito?");
    //si confirma entonces se borra el carrito y se muestra en pantalla el carrito vacio
    if (confirmar) {
      carritoCompra = [];
      localStorage.removeItem('carrito');
      mostrarCarrito(carritoCompra);
      //se actualiza el valor del carrito en la pantalla principal
      actualizaCantidad(carritoCompra);
    }
  });


// confirmar comprar del carrito
  let btnConfirmar = document.getElementById("btn-confirmar-compra");
  btnConfirmar.addEventListener("click", () => {
    mostrarCarrito(carritoCompra);
    let confirmar = confirm("¿Desea confirmar la compra?");
    if (confirmar) {
      alert("Su compra se realizó con exito");
      carritoCompra = [];
      localStorage.removeItem('carrito');
      mostrarCarrito(carritoCompra);
      //se actualiza el valor del carrito en la pantalla principal
      actualizaCantidad(carritoCompra);
    }
  });


  
}; //onload


