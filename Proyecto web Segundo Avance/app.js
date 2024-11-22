// Seleccionar los elementos del DOM.
const boton = document.querySelector('#boton-color');
const color = document.getElementById('color-actual');

// Lista de colores predefinidos (suaves).
const coloresSuaves = ['#B0E57C', '#AEDFF7', '#FFD580']; // Verde claro, azul claro, amarillo pastel.

// Función para generar un color aleatorio de la lista.
function generarColorDeLista() {
  let indiceAleatorio = Math.floor(Math.random() * coloresSuaves.length);
  return coloresSuaves[indiceAleatorio];
}

// Guardar el color actual en localStorage.
function guardarColor(color) {
  localStorage.setItem('colorFondo', color);
}

// Cargar el color desde localStorage si existe.
function cargarColorGuardado() {
  const colorGuardado = localStorage.getItem('colorFondo');
  if (colorGuardado) {
    document.body.style.backgroundColor = colorGuardado;
    color.textContent = colorGuardado;
  } else {
    document.body.style.backgroundColor = 'white'; // Fondo inicial blanco.
    color.textContent = ''; // No mostrar color al inicio.
  }
}

// Event Listener para el botón.
boton.addEventListener('click', function () {
  let colorAleatorio = generarColorDeLista();
  document.body.style.backgroundColor = colorAleatorio; // Cambiar el fondo.
  color.textContent = colorAleatorio; // Mostrar el color.
  guardarColor(colorAleatorio); // Guardar el color en localStorage.
});

// Llamar a la función para inicializar el color al cargar la página.
cargarColorGuardado();

function formatearTiempo(segundos) {
  const dias = Math.floor(segundos / (24 * 60 * 60));
  const horas = Math.floor((segundos % (24 * 60 * 60)) / (60 * 60));
  const minutos = Math.floor((segundos % (60 * 60)) / 60);
  const segundosRestantes = segundos % 60;

  return `<div>${String(dias).padStart(2, '0')}<br>Días</div><div>${String(horas).padStart(2, '0')}<br>Horas</div><div>${String(minutos).padStart(2, '0')}<br>Minutos</div><div>${String(segundosRestantes).padStart(2, '0')}<br>Segundos</div>`;
}

function actualizarDisplay(tiempo) {
  document.getElementById("tiempo").innerHTML = formatearTiempo(tiempo);
}

function calcularTiempoRestante() {
  const ahora = new Date();
  const proximoLanzamiento = new Date();

  // Establecer el próximo viernes a las 3 PM
  let diasHastaViernes = (5 - ahora.getDay() + 7) % 7 || 7; // Si hoy es viernes, sumar 7 días
  proximoLanzamiento.setDate(ahora.getDate() + diasHastaViernes);
  proximoLanzamiento.setHours(15, 0, 0, 0); // Establecer a las 3 PM

  const diferencia = proximoLanzamiento - ahora;
  return Math.floor(diferencia / 1000); // Convertir a segundos
}

function iniciarContador() {
  let tiempoRestante = calcularTiempoRestante();
  actualizarDisplay(tiempoRestante);

  setInterval(() => {
    tiempoRestante--;
    if (tiempoRestante < 0) {
      tiempoRestante = calcularTiempoRestante(); // Reiniciar el contador
    }
    actualizarDisplay(tiempoRestante);
  }, 1000);
}

// Inicializar el contador al cargar la página
window.onload = iniciarContador;
