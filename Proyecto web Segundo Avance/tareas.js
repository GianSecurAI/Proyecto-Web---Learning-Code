// Datos de los cursos y temas iniciales
const cursosData = {
    javascript: {
      titulo: "Curso de JavaScript",
      temas: [
        "Entender qué es JavaScript y cómo funciona.",
        "Configurar el entorno de desarrollo (IDE, navegador, Node.js).",
        "Aprender sintaxis básica: variables, tipos de datos, operadores.",
        "Escribir funciones simples y entender su uso.",
        "Manipular el DOM (Document Object Model).",
        "Aprender sobre eventos y manejadores de eventos.",
        "Usar promesas y async/await para manejar asincronía.",
        "Introducción a ES6: let, const, arrow functions, template literals.",
        "Practicar con proyectos pequeños como un contador o una lista de tareas.",
      ],
    },
    python: {
      titulo: "Curso de Python",
      temas: [
        "Introducción a Python.",
        "Variables, Tipos y Operadores.",
        "Estructuras de Control de Flujo.",
        "Funciones y Manejo de Excepciones.",
        "Introducción a Librerías: NumPy, Pandas.",
      ],
    },
    flutter: {
      titulo: "Curso de Flutter",
      temas: [
        "Introducción a Flutter.",
        "Configuración del Entorno de Desarrollo.",
        "Widgets y Layouts Básicos.",
        "Gestión de Estado con Provider.",
        "Conexión con Firebase.",
      ],
    },
  };
  
  // Seleccionar elementos HTML
  const listaCursos = document.getElementById("lista-cursos");
  const cursoContenido = document.getElementById("curso-contenido");
  const cursoTitulo = document.getElementById("curso-titulo");
  const listaDeTareas = document.getElementById("lista-de-tareas");
  const botonAgregar = document.getElementById("agregar-tarea");
  const inputTarea = document.getElementById("ingresar-tarea");
  
  let cursoAbierto = null; // Variable para rastrear el curso abierto
  
  // Escuchar clics en los cursos
  listaCursos.addEventListener("click", (e) => {
    const cursoSeleccionado = e.target.closest(".curso")?.dataset.curso;
  
    if (cursoSeleccionado) {
      // Si el curso seleccionado ya está abierto, replegarlo
      if (cursoAbierto === cursoSeleccionado) {
        replegarCurso();
      } else {
        mostrarCurso(cursoSeleccionado);
      }
    }
  });
  
  // Función para mostrar el curso seleccionado
  function mostrarCurso(curso) {
    const datosCurso = cursosData[curso];
  
    // Guardar el curso actual en localStorage
    localStorage.setItem("cursoActual", curso);
  
    // Recuperar tareas guardadas o inicializar con los temas predeterminados
    const tareasGuardadas = JSON.parse(localStorage.getItem(`tareas_${curso}`)) || datosCurso.temas.map((tema) => ({ texto: tema, completado: false }));
  
    // Cerrar cualquier contenido anterior
    cursoContenido.classList.add("oculto");
  
    // Desmarcar cualquier curso activo
    document.querySelectorAll(".curso").forEach((cursoElemento) => {
      cursoElemento.classList.remove("activo");
    });
  
    // Marcar el curso seleccionado como activo
    const cursoElemento = document.querySelector(`.curso[data-curso="${curso}"]`);
    cursoElemento.classList.add("activo");
  
    if (datosCurso) {
      // Actualizar el título
      cursoTitulo.textContent = datosCurso.titulo;
  
      // Limpiar lista de tareas
      listaDeTareas.innerHTML = "";
  
      // Renderizar tareas
      tareasGuardadas.forEach((tarea) => {
        const tareaNueva = crearTareaElemento(tarea.texto, tarea.completado);
        listaDeTareas.appendChild(tareaNueva);
      });
  
      // Mostrar el contenido del curso
      cursoContenido.classList.remove("oculto");
  
      // Actualizar curso abierto
      cursoAbierto = curso;
    }
  }
  
  // Función para replegar el curso abierto
  function replegarCurso() {
    // Cerrar contenido y desmarcar curso activo
    cursoContenido.classList.add("oculto");
    document.querySelectorAll(".curso").forEach((cursoElemento) => {
      cursoElemento.classList.remove("activo");
    });
  
    // Resetear el curso abierto
    cursoAbierto = null;
  }
  
  // Función para agregar una nueva tarea
  botonAgregar.addEventListener("click", () => {
    if (inputTarea.value.trim()) {
      const nuevaTareaTexto = inputTarea.value;
      const tareaNueva = crearTareaElemento(nuevaTareaTexto, false);
      listaDeTareas.appendChild(tareaNueva);
  
      guardarTareas(); // Guardar cambios en localStorage
      inputTarea.value = ""; // Limpiar el campo
    }
  });
  
  // Función para crear un elemento de tarea
  function crearTareaElemento(texto, completado = false) {
    const tareaNueva = document.createElement("div");
    tareaNueva.classList.add("tarea");
  
    if (completado) tareaNueva.classList.add("completada");
  
    const textoElemento = document.createElement("p");
    textoElemento.textContent = texto;
  
    const iconos = document.createElement("div");
    iconos.classList.add("iconos");
  
    const completar = crearIcono("bi-check-circle-fill", "icono-completar", (e) => {
      const tarea = e.target.closest(".tarea");
      tarea.classList.toggle("completada");
      guardarTareas(); // Guardar cambios en localStorage
    });
  
    const eliminar = crearIcono("bi-trash3-fill", "icono-eliminar", (e) => {
      const tarea = e.target.closest(".tarea");
      tarea.remove();
      guardarTareas(); // Guardar cambios en localStorage
    });
  
    iconos.append(completar, eliminar);
    tareaNueva.append(textoElemento, iconos);
  
    return tareaNueva;
  }
  
  // Función para crear iconos
  function crearIcono(clase, claseAdicional, evento) {
    const icono = document.createElement("i");
    icono.classList.add("bi", clase, claseAdicional);
    icono.addEventListener("click", evento);
    return icono;
  }
  
  // Función para guardar tareas en localStorage
  function guardarTareas() {
    const cursoActual = localStorage.getItem("cursoActual");
    if (!cursoActual) return;
  
    const tareas = Array.from(listaDeTareas.children).map((tarea) => ({
      texto: tarea.querySelector("p").textContent,
      completado: tarea.classList.contains("completada"),
    }));
  
    localStorage.setItem(`tareas_${cursoActual}`, JSON.stringify(tareas));
  }
  
  // Cargar el curso actual al cargar la página
  document.addEventListener("DOMContentLoaded", () => {
    const cursoActual = localStorage.getItem("cursoActual");
    if (cursoActual) {
      mostrarCurso(cursoActual);
    }
  
    // Verificar si hay un hash en la URL y abrir el curso correspondiente
    const hash = window.location.hash.substring(1);
    if (hash && cursosData[hash]) {
      mostrarCurso(hash);
    }
  });
  