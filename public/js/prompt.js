import readline from "readline";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Crea la instancia del modelo con tu API key
const genAI = new GoogleGenerativeAI("AIzaSyAsOPZkxV2Mj5OX9Igu4G0IZ0Wiel6M5bc");

// Interfaz para leer desde consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Declaramos variable global donde guardaremos el prompt
let promptUsuario = "";

// Preguntamos al usuario y almacenamos en la variable
rl.question("Escribe tu pregunta para Gemini: ", async (entrada) => {
  promptUsuario = entrada; // ✅ Guardamos en variable

  try {
    // Usamos la variable como input para el modelo
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(promptUsuario); // ✅ Usamos la variable
    const respuesta = result.response.text();

    console.log("\nRespuesta de Gemini:");
    console.log(respuesta);
  } catch (error) {
    console.error("Error al generar respuesta:", error);
  } finally {
    rl.close();
  }
});
