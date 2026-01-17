const fs = require('fs');
const pdf = require('pdf-parse');

const { PDFParse } = require('pdf-parse');

const dataBuffer = fs.readFileSync('resume.pdf');

// Based on CLI usage: new PDFParse({ data: buffer })
const parser = new PDFParse({ data: dataBuffer });

parser.getText().then(function (result) {
    console.log(result.text);
}).catch(function (err) {
    console.error('Error parsing PDF:', err);
});
