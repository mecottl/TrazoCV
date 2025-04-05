export function generarCVIntermedio(formData) {
    const cvContainer = document.createElement('div');
    cvContainer.classList.add('cv-container');
    cvContainer.style.fontFamily = 'Arial, sans-serif';
    cvContainer.style.fontSize = '12px';
    cvContainer.style.padding = '20px';
    cvContainer.style.border = '1px solid #ccc';
    cvContainer.style.maxWidth = '800px';
    cvContainer.style.margin = '0 auto';
  
    function crearSeccion(titulo) {
      const seccion = document.createElement('div');
      seccion.classList.add('cv-section');
      seccion.style.marginBottom = '15px';
      const tituloElemento = document.createElement('h2');
      tituloElemento.textContent = titulo;
      tituloElemento.style.fontSize = '16px';
      tituloElemento.style.borderBottom = '2px solid #eee';
      tituloElemento.style.paddingBottom = '5px';
      tituloElemento.style.marginBottom = '10px';
      seccion.appendChild(tituloElemento);
      return seccion;
    }
  
    function agregarInfo(seccion, etiqueta, valor) {
      if (valor) {
        const infoElemento = document.createElement('p');
        infoElemento.innerHTML = `<strong>${etiqueta}:</strong> ${valor}`;
        seccion.appendChild(infoElemento);
      }
    }
  
    agregarInfo(crearSeccion('Datos Personales'), 'Nombre', formData.Nombre);
    agregarInfo(crearSeccion('Datos Personales'), 'Apellido', formData.Apellido);
    agregarInfo(crearSeccion('Datos Personales'), 'Teléfono', formData.Teléfono);
    agregarInfo(crearSeccion('Datos Personales'), 'Correo electrónico', formData['Correo electrónico']);
    cvContainer.appendChild(crearSeccion('Datos Personales'));
  
    if (formData['Perfil profesional (3-4 líneas)']) {
      const perfilSeccion = crearSeccion('Perfil Profesional');
      perfilSeccion.appendChild(document.createTextNode(formData['Perfil profesional (3-4 líneas)']));
      cvContainer.appendChild(perfilSeccion);
    }
  
    if (formData['Formación académica']) {
      const s = crearSeccion('Formación Académica');
      formData['Formación académica'].split('\n').forEach(i => s.appendChild(document.createTextNode(i)));
      cvContainer.appendChild(s);
    }
  
    if (formData['Experiencia laboral']) {
      const s = crearSeccion('Experiencia Laboral');
      formData['Experiencia laboral'].split('\n').forEach(i => s.appendChild(document.createTextNode(i)));
      cvContainer.appendChild(s);
    }
  
    if (formData['Habilidades (técnicas y blandas)']) {
      const s = crearSeccion('Habilidades');
      s.appendChild(document.createTextNode(formData['Habilidades (técnicas y blandas)']));
      cvContainer.appendChild(s);
    }
  
    if (formData.Idiomas) {
      const s = crearSeccion('Idiomas');
      s.appendChild(document.createTextNode(formData.Idiomas));
      cvContainer.appendChild(s);
    }
  
    if (formData['Certificaciones / Cursos']) {
      const s = crearSeccion('Certificaciones / Cursos');
      formData['Certificaciones / Cursos'].split('\n').forEach(i => s.appendChild(document.createTextNode(i)));
      cvContainer.appendChild(s);
    }
  
    if (formData['Proyectos personales / Freelance / Voluntariado']) {
      const s = crearSeccion('Proyectos / Actividades Adicionales');
      formData['Proyectos personales / Freelance / Voluntariado'].split('\n').forEach(i => s.appendChild(document.createTextNode(i)));
      cvContainer.appendChild(s);
    }
  
    return cvContainer;
  }
  