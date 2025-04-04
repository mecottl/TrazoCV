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

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
