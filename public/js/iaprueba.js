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

// Exportamos la función para poder usarla en otros lugares
module.exports = {
  getCVSummary
};
