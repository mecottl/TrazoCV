import {
  getBasicCVSummary,
  getIntermediateCVSummary,
  getAdvancedCVSummary
} from '/js/cvform.js';

function getCVData() {
  if (document.getElementById('cvBasicForm')) {
    return { resumen: getBasicCVSummary(), tipo: 'básico' };
  } else if (document.getElementById('cvIntermediateForm')) {
    return { resumen: getIntermediateCVSummary(), tipo: 'intermedio' };
  } else if (document.getElementById('cvAdvancedForm')) {
    return { resumen: getAdvancedCVSummary(), tipo: 'avanzado' };
  } else {
    return null;
  }
}

function generarPromptHTML(resumenCV, tipo) {
  return `
Genera un CV en HTML moderno y profesional para un CV de tipo ${tipo}.
Usa <div>, <h2>, <p>, <ul> y <li> para estructurar secciones como:
- Datos personales
- Perfil profesional
- Experiencia
- Educación
- Habilidades
- Idiomas

Solo devuelve el bloque HTML sin etiquetas <html>, <body>, <head>, ni comentarios.
Datos del usuario: ${resumenCV}
`.trim();
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form[id^="cv"]');
  const contenedor = document.getElementById('contenedorCV');
  const exportarBtn = document.getElementById('exportarPDF');

  if (!form || !contenedor || !exportarBtn) return;

  let contenidoHTMLGenerado = '';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const datos = getCVData();
    if (!datos || !datos.resumen?.resumenCV) {
      return alert("No se pudo generar el resumen del CV.");
    }

    const { resumen, tipo } = datos;
    const prompt = generarPromptHTML(resumen.resumenCV, tipo);

    try {
      const response = await fetch('/generar-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumenCV: prompt })
      });

      const data = await response.json();
      let htmlGenerado = data.cv?.trim();

      htmlGenerado = htmlGenerado
        .replace(/^```html/, '')
        .replace(/^```/, '')
        .replace(/```$/, '')
        .trim();

      if (!htmlGenerado.startsWith('<')) {
        return alert("La IA no devolvió un bloque HTML válido.");
      }

      // Guardamos para luego exportar
      contenidoHTMLGenerado = htmlGenerado;

      // Renderizar en pantalla
      contenedor.innerHTML = '';
      const wrapper = document.createElement('div');
      wrapper.innerHTML = contenidoHTMLGenerado;
      contenedor.appendChild(wrapper);

      exportarBtn.style.display = 'inline-block';

    } catch (err) {
      console.error("❌ Error procesando el CV:", err);
      alert("Ocurrió un error al generar el CV.");
    }
  });

  exportarBtn.addEventListener('click', () => {
    if (!contenidoHTMLGenerado) return;

    // Creamos un contenedor temporal invisible
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '0';
    tempDiv.innerHTML = contenidoHTMLGenerado;
    document.body.appendChild(tempDiv);

    const opt = {
      margin: [10, 10, 10, 10],
      filename: 'CV_Generado.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf()
      .set(opt)
      .from(tempDiv)
      .save()
      .then(() => {
        document.body.removeChild(tempDiv); // limpieza
      })
      .catch((error) => {
        console.error("Error al exportar a PDF:", error);
        alert("Error al exportar el PDF.");
        document.body.removeChild(tempDiv);
      });
  });
});
