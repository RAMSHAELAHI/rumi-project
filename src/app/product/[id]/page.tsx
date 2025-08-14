


'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { toast } from 'sonner';
import {
  ChevronRight,
  ChevronLeftCircle,
  ChevronRightCircle,
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';


const products = [
  // ✅ SCENTS (mixed ladies & gents)
  { id: 7, name: "Dior", price: 2499, originalPrice: Math.round(2499 * 1.2), tag: "Exclusive", description: "A luxurious floral scent with modern elegance.", images: ["/images/Miss Dior.jpeg"], category: "Scents" },
  { id: 1, name: "Zarar", price: 2499, originalPrice: Math.round(2499 * 1.2), tag: "Sale", description: "A bold fragrance for confident personalities.", images: ["/images/zaara..jpeg"], category: "Scents" },
  { id: 9, name: "Gucci Flora", price: 799, originalPrice: Math.round(799 * 1.2), description: "A refreshing and floral perfume inspired by nature.", images: ["/images/Gucci Flora.webp"], category: "Scents" },
  { id: 4, name: "All rounder by Shoaib Malik", price: 4999, originalPrice: Math.round(4999 * 1.2), tag: "Sale", description: "A versatile scent for every occasion.", images: ["/images/all rounder j..jpeg"], category: "Scents" },
  { id: 11, name: "J. Pen Perfume Set", price: 999, originalPrice: Math.round(999 * 1.2), description: "Compact and elegant perfumes for on-the-go freshness.", images: ["/images/PEN.jpeg"], category: "Scents" },
  { id: 6, name: "Uroosa", price: 2500, originalPrice: Math.round(2500 * 1.2), tag: "Premium", description: "A premium scent with a rich, deep aroma.", images: ["/images/uroosa.jpeg"], category: "Scents" },
  { id: 5, name: "Spark", price: 2900, originalPrice: Math.round(2900 * 1.2), tag: "Sale", description: "An energetic fragrance full of life and spark.", images: ["/images/Spark2.jpeg"], category: "Scents" },
  { id: 10, name: "She Pen Perfume set", price: 999, originalPrice: Math.round(999 * 1.2), description: "Stylish and portable scents for women.", images: ["/images/she pen.webp"], category: "Scents" },
  { id: 2, name: "Janan", price: 1900, originalPrice: Math.round(1900 * 1.2), tag: "Sale", description: "A traditional and timeless fragrance.", images: ["/images/golsz..jpeg"], category: "Scents" },
  { id: 8, name: "Channel 5 in 1 set", price: 2499, originalPrice: Math.round(2499 * 1.2), tag: "Exclusive", description: "Five classic scents in one premium package.", images: ["/images/channel set.jpg"], category: "Scents" },
  { id: 3, name: "Exclusive", price: 2599, originalPrice: Math.round(2599 * 1.2), tag: "Sale", description: "An exclusive scent for special occasions.", images: ["/images/Exclusiv.webp"], category: "Scents" },

  // ✅ WATCHES (standard + luxury + smart watches together)
  { id: 12, name: "Rich Gold Fancy Watch", price: 1999, originalPrice: Math.round(1999 * 1.2), tag: "Single Piece", description: "A gold-tone watch for elegant occasions.", images: ["/images/fancy 3.jpeg"], category: "Watches" },
  { id: 13, name: "Women in Black Aura", price: 1999, originalPrice: Math.round(1999 * 1.2), tag: "Luxury", description: "A luxurious black dial watch for women.", images: ["/images/6 aura.jpeg"], category: "Watches" },
  { id: 14, name: "Classic Silver Dial", price: 1999, originalPrice: Math.round(1999 * 1.2), description: "A timeless silver dial watch for everyday wear.", images: ['/images/wt.jpeg'], category: "Watches" },
  { id: 15, name: "Fancy Neavy Blue Watch", price: 1999, originalPrice: Math.round(1999 * 1.2), description: "A stylish navy blue watch with modern design.", images: ["/images/fancy 2.jpeg"], category: "Watches" },
  { id: 16, name: "Fancy Rose Copper", price: 1599, originalPrice: Math.round(1599 * 1.2), description: "A rose copper finish watch with unique charm.", images: ["/images/w5.jpeg"], category: "Watches" },
  { id: 17, name: "Classic Women", price: 1499, originalPrice: Math.round(1499 * 1.2), description: "A classic women's watch for any occasion.", images: ["/images/w6.jpeg"], category: "Watches" },
  { id: 18, name: "Rich Gold", price: 2999, originalPrice: Math.round(2999 * 1.2), tag: "Free Bracelet", description: "A rich gold watch with matching bracelet.", images: ["/images/5 bracelet.jpeg"], category: "Watches" },
  { id: 19, name: "Royal Black Dial", price: 1599, originalPrice: Math.round(1599 * 1.2), tag: "Exclusive", description: "A royal black dial watch with premium finish.", images: ["/images/w4.jpeg"], category: "Watches" },
  { id: 20, name: "Man in Black Aura", price: 2499, originalPrice: Math.round(2499 * 1.2), tag: "Limited", description: "A limited edition black aura men's watch.", images: ["/images/6 aura.jpeg"], category: "Watches" },
  { id: 21, name: "Platinum Elegance", price: 3299, originalPrice: Math.round(3299 * 1.2), tag: "Best Seller", description: "A platinum finish watch for elegant wearers.", images: ["/images/w3.jpeg"], category: "Watches" },
  { id: 22, name: "Elegant Brown", price: 3299, originalPrice: Math.round(3299 * 1.2), tag: "Free Bracelet", description: "An elegant brown watch with bracelet gift.", images: ["/images/4 bracelet.jpeg"], category: "Watches" },
  { id: 23, name: "Platinum Black", price: 2499, originalPrice: Math.round(2499 * 1.2), tag: "Free Chain", description: "A platinum black watch with matching chain.", images: ["/images/w1.jpeg"], category: "Watches" },
  { id: 24, name: "Active Pro Watch", price: 4999, originalPrice: Math.round(4999 * 1.2), tag: "Limited", description: "A smart active pro watch for fitness lovers.", images: ["/images/smartt.jpeg"], category: "Watches" },

  // ✅ BAGS
  { id: 36, name: "Elegant Tote Bag", price: 2200, originalPrice: Math.round(2200 * 1.2), tag: "New", description: "A spacious and elegant tote for daily use.", images: ["/images/full moon.jpeg"], category: "Bags" },
  { id: 37, name: "Fancy Clutch", price: 1699, originalPrice: Math.round(1699 * 1.2), tag: "Sale", description: "A fancy clutch perfect for parties and events.", images: ["/images/black bride.jpeg"], category: "Bags" },
  { id: 38, name: "Hijab Tote", price: 1800, originalPrice: Math.round(1800 * 1.2), tag: "New", description: "A tote designed to match modest fashion.", images: ["/images/hijab tote.jpeg"], category: "Bags" },
  { id: 39, name: "LV Leather Bag", price: 2199, originalPrice: Math.round(2199 * 1.2), tag: "Sale", description: "A premium LV leather bag replica.", images: ["/images/lv blac 2.jpeg"], category: "Bags" },
  { id: 40, name: "Canva Design Tote", price: 1800, originalPrice: Math.round(1800 * 1.2), tag: "New", description: "A stylish tote with unique canva design.", images: ["/images/CANVA.jpeg"], category: "Bags" },
  { id: 41, name: "Fancy Gold Clutch", price: 1599, originalPrice: Math.round(1599 * 1.2), tag: "Sale", description: "A gold clutch for special celebrations.", images: ["/images/ride gold.jpeg"], category: "Bags" },
  { id: 42, name: "Luna Carry", price: 2999, originalPrice: Math.round(2999 * 1.2), tag: "Sale", description: "A large carry bag for travel and style.", images: ["/images/LUNA CARRY BROWN.jpeg"], category: "Bags" },
  { id: 43, name: "LV Leather Bag", price: 2199, originalPrice: Math.round(2199 * 1.2), tag: "Sale", description: "An LV-style leather bag in black/off-white.", images: ["/images/lv black off white.jpeg"], category: "Bags" },

  // ✅ STOLES
  { id: 32, name: 'Chiffon Plain Scarfs', price: 699, originalPrice: Math.round(699 * 1.2), tag: 'Pastels', description: "Soft chiffon scarfs in pastel shades.", images: ['/images/3 stols.jpeg'], category: 'Stoles' },
  { id: 33, name: 'Georgitt Plain Scarfs', price: 2800, originalPrice: Math.round(2800 * 1.2), tag: '6 Pieces Deal', description: "Plain georgitt scarfs bundle for variety.", images: ['/images/bundle.jpeg'], category: 'Stoles' },
  { id: 34, name: 'Silk Stuff Scarf', price: 750, originalPrice: Math.round(750 * 1.2), description: "Luxurious silk scarf for formal wear.", images: ['/images/silk1.webp'], category: 'Stoles' },
  { id: 35, name: 'Cotton Stuff Scarfs', price: 799, originalPrice: Math.round(799 * 1.2), description: "Soft cotton scarfs for casual comfort.", images: ['/images/cotton hijab.webp'], category: 'Stoles' },
];

const ProductDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const currentIndex = products.findIndex(p => p.id.toString() === id);
  const product = products[currentIndex];
  const [imageIndex, setImageIndex] = useState(0);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="text-center py-20 text-xl text-gray-600">
        Product not found
      </div>
    );
  }

  const handleNextImage = () => {
    setImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleNextProduct = () => {
    const nextProduct = products[currentIndex + 1];
    if (nextProduct) {
      router.push(`/product/${nextProduct.id}`);
    }
  };

  const handlePrevProduct = () => {
    const prevProduct = products[currentIndex - 1];
    if (prevProduct) {
      router.push(`/product/${prevProduct.id}`);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/allProducts" className="hover:underline">
            All Products
          </Link>
          <ChevronRight size={16} className="mx-2" />
          <span>{product.name}</span>
        </div>

        {/* Product Navigation Arrows */}
        <div className="flex justify-between mb-6">
          <button
            onClick={handlePrevProduct}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full border ${
              currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            <ArrowLeft size={18} /> Prev Product
          </button>

          <button
            onClick={handleNextProduct}
            disabled={currentIndex === products.length - 1}
            className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full border ${
              currentIndex === products.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            Next Product <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Image Gallery */}
          <div className="relative border rounded-lg overflow-hidden">
            <Image
              src={product.images[imageIndex]}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-[400px] object-cover"
            />

            {/* Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                >
                  <ChevronLeftCircle size={28} />
                </button>

                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                >
                  <ChevronRightCircle size={28} />
                </button>
              </>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 font-serif">
              {product.name}
            </h1>
            <div className="text-xl font-medium text-[#b13368]">
              Rs. {product.price.toFixed(0)}{' '}
              {product.originalPrice && (
                <span className="line-through text-gray-400 text-base ml-2">
                  Rs. {product.originalPrice.toFixed(0)}
                </span>
              )}
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  addToCart({
                    _id: product.id.toString(),
                    title: product.name,
                    price: product.price,
                    imgUrl: product.images[0],
                    quantity: 1,
                  });
                  toast.success('Added to cart 🛍️');
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#b13368] text-white px-6 py-3 rounded-full hover:bg-[#9b2c5b] transition text-sm"
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>

              <Link
                href={`https://wa.me/?text=I'm interested in ${product.name}`}
                className="inline-flex items-center justify-center gap-2 border border-green-600 text-green-700 px-6 py-3 rounded-full hover:bg-green-50 transition text-sm"
              >
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
