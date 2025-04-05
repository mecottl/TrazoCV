export function generarCV(formData) {
    const cvContainer = document.createElement('div');
    cvContainer.classList.add('cv-container');
    cvContainer.style.fontFamily = 'Arial, sans-serif';
    cvContainer.style.fontSize = '12px';
    cvContainer.style.padding = '20px';
    cvContainer.style.border = '1px solid #ccc';
    cvContainer.style.maxWidth = '800px';
    cvContainer.style.margin = '20px auto';
  
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
  
    const datosPersonalesSeccion = crearSeccion('Datos Personales');
    agregarInfo(datosPersonalesSeccion, 'Nombre', formData.nombre);
    agregarInfo(datosPersonalesSeccion, 'Profesión', formData.profesion);
    agregarInfo(datosPersonalesSeccion, 'Correo', formData.correo || '');
    cvContainer.appendChild(datosPersonalesSeccion);
  
    const perfilSeccion = crearSeccion('Perfil Profesional');
    agregarInfo(perfilSeccion, '', formData.resumen);
    cvContainer.appendChild(perfilSeccion);
  
    const experienciaSeccion = crearSeccion('Experiencia');
    agregarInfo(experienciaSeccion, '', formData.experiencia);
    cvContainer.appendChild(experienciaSeccion);
  
    const educacionSeccion = crearSeccion('Formación');
    agregarInfo(educacionSeccion, '', formData.educacion);
    cvContainer.appendChild(educacionSeccion);
  
    const habilidadesSeccion = crearSeccion('Habilidades');
    agregarInfo(habilidadesSeccion, '', formData.habilidades);
    cvContainer.appendChild(habilidadesSeccion);
  
    return cvContainer;
  }
  