import {
  getBasicCVSummary,
  getIntermediateCVSummary,
  getAdvancedCVSummary
} from '/js/cvform.js';

import { generarCVEstiloBasico } from '/js/plantilla.js';
import { generarCV as generarCVIntermedio } from '/js/plantilla2.js';
import { generarCV as generarCVAvanzado } from '/js/plantilla3.js';

function getCVData() {
  if (document.getElementById('cvBasicForm')) {
    return { resumen: getBasicCVSummary(), tipo: 'basico' };
  } else if (document.getElementById('cvIntermediateForm')) {
    return { resumen: getIntermediateCVSummary(), tipo: 'intermedio' };
  } else if (document.getElementById('cvAdvancedForm')) {
    return { resumen: getAdvancedCVSummary(), tipo: 'avanzado' };
  } else {
    return null;
  }
}

function generarPrompt(resumenCV, tipo) {
  return `Usa los siguientes datos para generar un CV ${tipo} con este formato exacto:

const nombre = "John";
const apellido = "Doe";
const edad = "30";
const profesion = "Desarrollador Web";
const telefono = "1234567890";
const correo = "correo@ejemplo.com";
const ciudad = "Ciudad";
const pais = "País";
const resumen = "Resumen profesional";
const experiencia = "Experiencia laboral";
const educacion = "Formación académica";
const habilidades = "HTML, CSS, JS";
const idiomas = "Idiomas";
const certificaciones = "Certificaciones";
const proyectos = "Proyectos";
const publicaciones = "Publicaciones";
const linkedin = "https://linkedin.com";
const portafolio = "https://miportafolio.com";
const portafolioAdicional = "https://otros-enlaces.com";

DATOS DEL USUARIO: ${resumenCV}

Devuelve solo un bloque de código JavaScript sin comentarios ni explicaciones.`;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form[id^="cv"]');
  const contenedor = document.getElementById('contenedorCV');
  const exportarBtn = document.getElementById('exportarPDF');

  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const datos = getCVData();
    if (!datos || !datos.resumen?.resumenCV)
      return alert('No se pudo generar el resumen del CV.');

    const { resumen, tipo } = datos;
    const prompt = generarPrompt(resumen.resumenCV, tipo);

    try {
      const response = await fetch('/generar-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumenCV: prompt })
      });

      const data = await response.json();
      if (!data.cv)
        return alert('La IA no devolvió un bloque válido de código.');

      let codigo = data.cv
        .trim()
        .replace(/^```[\s\S]*?\n/, '')
        .replace(/```$/, '')
        .trim();

      console.log('💡 Código limpio generado por la IA:\n', codigo);

      // ✅ Ejecutamos el código de la IA como script en el DOM
      const script = document.createElement('script');
      script.textContent = codigo;
      document.body.appendChild(script);

      const { jsPDF } = window.jspdf;

      const formData = {
        nombre,
        apellido,
        edad,
        profesion,
        telefono,
        correo,
        ciudad,
        pais,
        resumen,
        experiencia,
        educacion,
        habilidades,
        idiomas,
        certificaciones,
        proyectos,
        publicaciones,
        linkedin,
        portafolio,
        portafolioAdicional
      };

      if (contenedor) contenedor.innerHTML = '';

      let visualCV;

      if (tipo === 'basico') {
        visualCV = generarCVEstiloBasico(formData);
        contenedor.appendChild(visualCV);
      }

      if (tipo === 'intermedio') {
        visualCV = generarCVIntermedio(formData);
        contenedor.appendChild(visualCV);
      }

      if (tipo === 'avanzado') {
        visualCV = generarCVAvanzado(formData);
        contenedor.appendChild(visualCV);
      }

      if (visualCV && exportarBtn) {
        exportarBtn.style.display = 'inline-block';
        exportarBtn.onclick = () => {
          const doc = new jsPDF();
          doc.html(visualCV, {
            callback: function (doc) {
              doc.save(`${formData.nombre}_CV.pdf`);
            },
            x: 10,
            y: 10
          });
        };
      }
    } catch (err) {
      console.error('❌ Error procesando el CV:', err);
      alert('Ocurrió un error al generar el CV.');
    }
  });
});
