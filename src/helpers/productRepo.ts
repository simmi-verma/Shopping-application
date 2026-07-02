import connect from "./db";
import Product from "@/models/Product";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

const jsonPath = path.join(process.cwd(), "products.json");

const initialProducts = [
  // --- MOBILES ---
  {
    _id: "6a462782014832cb903b29c8",
    title: "iPhone 15 Pro",
    description: "Experience the power of the A17 Pro chip, a titanium design, and an advanced camera system.",
    price: 999,
    discountPercentage: 10,
    rating: 4.8,
    brand: "Apple",
    category: "Mobiles",
    thumbnail: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&auto=format&fit=crop&q=60",
    images: ["https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&auto=format&fit=crop&q=60"],
    stock: 50,
  },
  {
    _id: "6a462782014832cb903b29c9",
    title: "Samsung Galaxy S24 Ultra",
    description: "The ultimate Android experience with S-Pen support, Snapdragon 8 Gen 3, and a 200MP camera.",
    price: 1299,
    discountPercentage: 15,
    rating: 4.7,
    brand: "Samsung",
    category: "Mobiles",
    thumbnail: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60",
    images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60"],
    stock: 35,
  },
  {
    _id: "6a462782014832cb903b29ca",
    title: "OnePlus 12",
    description: "Smooth beyond belief with Hasselblad camera tuning, Snapdragon 8 Gen 3, and 100W fast charging.",
    price: 799,
    discountPercentage: 8,
    rating: 4.6,
    brand: "OnePlus",
    category: "Mobiles",
    thumbnail: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60",
    images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60"],
    stock: 45,
  },
  {
    _id: "6a462782014832cb903b29cb",
    title: "Xiaomi 14 Pro",
    description: "Leica professional optics camera, Snapdragon 8 Gen 3, and a stunning 120Hz display.",
    price: 899,
    discountPercentage: 12,
    rating: 4.5,
    brand: "Xiaomi",
    category: "Mobiles",
    thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60",
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60"],
    stock: 40,
  },
  {
    _id: "6a462782014832cb903b29cc",
    title: "Realme GT 5",
    description: "Speed meets style with 240W charging capability and a sleek futuristic design.",
    price: 499,
    discountPercentage: 10,
    rating: 4.4,
    brand: "realme",
    category: "Mobiles",
    thumbnail: "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?w=500&auto=format&fit=crop&q=60",
    images: ["https://images.unsplash.com/photo-1565630916779-e303be97b6f5?w=500&auto=format&fit=crop&q=60"],
    stock: 30,
  },

  // --- LAPTOPS ---
  {
    _id: "6a462782014832cb903b29cd",
    title: "MacBook Air M3",
    description: "Supercharged by the M3 chip, this fanless aluminum laptop offers up to 18 hours of battery life.",
    price: 1099,
    discountPercentage: 5,
    rating: 4.9,
    brand: "Apple",
    category: "Laptops",
    thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60",
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60"],
    stock: 25,
  },
  {
    _id: "6a462782014832cb903b29ce",
    title: "Samsung Galaxy Book4 Pro",
    description: "Dynamic AMOLED 2X touchscreen laptop with Intel Core Ultra processor and thin profile.",
    price: 1449,
    discountPercentage: 10,
    rating: 4.6,
    brand: "Samsung",
    category: "Laptops",
    thumbnail: "https://images.unsplash.com/photo-158872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=60",
    images: ["https://images.unsplash.com/photo-158872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=60"],
    stock: 20,
  },
  {
    _id: "6a462782014832cb903b29cf",
    title: "Xiaomi RedmiBook 15 Pro",
    description: "High-performance laptop with a Super Retina 3.2K display and AMD Ryzen 7 CPU.",
    price: 799,
    discountPercentage: 15,
    rating: 4.4,
    brand: "Xiaomi",
    category: "Laptops",
    thumbnail: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60",
    images: ["https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60"],
    stock: 30,
  },

  // --- TV & DISPLAY ---
  {
    _id: "6a462782014832cb903b29d0",
    title: "LG OLED 4K Smart TV",
    description: "Self-lit pixels deliver perfect black, infinite contrast, and over a billion rich colors.",
    price: 1799,
    discountPercentage: 15,
    rating: 4.8,
    brand: "Samsung",
    category: "TV & Display",
    thumbnail: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&auto=format&fit=crop&q=60",
    images: ["https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&auto=format&fit=crop&q=60"],
    stock: 15,
  },
  {
    _id: "6a462782014832cb903b29d1",
    title: "Xiaomi Smart TV 5A",
    description: "Bezel-less design, vivid display, and Dolby Audio support for an immersive home experience.",
    price: 299,
    discountPercentage: 20,
    rating: 4.3,
    brand: "Xiaomi",
    category: "TV & Display",
    thumbnail: "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=500&auto=format&fit=crop&q=60",
    images: ["https://images.unsplash.com/photo-1461151304267-38535e780c79?w=500&auto=format&fit=crop&q=60"],
    stock: 40,
  },

  // --- SMART WATCHES ---
  {
    _id: "6a462782014832cb903b29d2",
    title: "Apple Watch Ultra 2",
    description: "The most rugged and capable Apple Watch, designed for endurance, exploration, and outdoor adventure.",
    price: 799,
    discountPercentage: 5,
    rating: 4.9,
    brand: "Apple",
    category: "Smart watches",
    thumbnail: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60",
    images: ["https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60"],
    stock: 25,
  },
  {
    _id: "6a462782014832cb903b29d3",
    title: "Samsung Galaxy Watch 6",
    description: "Know your health inside out with advanced sleep coaching, body composition analysis, and heart monitoring.",
    price: 299,
    discountPercentage: 12,
    rating: 4.5,
    brand: "Samsung",
    category: "Smart watches",
    thumbnail: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60",
    images: ["https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60"],
    stock: 50,
  },
  {
    _id: "6a462782014832cb903b29d4",
    title: "OnePlus Watch 2",
    description: "Dual-engine architecture offers up to 100 hours of battery life with precision fitness tracking.",
    price: 299,
    discountPercentage: 10,
    rating: 4.4,
    brand: "OnePlus",
    category: "Smart watches",
    thumbnail: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500&auto=format&fit=crop&q=60",
    images: ["https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500&auto=format&fit=crop&q=60"],
    stock: 30,
  },

  // --- TABLETS ---
  {
    _id: "6a462782014832cb903b29d5",
    title: "iPad Pro 12.9 M2",
    description: "Stunning Liquid Retina XDR display, M2 chip performance, and ultra-fast wireless connectivity.",
    price: 1099,
    discountPercentage: 7,
    rating: 4.9,
    brand: "Apple",
    category: "Tablet",
    thumbnail: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60",
    images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60"],
    stock: 20,
  },
  {
    _id: "6a462782014832cb903b29d6",
    title: "Samsung Galaxy Tab S9 Ultra",
    description: "Gigantic Dynamic AMOLED 2X display, water and dust resistant, equipped with Snapdragon 8 Gen 2.",
    price: 1199,
    discountPercentage: 10,
    rating: 4.8,
    brand: "Samsung",
    category: "Tablet",
    thumbnail: "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=500&auto=format&fit=crop&q=60",
    images: ["https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=500&auto=format&fit=crop&q=60"],
    stock: 15,
  },
  {
    _id: "6a462782014832cb903b29d7",
    title: "Xiaomi Pad 6",
    description: "Sleek all-metal body with a 144Hz WQHD+ display, Snapdragon 870 processor, and quad speakers.",
    price: 399,
    discountPercentage: 15,
    rating: 4.5,
    brand: "Xiaomi",
    category: "Tablet",
    thumbnail: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&auto=format&fit=crop&q=60",
    images: ["https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&auto=format&fit=crop&q=60"],
    stock: 40,
  },

  // --- ACCESSORIES ---
  {
    _id: "6a462782014832cb903b29d8",
    title: "Apple AirPods Pro 2",
    description: "MagSafe charging case, intelligent noise cancellation, adaptive transparency, and spatial audio.",
    price: 249,
    discountPercentage: 10,
    rating: 4.8,
    brand: "Apple",
    category: "Accessories",
    thumbnail: "https://images.unsplash.com/photo-1588449668338-d151688ab97c?w=500&auto=format&fit=crop&q=60",
    images: ["https://images.unsplash.com/photo-1588449668338-d151688ab97c?w=500&auto=format&fit=crop&q=60"],
    stock: 100,
  },
  {
    _id: "6a462782014832cb903b29d9",
    title: "Samsung Galaxy Buds2 Pro",
    description: "Hear sound as it was intended with 24-bit Hi-Fi audio quality and active noise cancellation.",
    price: 229,
    discountPercentage: 15,
    rating: 4.6,
    brand: "Samsung",
    category: "Accessories",
    thumbnail: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=500&auto=format&fit=crop&q=60",
    images: ["https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=500&auto=format&fit=crop&q=60"],
    stock: 80,
  },
  {
    _id: "6a462782014832cb903b29da",
    title: "OnePlus Buds Pro 2",
    description: "Co-created with Dynaudio, featuring smart adaptive noise cancellation and spatial audio.",
    price: 179,
    discountPercentage: 12,
    rating: 4.5,
    brand: "OnePlus",
    category: "Accessories",
    thumbnail: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60",
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60"],
    stock: 90,
  },
  {
    _id: "6a462782014832cb903b29db",
    title: "Xiaomi Power Bank 20000mAh",
    description: "Two-way quick charging, high density lithium polymer batteries, and triple USB output ports.",
    price: 39,
    discountPercentage: 8,
    rating: 4.3,
    brand: "Xiaomi",
    category: "Accessories",
    thumbnail: "https://images.unsplash.com/photo-1609592424109-dd9892f1b17c?w=500&auto=format&fit=crop&q=60",
    images: ["https://images.unsplash.com/photo-1609592424109-dd9892f1b17c?w=500&auto=format&fit=crop&q=60"],
    stock: 120,
  }
];

