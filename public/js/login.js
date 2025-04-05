document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Obtén y recorta los valores de los campos
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validaciones básicas en el cliente
    if (!email || !password) {
      alert('Debes ingresar tanto el correo como la contraseña.');
      return;
    }

    // Validación de formato de correo (opcional)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Ingresa un correo electrónico válido.');
      return;
    }

    try {
      // Enviar la petición POST al servidor
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        alert('Ocurrió un error en la base de datos');
        return;
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data);
      if (data.success) {
        alert(data.message); // "Inicio de sesión exitoso"
        // Redirige a la URL proporcionada (por ejemplo, /profile)
        window.location.href = data.redirect || '/profile';
      } else {
        alert(data.message); // "Usuario o contraseña incorrectos"
        loginForm.reset();
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      alert('Ocurrió un error en la solicitud');
    }
  });
});
