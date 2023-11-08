import { type CategorySchema } from "@/app/(dashboard)/(routes)/dashboard/categories/manage-category/actions";
import { db } from "@/db";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const categoryId = searchParams.get("categoryId");
    if (categoryId) {
      const category = await db.category.findFirst({
        where: {
          id: categoryId,
        },
      });
      return NextResponse.json<typeof category>(category, {
        status: 200,
      });
    }

    const categoryName = searchParams.get("categoryName");
    if (categoryName) {
      const category = await db.category.findFirst({
        where: {
          name: categoryName,
        },
      });
      return NextResponse.json<typeof category>(category, {
        status: 200,
      });
    }

    const categoryList = await db.category.findMany();
    return NextResponse.json<typeof categoryList>(categoryList, {
      status: 200,
    });
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return NextResponse.json("Internal server error", {
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as CategorySchema;
    const { name } = data;

    if (!name) {
      return NextResponse.json("categoryName is required", {
        status: 400,
      });
    }

    const newCategory = await db.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json<typeof newCategory>(newCategory, {
      status: 201,
    });
  } catch (error) {
    console.log("[CATEGORY_POST]", error);
    return NextResponse.json("Internal server error", {
      status: 500,
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = (await request.json()) as CategorySchema;
    const { id, name } = data;

    if (!id) {
      return NextResponse.json("categoryId is required", {
        status: 400,
      });
    }

    if (!name) {
      return NextResponse.json("categoryName is required", {
        status: 400,
      });
    }

    const updatedCategory = await db.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return NextResponse.json<typeof updatedCategory>(updatedCategory, {
      status: 201,
    });
  } catch (error) {
    console.log("[CATEGORY_PUT]", error);
    return NextResponse.json("Internal server error", {
      status: 500,
    });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = (await request.json()) as { id: string };

    if (!id) {
      return NextResponse.json("categoryId is required", {
        status: 400,
      });
    }

    const removedCategory = await db.category.delete({
      where: {
        id,
      },
    });

    return NextResponse.json<typeof removedCategory>(removedCategory, {
      status: 200,
    });
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return NextResponse.json("Internal server error", {
      status: 500,
    });
  }
}
