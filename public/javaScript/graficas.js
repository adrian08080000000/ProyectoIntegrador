const canvas = document.getElementById('miGrafico');

// Configura los datos para el gráfico
const data = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
  datasets: [
    {
      label: 'Ventas',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      data: [65, 59, 80, 81, 56],
    },
  ],
};

// Configura las opciones del gráfico
const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

// Crea el gráfico
const ctx = canvas.getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: data,
  options: options,
});