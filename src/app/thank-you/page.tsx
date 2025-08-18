"use client";

import React, { useEffect, useState } from "react";

interface CartItem {
  title: string;
  quantity: number;
  price: number;
}

interface CheckoutData {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  total: string;
  paymentMethod: string;
  items: CartItem[];
}

const ThankYouPage = () => {
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("checkoutData");
    if (data) {
      const parsedData = JSON.parse(data);
      setCheckoutData(parsedData);
      localStorage.removeItem("checkoutData");

      fetch("/apii/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsedData,
          paymentStatus: "paid",
          paymentMethod: parsedData.paymentMethod,
        }),
      });
    }
  }, []);

  if (!checkoutData) {
    return (
      <div className="max-w-xl mx-auto p-8 mt-12 text-center bg-white shadow-xl rounded-xl">
        <h1 className="text-3xl font-bold text-gray-800">No order data found</h1>
        <p className="text-gray-600 mt-2">You may have reached this page directly without placing an order.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-16 p-8 bg-gradient-to-br from-gray-50 to-white shadow-lg rounded-3xl border border-gray-200">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-emerald-100 rounded-full shadow-md">
          <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="1.5"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Thank You for Your Order!</h1>
        <p className="text-gray-500 mt-2">We appreciate your trust in  <a href="/" className="text-purple-600 font-bold hover:underline">Attractions!!!</a>. Your order has been placed successfully.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Info */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Shipping Information</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><span className="font-medium text-gray-800">Name:</span> {checkoutData.name}</li>
            <li><span className="font-medium text-gray-800">Email:</span> {checkoutData.email}</li>
            <li><span className="font-medium text-gray-800">Address:</span> {checkoutData.address}</li>
            <li><span className="font-medium text-gray-800">City:</span> {checkoutData.city}</li>
            <li><span className="font-medium text-gray-800">Postal Code:</span> {checkoutData.postalCode}</li>
            <li><span className="font-medium text-gray-800">Country:</span> {checkoutData.country}</li>
          </ul>
        </div>

        {/* Order Info */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Order Summary</h2>
          <div className="space-y-3 text-sm">
            {checkoutData.items.map((item, index) => (
              <div key={index} className="flex justify-between text-gray-600">
                <span>{item.title} × {item.quantity}</span>
                <span>PKR{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-3 text-gray-700 font-medium flex justify-between">
              <span>Total:</span>
              <span>PKR{checkoutData.total}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Payment Method:</span>
              <span>{checkoutData.paymentMethod}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t pt-6 text-center text-sm text-gray-500">
        <p>We’ll send a confirmation email shortly with your order details.</p>
        <p className="mt-1">Need help? <a href="/contact" className="text-emerald-600 hover:underline">Contact Support</a></p>
      </div>
    </div>
  );
};

export default ThankYouPage;
