import { db } from "@/db";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const cartId = searchParams.get("cartId");
    if (cartId) {
      const cart = await db.cart.findFirst({
        where: {
          id: cartId,
        },
        include: {
          entries: {
            include: {
              product: {
                include: {
                  images: true,
                },
              },
            },
          },
        },
      });

      return NextResponse.json<typeof cart>(cart, {
        status: 200,
      });
    }

    const userId = searchParams.get("userId");
    if (userId) {
      const cart = await db.cart.findFirst({
        where: {
          user_id: userId,
        },
        include: {
          entries: {
            include: {
              product: {
                include: {
                  images: true,
                },
              },
            },
          },
        },
      });

      return NextResponse.json<typeof cart>(cart, {
        status: 200,
      });
    }

    const cartList = await db.cart.findMany({
      include: {
        entries: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json<typeof cartList>(cartList, {
      status: 200,
    });
  } catch (error) {
    console.log("[CART_GET]", error);
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
