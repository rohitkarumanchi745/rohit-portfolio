import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email domain - only allow Gmail and Outlook
    const emailLower = email.toLowerCase();
    const allowedDomains = ['@gmail.com', '@outlook.com', '@hotmail.com', '@live.com'];
    const isValidDomain = allowedDomains.some(domain => emailLower.endsWith(domain));

    if (!isValidDomain) {
      return NextResponse.json(
        { error: 'Please use a Gmail or Outlook email address' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'your-resend-api-key') {
      // API key not configured - return success but log the contact attempt
      console.log('Contact form submission (email not configured):', {
        name,
        email,
        phone,
        message: message.substring(0, 100),
        timestamp: new Date().toISOString()
      });

      return NextResponse.json({
        success: true,
        message: 'Thank you for your message! Please also email directly at rkkarumanchi98@gmail.com to ensure I receive it.',
      });
    }

    // Initialize Resend only if API key is available
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
      to: ['rkkarumanchi98@gmail.com'],
      subject: `New Portfolio Contact: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr />
        <p><em>Sent from your portfolio at rohitkarumanchi.com</em></p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please contact directly at rkkarumanchi98@gmail.com' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      id: data?.id,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Please contact directly at rkkarumanchi98@gmail.com' },
      { status: 500 }
    );
  }
}
