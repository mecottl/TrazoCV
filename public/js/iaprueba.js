import { marked } from 'https://cdn.jsdelivr.net/npm/marked@4.3.0/lib/marked.esm.js';
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
  
    // Convertir el HTML generado a Markdown usando Turndown
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(contenidoHTMLGenerado);
  
    // Convertir el Markdown a HTML usando marked.parse
    const htmlFromMarkdown = marked.parse(markdown);
  
    // Configurar jsPDF en formato carta
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'letter');
  
    const margin = 10;
    const availableWidth = doc.internal.pageSize.getWidth() - 2 * margin;
  
    // Crear un contenedor "wrapper" para forzar el ancho fijo y que se respeten los márgenes
    const wrapper = document.createElement('div');
    wrapper.style.boxSizing = 'border-box';
    wrapper.style.width = availableWidth + 'px';
    // Puedes agregar overflow-wrap para que las palabras largas se dividan
    wrapper.style.overflowWrap = 'break-word';
    // Opcional: ajustar el estilo general del texto (tamaños, fuentes, etc.)
    wrapper.innerHTML = htmlFromMarkdown;
    document.body.appendChild(wrapper);
  
    // Renderizar el contenido del contenedor a PDF
    doc.html(wrapper, {
      callback: function (doc) {
        document.body.removeChild(wrapper);
        doc.save('CV_Generado.pdf');
      },
      x: margin,
      y: margin,
      width: availableWidth,
      autoPaging: 'text',
      html2canvas: {
        scale: 0.3,
        windowWidth: availableWidth
      }
    });
  });
  
});
