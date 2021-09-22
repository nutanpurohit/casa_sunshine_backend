const nodemailer = require("nodemailer");
const {User} = require("../models/main");
const emailAddress = process.env.EMAIL;
const password = process.env.PASSWORD;

const sendMail = async function (email) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: emailAddress,
            pass: password
        }
    });

    const user = await User.findOne({
        where: {
            email : email,
            isDeleted: false
        }
    })

    const path = 'http://localhost:3000/updatePassword/' + user.id
    let message = '<html><body><a href='+path+'>Click here to set your new password</a></body></html>'

    const mailOptions = {
        from: emailAddress,
        to: email,
        subject: 'Forget Password from Casa Sunshine',
        text: 'Set your new password',
        html: message
    };

    let sendmail = await transporter.sendMail(mailOptions);

    return sendmail;
}

module.exports = {sendMail};