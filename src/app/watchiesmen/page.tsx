"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "Smart Watches",
    description: "Technology with style. Fitness, health, and more.",
    image: "/images/smartt.jpeg",
    href: "/watchiesmen/smart",
  },
  {
    id: 2,
    name: "Luxury Watches",
    description: "Timeless elegance and premium craftsmanship.",
    image: "/images/w3.jpeg",
    href: "/watchiesmen/luxury",
  },
  {
    id: 3,
    name: "Leather Watches",
    description: "Classic leather straps with premium finish.",
    image: "/images/leatherwatch.jpeg",
    href: "/watchiesmen/leather",
  },
  {
    id: 4,
    name: "Couple Watches",
    description: "Perfectly paired watches for you and your loved one.",
    image: "/images/fancy 2.jpeg",
    href: "/watchiesmen/couple",
  },
];

const MenWatchesMain = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Men’s Watch Collections
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our exclusive men’s watch categories. From smart features to
            timeless luxury, find the perfect match for your style.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <Link
              href={cat.href}
              key={cat.id}
              className="group bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative w-full h-56">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                  {cat.name}
                </h3>
                <p className="text-gray-600 text-sm mt-2">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MenWatchesMain;
