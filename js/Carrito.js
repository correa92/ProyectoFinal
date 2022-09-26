import { peliculasEnCartelera, carritoCompra } from "./app.js";

export let carrito = [];

export class Producto {
  constructor(id, cantidadTicket, precio, nombrePelicula, formato) {
    this.id = id;
    this.cantidadTicket = cantidadTicket;
    this.precio = precio;
    this.nombrePelicula = nombrePelicula;
    this.formato = formato;
  }

  subtotal = () => this.precio * this.cantidadTicket;
} // class Producto

function verificaCarrito(id) {
  for (const elem of carritoCompra) {
    if (elem.id == id) {
      return true;
    }
  }
  return false;
}

export function agregarAlCarrito(id) {
  let objeto = peliculasEnCartelera.filter((e) => e.id == id);

  if (!verificaCarrito(objeto[0].id)) {
    Swal.fire({
      title: `¿Agregar ${objeto[0].nombrePelicula} en ${objeto[0].formato}?`,
      text: "La película se agregará al carrito",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No Agregar",
      confirmButtonText: "Sí, Agregar!",
      timer: 15000,
    }).then((result) => {
      if (result.isConfirmed) {
        let pedido = new Producto(
          objeto[0].id,
          1,
          objeto[0].precio,
          objeto[0].nombrePelicula,
          objeto[0].formato
        );
        carritoCompra.push(pedido);
        actualizaCantidad();

        Swal.fire({
          title: "Excelente!",
          text: "La pelicula se agregó al carrito correctamente",
          // imageUrl: ` ${objeto[0].imagen}`,
          // imageHeight: 200,
          icon: "success",
          timer: 3500,
          showConfirmButton: false,
        });
      }
    });
  } else {
    Swal.fire({
      title: `${objeto[0].nombrePelicula} en ${objeto[0].formato} `,
      text: "Ya se encuentra en el carrito",
      icon: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Entendido",
      timer: 10000,
    })
  }
}

export function actualizaCantidad() {
  let cantidadCarrito = document.getElementById("parrafo-carrito");
  cantidadCarrito.innerText = `(${carritoCompra.length})`;
}

export function mostrarCarrito(carritoDeCompra) {
  //elimino filas en el caso que halla, deben tener la class fila
  let resetTabla = document.querySelectorAll(".filas");
  resetTabla.forEach((element) => {
    element.remove();
  });
  actualizaCantidad();

  let mensajeError = document.getElementById("mensajeError");
  mensajeError.innerHTML = "";

  if (carritoDeCompra.length == 0) {
    let parrafo = document.createElement("P");
    parrafo.classList.add("mensaje-carrito");
    parrafo.innerText = "¡Su carrito se encuentra vacío!";
    mensajeError.appendChild(parrafo);
  } else {
    //renderizo cada elemento que tengo en el carrito
    for (const elem of carritoDeCompra) {
      let tabla = document.getElementById("tabla");
      let contenedorTR = document.createElement("tr");
      let subtotal = elem.subtotal();
      contenedorTR.classList.add("filas");
      contenedorTR.innerHTML = `
                                    <td>${elem.nombrePelicula}</td>
                                    <td><div class="logoFormatoMini fa-fade" >
                                    <picture>
                                      <img
                                        loading="lazy"
                                        src="./img/${elem.formato}.png"
                                        alt="${elem.formato} logo"
                                        title="${elem.formato} logo"    
                                      />
                                    </picture>
                                  </div></td>
                                    <td>$ ${elem.precio}</td>
                                    <td>X</td>
                                    <td><button class="bajar" id="btn-${elem.id}-bajar">-</button> ${elem.cantidadTicket} <button class="subir" id="btn-${elem.id}-subir">+</button></td>
                                    <td>$ ${subtotal}</td>
                                    <td><button class="btn btn-eliminar" id="e-${elem.id}"><i class="fa-solid fa-trash"></i></button></td>
                                  `;
      // en el boton de eliminar se coloca id = e-numero para diferenciar de los id creados en la funcion crearCartelera
      tabla.appendChild(contenedorTR);
    }

    let total = carritoDeCompra.reduce(
      (acum, elem) => acum + elem.precio * elem.cantidadTicket,
      0
    );

    let tabla = document.getElementById("tabla");
    let tr1 = document.createElement("tr");
    tr1.classList = "resultado filas";
    tr1.innerHTML = `
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td class="total">TOTAL</td>
      <td class="total">$ ${total}</td>
    
    `;

    tabla.append(tr1);
  }

  let contenedor = document.getElementById("contenedor-carrito");
  contenedor.classList.add("activo");
}

