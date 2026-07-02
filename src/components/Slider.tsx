"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { Button } from "./ui/button";
import { priceFormat } from "@/lib/utils";
import Link from "next/link";
import axios from "axios";

interface SlideItem {
  id: string;
  img: string;
  title: string;
  price: number;
  discountPrice: number;
  description: string;
}

const Slider = () => {
  const [slides, setSlides] = useState<SlideItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data } = await axios.get("/api/products/all?limit=3");
        if (data && data.products && data.products.length > 0) {
          const formattedSlides = data.products.map((product: any) => ({
            id: product._id,
            img: product.thumbnail || product.images[0],
            title: product.title,
            price: product.discountPrice || product.price, // Selling price
            discountPrice: product.price, // Original price
            description: product.description,
          }));
          setSlides(formattedSlides);
        }
      } catch (error) {
        console.error("Failed to fetch featured products for slider:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <div className="h-[400px] w-full bg-slate-100 animate-pulse flex items-center justify-center">
        <span className="text-slate-400 font-medium">Loading featured products...</span>
      </div>
    );
  }

  const activeSlides = slides.length > 0 ? slides : fallbackSlides;

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-gray-900 to-slate-800 text-white sm:h-[450px] h-[300px]">
      <Swiper
        slidesPerView={1}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-full w-full"
      >
        {activeSlides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            <div className="absolute inset-0 bg-black/40 z-10" />
            <figure className="absolute inset-0 h-full w-full">
              <Image
                src={slide.img}
                alt={slide.title}
                fill={true}
                quality={90}
                priority
                className="object-cover object-center transition-transform duration-[5000ms] hover:scale-105"
              />
            </figure>
            <div className="absolute inset-y-0 left-0 flex items-center z-20 w-full px-6 sm:px-16">
              <div className="max-w-xl bg-black/40 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-rose-500 mb-2">
                  Featured Product
                </span>
                <h2 className="text-2xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-3">
                  {slide.title}
                </h2>
                <p className="text-gray-300 text-xs sm:text-sm line-clamp-2 mb-4">
                  {slide.description}
                </p>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-xl sm:text-3xl font-black text-rose-400">
                    {priceFormat(slide.price)}
                  </span>
                  {slide.discountPrice > slide.price && (
                    <del className="text-gray-400 text-sm sm:text-lg">
                      {priceFormat(slide.discountPrice)}
                    </del>
                  )}
                </div>
                <div>
                  <Link href={`/${slide.id}`}>
                    <Button className="bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg px-6 py-2 transition-all shadow-lg hover:shadow-rose-900/50">
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Slider;

const fallbackSlides = [
  {
    id: "default-1",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80",
    title: "Premium Wireless Audio",
    price: 169,
    discountPrice: 199,
    description: "Immersive sound with industry-leading noise cancelling, crafted for pure acoustic perfection.",
  },
  {
    id: "default-2",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&auto=format&fit=crop&q=80",
    title: "Eco Sport Shoes",
    price: 108,
    discountPrice: 120,
    description: "Lightweight, sustainable running footwear built to enhance comfort and performance.",
  },
];
