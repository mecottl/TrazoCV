export function generarCV(formData) {
  const cvContainer = document.createElement('div');
  cvContainer.classList.add('cv-container');
  cvContainer.style.fontFamily = 'Segoe UI, sans-serif';
  cvContainer.style.fontSize = '14px';
  cvContainer.style.padding = '30px';
  cvContainer.style.borderRadius = '12px';
  cvContainer.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  cvContainer.style.maxWidth = '850px';
  cvContainer.style.margin = '40px auto';
  cvContainer.style.backgroundColor = '#ffffff';
  cvContainer.style.border = '1px solid #e0e0e0';

  function crearSeccion(titulo) {
    const seccion = document.createElement('div');
    seccion.style.marginBottom = '30px';
    seccion.style.padding = '20px';
    seccion.style.backgroundColor = '#f9f9f9';
    seccion.style.borderRadius = '10px';

    const h2 = document.createElement('h2');
    h2.textContent = titulo;
    h2.style.fontSize = '18px';
    h2.style.color = '#333';
    h2.style.marginBottom = '15px';
    h2.style.borderBottom = '2px solid #ccc';
    h2.style.paddingBottom = '5px';

    seccion.appendChild(h2);
    return seccion;
  }

  function agregarInfo(seccion, etiqueta, valor) {
    if (valor && valor.trim() !== '') {
      const p = document.createElement('p');
      p.style.marginBottom = '8px';
      p.style.lineHeight = '1.6';
      p.style.color = '#444';
      p.innerHTML = etiqueta
        ? `<strong style="color:#222">${etiqueta}:</strong> ${valor}`
        : `${valor}`;
      seccion.appendChild(p);
    }
  }

  // DATOS PERSONALES
  const datos = crearSeccion('👤 Datos Personales');
  agregarInfo(datos, 'Nombre', formData.nombre);
  agregarInfo(datos, 'Profesión', formData.profesion);
  agregarInfo(datos, 'Correo', formData.correo);
  cvContainer.appendChild(datos);

  // PERFIL
  const perfil = crearSeccion('🧠 Perfil Profesional');
  agregarInfo(perfil, '', formData.resumen);
  cvContainer.appendChild(perfil);

  // EXPERIENCIA
  const experiencia = crearSeccion('💼 Experiencia Laboral');
  agregarInfo(experiencia, '', formData.experiencia);
  cvContainer.appendChild(experiencia);

  // FORMACIÓN
  const educacion = crearSeccion('🎓 Formación Académica');
  agregarInfo(educacion, '', formData.educacion);
  cvContainer.appendChild(educacion);

  // HABILIDADES
  const habilidades = crearSeccion('🛠️ Habilidades');
  agregarInfo(habilidades, '', formData.habilidades);
  cvContainer.appendChild(habilidades);

  return cvContainer;
}
