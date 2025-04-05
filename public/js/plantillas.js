export function generarCV(formData) {
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
  
    const datosPersonalesSeccion = crearSeccion('Datos Personales');
    agregarInfo(datosPersonalesSeccion, 'Nombre', formData.Nombre);
    agregarInfo(datosPersonalesSeccion, 'Apellido', formData.Apellido);
    agregarInfo(datosPersonalesSeccion, 'Edad', formData.Edad);
    agregarInfo(datosPersonalesSeccion, 'Teléfono', formData.Teléfono);
    agregarInfo(datosPersonalesSeccion, 'Correo electrónico', formData['Correo electrónico']);
    agregarInfo(datosPersonalesSeccion, 'Ciudad', formData.Ciudad);
    agregarInfo(datosPersonalesSeccion, 'País', formData.País);
    cvContainer.appendChild(datosPersonalesSeccion);
  
    if (formData['Perfil personal (2-3 líneas)']) {
      const perfilSeccion = crearSeccion('Perfil Personal');
      const perfilTexto = document.createElement('p');
      perfilTexto.textContent = formData['Perfil personal (2-3 líneas)'];
      perfilSeccion.appendChild(perfilTexto);
      cvContainer.appendChild(perfilSeccion);
    }
  
    if (formData['Formación académica']) {
      const formacionSeccion = crearSeccion('Formación Académica');
      const formacionItems = formData['Formación académica'].split('\n');
      formacionItems.forEach(item => {
        const itemElemento = document.createElement('p');
        itemElemento.textContent = item;
        formacionSeccion.appendChild(itemElemento);
      });
      cvContainer.appendChild(formacionSeccion);
    }
  
    if (formData['Experiencia laboral']) {
      const experienciaSeccion = crearSeccion('Experiencia Laboral');
      const experienciaItems = formData['Experiencia laboral'].split('\n');
      experienciaItems.forEach(item => {
        const itemElemento = document.createElement('p');
        itemElemento.textContent = item;
        experienciaSeccion.appendChild(itemElemento);
      });
      cvContainer.appendChild(experienciaSeccion);
    }
  
    if (formData['Habilidades básicas']) {
      const habilidadesSeccion = crearSeccion('Habilidades Básicas');
      const habilidadesLista = document.createElement('p');
      habilidadesLista.textContent = formData['Habilidades básicas'];
      habilidadesSeccion.appendChild(habilidadesLista);
      cvContainer.appendChild(habilidadesSeccion);
    }
  
    return cvContainer;
  }
  