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
  const form = document.querySelector('form[id^="cv"]');

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const resumen = getCVSummary();

      if (resumen && resumen.resumenCV) {
        try {
          const response = await fetch('/generar-cv', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              resumenCV: `Usa los siguientes datos para generar un CV profesional con este formato exacto:

window.nombre = "...";
window.profesion = "...";
window.resumen = "...";
window.experiencia = "...";
window.educacion = "...";
window.habilidades = "...";
window.idiomas = "...";
window.certificaciones = "...";
window.proyectos = "...";

DATOS DEL USUARIO: ${resumen.resumenCV}

Quiero que devuelvas únicamente un bloque de código JavaScript, sin comentarios ni explicaciones, que asigne los valores usando el objeto global window como se muestra arriba.`
            })
          });

          const data = await response.json();

          if (data.cv) {
            let codigoLimpio = data.cv.trim();
            codigoLimpio = codigoLimpio.replace(/^```[\s\S]*?\n/, "");
            codigoLimpio = codigoLimpio.replace(/```$/, "").trim();

            // Evalúa el código generado (asignaciones a window)
            eval(codigoLimpio);

            // Construimos el objeto con los datos
            const formData = {
              Nombre: window.nombre,
              Apellido: window.apellido || '',
              Teléfono: window.telefono || '',
              'Correo electrónico': window.correo || '',
              'Perfil personal (2-3 líneas)': window.resumen || '',
              'Perfil profesional (3-4 líneas)': window.resumen || '',
              'Formación académica': window.educacion || '',
              'Experiencia laboral': window.experiencia || '',
              'Habilidades básicas': window.habilidades || '',
              'Habilidades (técnicas y blandas)': window.habilidades || '',
              'Idiomas': window.idiomas || '',
              'Certificaciones / Cursos': window.certificaciones || '',
              'Proyectos personales / Freelance / Voluntariado': window.proyectos || ''
            };

            const contenedorCV = document.getElementById('contenedorCV');
            contenedorCV.innerHTML = ''; // Limpiar antes

            // Detectar qué plantilla usar
            if (document.getElementById('cvBasicForm')) {
              const mod = await import('/js/plantillaVisual.js');
              contenedorCV.appendChild(mod.generarCV(formData));
            } else if (document.getElementById('cvIntermediateForm')) {
              const mod = await import('/js/plantillaVisualIntermedio.js');
              contenedorCV.appendChild(mod.generarCVIntermedio(formData));
            } else {
              alert('No se encontró una plantilla compatible.');
            }

          }
        } catch (error) {
          console.error("❌ Error:", error);
          alert("Error al generar el CV. Revisa la consola.");
        }
      } else {
        alert("❗ No se pudo generar el resumen del CV.");
      }
    });
  }
});
