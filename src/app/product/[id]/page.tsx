"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

// ✅ Cleaned-up products array
const products = [
  {
    id: 1,
    name: "Zarar",
    price: 2499,
    originalPrice: Math.round(2499 * 1.2),
    tag: "Sale",
    images: ["/images/zaara..jpeg"],
    category: "Scents",
    description:
      "A bold, long-lasting scent designed for those who love to make a statement.",
  },
  {
    id: 7,
    name: "Dior",
    price: 2499,
    originalPrice: Math.round(2499 * 1.2),
    tag: "Exclusive",
    images: ["/images/Miss Dior.jpeg"],
    category: "Scents",
    description:
      "An elegant floral fragrance that blends romance and sophistication for any occasion.",
  },
  {
    id: 33,
    name: "Georgitt Plain Scarfs",
    price: 2800,
    originalPrice: Math.round(2800 * 1.2),
    tag: "6 Pieces Deal",
    description: "Plain georgitt scarfs bundle for variety.",
    images: ["/images/bundle.jpeg"],
    category: "Stoles",
  },
  {
    id: 34,
    name: "Silk Stuff Scarf",
    price: 750,
    originalPrice: Math.round(750 * 1.2),
    description: "Luxurious silk scarf for formal wear.",
    images: ["/images/silk1.webp"],
    category: "Stoles",
  },
  {
    id: 35,
    name: "Cotton Stuff Scarfs",
    price: 799,
    originalPrice: Math.round(799 * 1.2),
    description: "Soft cotton scarfs for casual comfort.",
    images: ["/images/cotton hijab.webp"],
    category: "Stoles",
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params?.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="p-8">
        <Navbar />
        <h1 className="text-xl font-bold">Product not found</h1>
        <Link href="/" className="text-blue-600 underline">
          Go back to Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-600">{product.description}</p>
        <p className="mt-2">
          <span className="text-lg font-semibold">Rs {product.price}</span>{" "}
          <span className="line-through text-gray-400 ml-2">
            Rs {product.originalPrice}
          </span>
        </p>
        <div className="mt-4">
          {product.images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={product.name}
              width={300}
              height={300}
              className="rounded-lg shadow"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
