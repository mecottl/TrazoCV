import { getBasicCVSummary, getIntermediateCVSummary, getAdvancedCVSummary } from '/js/cvform.js';

function getCVSummary() {
  if (document.getElementById('cvBasicForm')) {
    return getBasicCVSummary();
  } else if (document.getElementById('cvIntermediateForm')) {
    return getIntermediateCVSummary();
  } else if (document.getElementById('cvAdvancedForm')) {
    return getAdvancedCVSummary();
  } else {
    return null;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Detecta el formulario activo
  const form = document.querySelector('form[id^="cv"]'); // busca cualquier formulario que empiece con 'cv'

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const resumen = getCVSummary(); // obtiene el resumen del CV

      if (resumen && resumen.resumenCV) {
        try {
          const response = await fetch('/generar-cv', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ resumenCV: resumen.resumenCV })
          });

          const data = await response.json();

          if (data.cv) {
            alert("✅ CV generado por la IA:\n\n" + data.cv);
            console.log(data.cv);
          } else {
            alert("⚠️ No se recibió un CV válido desde el servidor.");
          }
        } catch (error) {
          console.error("❌ Error al contactar al backend:", error);
          alert("Error al generar el CV. Revisa la consola.");
        }
      } else {
        alert("❗ No se pudo generar el resumen del CV.");
      }
    });
  } else {
    console.log("❗ No se encontró ningún formulario de CV.");
  }
});
