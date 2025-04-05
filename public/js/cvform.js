function safeValue(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

export function getBasicCVSummary() {
  const nombre = safeValue('nombre');
  const apellido = safeValue('apellido');
  const edad = safeValue('edad');
  const telefono = safeValue('telefono');
  const correo = safeValue('correo');
  const ciudad = safeValue('ciudad');
  const pais = safeValue('pais');
  const perfil = safeValue('perfil');
  const formacion = safeValue('formacion');
  const experiencia = safeValue('experiencia');
  const habilidades = safeValue('habilidades');

  const resumenCV = `
    Nombre: ${nombre} ${apellido}, Edad: ${edad}.
    Teléfono: ${telefono}, Correo: ${correo}, Ciudad: ${ciudad}, País: ${pais}.
    Perfil: ${perfil}.
    Formación: ${formacion}.
    Experiencia: ${experiencia}.
    Habilidades: ${habilidades}.
  `;
  return { resumenCV };
}

export function getIntermediateCVSummary() {
  const nombre = safeValue('nombre');
  const apellido = safeValue('apellido');
  const edad = safeValue('edad');
  const telefono = safeValue('telefono');
  const correo = safeValue('correo');
  const ciudad = safeValue('ciudad');
  const pais = safeValue('pais');
  const perfilProfesional = safeValue('perfilProfesional');
  const formacion = safeValue('formacion');
  const experiencia = safeValue('experiencia');
  const habilidades = safeValue('habilidades');
  const idiomas = safeValue('idiomas');
  const certificaciones = safeValue('certificaciones');
  const proyectos = safeValue('proyectos');

  const resumenCV = `
    Nombre: ${nombre} ${apellido}, Edad: ${edad}.
    Teléfono: ${telefono}, Correo: ${correo}, Ciudad: ${ciudad}, País: ${pais}.
    Perfil Profesional: ${perfilProfesional}.
    Formación: ${formacion}.
    Experiencia: ${experiencia}.
    Habilidades: ${habilidades}.
    Idiomas: ${idiomas}.
    Certificaciones: ${certificaciones}.
    Proyectos: ${proyectos}.
  `;
  return { resumenCV };
}

export function getAdvancedCVSummary() {
  const nombre = safeValue('nombre');
  const apellido = safeValue('apellido');
  const edad = safeValue('edad');
  const profesion = safeValue('tituloProfesional');
  const telefono = safeValue('telefono');
  const correo = safeValue('correo');
  const ciudad = safeValue('ciudad');
  const pais = safeValue('pais');
  const linkedin = safeValue('linkedin');
  const portafolio = safeValue('portafolio');
  const resumen = safeValue('resumen');
  const experiencia = safeValue('experiencia');
  const formacion = safeValue('formacion');
  const habilidades = safeValue('habilidades');
  const idiomas = safeValue('idiomas');
  const publicaciones = safeValue('publicaciones');
  const portafolioAdicional = safeValue('portafolioAdicional');

  const resumenCV = `
    Nombre: ${nombre} ${apellido}, Edad: ${edad}, Profesión: ${profesion}.
    Teléfono: ${telefono}, Correo: ${correo}.
    Ciudad: ${ciudad}, País: ${pais}.
    LinkedIn: ${linkedin}, Portafolio: ${portafolio}.
    Resumen: ${resumen}.
    Experiencia: ${experiencia}.
    Formación: ${formacion}.
    Habilidades: ${habilidades}.
    Idiomas: ${idiomas}.
    Publicaciones: ${publicaciones}.
    Enlaces adicionales: ${portafolioAdicional}.
  `;
  return { resumenCV };
}
