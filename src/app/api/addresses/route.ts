import { db } from "@/db";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json("userId is required", {
        status: 400,
      });
    }

    const addressList = await db.address.findMany({
      where: {
        user_id: userId,
      },
    });

    return NextResponse.json<typeof addressList>(addressList, {
      status: 200,
    });
  } catch (error) {
    console.log("[ADDRESS_GET]", error);
    return NextResponse.json("Internal server error", {
      status: 500,
    });
  }
}

// export async function POST(request: NextRequest) {
//   try {
//     const data = (await request.json()) as {id: string};
//     const { name } = data;

//     if (!name) {
//       return NextResponse.json("categoryName is required", {
//         status: 400,
//       });
//     }

//     const newCategory = await db.category.create({
//       data: {
//         name,
//       },
//     });

//     return NextResponse.json<typeof newCategory>(newCategory, {
//       status: 201,
//     });
//   } catch (error) {
//     console.log("[CART_POST]", error);
//     return NextResponse.json("Internal server error", {
//       status: 500,
//     });
//   }
// }
