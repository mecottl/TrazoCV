const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const config = require('./config');

const app = express();

app.set('port', config.app.port);

// Middleware para parsear JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '..', 'public')));

// Conexión a la base de datos SQLite
const db = new sqlite3.Database(
  path.join(__dirname, '..', 'db', 'trazocv.db'),
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
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'login.html'));
});

// Ruta para procesar el inicio de sesión
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // NOTA: En un entorno real, las contraseñas deben estar hasheadas.
  const query = `SELECT * FROM credenciales WHERE email = ? AND password = ?`;
  db.get(query, [email, password], (err, row) => {
    if (err) {
      console.error('Error en la consulta:', err.message);
      return res.status(500).json({
        success: false,
        message: 'Error en la base de datos'
      });
    }
    if (row) {
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
  });
});

module.exports = app;
