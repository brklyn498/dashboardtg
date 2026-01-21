/**
 * PDF Export Script for Dashboard
 * Generates Russian and English versions of the dashboard as PDFs
 * Run with: node export-pdfs.js
 */

const puppeteer = require('puppeteer');
const path = require('path');

const DASHBOARD_URL = `file://${path.join(__dirname, 'index.html')}`;
const OUTPUT_DIR = __dirname;

// Helper function to wait
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function exportPDF(language) {
    console.log(`\n📄 Exporting ${language === 'ru' ? 'Russian' : 'English'} PDF...`);

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set viewport for proper rendering
    await page.setViewport({
        width: 1600,
        height: 900,
        deviceScaleFactor: 2
    });

    // Navigate to the dashboard
    await page.goto(DASHBOARD_URL, {
        waitUntil: 'networkidle0',
        timeout: 30000
    });

    // Wait for charts to render
    await delay(3000);

    // Switch language if needed
    if (language === 'en') {
        await page.click('[data-lang="en"]');
        await delay(2000); // Wait for charts to recreate
    } else {
        await page.click('[data-lang="ru"]');
        await delay(2000);
    }

    // Hide export button and theme toggle for clean PDF
    await page.evaluate(() => {
        const actions = document.querySelector('.header-actions');
        if (actions) actions.style.visibility = 'hidden';
    });

    // Get full page height
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);

    // Generate PDF filename
    const filename = language === 'ru'
        ? 'dashboard-russian.pdf'
        : 'dashboard-english.pdf';
    const outputPath = path.join(OUTPUT_DIR, filename);

    // Export to PDF
    await page.pdf({
        path: outputPath,
        width: '1600px',
        height: `${bodyHeight + 100}px`,
        printBackground: true,
        preferCSSPageSize: false,
        margin: {
            top: '20px',
            right: '20px',
            bottom: '20px',
            left: '20px'
        }
    });

    console.log(`✅ Saved: ${filename}`);

    await browser.close();
    return outputPath;
}

async function main() {
    console.log('🚀 Starting PDF export...');
    console.log(`📁 Output directory: ${OUTPUT_DIR}`);

    try {
        // Export Russian version
        await exportPDF('ru');

        // Export English version
        await exportPDF('en');

        console.log('\n🎉 All PDFs exported successfully!');
        console.log(`\n📂 Files saved to:`);
        console.log(`   - dashboard-russian.pdf`);
        console.log(`   - dashboard-english.pdf`);
    } catch (error) {
        console.error('❌ Error exporting PDFs:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

main();
