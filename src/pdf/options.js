const moment = require('moment');
const {numberFormat, dayCount} = require('../constants/common');
const colors = require('../constants/colors');

function generateHeader(doc) {
    doc
        .image("./src/assets/images/logo.png", 50, 40, { width: 60 })
        .fontSize(24)
        .fillColor(colors.PRIMARY)
        .text("CASA SUNSHINE, Goa", 120, 50)
        .fillColor(colors.BLACK)
        .fontSize(10)
        .text("1391, Casa Sunshine", 200, 50, { align: "right" })
        .text("near Little Angle Primary School", 200, 65, { align: "right" })
        .text("Anjuna", 200, 80, { align: "right" })
        .text("Goa 403509, India", 200, 95, { align: "right" })
        .text(`Report Generation Date: ${new Date()}`, 50, 120)
        .lineWidth(1)
        .moveTo(45, 110)
        .lineTo(545, 110)
        .stroke()
        .moveDown();
}

function generateFooter(doc, page) {
    doc
        .lineWidth(1)
        .moveTo(45, 700)
        .lineTo(545, 700)
        .stroke()
        .fontSize(6)
        .text(page, 535, 713, {align: 'right'})
}

function generateBookingInformation(doc, bookingData, paidAmount, agentData) {
    const days = dayCount(bookingData.checkInDate, bookingData.checkOutDate);
    const nights = days - 1;
    doc
        .fillColor(colors.PRIMARY)
        .fontSize(16)
        .text(`Booking Invoice Report`, 50, 150)
        .fillColor(colors.BLACK)
        .fontSize(10)
        .text(`Booking ID: ${bookingData.id}`, 50, 170)

        .fillColor(colors.PRIMARY)
        .fontSize(16)
        .text(`Guest Details`, 50, 200)
        .fillColor(colors.BLACK)
        .fontSize(10)
        .text(`Name: ${bookingData.firstName} ${bookingData.lastName}`, 50, 220)
        .text(`Phone Number: ${bookingData.phoneNumber}`, 50, 235)
        .text(`Email Address: ${bookingData.email}`, 50, 250)

        .fillColor(colors.PRIMARY)
        .fontSize(16)
        .text(`Booking Details`, 50, 280)
        .fillColor(colors.BLACK)
        .fontSize(10)
        .text(`Date of Booking: ${moment(bookingData.createdAt).format("DD-MM-YYYY, dddd")}`, 50, 300)
        .text(`Last Updated Date: ${moment(bookingData.createdAt).format("DD-MM-YYYY, dddd")}`, 50, 315)
        .text(`Check-in Date: ${moment(bookingData.checkInDate).format("DD-MM-YYYY, dddd")}`, 50, 330)
        .text(`Check-out Date: ${moment(bookingData.checkOutDate).format("DD-MM-YYYY, dddd")}`, 250, 330)
        .text(`Number of Pax: ${bookingData.numberAdults}`, 50, 345)
        .text(`Number of Kids: ${bookingData.numberKids}`, 250, 345)
        .text(`Period of Stay: ${days} days and ${nights} nights`, 50, 360)

        .fillColor(colors.PRIMARY)
        .fontSize(16)
        .text(`Payment Details`, 50, 390)
        .fillColor(colors.BLACK)
        .fontSize(10)
        .text(`Total Amount: ${bookingData.totalAmount !== null ? numberFormat(bookingData.totalAmount) : numberFormat(0)}`, 50, 410)
        .text(`Deposit: ${bookingData.deposit !== null ? numberFormat(bookingData.deposit) : numberFormat(0)}`, 50, 425)
        .text(`Status of Payment: ${
            bookingData.totalAmount === paidAmount ? 'Completed' :
                bookingData.totalAmount > paidAmount && paidAmount !== 0 ? 'Pending' :
                    bookingData.totalAmount > paidAmount && paidAmount === 0 ? 'Not Completed' :
                        'Free Stay'
        }`, 50, 440)
        .text(`Paid: ${numberFormat(paidAmount)}`, 50, 455)
        .text(`Remaining: ${bookingData.totalAmount !== null ? numberFormat(bookingData.totalAmount - paidAmount) : numberFormat(0)}`, 50, 470)
        .moveDown();

    if (agentData.agentType === 'Direct') {
        doc
            .fillColor(colors.PRIMARY)
            .fontSize(16)
            .text(`Agent Details`, 50, 500)
            .fillColor(colors.BLACK)
            .fontSize(10)
            .text(`Agent Type: Direct`, 50, 520)
            .moveDown();
    } else {
        doc
            .fillColor(colors.PRIMARY)
            .fontSize(16)
            .text(`Agent Details`, 50, 500)
            .fillColor(colors.BLACK)
            .fontSize(10)
            .text(`Agent Type: Agent`, 50, 520)
            .text(`Agent Name: ${agentData.name}`, 50, 535)
            .text(`Agent Email: ${agentData.email}`, 50, 550)
            .text(`Agent Phone: ${agentData.phone}`, 50, 565)
            .text(`Agent Address: ${agentData.address}`, 50, 580)
            .text(`Agent City: ${agentData.city}`, 50, 595)
            .moveDown();
    }

}

