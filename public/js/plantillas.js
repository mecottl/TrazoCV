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
  
export async function generarCVEstilo3(doc, nombre, profesion, resumen, experiencia, educacion, habilidades) {
    const grisOscuro = '#333333';
    const blanco = '#FFFFFF';
    const negro = '#000000';
    const anchoPagina = doc.internal.pageSize.getWidth();
    const altoPagina = doc.internal.pageSize.getHeight();
  
    // Fondo lateral
    doc.setFillColor(grisOscuro);
    doc.rect(0, 0, 70, altoPagina, "F");
  
    // Cuadro para foto
    doc.setFillColor(blanco);
    doc.rect(15, 15, 40, 50, "F");
    doc.setTextColor(0);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("FOTO", 35, 45, { align: "center" });
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Descripción", 35, 50, { align: "center" });
  
    let y = 70;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(blanco);
    doc.text("DETALLES PERSONALES", 10, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Nombre: ${nombre}`, 10, y);
    y += 5;
    doc.text("Apellidos: Pérez García", 10, y); // si quieres, esto puede venir también del backend
  
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("CONTACTO", 10, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.text("Número: ‪+34 666 777 888‬", 10, y);
    y += 5;
    doc.text("📧 Correo: ingeniero.perez@email.com", 10, y);
    y += 5;
    doc.text("Dirección: Calle Inventada, 123, Ciudad", 10, y);
  
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("HABILIDADES", 10, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    const habilidadesList = habilidades.split(",");
    habilidadesList.forEach(habilidad => {
      doc.text("• " + habilidad.trim(), 10, y);
      y += 5;
    });
  
    // Sección derecha
    let x = 80;
    y = 20;
  
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(negro);
    doc.text(`${nombre} - ${profesion}`, x, y);
    y += 10;
  
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(negro);
    doc.text("DESCRIPCIÓN", x, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const resumenLines = doc.splitTextToSize(resumen, 110);
    doc.text(resumenLines, x, y);
    y += resumenLines.length * 6;
  
    doc.setDrawColor(grisOscuro);
    doc.setLineWidth(1);
    doc.line(x, y, 200, y);
    y += 10;
  
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(grisOscuro);
    doc.text("EXPERIENCIA", x, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const expLines = doc.splitTextToSize(experiencia, 110);
    doc.text(expLines, x, y);
    y += expLines.length * 6;
  
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("FORMACIÓN", x, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const eduLines = doc.splitTextToSize(educacion, 110);
    doc.text(eduLines, x, y);
    y += eduLines.length * 6;
  }
  