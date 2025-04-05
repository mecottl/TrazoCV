const puppeteer = require('puppeteer');

async function htmlAPdf(htmlContent, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent);

  await page.pdf({
    path: outputPath,
    format: 'A4', // Opcional: puedes cambiar el formato (Letter, Legal, etc.)
    printBackground: true, // Opcional: incluye los fondos CSS
  });

  await browser.close();
  console.log(`¡HTML convertido a PDF exitosamente en: ${outputPath}!`);
}

// Ejemplo de uso:
const miHTML = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Mi Documento PDF</title>
    <style>
      body { font-family: sans-serif; }
      h1 { color: green; }
      p { font-size: 18px; }
    </style>
  </head>
  <body>
    <h1>Este es el contenido HTML que se convertirá a PDF</h1>
    <p>Puedes incluir aquí cualquier estructura HTML, estilos CSS e incluso scripts (aunque estos últimos no se ejecutarán en el PDF final).</p>
    <ul>
      <li>Elemento de lista 1</li>
      <li>Elemento de lista 2</li>
    </ul>
  </body>
  </html>
`;

const nombreArchivoPDF = 'mi_archivo.pdf';

htmlAPdf(miHTML, nombreArchivoPDF);