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
  { id: 1, name: "Zarar Gold", price: 2499, originalPrice: 2999, tag: "Sale", images: ["/images/zaara..jpeg"], category: "Scents", description: "Luxurious gold fragrance for every occasion." },
  { id: 2, name: "Janan", price: 1900, originalPrice: 2280, tag: "Sale", images: ["/images/golsz..jpeg"], category: "Scents", description: "Refreshing floral aroma with subtle sweetness." },
  { id: 3, name: "Exclusive", price: 2599, originalPrice: 3118, tag: "Sale", images: ["/images/exclusive.jpeg"], category: "Scents", description: "A premium scent that stands out." },
  { id: 4, name: "All rounder by Shoaib Malik", price: 4999, originalPrice: 5998, tag: "Sale", images: ["/images/all rounder j..jpeg"], category: "Scents", description: "Versatile fragrance loved by all." },
  { id: 5, name: "Spark", price: 2900, originalPrice: 3480, tag: "Sale", images: ["/images/spark.jpeg"], category: "Scents", description: "Ignite your senses with a sparkling scent." },
  { id: 6, name: "Uroosa", price: 2500, originalPrice: 3000, tag: "Premium", images: ["/images/uroosa.jpeg"], category: "Scents", description: "Elegant fragrance for the modern personality." },
  { id: 7, name: "Dior", price: 2499, originalPrice: 2998, tag: "Exclusive", images: ["/images/Miss Dior.jpeg"], category: "Scents", description: "Classic Dior perfume with timeless elegance." },
  { id: 8, name: "Channel 5 in 1 set", price: 2499, originalPrice: 2998, tag: "Exclusive", images: ["/images/channel set.jpg"], category: "Scents", description: "Five iconic fragrances in one set." },
  { id: 9, name: "Gucci Flora", price: 799, originalPrice: 959, images: ["/images/Gucci Flora.webp"], category: "Scents", description: "Floral and fresh scent for daily wear." },
  { id: 10, name: "She Pen Perfume set", price: 999, originalPrice: 1199, images: ["/images/she pen.webp"], category: "Scents", description: "Compact perfume set for on-the-go elegance." },
  { id: 11, name: "J. Pen Perfume Set", price: 999, originalPrice: 1199, images: ["/images/PEN.jpeg"], category: "Scents", description: "Set of fine fragrances with unique notes." },

  // WATCHES
  { id: 12, name: "Rich Gold Elegant Watch", price: 1999, images: ["/images/fancy 3.jpeg"], tag: "1 Piece", category: "Watches", description: "Gold-toned watch with elegant design." },
  { id: 13, name: "Black Aura", price: 1999, images: ["/images/6 aura.jpeg"], tag: "Limited", category: "Watches", description: "Sleek black watch with premium finish." },
  { id: 14, name: "Classic Silver Dial", price: 1999, images: ["/images/wt.jpeg"], tag: "1 Piece", category: "Watches", description: "Timeless silver dial watch." },
  { id: 15, name: "Fancy Neavy Blue Watch", price: 1999, images: ["/images/fancy 2.jpeg"], tag: "1 Piece", category: "Watches", description: "Bold navy blue watch with charm." },
  { id: 16, name: "Fancy Rose Copper", price: 1999, images: ["/images/w5.jpeg"], tag: "Luxury", category: "Watches", description: "Rose copper watch with luxury feel." },
  { id: 17, name: "Classic Women", price: 1499, images: ["/images/w6.jpeg"], category: "Watches", description: "Elegant watch for women." },
  { id: 18, name: "CK Gold Black Couple", price: 2499, images: ["/images/CK Gold Black Couple.jpeg"], tag: "Classy", category: "Watches", description: "Matching couple watch set in gold and black." },
  { id: 19, name: "CK Black Gold Couple", price: 2499, images: ["/images/CK Black Gold Couple.jpeg"], tag: "Classy", category: "Watches", description: "Stylish couple watch with black and gold accents." },
  { id: 20, name: "CK Black Grey Couple", price: 2499, images: ["/images/CK Black Grey Couple.jpeg"], tag: "Classy", category: "Watches", description: "Trendy couple watches in black and grey." },
  { id: 21, name: "Brown Leather", price: 2499, images: ["/images/leatherwatch.jpeg"], tag: "New", category: "Watches", description: "Classic brown leather watch." },
  { id: 22, name: "Active Pro Watch", price: 279, images: ["/images/smartt.jpeg"], tag: "Limited", category: "Watches", description: "Affordable smart watch with modern features." },

  // BAGS
  { id: 23, name: "Elegant Tote Bag", price: 2200, originalPrice: 3000, tag: "New", images: ["/images/full moon.jpeg"], category: "Bags", description: "Spacious tote bag with elegant design." },
  { id: 24, name: "Fancy Clutch", price: 1599, originalPrice: 2200, tag: "Sale", images: ["/images/black bride.jpeg"], category: "Bags", description: "Chic clutch perfect for parties." },
  { id: 25, name: "Hijab Tote", price: 1799, originalPrice: 2800, tag: "New", images: ["/images/hijab tote.jpeg"], category: "Bags", description: "Stylish tote for hijab accessories." },
  { id: 26, name: "LV Leather Bag", price: 2199, originalPrice: 2700, tag: "Sale", images: ["/images/lv blac 2.jpeg"], category: "Bags", description: "Premium LV leather handbag." },
  { id: 27, name: "Canva Design Tote", price: 1799, originalPrice: 2400, tag: "New", images: ["/images/CANVA.jpeg"], category: "Bags", description: "Trendy tote with creative design." },
  { id: 28, name: "Mini Hijab Tote", price: 1399, originalPrice: 1800, tag: "New", images: [
      "/images/mini hijab peach.jpeg",
      "/images/mini hijab neavy blue.jpeg",
      "/images/mini hijab cream.jpeg",
      "/images/mini hijab grey.jpeg",
      "/images/mini hijab black.jpeg",
      "/images/mini hijab orange.jpeg"
    ], category: "Bags", description: "Mini tote available in multiple colors." },
  { id: 29, name: "Fancy Gold Clutch", price: 1599, originalPrice: 2000, tag: "Sale", images: ["/images/ride gold.jpeg"], category: "Bags", description: "Elegant gold clutch for special occasions." },
  { id: 30, name: "Luna Carry", price: 2999, originalPrice: 3400, tag: "Sale", images: ["/images/Luna carry brown solid.jpeg"], category: "Bags", description: "Durable carry bag with premium finish." },
  { id: 31, name: "LV Leather Bag", price: 2199, originalPrice: 2700, tag: "Sale", images: ["/images/lv black off white.jpeg"], category: "Bags", description: "Luxury LV leather bag." },
  { id: 32, name: "Party Wear Clutch", price: 1499, originalPrice: 2700, tag: "Sale", images: ["/images/fancy grey.jpeg"], category: "Bags", description: "Perfect clutch for party wear." },

  // STOLES
  { id: 33, name: "Chiffon Plain Scarfs", price: 1200, originalPrice: 1500, tag: "Pastels", images: ["/images/3 stols.jpeg"], category: "Stoles", description: "Soft chiffon scarves in pastel shades." },
  { id: 34, name: "Georgitt Plain Scarfs", price: 1800, tag: "6 Pieces Deal", images: ["/images/bundle.jpeg"], category: "Stoles", description: "Bundle of 6 stylish scarves." },
  { id: 35, name: "Silk Stuff Scarf", price: 950, images: ["/images/silk1.webp"], category: "Stoles", description: "Premium silk scarf with smooth texture." },
  { id: 36, name: "Cotton Stuff Scarfs", price: 1350, originalPrice: 1600, images: ["/images/cotton hijab.webp"], category: "Stoles", description: "Comfortable cotton scarves for daily use." },
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

        {/* Product Navigation */}
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
                href={`https://wa.me/?text=${encodeURIComponent("I'm interested in " + product.name)}`}
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