function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
    doc
        .fontSize(10)
        .text(c1, 50, y)
        .text(c2, 150, y)
        .text(c3, 350, y, { align: "left" })
        .text(c4, 450, y, {  align: "left" })
        .lineWidth(1)
        .moveTo(45, y + 20)
        .lineTo(545, y + 20)
        .stroke();
}

function generateTransactionInformation(doc, transactionData, total) {
    let i, invoiceTableTop = 180, position, paidSum = 0;
    doc
        .fillColor(colors.PRIMARY)
        .fontSize(16)
        .text(`Payment Details`, 50, 150)
        .fontSize(12)
        .text('Amount', 50, 180)
        .text('Description', 150, 180)
        .text('Account Type', 350, 180)
        .text('Payment Date', 450, 180)
        .lineWidth(1)
        .moveTo(45, 200)
        .lineTo(545, 200)
        .stroke()
        .fillColor(colors.BLACK);

    if (transactionData.length > 0) {
        for (i = 0; i < transactionData.length; i++) {
            const item = transactionData[i];
            paidSum = paidSum + item.amount;
            position = invoiceTableTop + (i + 1) * 30;
            generateTableRow(
                doc,
                position,
                numberFormat(item.amount),
                item.description,
                item.account ? item.account : ' - ',
                moment(item.createdAt).format("DD-MM-YYYY"),
            );
        }
    }

    doc
        .fillColor(colors.PRIMARY)
        .text('Total Paid Amount', 50, position + 30)
        .fillColor(colors.BLACK)
        .text(`${numberFormat(paidSum)}`, 150, position + 30)
        .fillColor(colors.PRIMARY)
        .text('Total Bill Amount', 50, position + 45)
        .fillColor(colors.BLACK)
        .text(`${total !== null ? numberFormat(total) : numberFormat(0)}`, 150, position + 45)
        .fillColor(colors.PRIMARY)
        .text('Remaining Amount', 50, position + 60)
        .fillColor(colors.BLACK)
        .text(`${total !== null ? numberFormat(total - paidSum) : numberFormat(0)}`, 150, position + 60)
        .fillColor(colors.PRIMARY)
        .text('Status', 50, position + 75)
        .fillColor(colors.BLACK)
        .text(`${
            total === paidSum ? 'Completed' :
                total > paidSum && paidSum !== 0 ? 'Pending' :
                    total > paidSum && paidSum === 0 ? 'Not Completed' : 
                        'Free Stay'
        }`, 150, position + 75)
}

module.exports = {generateHeader, generateFooter, generateBookingInformation, generateTransactionInformation};