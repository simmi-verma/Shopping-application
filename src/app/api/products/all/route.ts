import { productRepo } from "@/helpers/productRepo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const saveProduct = await productRepo.addProduct(reqBody);

    return NextResponse.json({
      message: "Product added successfully",
      success: true,
      saveProduct,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const q = req.nextUrl.searchParams;
    const page = parseInt(q.get("page")!) || 1;
    const limit = parseInt(q.get("limit")!) || 10;

    const brand = q.getAll("brand");
    const category = q.getAll("category");
    const rating = q.get("rating");
    const offer = q.get("discountPercentage");
    const sort = q.get("sort");
    const order = q.get("order");
    const minPrice = parseInt(q.get("minPrice")!) || 0;
    const maxPrice = parseInt(q.get("maxPrice")!) || 100000;

    const { products, totalDoc: totalProducts } = await productRepo.getAllProducts({
      page,
      limit,
      brand,
      category,
      rating,
      offer,
      sort,
      order,
      minPrice,
      maxPrice,
    });

    const totalPages = Math.ceil(totalProducts / limit);

    return NextResponse.json({ products, page, totalPages, totalProducts });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
