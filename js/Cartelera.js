
//-------------------------------------Funciones----------------------------------------------

import { agregarAlCarrito, actualizarLocalStorage} from "./Carrito.js";

export function main() {
  let main = document.body;
  main.innerHTML = `<div class="contenedor-principal">
  <div class="titulo">
    <h1>BIENVENIDOS A CINELAND</h1>

    <h2>PELÍCULAS EN CARTELERA</h2>
  </div>
</div>

<div class="contenedor1">
  <div class="nav">
    <div class="par">
      <input type="search" placeholder="Buscar película..." id="buscador" />
      <button class="btn" id="btn-buscar">Buscar</button>
      <button class="btn" id="btn-reset" type="reset">Reset</button>
    </div>

    <div class="par">
      <span>Sala</span>
      <button class="btn" id="btn-2D">2D</button>
      <button class="btn" id="btn-3D">3D</button>
      <button class="btn" id="btn-4D">4D</button>
      <button class="btn" id="btn-5D">Monster 5D</button>
    </div>

    <div class="par">
      <span>Idioma</span>
      <button class="btn" id="btn-subtitulo">Subtitulado</button>
      <button class="btn" id="btn-espaniol">Español</button>
    </div>

    <div class="usuario" id="usuario">
      <i class="fa-solid fa-user"></i>
      <p id="usuario-nombre"></p>

      <div class="carrito" id="carrito">
        <i class="fa-solid fa-cart-shopping fa-flip" id="icono-carrito"></i>
        <p id="parrafo-carrito">(0)</p>
      </div>
    </div>
  </div>
  <!-- fin nav -->

  <main class="main" id="main">
    <div class="peliculas-contenedor" id="peliculas-contenedor"></div>
    <!--fin peliculas-->
  </main>
</div>

<div class="contenedor-carrito" id="contenedor-carrito">
  <fieldset>
    <legend>Carrito de Compras</legend>

    <table id="tabla">
      <tr>
        <th>Película</th>
        <th>Formato</th>
        <th>Precio x Unidad</th>
        <th></th>
        <th>Cantidad Ticket</th>
        <th>Subtotal</th>
        <th>Acción</th>
        
      </tr>
    </table>
    <div id="mensajeError"></div>
  </fieldset>

  <div class="botonesCarrito">
    <button class="btn" id="btn-confirmar-compra">Confirmar Compra</button>
    <button class="btn" id="btn-vaciar">Vaciar Carrito</button>
    <button class="btn" id="btn-salir-carrito">Salir del carrito</button>
  </div>
</div>
`;
}

export function crearCartelera(arreglo) {
  let contenedorPeliculas = document.getElementById("peliculas-contenedor");

  if (contenedorPeliculas.innerText === "") {
    for (const elem of arreglo) {
      let div = document.createElement("div");
      div.className = `pelicula`;

      div.innerHTML = ` 
            <div class="imagen">
              <picture>
                <img
                  loading="lazy"
                  src=${elem.imagen}
                  alt="${elem.nombrePelicula}"
                  title="${elem.nombrePelicula}"
                />
              </picture>
            </div>
    
            <div class="logoFormato fa-fade" >
              <picture>
                <img
                  loading="lazy"
                  src="./img/${elem.formato}.png"
                  alt="${elem.formato} logo"
                  title="${elem.formato} logo"
                  
                />
              </picture>
            </div>
    
            <!--fin imagen-->
          
            <div class="info">
              <div class="par">
                <span>${elem.nombrePelicula}</span>
              </div>
              <input class="btn btn-comprar" id="${elem.id}" type="button" value="COMPRAR" />
            </div>
            <!--fin info-->
            `;

      contenedorPeliculas.append(div);
    }
  }
  //traigo los botones de comprar de las peliculas
  traerBtn();
} // crearCartelera

export function filtrarPeli(boton, formatoPeli, arreglo) {
  let contenedor = document.getElementById("peliculas-contenedor");
  let btn = document.getElementById(boton);
  if (btn.classList.contains("btn-activado")) {
    eliminar(formatoPeli);
  } else {
    let resultados = arreglo.filter((el) => el.formato === formatoPeli);

    for (const elem of resultados) {
      let div = document.createElement("DIV");
      div.className = `pelicula formato-${formatoPeli}`;

      div.innerHTML = `
           
          <div class="imagen" >
            <picture>
              <img
                loading="lazy"
                src=${elem.imagen}
                alt="${elem.nombrePelicula}"
                title="${elem.nombrePelicula}"
              />
            </picture>
          </div>
    
          <div class="logoFormato  fa-fade">
          <picture>
            <img
              loading="lazy"
              src="./img/${elem.formato}.png"
              alt="${elem.formato} logo"
              title="${elem.formato} logo"
            />
          </picture>
        </div>
    
          
          <!--fin imagen-->
        
          <div class="info">
            <div class="par">
              <span>${elem.nombrePelicula}</span>
            </div>
            <input class="btn btn-comprar" id="${elem.id}" type="button" value="COMPRAR" />
          </div>
          <!--fin info-->
          `;

      contenedor.appendChild(div);
    }
    // btn.classList.toggle('btn-activado');
  }

  btn.classList.toggle("btn-activado");
}

