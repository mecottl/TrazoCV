import readline from "readline";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Instancia del modelo con tu API Key
const genAI = new GoogleGenerativeAI("AIzaSyAVVZJCTCM0pODMwTYBTWL52-LddUxvhX0");

// Configura la entrada y salida desde terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Pregunta al usuario su prompt
rl.question("Escribe tu pregunta para Gemini: ", async (userInput) => {
  try {
    // Obtiene el modelo Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Envía el prompt ingresado por el usuario
    const result = await model.generateContent(userInput);

    // Obtiene y muestra el texto generado
    const text = result.response.text();
    console.log("\nRespuesta del modelo:");
    console.log(text);
  } catch (error) {
    console.error("Ocurrió un error:", error);
  } finally {
    rl.close(); // Cierra la interfaz de lectura
  }
});
