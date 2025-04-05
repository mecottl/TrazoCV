const obtenerRespuestaGemini = require("./geminiClient");

const prompt1 = "¿Cómo te llamas?";

async function main() {
  const respuesta = await obtenerRespuestaGemini(prompt1);
  return respuesta; // <- devolvemos la respuesta
}

// Usamos .then() para manejar la respuesta fuera del main
main().then(respuesta => {
  console.log("Gemini respondió:", respuesta);

  // Aquí puedes hacer más cosas con la respuesta
});