export function eliminar(formato) {
  let contenedor = document.querySelectorAll(`.formato-${formato}`);
  for (const i of contenedor) {
    i.remove();
  }
} //eliminar

export function eliminarPeliculasCartelera() {
  let peliculasContenedor = document.querySelectorAll(".pelicula");
  for (const elem of peliculasContenedor) {
    (elem.classList.length == 1) && elem.remove();
  }
}

export function buscarPelicula(pelicula, arreglo) {
  let resultado = arreglo.filter((elem) => elem.nombrePelicula === pelicula);
  if (resultado.length == 0) {
    eliminarPeliculasCartelera();
    let contenedor = document.getElementById("main");
    let div = document.createElement("DIV");
    div.className = "busqueda";
    div.innerHTML = `<p> LO SENTIMOS, NO ENCONTRAMOS LA PELÍCULA INGRESADA =( </p>`;

    contenedor.appendChild(div);
  } else {
    eliminarPeliculasCartelera();
    mostrarPelicula(resultado);
  }
} //buscarPelicula

export function mostrarPelicula(objetoPelicula) {
  let contenedor = document.getElementById("peliculas-contenedor");
  let div = document.createElement("DIV");
  div.className = `pelicula formato-${objetoPelicula[0].formato}`;

  div.innerHTML = `
          <div class="imagen" >
    
            <picture>
              <img
                loading="lazy"
                src=${objetoPelicula[0].imagen}
                alt="${objetoPelicula[0].nombrePelicula}"
                title="${objetoPelicula[0].nombrePelicula}"
              />
            </picture>
          </div>
    
          <div class="logoFormato  fa-fade">
          <picture>
            <img
              loading="lazy"
              src="./img/${objetoPelicula[0].formato}.png"
              alt="${objetoPelicula[0].formato} logo"
              title="${objetoPelicula[0].formato} logo"
            />
          </picture>
        </div>
          <!--fin imagen-->
        
          <div class="info">
            <div class="par">
              <span>${objetoPelicula[0].nombrePelicula}</span>
            </div>
            <input class="btn btn-comprar" id="${objetoPelicula[0].id}" type="button" value="COMPRAR" />
          </div>
          <!--fin info-->
          `;
  contenedor.appendChild(div);
} //mostrarPelicula

export function eliminarError(clase) {
  let elemento = document.querySelector(`.${clase}`);
  (elemento != null) && elemento.remove();
} //eliminarError

export function filtrarIdioma(boton, formatoPeli, arreglo) {
  let contenedor = document.getElementById("peliculas-contenedor");
  let btn = document.getElementById(boton);
  if (btn.classList.contains("btn-activado")) {
    eliminar(formatoPeli);
  } else {
    let resultados = arreglo.filter((el) => el.idioma === formatoPeli);

    for (const elem of resultados) {
      let div = document.createElement("DIV");
      div.className = `pelicula formato-${formatoPeli}`;

      div.innerHTML = `
           
          <div class="imagen" >
            <picture>
              <img
                loading="lazy"
                src=${elem.imagen}
                alt="${elem.nombrePelicula}"
                title="${elem.nombrePelicula}"
              />
            </picture>
          </div>
    
          <div class="logoFormato  fa-fade">
          <picture>
            <img
              loading="lazy"
              src="./img/${elem.formato}.png"
              alt="${elem.formato} logo"
              title="${elem.formato} logo"
            />
          </picture>
        </div>
    
          
          <!--fin imagen-->
        
          <div class="info">
            <div class="par">
              <span>${elem.nombrePelicula}</span>
            </div>
            <input class="btn btn-comprar" id="${elem.id}" type="button" value="COMPRAR" />
          </div>
          <!--fin info-->
          `;

      contenedor.appendChild(div);
    }
    // btn.classList.toggle('btn-activado');
  }
  //traigo los botones de comprar de las peliculas
  traerBtn();

  btn.classList.toggle("btn-activado");
}

export function traerBtn() {
  let btnComprar = document.querySelectorAll(".btn-comprar");
  btnComprar.forEach((element) => {
    element.addEventListener("click", () => {
        //agrego al carrito de comprar el producto especificado
        agregarAlCarrito(element.id);
        //actualizo el carrito en el localStorage
        actualizarLocalStorage();
    });
  });
}

