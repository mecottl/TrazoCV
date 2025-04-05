const app = require('./app');
const config = require('./config');
const path = require('path');
const express = require('express');

// Usar directamente el puerto desde config
const PORT = config.app.port;
app.set('port', PORT);

// Servir archivos estáticos correctamente
app.use(express.static(path.join(__dirname, '..', 'public')));

// Rutas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'login.html'));
});

app.get('/cv', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'choose_cv.html'));
});

app.get('/pdf', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'pruebapdf.html'));
});


app.get('/perfil', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'perfil.html'));
});

  app.listen(app.get('port'), () =>
  
  
    {
    console.log(`Server listening on port ${config.app.port}`);
  });

