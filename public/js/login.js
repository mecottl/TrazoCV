const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();

// Configura body-parser para poder leer los datos de formularios
app.use(bodyParser.urlencoded({ extended: false }));

// Sirve los archivos estáticos (por ejemplo, tu archivo HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Conexión a la base de datos SQLite (se crea el archivo si no existe)
const db = new sqlite3.Database(
  path.join(__dirname, '..','db', 'trazocv.db'),
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err.message);
    } else {
      console.log('Conectado a la base de datos SQLite.');
    }
  }
);

// Ruta para mostrar el formulario de inicio de sesión
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'login.html'));
});

// Ruta para procesar el inicio de sesión
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // NOTA: En un entorno real, las contraseñas deben estar hasheadas.
  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
  db.get(query, [email, password], (err, row) => {
    if (err) {
      console.error('Error en la consulta:', err.message);
      return res.status(500).send(`
        <script>
          alert("Error en la base de datos");
          window.location.href = "/login";
        </script>
      `);
    }
    if (row) {
      res.send(`
        <script>
          alert("Inicio de sesión exitoso");
          window.location.href = "/";
        </script>
      `);
    } else {
      res.send(`
        <script>
          alert("Usuario o contraseña incorrectos");
          window.location.href = "/login";
        </script>
      `);
    }
  });
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
