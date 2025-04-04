// Importamos la clase GoogleGenerativeAI desde el paquete oficial de Google.
// Este paquete permite usar los modelos de lenguaje como Gemini.
import { GoogleGenerativeAI } from "@google/generative-ai";

// Creamos una instancia del modelo, pasándole tu API key.
// ⚠️ IMPORTANTE: nunca compartas tu API key públicamente por seguridad.
const genAI = new GoogleGenerativeAI("AIzaSyAVVZJCTCM0pODMwTYBTWL52-LddUxvhX0");

// Definimos una función principal asincrónica (main) para ejecutar el proceso.
async function main() {
  try {
    // Obtenemos un modelo generativo usando el nombre del modelo de Gemini.
    // "gemini-1.5-flash" es una versión rápida del modelo Gemini 1.5.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Enviamos un prompt o pregunta al modelo para que genere una respuesta.
    const result = await model.generateContent("¿como hago un cv?");

    // Accedemos al texto de la respuesta generada.
    const text = result.response.text();

    // Mostramos el resultado en la consola.
    console.log("Respuesta del modelo:");
    console.log(text);

  } catch (error) {
    // Capturamos y mostramos cualquier error que ocurra durante el proceso.
    console.error("Ocurrió un error:", error);
  }
}

// Llamamos a la función main para ejecutar todo el flujo.
main();
