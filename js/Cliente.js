
export function pedirUsuario() {
  // pido datos del usuario
  let usuario;
  let usuarioEnLs = localStorage.getItem("usuario");


  if (usuarioEnLs) {
    // si el usuario está en localStorage lo muestro
    usuario = usuarioEnLs;
    //agrego usuario al DOM
    let parrafo = document.getElementById("usuario-nombre");
    parrafo.innerText = usuario;
  } else {
  

    usuario = prompt("¡Bienvenido! Ingresa tú nombre.");
    //agrego usuario al localStorage
    localStorage.setItem("usuario", usuario);

    //agrego usuario al DOM
    let parrafo = document.getElementById("usuario-nombre");
    parrafo.innerText = usuario;
  }
} // pedirUsuario
