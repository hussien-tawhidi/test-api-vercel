import { dbConnect } from "@/libs/db";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const product = await Product.find();
    return NextResponse.json({
      message: "GET has successfully",
      status: 200,
      product,
    });
  } catch (error) {
    console.log(error, "Error fetching product");
    return NextResponse.json({
      message: error + "Error in getting product",
      status: 500,
    });
  }
}
