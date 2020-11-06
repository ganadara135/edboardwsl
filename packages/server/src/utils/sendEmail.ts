import * as nodemailer from 'nodemailer';


export const sendEmail = async (recipient: string, url: string, linkText: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Naver',
        host: 'smtp.naver.com',
        port: 587,
        auth: {
          user: process.env.MAIL_EMAIL,
          pass: process.env.MAIL_PASSWORD
        }
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.MAIL_EMAIL, // sender address
    to: `recipient <${recipient}>`, // list of receivers
    subject: "이메일 인증 요청 메일입니다. ✔", // Subject line
    text: "확인 링크를 클릭해 주세요", // plain text body
    html: `<html>
        <body>
        <p>가입을 환영합니다!</p>
        <a href="${url}">${linkText}</a>
        </body>
        </html>`
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};