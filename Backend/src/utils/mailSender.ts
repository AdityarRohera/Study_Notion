import nodemailer from 'nodemailer'

interface mailSenderType {
    email : string,
    title : string,
    body : string
}

const mailSender = async({email , title , body} : mailSenderType) => {
        // create transporter
        const transporter = nodemailer.createTransport({
          host: process.env.MAIL_HOST,
          service: "gmail",
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
       });

       let info = await transporter.sendMail({
            from : '"Study-Notion"<studynotion00@gmail.com>',
            to : `${email}`,
            subject : `${title}`,
              html: body,
       })
       console.log("Message sent:", info.messageId);

    }

export default mailSender;