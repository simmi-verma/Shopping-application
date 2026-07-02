import { productRepo } from "@/helpers/productRepo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { productID: string } }
) {
  try {
    const id = params.productID;

    const product = await productRepo.getProductById(id);

    return NextResponse.json(product);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
