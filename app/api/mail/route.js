import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, subject, message } = await req.json();

    // Send real emails if credentials are provided, otherwise log in dev
    const isDevelopment = process.env.NODE_ENV === 'development';
    const hasGmailCreds = Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);

    if (isDevelopment && !hasGmailCreds) {
      const otpMatch = message.match(/>(\d{6})</);
      const otp = otpMatch ? otpMatch[1] : '123456';
      console.log('\n🚀 ===== DEVELOPMENT MODE (NO EMAIL CREDS) =====');
      console.log(`📧 Email: ${email}`);
      console.log(`🔐 OTP Code: ${otp}`);
      console.log('================================\n');
      return new NextResponse(
        JSON.stringify({ message: 'Email logged (Development Mode)', status: 200 }),
        { status: 200 }
      );
    }

    // Gmail transporter configuration (requires env creds)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, 
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);

    return new NextResponse(
      JSON.stringify({ message: 'Email sent successfully', status: 200 }),
      { status: 200 }
    );
  } 
  catch (error) {
    console.error('Email sending error:', error);
    // In development without creds, we still return success for UX continuity
    if (process.env.NODE_ENV === 'development' && !process.env.GMAIL_USER) {
      return new NextResponse(
        JSON.stringify({ message: 'Email logged (Development Mode)', status: 200 }),
        { status: 200 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: 'Error sending email', status: 500 }),
      { status: 500 }
    );
  }
}
