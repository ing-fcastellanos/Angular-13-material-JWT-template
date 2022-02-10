const nodemailer = require('nodemailer');
const config = require('config.json');

var currentConfig;
switch (process.env.NODE_ENV) {
    case "PROD": currentConfig = config['PROD']; break;
    case "QA": currentConfig = config['QA']; break;
    case "DEV": currentConfig = config['DEV']; break;
    default: currentConfig = config['PROD']; break;
} 

module.exports = sendEmail;

async function sendEmail({ to, subject, html, from = currentConfig.emailFrom }) {
    const transporter = nodemailer.createTransport(currentConfig.smtpOptions);
    await transporter.sendMail({ from, to, subject, html });
}