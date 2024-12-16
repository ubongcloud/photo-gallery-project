const fs = require('fs');
const path = require('path');

// Read the contents of the HTML, CSS, and JavaScript files
const html = fs.readFileSync(path.join(__dirname, 'index.html'), { encoding: 'utf8' });
const css = fs.readFileSync(path.join(__dirname, 'styles.css'), { encoding: 'utf8' });
const js = fs.readFileSync(path.join(__dirname, 'app.js'), { encoding: 'utf8' });

/**
 * Returns an HTML page with embedded CSS and JS
 */
exports.handler = async (event) => {
    try {
        // Embed CSS and JS into the HTML
        const modifiedHtml = html
            .replace('</head>', `<style>${css}</style></head>`)  // Embed CSS in the <head>
            .replace('</body>', `<script>${js}</script></body>`); // Embed JS before closing </body>

        const response = {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/html',
            },
            body: modifiedHtml,
        };

        return response;
    } catch (error) {
        console.error('Error generating the response:', error);

        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Internal Server Error',
                error: error.message,
            }),
        };
    }
};