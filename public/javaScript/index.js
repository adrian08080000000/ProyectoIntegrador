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






