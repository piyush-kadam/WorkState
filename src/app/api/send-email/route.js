import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    console.log("📩 API called");

    const { email, name, message } = await req.json();
    console.log("📨 Payload received:", { email, name, message });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // --- Client Email (HTML with Poppins + polished UI) ---
    const clientMail = await transporter.sendMail({
      from: `"WorkState" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "📩 We received your message - WorkState",
      text: `Hi ${name}, thanks for contacting WorkState. Our team will get back within 24 hours.`,
      html: `
      <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
        </style>
      </head>
      <body style="margin:0; padding:0; background:#f9fafb; font-family: 'Poppins', Arial, sans-serif;">
        <div style="max-width:600px; margin:auto; background:white; border-radius:14px; overflow:hidden; box-shadow:0 6px 20px rgba(0,0,0,0.08);">
          <div style="background:#111827; color:white; padding:24px; text-align:center;">
            <h1 style="margin:0; font-weight:600;">WorkState</h1>
          </div>
          <div style="padding:28px;">
            <h2 style="color:#111827; margin-top:0;">Hey ${name} 👋</h2>
            <p style="font-size:15px; line-height:1.7; color:#444;">
              Thanks for reaching out to <b>WorkState</b>. We’ve received your message and our team will get back to you within <b>24 hours</b>.
            </p>
            <blockquote style="background:#f3f4f6; padding:14px 16px; border-left:4px solid #111827; border-radius:6px; margin:20px 0; color:#333; font-style:italic;">
              "${message}"
            </blockquote>
            <div style="margin-top:25px; text-align:center;">
              <a href="https://workstate.com" target="_blank"
                style="background:#111827; color:white; padding:14px 26px; border-radius:8px; text-decoration:none; font-weight:500; display:inline-block;">
                🔗 Visit WorkState
              </a>
            </div>
            <p style="margin-top:40px; font-size:12px; color:#777; text-align:center;">
              This is an automated message from WorkState. Please don’t reply.
            </p>
          </div>
        </div>
      </body>
      </html>
      `,
    });

    console.log("✅ Client mail sent:", clientMail.messageId);

    // --- Admin Email (with details in nice Poppins styling) ---
    const adminMail = await transporter.sendMail({
      from: `"WorkState Bot" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📩 New Contact Form Submission from ${name}`,
      text: `New Contact Submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
      <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
        </style>
      </head>
      <body style="margin:0; padding:0; background:#f9fafb; font-family: 'Poppins', Arial, sans-serif;">
        <div style="max-width:600px; margin:auto; background:white; border-radius:14px; overflow:hidden; box-shadow:0 6px 20px rgba(0,0,0,0.08);">
          <div style="background:#111827; color:white; padding:22px; text-align:center;">
            <h2 style="margin:0; font-weight:600;">📥 New Contact Submission</h2>
          </div>
          <div style="padding:26px; color:#333;">
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Message:</b></p>
            <blockquote style="background:#f3f4f6; padding:14px 16px; border-left:4px solid #111827; border-radius:6px; margin:16px 0;">
              ${message}
            </blockquote>
            <hr style="margin:22px 0; border:none; border-top:1px solid #eee;"/>
            <p style="font-size:12px; color:#888; text-align:center;">Sent via WorkState contact form 🚀</p>
          </div>
        </div>
      </body>
      </html>
      `,
    });

    console.log("✅ Admin mail sent:", adminMail.messageId);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("❌ Email error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
