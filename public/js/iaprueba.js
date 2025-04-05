// aiIntegration.js
const { getBasicCVSummary, getIntermediateCVSummary, getAdvancedCVSummary } = require('./cvFormExport');

// Función que decide, según qué formulario esté presente, qué resumen obtener.
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

const resumen = getCVSummary(); // Obtienes el objeto con el resumen
if (resumen) {
  // Supongamos que queremos usar la propiedad 'resumenCV'
  const txt = `Hola, aquí está tu resumen: ${resumen.resumenCV}`;
  console.log(txt);
} else {
  console.log("No se detectó ningún formulario de CV.");
}

