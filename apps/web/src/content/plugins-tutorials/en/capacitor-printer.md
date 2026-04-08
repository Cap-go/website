---
locale: en
---
# Using @capgo/capacitor-printer Package

The `@capgo/capacitor-printer` package allows you to print documents, HTML, PDFs, images, and web views from your Capacitor app. In this tutorial, we'll guide you through installing and using this package in your application.

## Installation

To install the `@capgo/capacitor-printer` package, run the following command in your project's root directory:

```bash
npm install @capgo/capacitor-printer
npx cap sync
```

## API

The `@capgo/capacitor-printer` package provides the following API methods:

### print(options)

This method opens the native print dialog with the specified content.

```javascript
import { Printer } from '@capgo/capacitor-printer';

async function printContent() {
  const options = {
    content: '<h1>Hello World</h1><p>This is a test print.</p>',
    name: 'my-print-job',
    orientation: 'portrait',
    grayscale: false
  };

  try {
    await Printer.print(options);
    console.log('Print dialog opened');
  } catch (error) {
    console.error('Print failed:', error);
  }
}
```

**Options:**
- `content` (string, required): HTML string, file URI, or base64 data to print
- `name` (string, optional): Name of the print job
- `orientation` (string, optional): 'portrait' or 'landscape'
- `grayscale` (boolean, optional): Print in grayscale (default: false)

### canPrint()

This method checks if printing is available on the device.

```javascript
import { Printer } from '@capgo/capacitor-printer';

async function checkPrintAvailability() {
  const { value } = await Printer.canPrint();
  console.log('Printing available:', value);
  return value;
}
```

## Complete Examples

### Printing HTML Content

```javascript
import { Printer } from '@capgo/capacitor-printer';

async function printHTML() {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          h1 {
            color: #333;
            border-bottom: 2px solid #333;
          }
          .content {
            margin-top: 20px;
            line-height: 1.6;
          }
        </style>
      </head>
      <body>
        <h1>My Document</h1>
        <div class="content">
          <p>This is a professionally formatted document.</p>
          <p>It includes custom styling and structure.</p>
        </div>
      </body>
    </html>
  `;

  try {
    const canPrint = await Printer.canPrint();
    if (!canPrint.value) {
      console.error('Printing not available');
      return;
    }

    await Printer.print({
      content: htmlContent,
      name: 'My Document',
      orientation: 'portrait'
    });
  } catch (error) {
    console.error('Print failed:', error);
  }
}
```

### Printing a PDF File

```javascript
import { Printer } from '@capgo/capacitor-printer';

async function printPDF(pdfPath) {
  try {
    await Printer.print({
      content: pdfPath,  // e.g., 'file:///path/to/document.pdf'
      name: 'PDF Document'
    });
  } catch (error) {
    console.error('PDF print failed:', error);
  }
}
```

### Printing an Image

```javascript
import { Printer } from '@capgo/capacitor-printer';

async function printImage(imagePath) {
  try {
    await Printer.print({
      content: imagePath,  // e.g., 'file:///path/to/image.jpg'
      name: 'My Image',
      orientation: 'landscape'
    });
  } catch (error) {
    console.error('Image print failed:', error);
  }
}
```

### Printing a Receipt

```javascript
import { Printer } from '@capgo/capacitor-printer';

