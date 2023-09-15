document.addEventListener('DOMContentLoaded', function () {
  const botonesEditar = document.querySelectorAll('.editar-btn-1');

  botonesEditar.forEach((boton) => {
    boton.addEventListener('click', function () {
      const fila = this.closest('.fila'); // Encuentra la fila más cercana
      const idUsuario = fila.getAttribute('data-id');

      // Construye la URL con el ID del usuario
      const url = `/editar-empleado/${idUsuario}`;

      // Redirecciona al URL construido
      window.location.href = url;
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const botonesEliminar = document.querySelectorAll('.btn.btn-danger');

  botonesEliminar.forEach(boton => {
    boton.addEventListener('click', () => {
      const fila = boton.closest('.fila');
      const idUsuario = fila.getAttribute('data-id');

      // Redirige al usuario a la ruta adecuada con el ID del usuario
      window.location.href = `/eliminar-empleados/${idUsuario}`;
    });
  });
});