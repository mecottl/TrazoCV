import { getBasicCVSummary, getIntermediateCVSummary, getAdvancedCVSummary } from '/js/cvform.js';
import { generarCV } from '/js/plantillaVisual.js';

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
  const form = document.querySelector('form[id^="cv"]');

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const resumen = getCVSummary();

      if (resumen && resumen.resumenCV) {
        try {
          const response = await fetch('/generar-cv', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              resumenCV: `Usa los siguientes datos para generar un CV profesional con este formato exacto:

window.nombre = "...";
window.profesion = "...";
window.resumen = "...";
window.experiencia = "...";
window.educacion = "...";
window.habilidades = "...";

DATOS DEL USUARIO: ${resumen.resumenCV}

Quiero que devuelvas únicamente un bloque de código JavaScript, sin comentarios ni explicaciones, que asigne los valores usando el objeto global window como se muestra arriba.`
            })
          });

          const data = await response.json();

          if (data.cv) {
            let codigoLimpio = data.cv.trim();
            codigoLimpio = codigoLimpio.replace(/^```[\s\S]*?\n/, "");
            codigoLimpio = codigoLimpio.replace(/```$/, "").trim();

            eval(codigoLimpio); // Define window.nombre, etc.

            if (window.nombre && window.profesion && window.resumen) {
              const contenedorCV = document.getElementById('contenedorCV');
              if (contenedorCV) {
                const formData = {
                  nombre: window.nombre,
                  profesion: window.profesion,
                  resumen: window.resumen,
                  experiencia: window.experiencia,
                  educacion: window.educacion,
                  habilidades: window.habilidades,
                };
                contenedorCV.innerHTML = ''; // limpia antes
                contenedorCV.appendChild(generarCV(formData));
              }
            } else {
              alert("⚠️ No se pudieron extraer correctamente los datos desde el código generado.");
            }
          }
        } catch (error) {
          console.error("❌ Error al contactar al backend:", error);
          alert("Error al generar el CV. Revisa la consola.");
        }
      } else {
        alert("❗ No se pudo generar el resumen del CV.");
      }
    });
  }
});
