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
Genera un CV en formato HTML moderno, estilizado y profesional para un CV de tipo ${tipo}.
Usa <div>, <h2>, <p>, <ul> y <li> para estructurar secciones como:
- Datos personales
- Perfil profesional
- Experiencia
- Educación
- Habilidades
- Idiomas
Solo devuelve el bloque HTML, sin etiquetas <html>, <body> ni comentarios.
Datos del usuario: ${resumenCV}
`.trim();
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form[id^="cv"]');
  const contenedor = document.getElementById('contenedorCV');
  const exportarBtn = document.getElementById('exportarPDF');
  let contenidoLimpio = '';

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

      htmlGenerado = htmlGenerado
        .replace(/^```html/, '')
        .replace(/^```/, '')
        .replace(/```$/, '')
        .trim();

      if (!htmlGenerado.startsWith('<')) {
        return alert("La IA no devolvió un bloque HTML válido.");
      }

      contenidoLimpio = htmlGenerado;

      // Previsualización limpia en pantalla
      contenedor.innerHTML = '';
      const wrapper = document.createElement('div');
      wrapper.id = 'cv-render';
      wrapper.innerHTML = contenidoLimpio;
      contenedor.appendChild(wrapper);

      exportarBtn.style.display = 'inline-block';

    } catch (err) {
      console.error("❌ Error procesando el CV:", err);
      alert("Ocurrió un error al generar el CV.");
    }
  });

  // 🧾 Exportar CV usando Puppeteer desde backend
  exportarBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('/exportar-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: contenidoLimpio })
      });

      if (!response.ok) throw new Error("No se pudo exportar el PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'CV_Generado.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("❌ Error exportando el PDF:", err);
      alert("No se pudo exportar el PDF.");
    }
  });
});
