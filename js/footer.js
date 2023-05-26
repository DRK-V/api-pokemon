// Ajustar la altura del contenido al cargar la página y al cambiar el tamaño de la ventana
window.addEventListener('load', adjustContentHeight);
window.addEventListener('resize', adjustContentHeight);

function adjustContentHeight() {
  const content = document.querySelector('.content');
  const footer = document.querySelector('#footer');
  const footerHeight = footer.offsetHeight;
  content.style.height = `calc(100% - ${footerHeight}px)`;
}
