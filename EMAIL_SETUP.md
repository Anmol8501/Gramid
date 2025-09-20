# Email Configuration Setup

## Development Mode (Current Setup)
The application is currently configured to run in development mode where:
- OTP codes are logged to the console instead of being sent via email
- This allows you to test the signup flow without needing email configuration
- Check the browser console or terminal for the OTP code when testing

## Production Email Setup

To enable actual email sending in production, you need to:

### 1. Gmail App Password Setup
1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password for this application
4. Use the app password instead of your regular Gmail password

### 2. Environment Variables
Create a `.env.local` file in the root directory with:
```
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
NODE_ENV=production
```

### 3. Alternative Email Services
You can also use other email services by modifying the transporter configuration in `app/api/mail/route.js`:

#### Using SendGrid:
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});
```

#### Using Mailgun:
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASS
  }
});
```

## Testing the OTP Functionality

1. Start the development server: `npm run dev`
2. Navigate to the signup page
3. Enter an email address and click "Next"
4. Check the browser console or terminal for the OTP code
5. Enter the OTP code to proceed with signup

## Troubleshooting

- If OTP is not being generated, check the browser console for errors
- Ensure the development server is running
- Check that the API routes are accessible
- Verify that the email format is valid
