const express = require('express');
const path = require('path');
const Database = require('better-sqlite3');
const config = require('./config');

const app = express();

app.set('port', config.app.port);

// Middleware para parsear JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '..', 'public')));

// Conexión a la base de datos SQLite
let db;
try {
  db = new Database(
    path.join(__dirname, '..', 'db', 'trazocv.db'),
    { readonly: false }
  );
  console.log('Conectado a la base de datos SQLite.');
} catch (err) {
  console.error('Error al conectar a la base de datos:', err.message);
  process.exit(1);
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
      return res.json({
        success: true,
        message: 'Inicio de sesión exitoso'
      });
    } else {
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

// ---- Nuevas rutas para el registro ----

// Ruta para mostrar el formulario de registro
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'register.html'));
});

// Ruta para procesar el registro
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Correo y contraseña son requeridos.'
    });
  }

  try {
    // Verificar si el usuario ya existe
    const checkStmt = db.prepare(`SELECT * FROM credenciales WHERE email = ?`);
    const user = checkStmt.get(email);
    
    if (user) {
      return res.json({
        success: false,
        message: 'El usuario ya existe'
      });
    }

    // Insertar el nuevo usuario
    const insertStmt = db.prepare(`INSERT INTO credenciales (email, password) VALUES (?, ?)`);
    const result = insertStmt.run(email, password);

    if (result.changes > 0) {
      return res.json({
        success: true,
        message: 'Registro exitoso'
      });
    } else {
      return res.json({
        success: false,
        message: 'Error al registrar el usuario'
      });
    }
  } catch (err) {
    console.error('Error al registrar:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Error en la base de datos'
    });
  }
});

module.exports = app;
