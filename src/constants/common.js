const numberFormat = value => {
    const amount = new Intl.NumberFormat('en-IN', {
        // style: 'currency',
        currency: 'INR',
    }).format(value);
    return `Rs.${amount}`;
};

const getPaidAmount = transactionData => {
    let amount = 0;
    transactionData.map((item) => {
        amount  = amount + item.amount;
    })

    return amount;
}

const dayCount = (checkInDate, checkOutDate) => {
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);

    const Difference_In_Time = endDate.getTime() - startDate.getTime();
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return parseInt(Difference_In_Days.toString());
};

module.exports = {numberFormat, getPaidAmount, dayCount};