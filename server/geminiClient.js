// server/geminiClient.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Reemplaza con tu propia API Key
const genAI = new GoogleGenerativeAI("AIzaSyB1EI2PUQkCZlM2WJ5PozARP_KgHEKroAQ");

async function obtenerRespuestaGemini(prompt, modelName = "gemini-2.0-flash") {
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);

    if (result && result.response && result.response.text) {
      return result.response.text();
    } else {
      return "La respuesta generada no contenía texto.";
    }
  } catch (error) {
    console.error("Error al generar desde Gemini:", error);
    throw new Error("No se pudo generar contenido con Gemini.");
  }
}

module.exports = obtenerRespuestaGemini;