async function printReceipt(receiptData) {
  const receiptHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: 'Courier New', monospace;
            padding: 20px;
            max-width: 300px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px dashed #000;
            padding-bottom: 10px;
          }
          .item {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
          }
          .total {
            margin-top: 20px;
            padding-top: 10px;
            border-top: 2px solid #000;
            font-weight: bold;
            font-size: 1.2em;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>Store Name</h2>
          <p>Date: ${new Date().toLocaleDateString()}</p>
          <p>Time: ${new Date().toLocaleTimeString()}</p>
        </div>

        ${receiptData.items.map(item => `
          <div class="item">
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
          </div>
        `).join('')}

        <div class="total">
          <div class="item">
            <span>Total:</span>
            <span>$${receiptData.total.toFixed(2)}</span>
          </div>
        </div>

        <div style="text-align: center; margin-top: 20px;">
          <p>Thank you for your purchase!</p>
        </div>
      </body>
    </html>
  `;

  try {
    await Printer.print({
      content: receiptHTML,
      name: 'Receipt',
      orientation: 'portrait'
    });
  } catch (error) {
    console.error('Receipt print failed:', error);
  }
}

// Usage
const receipt = {
  items: [
    { name: 'Item 1', price: 10.00 },
    { name: 'Item 2', price: 15.50 },
    { name: 'Item 3', price: 7.25 }
  ],
  total: 32.75
};

await printReceipt(receipt);
```

### Printing a Table

```javascript
import { Printer } from '@capgo/capacitor-printer';

async function printTable(data) {
  const tableHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
          }
          th {
            background-color: #4CAF50;
            color: white;
            font-weight: bold;
          }
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h2>Data Report</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Value</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(row => `
              <tr>
                <td>${row.id}</td>
                <td>${row.name}</td>
                <td>${row.value}</td>
                <td>${row.status}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `;

  await Printer.print({
    content: tableHTML,
    name: 'Data Report',
    orientation: 'landscape'
  });
}
```

### Print Service Class

Here's a complete service class for managing printing:

```javascript
import { Printer } from '@capgo/capacitor-printer';

export class PrintService {
  async checkAvailability() {
    const { value } = await Printer.canPrint();
    return value;
  }

  async printHTML(htmlContent, jobName = 'Document', options = {}) {
    try {
      const available = await this.checkAvailability();
      if (!available) {
        throw new Error('Printing not available on this device');
      }

      await Printer.print({
        content: htmlContent,
        name: jobName,
        orientation: 'portrait',
        ...options
      });

      return true;
    } catch (error) {
      console.error('Print failed:', error);
      throw error;
    }
  }

  async printFile(filePath, jobName = 'Document') {
    await Printer.print({
      content: filePath,
      name: jobName
    });
  }

  async printFromURL(url, jobName = 'Web Document') {
    try {
      // Fetch the content
      const response = await fetch(url);
      const blob = await response.blob();

      // Convert to base64
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
          try {
            await Printer.print({
              content: reader.result,
              name: jobName
            });
            resolve(true);
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Print from URL failed:', error);
      throw error;
    }
  }
}

// Usage
const printService = new PrintService();

// Print HTML
await printService.printHTML('<h1>Hello</h1>', 'My Document');

// Print file
await printService.printFile('file:///path/to/file.pdf', 'My PDF');

// Print from URL
await printService.printFromURL('https://example.com/doc.pdf', 'Remote Document');
```

## Best Practices

1. **Check Availability**: Always check if printing is available before attempting to print
2. **Valid HTML**: Ensure HTML content is well-formed for consistent results
3. **Inline Styles**: Use inline CSS or embedded styles for best print output
4. **Job Names**: Use descriptive names to help users identify print jobs
5. **Error Handling**: Always wrap print operations in try-catch blocks
6. **Orientation**: Choose appropriate orientation based on content (portrait for documents, landscape for wide tables)

## Troubleshooting

### Print dialog not appearing
- Check that printing is available using `canPrint()`
- Verify device settings allow printing
- Ensure app has necessary permissions

### Content not printing correctly
- Validate that HTML is well-formed
- Check file paths are absolute and accessible
- Verify images are embedded or use absolute URLs

### Styling issues
- Use inline styles or embedded CSS
- Test with different page sizes
- Use @page CSS rules for print-specific styling

## Conclusion

The `@capgo/capacitor-printer` package provides a simple way to add printing functionality to your Capacitor app. With support for HTML, PDFs, and images, you can create professional print outputs directly from your application.
