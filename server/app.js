const express = require('express');
const path = require('path');
const Database = require('better-sqlite3');
const config = require('./config.js');
const session = require('express-session');
const multer = require('multer');

const app = express();

app.set('port', config.app.port);

// Configuración de sesiones
app.use(session({
  secret: 'tu_clave_secreta', // Reemplaza por una clave segura
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Cámbialo a true si usas HTTPS
}));

// Middleware para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '..', 'public')));

// Conexión a la base de datos SQLite
let db;
try {
  db = new Database(path.join(__dirname, '..', 'db', 'trazocv.db'), { readonly: false });
  console.log('Conectado a la base de datos SQLite.');
} catch (err) {
  console.error('Error al conectar a la base de datos:', err.message);
  process.exit(1);
}

// Configuración de multer para subir archivos (almacenamiento en memoria)
const upload = multer({ storage: multer.memoryStorage() });

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'login.html'));
});

// Procesar login y almacenar el email en la sesión
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  try {
    const stmt = db.prepare('SELECT * FROM credenciales WHERE email = ? AND password = ?');
    const user = stmt.get(email, password);
    if (user) {
      req.session.user = { email: user.email };
      // Si el login es correcto, devolvemos en el JSON la URL de redirección (por ejemplo, a /profile)
      return res.json({ success: true, message: 'Inicio de sesión exitoso', redirect: '/perfil' });
    } else {
      return res.json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }
  } catch (err) {
    console.error('Error en la consulta:', err.message);
    return res.status(500).json({ success: false, message: 'Error en la base de datos' });
  }
});
// Mostrar formulario de registro
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'register.html'));
});

// Procesar registro
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Correo y contraseña son requeridos.' });
  }
  try {
    const checkStmt = db.prepare('SELECT * FROM credenciales WHERE email = ?');
    const user = checkStmt.get(email);
    if (user) {
      return res.json({ success: false, message: 'El usuario ya existe' });
    }
    const insertStmt = db.prepare('INSERT INTO credenciales (email, password) VALUES (?, ?)');
    const result = insertStmt.run(email, password);
    if (result.changes > 0) {
      return res.json({ success: true, message: 'Registro exitoso' });
    } else {
      return res.json({ success: false, message: 'Error al registrar el usuario' });
    }
  } catch (err) {
    console.error('Error al registrar:', err.message);
    return res.status(500).json({ success: false, message: 'Error en la base de datos' });
  }
});

/* ---------------------------
   Rutas para manejo de PDF
--------------------------- */
// Subir CV en PDF (se extrae el email de la sesión)
app.post('/upload-cv', upload.single('pdf'), (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("No autorizado. Inicia sesión primero.");
  }
  if (!req.file) {
    return res.status(400).send("No se ha seleccionado ningún archivo.");
  }
  try {
    const userEmail = req.session.user.email;
    const stmt = db.prepare('INSERT INTO cv_pdf (email, nombre_archivo, tipo_archivo, pdf) VALUES (?, ?, ?, ?)');
    stmt.run(userEmail, req.file.originalname, req.file.mimetype, req.file.buffer);
    res.send("Archivo subido y guardado correctamente.");
  } catch (err) {
    console.error("Error al insertar archivo:", err.message);
    res.status(500).send("Error al guardar el archivo en la base de datos.");
  }
});

// Listar archivos subidos asociados al usuario autenticado
app.get('/uploaded-files', (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("No autorizado. Inicia sesión primero.");
  }
  const userEmail = req.session.user.email;
  try {
    const stmt = db.prepare('SELECT id, nombre_archivo, fecha_subida FROM cv_pdf WHERE email = ?');
    const files = stmt.all(userEmail);
    let html = '<html><head><title>Archivos Subidos</title></head><body>';
    html += `<h1>Archivos de ${userEmail}</h1><ul>`;
    for (const file of files) {
      html += `<li>${file.nombre_archivo} - ${file.fecha_subida} - <a href="/download-cv/${file.id}">Descargar</a></li>`;
    }
    html += '</ul><a href="/profile">Volver al Perfil</a></body></html>';
    res.send(html);
  } catch (err) {
    console.error("Error al recuperar archivos:", err.message);
    res.status(500).send("Error al recuperar archivos.");
  }
});

// Descargar un archivo PDF dado su ID
app.get('/download-cv/:id', (req, res) => {
  const id = req.params.id;
  try {
    const stmt = db.prepare('SELECT nombre_archivo, tipo_archivo, pdf FROM cv_pdf WHERE id = ?');
    const file = stmt.get(id);
    if (file) {
      res.setHeader('Content-Type', file.tipo_archivo);
      res.setHeader('Content-Disposition', `attachment; filename="${file.nombre_archivo}"`);
      res.send(file.pdf);
    } else {
      res.status(404).send("Archivo no encontrado.");
    }
  } catch (err) {
    console.error("Error al descargar el archivo:", err.message);
    res.status(500).send("Error al descargar el archivo.");
  }
});

/* ---------------------------
   Rutas para Perfil y Selección de CV
--------------------------- */
app.get('/perfil', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'perfil.html'));
});

app.get('/cv', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'choose_cv.html'));
});

module.exports = app;
