// var pdfUtil = require('pdf-to-text');
// var pdf_path = "/Users/Legolas/Documents/Twine Analytics/data_extraction/Medicare-Physician-and-Other-Supplier-PUF-Methodology.pdf";
 
// pdfUtil.info(pdf_path, function(err, info) {
//     if (err) throw(err);
//     console.log(info);
// });

var pdfUtil = require('pdf-to-text');
var pdf_path = "/Users/Legolas/Documents/Twine Analytics/data_extraction/Medicare-Physician-and-Other-Supplier-PUF-Methodology.pdf";
 
//option to extract text from page 0 to 10 
var option = {from: 0, to: 10};
 
// pdfUtil.pdfToText(pdf_path, option, function(err, data) {
//   if (err) throw(err);
//   console.log(data); //print text     
// });
 
// Omit option to extract all text from the pdf file 
pdfUtil.pdfToText(pdf_path, function(err, data) {
  if (err) throw(err);
  console.log(data); //print all text     
});