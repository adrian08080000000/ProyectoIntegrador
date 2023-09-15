d document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.getElementById('miFormulario');
  const botonEditar = document.getElementById('confirmar');

  botonEditar.addEventListener('click', function () {
    // Muestra la alerta de SweetAlert para confirmar la acción
    Swal.fire({
      title: '¿Confirmar acción?',
      text: '¿Estás seguro de que deseas realizar esta acción?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma la acción, valida los campos
        if (!formularioHasCamposVacios(formulario)) {
          // Si no hay campos vacíos, envía el formulario
          formulario.submit();
        } else {
          mostrarAlertaCamposVacios();
        }
      }
    });
  });

  function formularioHasCamposVacios(formulario) {
    let camposVacios = false;
    const campos = formulario.querySelectorAll('input[required]');

    campos.forEach((campo) => {
      if (campo.value.trim() === '') {
        camposVacios = true;
      }
    });

    return camposVacios;
  }

  function mostrarAlertaCamposVacios() {
    Swal.fire({
      title: 'Campos vacíos',
      text: 'Por favor, completa todos los campos obligatorios.',
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }
});