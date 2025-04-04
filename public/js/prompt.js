const readline = require("readline");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyAsOPZkxV2Mj5OX9Igu4G0IZ0Wiel6M5bc");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let promptUsuario = "";

rl.question("Escribe tu pregunta para Gemini: ", async (entrada) => {
  promptUsuario = entrada;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(promptUsuario);
    const respuesta = result.response.text();

    console.log("\nRespuesta de Gemini:");
    console.log(respuesta);
  } catch (error) {
    console.error("Error al generar respuesta:", error);
  } finally {
    rl.close();
  }
});
