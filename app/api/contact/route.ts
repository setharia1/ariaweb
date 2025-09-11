import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let body: any = {};
    if (contentType.includes('application/json')) {
      body = await req.json();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await req.formData();
      body = Object.fromEntries(formData.entries());
    } else {
      const text = await req.text();
      try { body = JSON.parse(text); } catch { body = {}; }
    }

    const name = (body.name || '').toString().trim();
    const email = (body.email || '').toString().trim();
    const message = (body.message || '').toString().trim();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Missing required fields.' }, { status: 400 });
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: 'Invalid email.' }, { status: 400 });
    }

    const to = process.env.CONTACT_TO || 'seth@aria.ventures';
    const subject = `New contact from ${name}`;
    const plainText = `From: ${name} <${email}>\n\n${message}`;
    const hasSmtp = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
    if (hasSmtp) {
      try {
        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.default.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER as string,
            pass: process.env.SMTP_PASS as string,
          },
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || `Aria Website <no-reply@aria.local>`,
          to,
          replyTo: email,
          subject,
          text: plainText,
        });

        return NextResponse.json({ ok: true, note: 'Email sent via SMTP' });
      } catch (smtpErr) {
        console.error('SMTP error', smtpErr);
        // Fall through to try Resend below
      }
    }

    if (process.env.RESEND_API_KEY) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || 'Aria <onboarding@resend.dev>',
            to: [to],
            reply_to: email,
            subject,
            text: plainText,
          }),
        });
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText);
        }
        return NextResponse.json({ ok: true, note: 'Email sent via Resend' });
      } catch (resendErr) {
        console.error('Resend error', resendErr);
        return NextResponse.json({ ok: false, error: 'Email service error.' }, { status: 500 });
      }
    }

    // Neither SMTP nor Resend configured
    console.warn('No email provider configured');
    return NextResponse.json({ ok: false, error: 'No email provider configured.' }, { status: 500 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: 'Unexpected error.' }, { status: 500 });
  }
}


