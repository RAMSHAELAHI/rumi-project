"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  zipCode: string;
  country: string;
  paymentMethod: "cod" | "card";
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();

  const [formData, setFormData] = useState<CheckoutForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    zipCode: "",
    country: "",
    paymentMethod: "cod",
  });

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = 0.25 * subtotal;
  const tax = 0.1 * subtotal;
  const total = (subtotal - discount + tax).toFixed(2);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePlaceOrder = async () => {
    if (
      !formData.firstName ||
      !formData.email ||
      !formData.phone ||
      !formData.address1
    ) {
      alert("Please fill in all required fields!");
      return;
    }

    setIsOrderPlaced(true);

    const orderData = {
      customer: formData,
      cartItems,
      subtotal,
      discount,
      tax,
      total,
    };

    if (formData.paymentMethod === "cod") {
      localStorage.setItem(
        "checkoutData",
        JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          address: `${formData.address1}, ${formData.address2}`,
          city: formData.city,
          postalCode: formData.zipCode,
          country: formData.country,
          total,
          paymentMethod: "COD",
          items: cartItems,
        })
      );

      await fetch("/apii/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...orderData,
          paymentStatus: "pending",
          paymentMethod: "COD",
        }),
      });

      clearCart();
      router.push("/thank-you");
    } else {
      localStorage.setItem(
        "checkoutData",
        JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          address: `${formData.address1}, ${formData.address2}`,
          city: formData.city,
          postalCode: formData.zipCode,
          country: formData.country,
          total,
          paymentMethod: "Card",
          items: cartItems,
        })
      );

      const res = await fetch("/apii/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...orderData, paymentMethod: "Card" }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Stripe API Error:", errorText);
        alert("Something went wrong. Please try again.");
        setIsOrderPlaced(false);
        return;
      }

      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        setIsOrderPlaced(false);
        alert("Stripe session creation failed.");
      }
    }
  };

  return (
    <>
      <section
        className="bg-cover bg-center h-48 flex items-center justify-center m-0"
        style={{ backgroundImage: "url('/images/bg_cover.png')" }}
      >
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold">Checkout</h2>
          <p className="pt-1">
            <Link href="/" className="text-Black-400 text-4xl font-semibold h-22 w-10">
              Checking Out
            </Link>{" "}
            › Checkout
          </p>
        </div>
      </section>

      <main className="max-w-screen-2xl mx-auto w-full px-4 lg:px-16 py-8 bg-gray-50 min-h-screen">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-2/3">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="border px-3 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 transition"
              />
              <input
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="border px-3 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 transition"
              />
              <input
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="border px-3 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 transition"
              />
              <input
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="border px-3 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 transition"
              />
            </div>
            <input
              id="address1"
              value={formData.address1}
              onChange={handleInputChange}
              placeholder="Address Line 1"
              className="w-full mt-4 border px-3 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 transition"
            />
            <input
              id="address2"
              value={formData.address2}
              onChange={handleInputChange}
              placeholder="Address Line 2"
              className="w-full mt-4 border px-3 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 transition"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <input
                id="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className="border px-3 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 transition"
              />
              <input
                id="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="Zip Code"
                className="border px-3 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 transition"
              />
              <select
                id="country"
                value={formData.country}
                onChange={handleInputChange}
                className="border px-3 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 transition"
              >
                <option value="">Select Country</option>
                <option value="USA">USA</option>
                <option value="CA">Canada</option>
                <option value="PK">Pakistan</option>
              </select>
            </div>
            <div className="mt-6">
              <label className="block mb-2 font-semibold text-gray-700">Payment Method</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={() =>
                      setFormData((prev) => ({ ...prev, paymentMethod: "cod" }))
                    }
                    className="accent-yellow-500"
                  />
                  Cash on Delivery
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        paymentMethod: "card",
                      }))
                    }
                    className="accent-yellow-500"
                  />
                  Card Payment (Stripe)
                </label>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            <div className="border rounded-2xl p-8 shadow-lg bg-white sticky top-8">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4 items-center">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border">
                      <Image
                        src={item.imgUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">{item.title}</h3>
                      <p className="text-sm text-gray-500">
                        PKR{item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-2 border-t pt-4 text-base">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>PKR{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount (25%)</span>
                  <span className="text-green-600">-PKR{discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span className="text-red-600">+PKR{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-3 text-lg">
                  <span>Total</span>
                  <span>PKR{total}</span>
                </div>
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={isOrderPlaced}
                className={`w-full mt-8 px-6 py-3 rounded-lg text-white font-semibold text-lg shadow transition ${
                  isOrderPlaced
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-orange-500"
                }`}
              >
                {isOrderPlaced ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
