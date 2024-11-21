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