function getJsonProducts() {
  if (!fs.existsSync(jsonPath)) {
    const prepared = initialProducts.map(p => ({
      ...p,
      discountPrice: Math.round(p.price * (1 - p.discountPercentage / 100))
    }));
    fs.writeFileSync(jsonPath, JSON.stringify(prepared, null, 2));
  }
  try {
    const data = fs.readFileSync(jsonPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function saveJsonProducts(products: any[]) {
  fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2));
}

// Check MongoDB connection availability
async function isMongoConnected(): Promise<boolean> {
  try {
    await connect();
    return mongoose.connections[0].readyState === 1;
  } catch (error) {
    return false;
  }
}

export const productRepo = {
  async getAllProducts(params: {
    page: number;
    limit: number;
    brand: string[];
    category: string[];
    rating: string | null;
    offer: string | null;
    sort: string | null;
    order: string | null;
    minPrice: number;
    maxPrice: number;
  }) {
    const useMongo = await isMongoConnected();

    if (useMongo) {
      const filter: Record<string, any> = {};

      let query = Product.find(filter);
      let totalDocQuery = Product.find(filter);

      // Filter by price range
      query = query.find({ price: { $gte: params.minPrice, $lte: params.maxPrice } });
      totalDocQuery = totalDocQuery.find({ price: { $gte: params.minPrice, $lte: params.maxPrice } });

      if (params.category.length > 0) {
        query = query.find({
          category: { $in: params.category.map((cat) => new RegExp(cat, "i")) },
        });
        totalDocQuery = totalDocQuery.find({
          category: { $in: params.category.map((cat) => new RegExp(cat, "i")) },
        });
      }

      if (params.brand.length > 0) {
        query = query.find({
          brand: { $in: params.brand.map((br) => new RegExp(br, "i")) },
        });
        totalDocQuery = totalDocQuery.find({
          brand: { $in: params.brand.map((br) => new RegExp(br, "i")) },
        });
      }

      if (params.rating) {
        query = query.find({ rating: { $gte: parseFloat(params.rating) } });
        totalDocQuery = totalDocQuery.find({
          rating: { $gte: parseFloat(params.rating) },
        });
      }

      if (params.offer) {
        query = query.find({ discountPercentage: { $gte: parseFloat(params.offer) } });
        totalDocQuery = totalDocQuery.find({
          discountPercentage: { $gte: parseFloat(params.offer) },
        });
      }

      let sortOption: Record<string, any> = {};
      if (params.sort && params.order) {
        sortOption[params.sort] = params.order === "asc" ? 1 : -1;
      } else {
        sortOption = { _id: 1 };
      }

      const totalDoc = await totalDocQuery.countDocuments();
      const products = await query
        .sort(sortOption)
        .skip((params.page - 1) * params.limit)
        .limit(params.limit)
        .lean();

      return {
        products: JSON.parse(JSON.stringify(products)),
        totalDoc,
      };
    } else {
      // In-memory JSON database logic
      let list = getJsonProducts();

      // Filter by price range
      list = list.filter((p: any) => p.price >= params.minPrice && p.price <= params.maxPrice);

      // Filter by category
      if (params.category.length > 0) {
        const catLower = params.category.map(c => c.toLowerCase());
        list = list.filter((p: any) => catLower.includes(p.category.toLowerCase()));
      }

      // Filter by brand
      if (params.brand.length > 0) {
        const brandLower = params.brand.map(b => b.toLowerCase());
        list = list.filter((p: any) => brandLower.includes(p.brand.toLowerCase()));
      }

      // Filter by rating
      if (params.rating) {
        const minRating = parseFloat(params.rating);
        list = list.filter((p: any) => p.rating >= minRating);
      }

      // Filter by offer
      if (params.offer) {
        const minOffer = parseFloat(params.offer);
        list = list.filter((p: any) => p.discountPercentage >= minOffer);
      }

      // Sort
      if (params.sort && params.order) {
        const field = params.sort;
        const isAsc = params.order === "asc";
        list.sort((a: any, b: any) => {
          if (a[field] < b[field]) return isAsc ? -1 : 1;
          if (a[field] > b[field]) return isAsc ? 1 : -1;
          return 0;
        });
      }

      const totalDoc = list.length;
      const paginatedList = list.slice((params.page - 1) * params.limit, params.page * params.limit);

      return {
        products: paginatedList,
        totalDoc,
      };
    }
  },

  async getProductById(id: string) {
    const useMongo = await isMongoConnected();

    if (useMongo) {
      try {
        const product = await Product.findById(id).lean();
        return product ? JSON.parse(JSON.stringify(product)) : null;
      } catch (error) {
        return null;
      }
    } else {
      const list = getJsonProducts();
      return list.find((p: any) => p._id === id) || null;
    }
  },

  async addProduct(productData: any) {
    const useMongo = await isMongoConnected();

    if (useMongo) {
      // Check if product exists
      const product = await Product.findOne({ title: productData.title });
      if (product) {
        throw new Error("Product already exists");
      }

      const discountPrice = Math.round(productData.price * (1 - (productData.discountPercentage || 0) / 100));
      const newProduct = new Product({
        ...productData,
        discountPrice,
      });

      const saved = await newProduct.save();
      return JSON.parse(JSON.stringify(saved));
    } else {
      const list = getJsonProducts();
      const product = list.find((p: any) => p.title.toLowerCase() === productData.title.toLowerCase());
      if (product) {
        throw new Error("Product already exists");
      }

      const newId = `json-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const discountPrice = Math.round(productData.price * (1 - (productData.discountPercentage || 0) / 100));
      const newProduct = {
        ...productData,
        _id: newId,
        discountPrice,
      };

      list.push(newProduct);
      saveJsonProducts(list);
      return newProduct;
    }
  },

  async getHomepageProducts(limit: number) {
    const useMongo = await isMongoConnected();

    if (useMongo) {
      try {
        const products = await Product.find({}).limit(limit).lean();
        return JSON.parse(JSON.stringify(products));
      } catch (error) {
        return [];
      }
    } else {
      const list = getJsonProducts();
      return list.slice(0, limit);
    }
  }
};
