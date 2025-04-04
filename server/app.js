const express = require('express');
const path = require('path');
const Database = require('better-sqlite3'); // Cambiado
const config = require('./config');

const app = express();

app.set('port', config.app.port);

// Middleware para parsear JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '..', 'public')));

// Conexión a la base de datos SQLite (sin callback, se lanza error si falla)
let db;
try {
  db = new Database(
    path.join(__dirname, '..', 'db', 'trazocv.db'),
    { readonly: false } // Permite lectura y escritura
  );
  console.log('Conectado a la base de datos SQLite.');
} catch (err) {
  console.error('Error al conectar a la base de datos:', err.message);
  process.exit(1); // Finaliza la app si falla la conexión
}

// Ruta para mostrar el formulario de inicio de sesión
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'login.html'));
});

// Ruta para procesar el inicio de sesión
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  try {
    const stmt = db.prepare(`SELECT * FROM credenciales WHERE email = ? AND password = ?`);
    const user = stmt.get(email, password);

    if (user) {
      // Usuario encontrado
      return res.json({
        success: true,
        message: 'Inicio de sesión exitoso'
      });
    } else {
      // Usuario no encontrado
      return res.json({
        success: false,
        message: 'Usuario o contraseña incorrectos'
      });
    }
  } catch (err) {
    console.error('Error en la consulta:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Error en la base de datos'
    });
  }
});

module.exports = app;
