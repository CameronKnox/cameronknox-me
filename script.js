// Function to load and style text content in iframes
function loadAndStyleIframe(iframe, filePath) {
    fetch(filePath)
        .then((response) => response.text())
        .then((data) => {
            // Create a styled HTML structure for the content
            const styledContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 20px;
                  white-space: pre-wrap; /* Preserve line breaks and spacing */
                }
              </style>
            </head>
            <body>${data}</body>
          </html>
        `;

            // Write the styled content to the iframe
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            iframeDoc.open();
            iframeDoc.write(styledContent);
            iframeDoc.close();

            // Resize the iframe to fit its content
            iframe.style.height = iframeDoc.body.scrollHeight + 'px';
        })
        .catch((error) => {
            console.error('Error loading file:', error);
        });
}

// Load and style iframes when the page loads
window.onload = function () {
    const iframe1 = document.getElementById('blog1');
    const iframe2 = document.getElementById('blog2');

    loadAndStyleIframe(iframe1, './blogs/Blog_1-23-2025.txt');
    loadAndStyleIframe(iframe2, './blogs/current-setups.txt');
};