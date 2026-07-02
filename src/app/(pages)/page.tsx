import Slider from "@/components/Slider";
import { productRepo } from "@/helpers/productRepo";
import Image from "next/image";
import Link from "next/link";
import { priceFormat } from "@/lib/utils";
import { Star, ArrowRight, ShieldCheck, Truck, RotateCcw } from "lucide-react";

async function getProducts() {
  try {
    const products = await productRepo.getHomepageProducts(8);
    return products;
  } catch (error) {
    console.error("Failed to fetch products for homepage:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="bg-slate-50 min-h-screen pb-16">
      {/* Slider Hero */}
      <Slider />

      {/* Trust Badges */}
      <section className="bg-white border-b py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 text-sm sm:text-base">Free Worldwide Shipping</h4>
              <p className="text-xs text-slate-500">Free shipping on all orders over $150</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 text-sm sm:text-base">Secure Payments</h4>
              <p className="text-xs text-slate-500">100% SSL protected payment gateways</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="p-3 bg-sky-50 text-sky-600 rounded-2xl">
              <RotateCcw size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 text-sm sm:text-base">Easy 30-Day Returns</h4>
              <p className="text-xs text-slate-500">Hassle-free replacement or refund guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Categories */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Shop by Category</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Explore our range of premium products</p>
          </div>
          <Link href="/store" className="text-xs sm:text-sm font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 group">
            Browse All Store <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {homeCategories.map((cat) => (
            <Link
              key={cat.value}
              href={`/store/${cat.value.toLowerCase()}`}
              className="group relative h-40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col justify-end p-4 border border-slate-100"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent z-10" />
              </div>
              <div className="relative z-20 text-white">
                <h4 className="font-bold text-sm tracking-wide">{cat.label}</h4>
                <span className="text-[10px] text-slate-300 font-medium group-hover:underline flex items-center gap-1 mt-1">
                  Explore <ArrowRight size={10} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Trending Products</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Discover popular choices from our customers</p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm">
            <p className="text-slate-500">No products found. Please seed the database first.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: any) => {
              const discount = product.discountPercentage || 0;
              return (
                <div
                  key={product._id}
                  className="group relative bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                >
                  {/* Badge */}
                  {discount > 0 && (
                    <span className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full z-10 shadow-sm">
                      {discount}% OFF
                    </span>
                  )}
                  {/* Image Container */}
                  <Link href={`/${product._id}`} className="relative block aspect-square bg-slate-50 overflow-hidden">
                    <Image
                      src={product.thumbnail || product.images[0]}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Body Content */}
                  <div className="p-4 flex flex-col flex-grow">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      {product.brand}
                    </span>
                    <Link
                      href={`/${product._id}`}
                      className="font-bold text-sm sm:text-base text-slate-800 hover:text-rose-600 line-clamp-1 transition-colors mb-2"
                    >
                      {product.title}
                    </Link>

                    {/* Ratings */}
                    <div className="flex items-center gap-1.5 mb-4">
                      <div className="flex text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            fill={i < Math.floor(product.rating || 0) ? "currentColor" : "none"}
                            className="stroke-amber-400"
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500">
                        ({product.rating || "0.0"})
                      </span>
                    </div>

                    {/* Price & Cart footer */}
                    <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-base sm:text-lg font-black text-slate-900 leading-none">
                          {priceFormat(product.discountPrice || product.price)}
                        </span>
                        {discount > 0 && (
                          <del className="text-[10px] sm:text-xs text-slate-400 font-semibold mt-1">
                            {priceFormat(product.price)}
                          </del>
                        )}
                      </div>
                      <Link href={`/${product._id}`}>
                        <span className="text-xs font-bold text-rose-600 hover:text-white border border-rose-100 hover:bg-rose-600 rounded-lg px-3 py-1.5 transition-all shadow-sm">
                          View details
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

const homeCategories = [
  {
    label: "Mobiles",
    value: "Mobiles",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&auto=format&fit=crop&q=80",
  },
  {
    label: "Laptops",
    value: "Laptops",
    image: "https://images.unsplash.com/photo-1496181130204-755241524eab?w=300&auto=format&fit=crop&q=80",
  },
  {
    label: "TV & Display",
    value: "TV & Display",
    image: "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=300&auto=format&fit=crop&q=80",
  },
  {
    label: "Smart watches",
    value: "Smart watches",
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=300&auto=format&fit=crop&q=80",
  },
  {
    label: "Tablet",
    value: "Tablet",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&auto=format&fit=crop&q=80",
  },
  {
    label: "Accessories",
    value: "Accessories",
    image: "https://images.unsplash.com/photo-1588449668338-d151688ab97c?w=300&auto=format&fit=crop&q=80",
  },
];
