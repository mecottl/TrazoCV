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
Crea un CV visualmente atractivo en formato HTML moderno, sin comentarios ni bloques de código.
Utiliza etiquetas HTML como <div>, <h2>, <p>, <ul>, etc. 
Debe contener estas secciones:

- Datos personales
- Perfil profesional
- Experiencia
- Educación
- Habilidades
- Idiomas (si aplica)

No incluyas etiquetas <html>, <head> ni <body>. No uses markdown ni bloques de código. Solo devuelve el contenido HTML del CV listo para insertar en el DOM.

Datos del usuario:
${resumenCV}
`;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form[id^="cv"]');
  const contenedor = document.getElementById('contenedorCV');
  const exportarBtn = document.getElementById('exportarPDF');

  if (!form) return;

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

      // 🔥 Limpieza por seguridad en caso de que la IA aún agregue ```html o comentarios
      htmlGenerado = htmlGenerado
        .replace(/^```html\s*/i, '')
        .replace(/```$/i, '')
        .replace(/<!--[\s\S]*?-->/g, '')
        .trim();

      if (!htmlGenerado) return alert("La IA no devolvió un contenido HTML válido.");

      contenedor.innerHTML = htmlGenerado;

      if (exportarBtn) {
        exportarBtn.style.display = 'inline-block';
        exportarBtn.onclick = () => {
          const { jsPDF } = window.jspdf;
          const doc = new jsPDF();
          doc.html(contenedor, {
            callback: (doc) => doc.save(`CV_Generado.pdf`),
            x: 10,
            y: 10
          });
        };
      }
    } catch (err) {
      console.error("❌ Error procesando el CV:", err);
      alert("Ocurrió un error al generar el CV.");
    }
  });
});
