
export function pedirUsuario() {
  // pido datos del usuario
  let usuario;
  let usuarioEnLs = localStorage.getItem("usuario");

  if (usuarioEnLs) {
  Swal.fire({
    title: `Bienvenida/o ${usuarioEnLs}`,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    },
    timer: 2000,
    showConfirmButton: false
  })
    // si el usuario está en localStorage lo muestro
    usuario = usuarioEnLs;
    //agrego usuario al DOM
    let parrafo = document.getElementById("usuario-nombre");
    parrafo.innerText = usuario;

  } else {

    Swal.fire({
      title: `Bienvenido a CINELAND`,
      text: 'Ingrese su nombre',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      showConfirmButton: true,
      input: 'text',
      inputValidator: (value)=>{
        if (value) {
          usuario = value;
        }else{
          usuario = "User";
        }
        //agrego usuario al localStorage
        localStorage.setItem("usuario", usuario);
        //agrego usuario al DOM
        let parrafo = document.getElementById("usuario-nombre");
        parrafo.innerText = usuario;
      }
    })

  }
} // pedirUsuario
