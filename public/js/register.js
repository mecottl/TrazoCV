document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Obtén y recorta los valores de los campos
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    // Validaciones básicas en el cliente
    if (!email || !password || !confirmPassword) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    // Validar formato de correo (opcional)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Ingresa un correo electrónico válido.');
      return;
    }

    try {
      // Enviar los datos al servidor mediante fetch
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      // Si la respuesta HTTP es incorrecta
      if (!response.ok) {
        alert('Ocurrió un error en el servidor.');
        return;
      }

      // Parsear la respuesta JSON
      const data = await response.json();

      if (data.success) {
        alert(data.message); // "Registro exitoso"
        // Redirige al login o a la página deseada
        window.location.href = '/login';
      } else {
        alert(data.message); // Por ejemplo, "El usuario ya existe"
        registerForm.reset();
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      alert('Ocurrió un error en la solicitud');
    }
  });
});
