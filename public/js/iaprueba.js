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

function generarPromptLibre(resumenCV, tipo) {
  return `Quiero que redactes un currículum vitae profesional, bien estructurado y completo, usando el siguiente resumen con datos del usuario. 
No utilices formato de código. Redáctalo como si lo enviaras por correo o lo fueras a imprimir en un archivo PDF profesional. 

Resumen del CV (${tipo}): 
${resumenCV}

Solo responde con el texto del CV (sin encabezados como "Aquí tienes", ni bloques de código).`;
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
      alert("No se pudo generar el resumen del CV.");
      return;
    }

    const { resumen, tipo } = datos;
    const prompt = generarPromptLibre(resumen.resumenCV, tipo);

    try {
      const response = await fetch('/generar-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumenCV: prompt })
      });

      const data = await response.json();
      const contenido = data.cv?.trim() || data.text?.trim();

      if (!contenido) {
        alert("La IA no devolvió texto válido.");
        return;
      }

      // Mostrar CV generado
      contenedor.innerHTML = '';
      const resultado = document.createElement('div');
      resultado.style.whiteSpace = 'pre-wrap';
      resultado.style.padding = '20px';
      resultado.style.fontFamily = 'Segoe UI, sans-serif';
      resultado.style.border = '1px solid #ccc';
      resultado.style.borderRadius = '8px';
      resultado.style.backgroundColor = '#fdfdfd';
      resultado.style.lineHeight = '1.6';
      resultado.innerText = contenido;
      contenedor.appendChild(resultado);

      // Mostrar botón de exportar a PDF
      if (exportarBtn) {
        exportarBtn.style.display = 'inline-block';
        exportarBtn.onclick = () => {
          const { jsPDF } = window.jspdf;
          const doc = new jsPDF();
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(12);
          doc.text(resultado.innerText, 10, 10, { maxWidth: 180 });
          doc.save(`CV_${tipo}.pdf`);
        };
      }

    } catch (err) {
      console.error("❌ Error procesando el CV:", err);
      alert("Ocurrió un error al generar el CV.");
    }
  });
});
