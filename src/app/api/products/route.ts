import { type ProductSchema } from "@/app/(dashboard)/(routes)/dashboard/products/manage-product/schema";
import { db } from "@/db";
import { getBaseUrl } from "@/lib/utils";
import { NextResponse, type NextRequest } from "next/server";
import { API_ROUTES } from "../routes";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const productId = searchParams.get("productId");
    if (productId) {
      const product = await db.product.findUniqueOrThrow({
        where: {
          id: productId,
        },
        include: {
          category: true,
          images: true,
          specifications: {
            include: {
              specification: true,
            },
          },
        },
      });
      return NextResponse.json<typeof product>(product);
    }

    const productName = searchParams.get("productName");
    if (productName) {
      const productsList = await db.product.findMany({
        where: {
          name: {
            contains: productName,
          },
        },
        include: {
          category: true,
          images: true,
          specifications: {
            include: {
              specification: true,
            },
          },
        },
      });

      return NextResponse.json<typeof productsList>(productsList, {
        status: 200,
      });
    }

    const productsList = await db.product.findMany({
      include: {
        category: true,
        images: true,
        specifications: {
          include: {
            specification: true,
          },
        },
      },
    });
    return NextResponse.json<typeof productsList>(productsList, {
      status: 200,
    });
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return NextResponse.json("Internal server error", {
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as ProductSchema;
    const {
      name,
      description,
      price,
      stock,
      specifications,
      categoryId,
      images,
    } = data;

    if (!name) {
      return NextResponse.json("name is required", {
        status: 400,
      });
    }

    if (!description) {
      return NextResponse.json("description is required", {
        status: 400,
      });
    }

    if (!price) {
      return NextResponse.json("price is required", {
        status: 400,
      });
    }

    if (!stock) {
      return NextResponse.json("stock is required", {
        status: 400,
      });
    }

    if (!specifications.length) {
      return NextResponse.json("specifications are required", {
        status: 400,
      });
    }

    if (!categoryId) {
      return NextResponse.json("categoryId is required", {
        status: 400,
      });
    }

    if (!images.length) {
      return NextResponse.json("images are required", {
        status: 400,
      });
    }

    const newProduct = await db.product.create({
      data: {
        name,
        description,
        price,
        stock,
        specifications: {
          createMany: {
            data: specifications.map((spec) => ({
              spec_id: spec.specId,
              value: spec.value,
            })),
          },
        },
        images: {
          createMany: {
            data: images.map((image) => ({
              image_key: image.fileKey,
              image_url: image.fileUrl,
            })),
          },
        },
        category_id: categoryId,
      },
    });

    if (!newProduct) {
      throw new Error("Internal server error");
    }

    return NextResponse.json<typeof newProduct>(newProduct, {
      status: 201,
    });
  } catch (error) {
    console.log("[PRODUCT_POST]", error);
    return NextResponse.json("Internal server error", {
      status: 500,
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = (await request.json()) as ProductSchema;
    const {
      id,
      name,
      description,
      price,
      stock,
      specifications,
      categoryId,
      images,
    } = data;

    if (!name) {
      return NextResponse.json("name is required", {
        status: 400,
      });
    }

    if (!description) {
      return NextResponse.json("description is required", {
        status: 400,
      });
    }

    if (!price) {
      return NextResponse.json("price is required", {
        status: 400,
      });
    }

    if (!stock) {
      return NextResponse.json("stock is required", {
        status: 400,
      });
    }

    if (!specifications.length) {
      return NextResponse.json("specifications are required", {
        status: 400,
      });
    }

    if (!categoryId) {
      return NextResponse.json("categoryId is required", {
        status: 400,
      });
    }

    if (!images.length) {
      return NextResponse.json("images are required", {
        status: 400,
      });
    }

    const updatedProduct = await db.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
        stock,
        specifications: {
          createMany: {
            data: specifications.map((spec) => ({
              spec_id: spec.specId,
              value: spec.value,
            })),
          },
        },
        images: {
          createMany: {
            data: images.map((image) => ({
              image_key: image.fileKey,
              image_url: image.fileUrl,
            })),
          },
        },
        category_id: categoryId,
      },
    });

    return NextResponse.json<typeof updatedProduct>(updatedProduct, {
      status: 201,
    });
  } catch (error) {
    console.log("[PRODUCT_PUT]", error);
    return NextResponse.json("Internal server error", {
      status: 500,
    });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { productId } = (await request.json()) as { productId: string };

    if (!productId) {
      return NextResponse.json("productId is required", {
        status: 400,
      });
    }

    const removedProduct = await db.product.delete({
      where: {
        id: productId,
      },
      include: {
        images: true,
      },
    });

    if (!removedProduct) {
      throw new Error("Internal server error");
    }

    await fetch(`${getBaseUrl()}${API_ROUTES.UPLOADTHING}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        images: removedProduct.images.map((image) => image.image_key),
      }),
    });

    return NextResponse.json<typeof removedProduct>(removedProduct, {
      status: 200,
    });
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return NextResponse.json("Internal server error", {
      status: 500,
    });
  }
}
