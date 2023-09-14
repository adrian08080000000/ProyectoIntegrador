//cerrar sesion 
document.addEventListener('DOMContentLoaded', () => {
 
  const cerrarSesionLink = document.getElementById('cerrarSesion');

  cerrarSesionLink.addEventListener('click', (event) => {
    event.preventDefault(); // Evita que el enlace redirija inmediatamente

  
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: '¿Estás seguro de que deseas cerrar la sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
     
      if (result.isConfirmed) {
       
        window.location.href = '/logAut'; 
      }
    });
  });
});





let listElements = document.querySelectorAll('.list__button--click');

listElements.forEach(listElement => {
    listElement.addEventListener('click', () => {

        listElement.classList.toggle('arrow');

        let height = 0;
        let menu = listElement.nextElementSibling;

        if(menu.clientHeight == "0"){
            height = menu.scrollHeight;
        }

        menu.style.height = `${height}px`;
    });
});



const
 cerrarSesionButton = document.getElementById('cerrar-sesion'); // Reemplaza con el selector de tu botón de cierre de sesión

cerrarSesionButton.addEventListener('click', () => {
  console.log("a")
  // Realiza una solicitud a la ruta de cierre de sesión
  fetch('/cerrar-sesion')
    .then(() => {
      // Muestra una alerta de SweetAlert después de cerrar sesión
      Swal.fire({
        alert:true,
        icon: 'success',
        title: 'Sesión Cerrada',
        text: 'Tu sesión se ha cerrado exitosamente.',
      }).then(() => {
        // Redirige al usuario a donde desees después de cerrar sesión
        window.location.href = '/'; // Por ejemplo, puedes redirigirlo a la página de inicio
      });
    })
    .catch((error) => {
      // Maneja errores si es necesario
      console.error(error);
    });
});