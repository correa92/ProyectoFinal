import { peliculasEnCartelera, carritoCompra} from "./app.js";

export let carrito=[];

export class Carrito {
    constructor(id,cantidadTicket, precio, nombrePelicula, formato) {
      this.id = id;
      this.cantidadTicket = cantidadTicket;
      this.precio = precio;
      this.nombrePelicula = nombrePelicula;
      this.formato = formato;
    }
  
    subtotal = () => this.precio * this.cantidadTicket;


  }// class Carrito

export function agregarAlCarrito(id) {
    let objeto = peliculasEnCartelera.filter((e) => e.id == id);

    let confirmar = confirm(
      `¿Desea agregar ${objeto[0].nombrePelicula} en ${objeto[0].formato} al carrito?`
    );

    if (confirmar) {
      let cantidad = parseInt(prompt(`¿Cuántos tickets deseas?`));
      while (isNaN(cantidad)) {
        cantidad = parseInt(prompt(`¿Cuántos tickets deseas?`));
      }

      let pedido = new Carrito(objeto[0].id,
        cantidad,
        objeto[0].precio,
        objeto[0].nombrePelicula,
        objeto[0].formato
      );
      carritoCompra.push(pedido);
      actualizaCantidad();
      
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
                                    <td><button id="btn-${elem.id}-bajar"><</button> ${elem.cantidadTicket} <button id="btn-${elem.id}-subir">></button></td>
                                    <td>$ ${subtotal}</td>
                                    <td><button class="btn btn-eliminar" id="e-${elem.id}">Eliminar</button></td>
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
    if (id =="e-"+carritoCompra[i].id ) {
      index=i;
    }
  }

  let confirmar = confirm(
    `¿Desea eliminar ${carritoCompra[index].nombrePelicula} del carrito?`
  );

  if(confirmar){
    
    carritoCompra.splice(index,1);
    actualizaCantidad();
    mostrarCarrito(carritoCompra);
    escuchaBtnEliminar();
  }else{
    escuchaBtnEliminar();
  }

  

 }

 export function escuchaBtnEliminar() {
  let btnEliminar = document.querySelectorAll(".btn-eliminar");
  btnEliminar.forEach((e)=>{
    e.addEventListener('click',()=>{
      console.log("boton =",e.id);
      eliminaDelCarrito(e.id);
    })
  });
 }

// function cargarLocalStorage() {
  
//   for



// }//cargarLocalStorage