const express = require('express');
const path = require('path');
const Database = require('better-sqlite3');
const config = require('./config.js');
const session = require('express-session');
const multer = require('multer');
const obtenerRespuestaGemini = require('./geminiClient');
const exportarHtmlAPdf = require('./exportarPdf'); // ✅ CORRECTO

const app = express();
app.set('port', config.app.port);

// Configuración de sesiones
app.use(session({
  secret: 'tu_clave_secreta',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

// Rutas públicas
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'register.html'));
});

app.get('/uploaded-files', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'uploaded_files.html'));
});

// Registro
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: 'Correo y contraseña son requeridos.' });

  try {
    const checkStmt = db.prepare('SELECT * FROM credenciales WHERE email = ?');
    if (checkStmt.get(email)) return res.json({ success: false, message: 'El usuario ya existe' });

    const insertStmt = db.prepare('INSERT INTO credenciales (email, password) VALUES (?, ?)');
    const result = insertStmt.run(email, password);
    return res.json({ success: result.changes > 0, message: result.changes > 0 ? 'Registro exitoso' : 'Error al registrar el usuario' });
  } catch (err) {
    console.error('Error al registrar:', err.message);
    return res.status(500).json({ success: false, message: 'Error en la base de datos' });
  }
});

// Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  try {
    const stmt = db.prepare('SELECT * FROM credenciales WHERE email = ? AND password = ?');
    const user = stmt.get(email, password);
    if (user) {
      req.session.user = { email: user.email };
      return res.json({ success: true, redirect: '/perfil' });
    } else {
      return res.json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }
  } catch (err) {
    console.error('Error en la consulta:', err.message);
    return res.status(500).json({ success: false, message: 'Error en la base de datos' });
  }
});

// Cerrar sesión
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      return res.status(500).send("Error al cerrar sesión");
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

<<<<<<< HEAD
// Subir CV
=======
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
app.delete('/delete-cv/:id', (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("No autorizado. Inicia sesión primero.");
  }
  const id = req.params.id;
  try {
    const stmt = db.prepare('DELETE FROM cv_pdf WHERE id = ?');
    const result = stmt.run(id);
    if (result.changes > 0) {
      res.sendStatus(200);
    } else {
      res.status(404).send("Archivo no encontrado.");
    }
  } catch (err) {
    console.error("Error al eliminar el archivo:", err.message);
    res.status(500).send("Error al eliminar el archivo.");
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
>>>>>>> 23818909841fd3a4b1ec9a5edda5d432654ad7e6
const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload-cv', upload.single('pdf'), (req, res) => {
  if (!req.session.user) return res.status(401).send("No autorizado. Inicia sesión primero.");
  if (!req.file) return res.status(400).send("No se ha seleccionado ningún archivo.");

  try {
    const stmt = db.prepare('INSERT INTO cv_pdf (email, nombre_archivo, tipo_archivo, pdf) VALUES (?, ?, ?, ?)');
    stmt.run(req.session.user.email, req.file.originalname, req.file.mimetype, req.file.buffer);
    res.send("Archivo subido y guardado correctamente.");
  } catch (err) {
    console.error("Error al insertar archivo:", err.message);
    res.status(500).send("Error al guardar el archivo en la base de datos.");
  }
});

// Descargar CV
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

// Obtener CVs del usuario
app.get('/my-cv', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  const email = req.session.user.email;

  try {
    const stmt = db.prepare('SELECT id, nombre_archivo, fecha_subida FROM cv_pdf WHERE email = ?');
    const files = stmt.all(email);

    let html = '<html><head><title>Mis CV</title></head><body>';
    html += `<h1>Mis CV para el usuario: ${email}</h1>`;
    html += files.length === 0
      ? '<p>No se han encontrado CV asociados a tu cuenta.</p>'
      : `<ul>${files.map(file => `<li>${file.nombre_archivo} (${file.fecha_subida}) - <a href="/download-cv/${file.id}">Descargar</a></li>`).join('')}</ul>`;
    html += '<br><a href="/profile">Volver al Perfil</a></body></html>';

    res.send(html);
  } catch (err) {
    console.error("Error al recuperar archivos:", err.message);
    res.status(500).send("Error al recuperar archivos.");
  }
});

// API para obtener archivos
app.get('/api/uploaded_files', (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: 'No autorizado' });
  try {
    const stmt = db.prepare('SELECT id, nombre_archivo, fecha_subida FROM cv_pdf WHERE email = ?');
    const files = stmt.all(req.session.user.email);
    res.json(files);
  } catch (err) {
    console.error("Error al recuperar archivos:", err.message);
    res.status(500).json({ error: "Error al recuperar archivos." });
  }
});

// API para obtener email del usuario autenticado
app.get('/api/user', (req, res) => {
  if (req.session && req.session.user) {
    res.json({ email: req.session.user.email });
  } else {
    res.status(401).json({ error: 'No autenticado' });
  }
});

// Generar contenido con Gemini
app.post('/generar-cv', async (req, res) => {
  const { resumenCV } = req.body;
  if (!resumenCV) return res.status(400).json({ error: 'Falta el resumenCV' });

  try {
    const prompt = `Genera un currículum profesional con base en el siguiente resumen del usuario:\n\n${resumenCV}`;
    const resultado = await obtenerRespuestaGemini(prompt);
    res.json({ cv: resultado });
  } catch (err) {
    console.error("Error al generar el CV con Gemini:", err.message);
    res.status(500).json({ error: 'Error al generar el CV con Gemini' });
  }
});

// Generar y descargar PDF desde HTML
app.post('/descargar-pdf', async (req, res) => {
  const html = req.body.html;
  if (!html) return res.status(400).json({ error: 'No se recibió el HTML' });

  try {
    const buffer = await exportarHtmlAPdf(html);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="CV_Generado.pdf"',
      'Content-Length': buffer.length
    });

    res.send(buffer);
  } catch (err) {
    console.error('Error al generar el PDF:', err);
    res.status(500).send('Error al generar el PDF');
  }
});

app.post('/exportar-pdf', async (req, res) => {
  const { html } = req.body;
  if (!html) {
    console.log('⚠️ No se recibió HTML');
    return res.status(400).send('No se recibió contenido HTML');
  }

  console.log('✅ HTML recibido para exportar:', html.substring(0, 100)); // log parcial

  try {
    const pdfBuffer = await exportarHtmlAPdf(html);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=CV_Generado.pdf',
      'Content-Length': pdfBuffer.length
    });
    res.send(pdfBuffer);
  } catch (err) {
    console.error("❌ Error generando el PDF:", err);
    res.status(500).send("Error generando el PDF");
  }
});
module.exports = app;
