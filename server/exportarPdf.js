const isProduction = process.env.NODE_ENV === 'production';

let puppeteer;
let launchOptions;

if (isProduction) {
  const chromium = require('chrome-aws-lambda');
  puppeteer = chromium.puppeteer;
  launchOptions = async () => ({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true
  });
} else {
  puppeteer = require('puppeteer');
  launchOptions = async () => ({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
}

async function exportarHtmlAPdf(html) {
  try {
    console.log("📄 Iniciando Puppeteer...");
    const browser = await puppeteer.launch(await launchOptions());
    const page = await browser.newPage();

    await page.setContent(`<html><body>${html}</body></html>`, {
      waitUntil: 'networkidle0',
    });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' }
    });

    await browser.close();
    console.log("✅ PDF generado correctamente");
    return pdf;
  } catch (err) {
    console.error("❌ Error en Puppeteer:", err.stack);
    throw err;
  }
}

module.exports = exportarHtmlAPdf;
