let tiempo = 25 * 60;
let intervalo;
let enDescanso = false;

function actualizarTimer() {
  const minutos = Math.floor(tiempo / 60).toString().padStart(2, '0');
  const segundos = (tiempo % 60).toString().padStart(2, '0');
  document.getElementById("timer").textContent = `${minutos}:${segundos}`;
}

function seleccionarModo(modo) {
  const contenedor = document.getElementById("reproductor-container");
  contenedor.innerHTML = ""; // Limpiamos el contenido anterior

  const iframe = document.createElement("iframe");
  iframe.width = "100%";
  iframe.height = "315";
  iframe.title = "YouTube video player";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;

  let videoURL = "";

  if (modo === "estudiar") {
    videoURL = "https://www.youtube.com/embed/VzmtIUmjkTo?autoplay=1";
  } else if (modo === "trabajar") {
    videoURL = "https://www.youtube.com/embed/KgdDQGSL0qs?autoplay=1";
  } else if (modo === "meditar") {
    videoURL = "https://www.youtube.com/embed/degKbH3z2qU?autoplay=1";
  }

  iframe.src = videoURL;
  contenedor.appendChild(iframe);
}

function cambiarMusica() {
  const musicaSeleccionada = document.getElementById("musica-selector").value;
  seleccionarModo(musicaSeleccionada);
}

function iniciarPomodoro() {
  clearInterval(intervalo);
  tiempo = 25 * 60;
  enDescanso = false;
  actualizarTimer();

  intervalo = setInterval(() => {
    tiempo--;
    actualizarTimer();

    if (tiempo <= 0) {
      clearInterval(intervalo);
      if (!enDescanso) {
        alert("¡Tiempo de descansar 5 minutos! 😌");
        tiempo = 5 * 60;
        enDescanso = true;
        iniciarDescanso();
      } else {
        alert("¡Volvé al trabajo! 💪");
        iniciarPomodoro();
      }
    }
  }, 1000);
}

function iniciarDescanso() {
  actualizarTimer();
  intervalo = setInterval(() => {
    tiempo--;
    actualizarTimer();
    if (tiempo <= 0) {
      clearInterval(intervalo);
      alert("¡Descanso terminado!");
      iniciarPomodoro();
    }
  }, 1000);
}
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').then((registration) => {
      console.log('Service Worker registrado con éxito: ', registration);
    }).catch((error) => {
      console.log('Error al registrar el Service Worker: ', error);
    });
  });
}



