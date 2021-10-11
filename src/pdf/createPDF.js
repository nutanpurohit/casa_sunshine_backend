const PDFDocument = require('pdfkit');
const fs = require('fs');
const {generateHeader, generateFooter, generateBookingInformation, generateTransactionInformation} = require("./options");
const {getPaidAmount} = require("../constants/common");

const createPDF = function (bookingData, transactionData, agentData) {
    let paidAmount, page=0;
    if (transactionData) {
        paidAmount = getPaidAmount(transactionData);
    }
    // Create a document
    const doc = new PDFDocument();

    // Saving the pdf file
    doc.pipe(fs.createWriteStream(`./src/uploads/${bookingData.id}.pdf`));
    console.log('1')
    generateHeader(doc);
    console.log('2')
    generateBookingInformation(doc, bookingData, paidAmount, agentData);
    console.log('3')
    generateFooter(doc, ++page);
    console.log('4')
    if (transactionData.length > 0) {
        doc.addPage();
        generateHeader(doc);
        console.log('5')
        generateTransactionInformation(doc, transactionData, bookingData.totalAmount);
        console.log('6')
        generateFooter(doc, ++page);
        console.log('7')
    }
    // Finalize PDF file
    doc.end();
    console.log('DOC', doc)
}

module.exports = {createPDF};