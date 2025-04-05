export function generarCVEstiloBasico(formData) {
    const cv = document.createElement('div');
    cv.classList.add('cv-container');
    cv.style.fontFamily = 'Segoe UI, sans-serif';
    cv.style.padding = '30px';
    cv.style.backgroundColor = '#fff';
    cv.style.border = '1px solid #ddd';
    cv.style.borderRadius = '10px';
    cv.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    cv.style.maxWidth = '800px';
    cv.style.margin = '40px auto';
  
    function crearSeccion(titulo, contenido) {
      const section = document.createElement('div');
      section.style.marginBottom = '20px';
  
      const h2 = document.createElement('h2');
      h2.textContent = titulo;
      h2.style.fontSize = '16px';
      h2.style.marginBottom = '10px';
      section.appendChild(h2);
  
      const p = document.createElement('p');
      p.textContent = contenido;
      p.style.margin = '0';
      section.appendChild(p);
  
      return section;
    }
  
    // Secciones para CV Básico
    cv.appendChild(crearSeccion('👤 Datos Personales', `${formData.nombre} ${formData.apellido}, ${formData.edad} años`));
    cv.appendChild(crearSeccion('📞 Contacto', `Tel: ${formData.telefono} | Email: ${formData.correo}`));
    if (formData.ciudad || formData.pais) {
      cv.appendChild(crearSeccion('🌍 Ubicación', `${formData.ciudad || ''}, ${formData.pais || ''}`));
    }
    cv.appendChild(crearSeccion('🧠 Perfil Profesional', formData.resumen));
    cv.appendChild(crearSeccion('🎓 Formación Académica', formData.educacion));
    cv.appendChild(crearSeccion('💼 Experiencia Laboral', formData.experiencia));
    cv.appendChild(crearSeccion('🛠 Habilidades', formData.habilidades));
  
    return cv;
  }
  