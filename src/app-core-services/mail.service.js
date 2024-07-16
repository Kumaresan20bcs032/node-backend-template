import nodemailer from 'nodemailer';

//Create mail transport
const mailTransport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com', //Replace your smtp host
    port: process.env.SMTP_PORT || 587, //Replace you smtp provider port
    secure: process.env.SMTP_SECURE || false, //Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.SMTP_USER || 'contact@kumaresan.com', //Replace your smtp email
        pass: process.env.SMTP_PASS || 'Kumaresan@123', //Replace your smtp email password
    },
});

//This function is responsible for sending email
export const sendEmail = async (toEmail, subject, mailTemplate) => {
    try {
        const mail = await mailTransport.sendMail({
            from: process.env.SMTP_USER || 'contact@kumaresan.com', //Replace your smtp email
            to: toEmail,
            subject: subject,
            html: mailTemplate
        })

        if (!mail.accepted?.length) {
            console.log('Mail send Error!!!');
        }
        else {
            console.log('Mail sented to provide email succesfully...');
        }
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
}
