import sgMail from "@sendgrid/mail";
import getEnvVar from "../../shared/utils/getEnvVar";
import { isProduction } from "@/shared/utils/isProd";

// Environment-based variables
export const protocol = isProduction ? "https" : "http";
export const host = isProduction ? "testopenapi.com" : "localhost:8080";
export const sendingEmail = process.env.EMAIL_FROM;

if (!sendingEmail) {
  throw new Error("No sending email found. Please set the sending email.");
}

sgMail.setApiKey(getEnvVar("SENDGRID_API_KEY"));

// Base email template with inline CSS for styling
const emailTemplate = (content: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
    <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
      <h1 style="color: #007bff;">Welcome to Our Service</h1>
    </div>
    <div style="padding: 20px;">
      ${content}
    </div>
    <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px;">
      <p>Best regards,<br/>The Team @ TestOpenAPI</p>
      <p style="color: #6c757d;">This is an automated message, please do not reply directly to this email. If you have any questions or concerns, contact our support team.</p>
    </div>
  </div>
`;

// Specific email content builders
export const createResetPasswordEmail = (
  receiverEmail: string,
  resetTokenValue: string,
): sgMail.MailDataRequired => {
  const content = `
    <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
    <p>Please click on the following link, or paste this into your browser to complete the process within 30 minutes:
    <a href="${protocol}://${host}/reset-password/set/${resetTokenValue}" style="color: #007bff;">Reset Password</a></p>
    <p>This link will expire in 30 minutes. If you did not request this, please ignore this email and your password will remain unchanged.</p>
  `;
  return {
    to: receiverEmail,
    from: sendingEmail,
    subject: "Reset password link",
    html: emailTemplate(content),
  };
};

export const createResetConfirmationEmail = (
  receiverEmail: string,
): sgMail.MailDataRequired => {
  const content = `
    <p>This is a confirmation that the password for your account <strong>${receiverEmail}</strong> has just been changed.</p>
    <p>If you did not initiate this change, please contact our support team immediately.</p>
  `;
  return {
    to: receiverEmail,
    from: sendingEmail,
    subject: "Your password has been changed",
    html: emailTemplate(content),
  };
};

const createHelpCenterInquiryEmail = (
  receiverEmail: string,
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
  },
): sgMail.MailDataRequired => {
  const { firstName, lastName, email, subject, message } = formData;
  const content = `
    <p>A new help center inquiry has been received:</p>
    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `;
  return {
    to: receiverEmail,
    from: sendingEmail,
    subject: "New Help Center Inquiry",
    html: emailTemplate(content),
  };
};

export const createVerificationEmail = (
  receiverEmail: string,
  verificationTokenValue: string,
): sgMail.MailDataRequired => {
  const content = `<p>Please verify your account by clicking the link:
  <a href="${protocol}://${host}/confirm/${verificationTokenValue}" style="color: #007bff;">Verify Email</a></p>`;
  return {
    to: receiverEmail,
    from: sendingEmail,
    subject: "Email Verification",
    html: emailTemplate(content),
  };
};

export const sendEmail = async (email: sgMail.MailDataRequired) => {
  await sgMail.send(email);
};

const emailServices = {
  createResetPasswordEmail,
  createResetConfirmationEmail,
  createVerificationEmail,
  sendEmail,
  createHelpCenterInquiryEmail,
};

export default emailServices;
