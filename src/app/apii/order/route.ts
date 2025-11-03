import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      address,
      city,
      postalCode,
      country,
      product,
      total,
      paymentMethod,
    } = body;

    // Configure Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 📨 Email to Customer (Order Confirmation)
    const customerMail = {
      from: `"Attractions" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Order Confirmation - Attractions",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 16px;">
          <h2>Thank you for your order, ${name}!</h2>
          <p>We appreciate your trust in <b>Attractions!!!</b> Your order has been placed successfully.</p>

          <h3>Order Summary</h3>
          <p><b>Product:</b> ${product}</p>
          <p><b>Total:</b> PKR ${total}</p>
          <p><b>Payment Method:</b> ${paymentMethod || "COD"}</p>

          <p>We'll notify you when your order ships.</p>
          <p>Need help? <a href="mailto:${process.env.SMTP_USER}">Contact Support</a></p>
        </div>
      `,
    };

    // 🧾 Email to Admin (New Order Notification)
    const adminMail = {
      from: `"Attractions Orders" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL, // 👈 admin email (you)
      subject: `🛍️ New Order Received - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 16px;">
          <h2>New Order Received!</h2>
          <p><b>Customer Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Address:</b> ${address}, ${city}, ${country}</p>
          <p><b>Postal Code:</b> ${postalCode}</p>
          <hr/>
          <h3>Order Details</h3>
          <p><b>Product:</b> ${product}</p>
          <p><b>Total:</b> PKR ${total}</p>
          <p><b>Payment Method:</b> ${paymentMethod || "COD"}</p>
          <hr/>
          <p>Check your admin panel for more details.</p>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(customerMail);
    await transporter.sendMail(adminMail);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Email send error:", err);
    return new Response(JSON.stringify({ success: false, error: err }), { status: 500 });
  }
}
