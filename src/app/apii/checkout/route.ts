import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',  // ✅ use supported version
});

export async function POST(req: NextRequest) {
  try {
    const { customer, cartItems, subtotal, discount, tax, total } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Order Payment',
              description: `Subtotal: $${subtotal.toFixed(2)}, Discount: $${discount.toFixed(2)}, Tax: $${tax.toFixed(2)}`,
            },
            unit_amount: Math.round(Number(total) * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      customer_email: customer.email,
      metadata: {
        name: `${customer.firstName} ${customer.lastName}`,
        phone: customer.phone,
        subtotal: subtotal.toFixed(2),
        discount: discount.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toString(),
        cart: JSON.stringify(cartItems),
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: "Stripe session URL not found" }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