export function eliminaDelCarrito(id) {
  let index = 0;
  for (let i = 0; i < carritoCompra.length; i++) {
    //recorro el carrito y busco el id que contenga las extension "e-'numeroID'" y guarda su indice para luego eliminarlo del array con la funcion splice
    if (id == "e-" + carritoCompra[i].id) {
      index = i;
      break;
    }
  }

  Swal.fire({
    title: `¿Eliminar ${carritoCompra[index].nombrePelicula}?`,
    text: "La película se eliminará del carrito",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "No Eliminar",
    confirmButtonText: "Sí, Eliminar!",
  }).then((result) => {
    if (result.isConfirmed) {
      //elimino del carrito el producto especificado mediante su indice
      carritoCompra.splice(index, 1);
      //actualizo en el DOM la cantidad de productos que hay en el carrito
      actualizaCantidad();
      //muestro el carrito actualizado en el DOM
      mostrarCarrito(carritoCompra);
      //actualizo el carrito en el storage
      actualizarLocalStorage();
      // vuelvo a escuchar los botones de eliminar en el carrito
      escuchaBtnEliminar();

      Swal.fire({
        title: "Eliminado!",
        text: "La película se eliminó del carrito correctamente.",
        icon: "success",
        timer: 3500,
        showConfirmButton: false,
      });
    }
  });
}

export function escuchaBtnEliminar() {
  let btnEliminar = document.querySelectorAll(".btn-eliminar");
  btnEliminar.forEach((e) => {
    e.addEventListener("click", () => {
      eliminaDelCarrito(e.id);
    });
  });
}

export function revisaLocalStorage() {
  //Cuando el usuario presiona el boton del carrito se verifica que tenga productos en el localStorage
  let productos = JSON.parse(localStorage.getItem("carrito"));

  if (productos) {
    for (const producto of productos) {
      //los datos de cada producto lo tengo que instanciar en la clase carrito

      let pedido = new Producto(
        producto.id,
        producto.cantidadTicket,
        producto.precio,
        producto.nombrePelicula,
        producto.formato
      );
      carritoCompra.push(pedido);
      actualizaCantidad();
    }
  }
}

export function actualizarLocalStorage() {
  //borro el localStorage para luego actualizar con el producto nuevo
  localStorage.removeItem("carrito");

  carritoCompra.length != 0 &&
    localStorage.setItem("carrito", JSON.stringify(carritoCompra));
  //agrego al storage el carrito actualizado
}

export function controladorTicket() {
  let btnsSubir = document.querySelectorAll(".subir");
  let btnsBajar = document.querySelectorAll(".bajar");

  btnsSubir.forEach((e) => {
    e.addEventListener("click", () => {
      for (const elem of carritoCompra) {
        if (e.id == "btn-" + elem.id + "-subir") {
          //aumento la cantidad de ticket en uno
          elem.cantidadTicket++;
          //actualizo el carrito
          mostrarCarrito(carritoCompra);
          //vuelvo a poner disponible los botones del controlador de ticket
          controladorTicket();
          // pongo disponible los botones eliminar del carrito
          escuchaBtnEliminar();
          //actualizo el localStorage
          actualizarLocalStorage();
        }
      }
    });
  });

  btnsBajar.forEach((e) => {
    e.addEventListener("click", () => {
      for (const elem of carritoCompra) {
        if (e.id == "btn-" + elem.id + "-bajar") {
          if (elem.cantidadTicket > 1) {
            //disminuye la cantidad de ticket en uno
            elem.cantidadTicket--;
            //actualizo el carrito
            mostrarCarrito(carritoCompra);
            //vuelvo a poner disponible los botones del controlador de ticket
            controladorTicket();
            // pongo disponible los botones eliminar del carrito
            escuchaBtnEliminar();
            //actualizo el localStorage
            actualizarLocalStorage();
          }
        }
      }
    });
  });
}
