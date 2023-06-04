document.addEventListener('DOMContentLoaded', function() {
    // Obtener la referencia al elemento de animación
    var loadElement = document.querySelector('.load');
  
    // Añadir una clase CSS al elemento de animación para mostrarlo
    loadElement.classList.add('ativo');
  
    // Establecer un temporizador para ocultar la animación después de cierto tiempo (en milisegundos)
    setTimeout(function() {
      loadElement.classList.remove('ativo');
    }, 3000); // Cambia 3000 por la duración deseada en milisegundos (por ejemplo, 2000 para 2 segundos)
  });
  