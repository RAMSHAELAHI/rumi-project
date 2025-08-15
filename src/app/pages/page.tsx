"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Facebook, Mail } from "lucide-react";
import { SiTiktok } from "react-icons/si"; // ✅ TikTok logo from react-icons
import Topbar from "@/components/Topbar"; // ✅ Added Topbar
import Navbar from "@/components/Navbar"; // ✅ Added Navbar

// Base button style
const buttonBase =
  "flex items-center justify-between py-4 px-6 rounded-xl transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

// Reusable SocialButton component
const SocialButton = ({
  href,
  label,
  bgColor,
  hoverColor,
  outlineColor,
  Icon,
  secondaryText,
}: {
  href: string;
  label: string;
  bgColor: string;
  hoverColor: string;
  outlineColor: string;
  Icon: React.ElementType;
  secondaryText: string;
}) => (
  <Link
    href={href}
    target={href.startsWith("mailto:") ? undefined : "_blank"}
    rel="noopener noreferrer"
    aria-label={`Visit ${label}`}
    className={`${buttonBase} ${bgColor} hover:${hoverColor} text-white focus-visible:outline-${outlineColor}`}
  >
    <div className="flex items-center gap-4">
      <Icon className="w-6 h-6" />
      <span className="text-lg font-medium">{label}</span>
    </div>
    <span className="text-sm">{secondaryText}</span>
  </Link>
);

const SocialLinks = () => {
  return (
    <>
      {/* 🆕 Topbar */}
      <Topbar />

      {/* 🆕 Navbar */}
      <Navbar />

      {/* Main Social Links Content */}
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#F0F2F3] to-[#ffffff]">
        <div className="w-full max-w-2xl mx-auto p-6 rounded-2xl shadow-xl bg-white">
          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-bold text-center text-[#272343] mb-6">
            Let’s Connect!
          </h1>
          <p className="text-center text-gray-600 mb-10">
            Follow us on social media or email us to stay in touch with Rumi ✨
          </p>

          {/* Social Buttons */}
          <div className="flex flex-col gap-5">
            <SocialButton
              href="https://www.facebook.com/share/18uy3b7DNL/"
              label="Facebook"
              bgColor="bg-[#1877F2]"
              hoverColor="bg-[#145DBF]"
              outlineColor="[#1877F2]"
              Icon={Facebook}
              secondaryText="Visit →"
            />
            <SocialButton
              href="https://www.instagram.com/attractions_by_rumi?igsh=MWZ0end6d2gxc2Ztcg=="
              label="Instagram"
              bgColor="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
              hoverColor="opacity-90"
              outlineColor="pink-500"
              Icon={Instagram}
              secondaryText="Visit →"
            />
            <SocialButton
              href="https://www.tiktok.com/@be.attractive.wit?_t=ZS-8xpM39ZamJA&_r=1"
              label="TikTok"
              bgColor="bg-black"
              hoverColor="bg-gray-800"
              outlineColor="black"
              Icon={SiTiktok} // ✅ Using react-icons TikTok
              secondaryText="Visit →"
            />
            <SocialButton
              href="mailto:beattractivewithrumi@gmail.com"
              label="Email Us"
              bgColor="bg-[#D93025]"
              hoverColor="bg-[#B1271B]"
              outlineColor="[#D93025]"
              Icon={Mail}
              secondaryText="Send →"
            />
          </div>

          {/* Footer Social Icons */}
          <div className="flex justify-center gap-6 mt-10">
            <Link
              href="https://www.facebook.com/share/18uy3b7DNL/"
              target="_blank"
              aria-label="Facebook"
              className="text-[#1877F2] hover:scale-110 transition"
            >
              <Facebook className="w-6 h-6" />
            </Link>
            <Link
              href="https://www.instagram.com/be_attractive_with_rumi?igsh=MWZ0end6d2gxc2Ztcg=="
              target="_blank"
              aria-label="Instagram"
              className="text-pink-500 hover:scale-110 transition"
            >
              <Instagram className="w-6 h-6" />
            </Link>
            <Link
              href="https://www.tiktok.com/@be.attractive.wit?_t=ZS-8xpM39ZamJA&_r=1"
              target="_blank"
              aria-label="TikTok"
              className="text-black hover:scale-110 transition"
            >
              <SiTiktok className="w-6 h-6" /> {/* ✅ Using react-icons TikTok */}
            </Link>
            <Link
              href="mailto:beattractivewithrumi@gmail.com"
              aria-label="Email"
              className="text-red-500 hover:scale-110 transition"
            >
              <Mail className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialLinks;
