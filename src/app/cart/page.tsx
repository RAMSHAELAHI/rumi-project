// app/cart/page.tsx
'use client';

import React from 'react';
import { useCart } from '@/app/context/CartContext'; // Adjust the import path if necessary
import Image from 'next/image';
import Link from 'next/link';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="py-10">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link href="/">
            <span className="inline-block bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition">
              Continue Shopping
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item._id} className="flex py-4 border-b">
              <div className="w-24 h-24 relative mr-4">
                <Image src={item.imgUrl} alt={item.title} fill className="object-cover rounded" unoptimized />
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-600">PKR{item.price}</p>
                <div className="flex items-center mt-2">
                  <label htmlFor={`quantity-${item._id}`} className="mr-2 text-sm">Qty:</label>
                  <input
                    type="number"
                    id={`quantity-${item._id}`}
                    className="w-16 border rounded-md text-center text-sm"
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value, 10);
                      if (!isNaN(newQuantity) && newQuantity > 0) {
                        updateQuantity(item._id, newQuantity);
                      }
                    }}
                  />
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="ml-4 text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {cartItems.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>PKR{cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
            </div>
            <Link href="/checkout"> {/* Link to your checkout page */}
              <button className="mt-4 bg-teal-500 text-white px-4 py-2 rounded-md shadow hover:bg-teal-600 transition w-full">
                Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
