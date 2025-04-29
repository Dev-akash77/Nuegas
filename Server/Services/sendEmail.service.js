import { transporter } from "../Config/nodemailer.config.js";

  //!=============================================================================================================================================
// !=========================== Send Email Service =================================================================================================
//* - Handles sending emails to a specified recipient
//* - Accepts recipient email, subject, text, and optional HTML content
//* - Uses nodemailer transporter to send the email
//* - Includes proper error handling in case of failure
  // ?============================================================================================================================================


  
  export const sendEmail = async (to, subject, text, html = null) => {
    try {
      const mailOptions = {
        from: process.env.SENDRE_EMAIL,
        to,
        subject,
        text,
      };
  
      if (html) {
        mailOptions.html = html;
      }
  
      const info = await transporter.sendMail(mailOptions);
      return info;
    } catch (err) {
      console.error("Error sending email:", err);
      throw new Error("Email not sent");
    }
  };

  
  // !============================================================================================================================================
  // !============================================================================================================================================
  