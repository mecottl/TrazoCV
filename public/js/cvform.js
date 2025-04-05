// cvFormExport.js

/**
 * Extrae y genera las variables resumidas para el CV Básico a partir del formulario.
 * @returns {Object} Objeto con fullName, contacto, ubicacion y resumenCV.
 */
function getBasicCVSummary() {
  const nombre    = document.getElementById('nombre').value.trim();
  const apellido  = document.getElementById('apellido').value.trim();
  const telefono  = document.getElementById('telefono').value.trim();
  const correo    = document.getElementById('correo').value.trim();
  const ciudad    = document.getElementById('ciudad').value.trim();
  const pais      = document.getElementById('pais').value.trim();
  const perfil    = document.getElementById('perfil').value.trim();
  const formacion = document.getElementById('formacion').value.trim();
  const experiencia = document.getElementById('experiencia').value.trim();
  const habilidades = document.getElementById('habilidades').value.trim();

  const fullName  = `Mi nombre es ${nombre} ${apellido}.`;
  const contacto  = `Contacto: Tel. ${telefono} - Correo: ${correo}.`;
  const ubicacion = (ciudad || pais)
    ? `Ubicación: ${ciudad}${(ciudad && pais) ? ', ' : ''}${pais}.`
    : '';
  const resumenCV = `${fullName} ${contacto} ${ubicacion} Perfil: ${perfil} Formación: ${formacion} Experiencia: ${experiencia} Habilidades: ${habilidades}`;
  
  return { fullName, contacto, ubicacion, resumenCV };
}

/**
 * Extrae y genera las variables resumidas para el CV Intermedio a partir del formulario.
 * @returns {Object} Objeto con fullName, contacto y resumenCV.
 */
function getIntermediateCVSummary() {
  const nombre    = document.getElementById('nombre').value.trim();
  const apellido  = document.getElementById('apellido').value.trim();
  const telefono  = document.getElementById('telefono').value.trim();
  const correo    = document.getElementById('correo').value.trim();
  const perfilProfesional = document.getElementById('perfilProfesional').value.trim();
  const formacion = document.getElementById('formacion').value.trim();
  const experiencia = document.getElementById('experiencia').value.trim();
  const habilidades = document.getElementById('habilidades').value.trim();
  const idiomas = document.getElementById('idiomas').value.trim();
  const certificaciones = document.getElementById('certificaciones').value.trim();
  const proyectos = document.getElementById('proyectos').value.trim();

  const fullName = `Mi nombre es ${nombre} ${apellido}.`;
  const contacto = `Contacto: Tel. ${telefono} - Correo: ${correo}.`;
  const resumenCV = `${fullName} ${contacto} Perfil Profesional: ${perfilProfesional} Formación: ${formacion} Experiencia: ${experiencia} Habilidades: ${habilidades} Idiomas: ${idiomas} Certificaciones: ${certificaciones} Proyectos: ${proyectos}`;
  
  return { fullName, contacto, resumenCV };
}

/**
 * Extrae y genera las variables resumidas para el CV Avanzado a partir del formulario.
 * @returns {Object} Objeto con fullNameTitle, contacto y resumenCV.
 */
function getAdvancedCVSummary() {
  const nombre    = document.getElementById('nombre').value.trim();
  const apellido  = document.getElementById('apellido').value.trim();
  const tituloProfesional = document.getElementById('tituloProfesional').value.trim();
  const telefono  = document.getElementById('telefono').value.trim();
  const correo    = document.getElementById('correo').value.trim();
  const linkedin  = document.getElementById('linkedin').value.trim();
  const portafolio = document.getElementById('portafolio').value.trim();
  const resumen   = document.getElementById('resumen').value.trim();
  const experiencia = document.getElementById('experiencia').value.trim();
  const formacion = document.getElementById('formacion').value.trim();
  const habilidades = document.getElementById('habilidades').value.trim();
  const idiomas   = document.getElementById('idiomas').value.trim();
  const publicaciones = document.getElementById('publicaciones').value.trim();
  const portafolioAdicional = document.getElementById('portafolioAdicional').value.trim();

  const fullNameTitle = `Soy ${nombre} ${apellido}, ${tituloProfesional}.`;
  const contacto = `Contacto: Tel. ${telefono} - Correo: ${correo} - LinkedIn: ${linkedin} - Portafolio: ${portafolio}.`;
  const resumenCV = `${fullNameTitle} ${contacto} Resumen: ${resumen} Experiencia: ${experiencia} Formación: ${formacion} Habilidades: ${habilidades} Idiomas: ${idiomas} Publicaciones: ${publicaciones} Enlaces: ${portafolioAdicional}`;
  
  return { fullNameTitle, contacto, resumenCV };
}

module.exports = {
  getBasicCVSummary,
  getIntermediateCVSummary,
  getAdvancedCVSummary
};
