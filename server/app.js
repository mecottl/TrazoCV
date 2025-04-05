const express = require('express');
const path = require('path');
const Database = require('better-sqlite3');
const config = require('./config.js');
const session = require('express-session');
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
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'register.html'));
});

// Procesar registro
app.post('/register', (req, res) => {
  console.log('Datos recibidos en /register:', req.body);
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Correo y contraseña son requeridos.' });
  }

  try {
    // Verificar si el usuario ya existe
    const checkStmt = db.prepare('SELECT * FROM credenciales WHERE email = ?');
    const user = checkStmt.get(email);
    
    if (user) {
      return res.json({ success: false, message: 'El usuario ya existe' });
    }

    // Insertar el nuevo usuario
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

// Ruta para mostrar los CV del usuario autenticado
app.get('/my-cv', (req, res) => {
  // Verifica que el usuario esté autenticado
  if (!req.session.user) {
    return res.redirect('/login');
  }
  const userEmail = req.session.user.email;
  try {
    const stmt = db.prepare('SELECT id, nombre_archivo, fecha_subida FROM cv_pdf WHERE email = ?');
    const files = stmt.all(userEmail);
    let html = '<html><head><title>Mis CV</title></head><body>';
    html += `<h1>Mis CV para el usuario: ${userEmail}</h1>`;
    if (files.length === 0) {
      html += '<p>No se han encontrado CV asociados a tu cuenta.</p>';
    } else {
      html += '<ul>';
      files.forEach(file => {
        html += `<li>${file.nombre_archivo} (${file.fecha_subida}) - <a href="/download-cv/${file.id}">Descargar</a></li>`;
      });
      html += '</ul>';
    }
    html += '<br><a href="/profile">Volver al Perfil</a>';
    html += '</body></html>';
    res.send(html);
  } catch (err) {
    console.error("Error al recuperar archivos:", err.message);
    res.status(500).send("Error al recuperar archivos.");
  }
});

const multer = require('multer');
// Configura Multer para almacenar archivos en memoria (o en disco, según lo que necesites)
const upload = multer({ storage: multer.memoryStorage() });

// Ruta para procesar la subida de CV en PDF
app.post('/upload-cv', upload.single('pdf'), (req, res) => {
  // Verifica que el usuario esté autenticado (se supone que el correo está en la sesión)
  if (!req.session.user) {
    return res.status(401).send("No autorizado. Inicia sesión primero.");
  }
  // Verifica que se haya subido un archivo
  if (!req.file) {
    return res.status(400).send("No se ha seleccionado ningún archivo.");
  }
  try {
    const userEmail = req.session.user.email;
    // Inserta el archivo en la tabla cv_pdf (asegúrate de que la tabla esté creada correctamente)
    const stmt = db.prepare('INSERT INTO cv_pdf (email, nombre_archivo, tipo_archivo, pdf) VALUES (?, ?, ?, ?)');
    stmt.run(userEmail, req.file.originalname, req.file.mimetype, req.file.buffer);
    res.send("Archivo subido y guardado correctamente.");
  } catch (err) {
    console.error("Error al insertar archivo:", err.message);
    res.status(500).send("Error al guardar el archivo en la base de datos.");
  }
});

module.exports = app;
