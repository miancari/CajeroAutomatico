
let loginform = document.getElementById("loginform");
document.getElementById("menuOpciones").style.display = "none";
document.getElementById("saldo").style.display = "none"
document.getElementById("volver").style.display = "none"

let usuario = [
  { nombre: "Blanca", contraseña: "456", saldo: 200 },
  { nombre: "Miguel", contraseña: "123", saldo: 290 },
  { nombre: "Esteban", contraseña: "789", saldo: 67 }
];

let cantidad = 0;
let opcion;
let usuarioActual;
let saldoCuenta;

function validarFormulario(event) {
  event.preventDefault();

  let user = document.getElementById("usuario").value;
  let password = document.getElementById("password").value;
  let encontrado = false;

  for (let i = 0; i < usuario.length; i++) {

    if (usuario[i].nombre === user && usuario[i].contraseña === password) {
      encontrado = true;
      usuarioActual = i;
      document.getElementById("menuOpciones").style.display = "block";
      document.getElementById("usuario").value = "";
      document.getElementById("password").value = "";
      document.getElementById("saldo").style.display = "block";
      document.getElementById("volver").style.display = "block";
      actualizarSaldoEnPantalla();
      break;
    }

  } if (!encontrado) {
    alert("Credenciales incorrectas");
    document.getElementById("menuOpciones").style.display = "none";
    document.getElementById("usuario").value = "";
    document.getElementById("password").value = "";
    document.getElementById("saldo").style.display = "none";
    document.getElementById("borrar").style.display = "block";
  }
}



function ocultarBoton() {
  let boton = document.getElementById('borrar');
  boton.style.display = 'none';
}

loginform = addEventListener("submit", validarFormulario);

function mostrarVentanaEmergente(op) {
  opcion = op;
  document.getElementById("ventanaEmergente").style.display = "block";
  document.getElementById("menuOpciones").style.display = "none";
  document.getElementById("volver").style.display = "none";
  document.getElementById("borrar").disabled = true;
}

function aceptar () {
  cantidad= parseInt(document.getElementById("cantidad").value);
  
  if (opcion === 'ingresar') {
    if (cantidad + usuario[usuarioActual].saldo <=990) {
      usuario[usuarioActual].saldo += cantidad;
      document.getElementById("cantidad").value = "";
    } else {
      Swal.fire(
        'Información',
        'El cupo maximo en su cuenta es de $990.',
        'info'
      );
  }
  } else if (opcion === 'retirar'){
    if (usuario[usuarioActual].saldo - cantidad >= 10){
      usuario[usuarioActual].saldo -= cantidad;
      document.getElementById("cantidad").value = "";
    } else {
      Swal.fire(
        'Información',
        'Debe tener al menos un saldo de $10',
        'info'
      );
  }
  } 
  actualizarSaldoEnPantalla();
  ocultarVentanaEmergente();
  
}

function volverInicio() {
  document.getElementById("usuario").style.display = "block";
  document.getElementById("password").style.display = "block";
  document.getElementById("volver").style.display = "none";
  document.getElementById("borrar").disabled = false;
}

function cancelar() {
  ocultarVentanaEmergente();
}

function actualizarSaldoEnPantalla() {
  document.getElementById("saldo").textContent = `El saldo de su cuenta es $: ${usuario[usuarioActual].saldo}.00`;
}

function ocultarVentanaEmergente() {
  document.getElementById("ventanaEmergente").style.display = "none";
  document.getElementById("menuOpciones").style.display = "block";
  document.getElementById("volver").style.display = "block";
}



