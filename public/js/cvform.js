document.addEventListener('DOMContentLoaded', () => {
  const cvForm = document.getElementById('cvForm');

  // Array para almacenar las entradas del CV
  let cvEntries = [];

  // Cargar entradas almacenadas en localStorage (si existen)
  const storedEntries = localStorage.getItem('cvEntries');
  if (storedEntries) {
    cvEntries = JSON.parse(storedEntries);
  }

  cvForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Capturar los valores de cada campo y eliminamos espacios extra
    const nombre = document.getElementById('nombre').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const cp = document.getElementById('cp').value.trim();
    const localidad = document.getElementById('localidad').value.trim();
    const experiencia = document.getElementById('experiencia').value.trim();
    const educacion = document.getElementById('educacion').value.trim();

    // Crear un objeto con la información del CV
    const cvData = {
      nombre,
      apellidos,
      email,
      telefono,
      direccion,
      experiencia,
      educacion
    };

    // Agregar el objeto al array de entradas
    cvEntries.push(cvData);

    // Guardar el array actualizado en localStorage
    localStorage.setItem('cvEntries', JSON.stringify(cvEntries));

    // Limpiar el formulario
    cvForm.reset();

    // Notificar al usuario y mostrar en consola la entrada guardada
    alert("CV guardado exitosamente");
    console.log("Entradas de CV:", cvEntries);
  });
});
