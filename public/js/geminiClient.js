// geminiClient.js

// Importamos el SDK de Gemini de Google
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Creamos una instancia del modelo con la API Key que recibimos desde otro archivo
// Recomendado: pasarla como variable o desde .env
const genAI = new GoogleGenerativeAI("AIzaSyB1EI2PUQkCZlM2WJ5PozARP_KgHEKroAQ"); // ¡Reemplaza con tu API Key!

/**
 * Genera contenido usando el modelo Gemini especificado a partir de un prompt.
 * @param {string} prompt - El texto que se enviará a Gemini.
 * @param {string} [modelName="gemini-2.0-flash"] - El nombre del modelo de Gemini a utilizar. Por defecto es "gemini-2.0-flash".
 * @returns {Promise<string>} - Una promesa que resuelve con la respuesta generada por Gemini o rechaza con un error.
 */
async function obtenerRespuestaGemini(prompt, modelName = "gemini-2.0-flash") {
  try {
    // Obtenemos el modelo específico de Gemini
    const model = genAI.getGenerativeModel({ model: modelName });

    // Enviamos el prompt al modelo
    const result = await model.generateContent(prompt);

    // Verificamos si la respuesta contiene texto
    if (result && result.response && result.response.text) {
      return result.response.text();
    } else {
      console.warn("Advertencia: La respuesta de Gemini no contenía texto.");
      return "La respuesta generada no contenía texto.";
    }

  } catch (error) {
    console.error("Error al generar respuesta desde Gemini:", error);
    return `Hubo un error al generar la respuesta: ${error.message}`;
  }
}

// Exportamos la función para poder usarla desde otros archivos
module.exports = obtenerRespuestaGemini;