// geminiClient.js

// Importamos el SDK de Gemini de Google
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Creamos una instancia del modelo con la API Key que recibimos desde otro archivo
// Recomendado: pasarla como variable o desde .env
const genAI = new GoogleGenerativeAI("AIzaSyAsOPZkxV2Mj5OX9Igu4G0IZ0Wiel6M5bc");

/**
 * Genera contenido usando Gemini a partir de un prompt.
 * @param {string} prompt - El texto que quieres enviarle a Gemini.
 * @returns {Promise<string>} - Retorna la respuesta generada por Gemini.
 */
async function obtenerRespuestaGemini(prompt) {
  try {
    // Obtenemos el modelo específico de Gemini (en este caso, gemini-1.5-flash)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Enviamos el prompt al modelo
    const result = await model.generateContent(prompt);

    // Extraemos el texto de la respuesta
    const respuesta = result.response.text();

    // Retornamos la respuesta generada
    return respuesta;

  } catch (error) {
    // Si hay un error, lo mostramos y retornamos un mensaje de error
    console.error("Error al generar respuesta desde Gemini:", error);
    return "Hubo un error al generar la respuesta.";
  }
}

// Exportamos la función para poder usarla desde otros archivos
module.exports = obtenerRespuestaGemini;
