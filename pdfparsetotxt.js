var fs = require('fs'),
    PDFParser = require("pdf2json");

var pdfParser = new PDFParser(this,1);

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFile("./pdf2json/test/F1040EZ.content.txt", pdfParser.getRawTextContent());
});

pdfParser.loadPDF("./pdf2json/test/pdf/fd/form/F1040EZ.pdf");