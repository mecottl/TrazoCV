import { getBasicCVSummary, getIntermediateCVSummary, getAdvancedCVSummary } from './cvform.js';

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
  // Suponiendo que usas el formulario de CV Básico; adapta según el ID del formulario que tengas
  const form = document.getElementById('cvBasicForm');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const resumen = getCVSummary(); // Obtienes el objeto con el resumen usando los datos ingresados
      if (resumen) {
        const txt = `Hola, aquí está tu resumen: ${resumen.resumenCV}`;
        alert(txt);
        console.log(txt);
      } else {
        console.log("No se detectó ningún formulario de CV.");
      }
    });
  } else {
    console.log("No se detectó ningún formulario de CV.");
  }
});
