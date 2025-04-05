import { getBasicCVSummary, getIntermediateCVSummary, getAdvancedCVSummary } from '/js/cvform.js';
import { generarCV } from '/js/plantillaVisual.js'; // Asegúrate que plantillaVisual.js exporte esta función

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

  if (!form) {
    console.warn("❗ No se encontró ningún formulario de CV.");
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const resumen = getCVSummary();

    if (!resumen || !resumen.resumenCV) {
      alert("❗ No se pudo generar el resumen del CV.");
      return;
    }

    try {
      const response = await fetch('/generar-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumenCV: `Usa los siguientes datos para generar un CV profesional con este formato exacto:

window.Nombre = "...";
window.Apellido = "...";
window.Edad = "...";
window.Teléfono = "...";
window['Correo electrónico'] = "...";
window.Ciudad = "...";
window.País = "...";
window['Perfil personal (2-3 líneas)'] = "...";
window['Formación académica'] = "...";
window['Experiencia laboral'] = "...";
window['Habilidades básicas'] = "...";

DATOS DEL USUARIO: ${resumen.resumenCV}

Quiero que devuelvas únicamente un bloque de código JavaScript, sin comentarios ni explicaciones, que asigne valores como el ejemplo usando el objeto global window.`
        })
      });

      const data = await response.json();

      if (!data.cv) {
        alert("⚠️ No se recibió código válido desde la IA.");
        return;
      }

      // 🔍 Limpieza del bloque de código (si viene con markdown)
      let codigoLimpio = data.cv.trim()
        .replace(/^```[\s\S]*?\n/, "") // elimina encabezado como ```js
        .replace(/```$/, "").trim();   // elimina cierre ```

      // 💥 Ejecutamos el código generado para definir variables en window
      eval(codigoLimpio);

      // 🧩 Creamos el formData que tu plantilla visual espera
      const formData = {
        Nombre: window.Nombre || '',
        Apellido: window.Apellido || '',
        Edad: window.Edad || '',
        Teléfono: window.Teléfono || '',
        'Correo electrónico': window['Correo electrónico'] || '',
        Ciudad: window.Ciudad || '',
        País: window.País || '',
        'Perfil personal (2-3 líneas)': window['Perfil personal (2-3 líneas)'] || '',
        'Formación académica': window['Formación académica'] || '',
        'Experiencia laboral': window['Experiencia laboral'] || '',
        'Habilidades básicas': window['Habilidades básicas'] || ''
      };

      const contenedorCV = document.getElementById('contenedorCV');
      if (contenedorCV) {
        contenedorCV.innerHTML = ''; // Limpia contenido anterior
        contenedorCV.appendChild(generarCV(formData));
      } else {
        alert("⚠️ No se encontró el contenedor del CV (contenedorCV).");
      }

    } catch (error) {
      console.error("❌ Error procesando la respuesta de la IA:", error);
      alert("Error al generar el CV. Revisa la consola.");
    }
  });
});
