const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/generar-pdf', async (req, res) => {
  try {
    const baseURL = process.env.BASE_URL || 'http://localhost:4200';
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Previene errores de permisos
    });

    const page = await browser.newPage();

    // Navegar a la URL del CV en Angular
    await page.goto(`${baseURL}/cv`, { waitUntil: 'networkidle2' });

    // 🟢 Esperar a que Angular cargue completamente
    await page.waitForSelector('.container', { visible: true });
    
    // Tomar el PDF con el contenido visible
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Curriculum_Darley_Evangelista.pdf"',
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error('❌ Error generando PDF:', error);
    res.status(500).send('Error al generar el PDF');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
