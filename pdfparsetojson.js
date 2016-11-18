var fs = require('fs'),
    PDFParser = require("pdf2json");

var pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFile("./Medicare-Physician-and-Other-Supplier-PUF-Methodology.json", JSON.stringify(pdfData));
});

pdfParser.loadPDF("./Medicare-Physician-and-Other-Supplier-PUF-Methodology.pdf");