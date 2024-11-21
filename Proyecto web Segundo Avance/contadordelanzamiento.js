// Obtener el contador y el botón
let contador = 0;
const contadorElemento = document.getElementById('contador');

// Función para incrementar el contador
function incrementarContador() {
  contador++;
  contadorElemento.textContent = contador; // Actualizar el texto del contador
}
