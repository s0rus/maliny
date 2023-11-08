import { type NewSpecificationSchema } from "@/app/(dashboard)/(routes)/dashboard/specifications/components/manage-specification-form";
import { db } from "@/db";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const specId = searchParams.get("specId");
    if (specId) {
      const specification = await db.specification.findFirst({
        where: {
          id: specId,
        },
      });
      return NextResponse.json<typeof specification>(specification, {
        status: 200,
      });
    }

    const specName = searchParams.get("specName");
    if (specName) {
      const specification = await db.specification.findFirst({
        where: {
          name: specName,
        },
      });
      return NextResponse.json<typeof specification>(specification, {
        status: 200,
      });
    }

    const specificationList = await db.specification.findMany();
    return NextResponse.json<typeof specificationList>(specificationList, {
      status: 200,
    });
  } catch (error) {
    console.log("[SPECIFICATION_GET]", error);
    return NextResponse.json("Internal server error", {
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as NewSpecificationSchema;
    const { name: specName, unit } = data;

    if (!specName) {
      return NextResponse.json("specName is required", {
        status: 400,
      });
    }

    const newSpecification = await db.specification.create({
      data: {
        name: specName,
        unit,
      },
    });

    return NextResponse.json<typeof newSpecification>(newSpecification, {
      status: 201,
    });
  } catch (error) {
    console.log("[SPECIFICATION_POST]", error);
    return NextResponse.json("Internal server error", {
      status: 500,
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = (await request.json()) as NewSpecificationSchema;
    const { specId, name: specName, unit } = data;

    if (!specId) {
      return NextResponse.json("specId is required", {
        status: 400,
      });
    }

    if (!specName) {
      return NextResponse.json("specName is required", {
        status: 400,
      });
    }

    const updatedSpecification = await db.specification.update({
      where: {
        id: specId,
      },
      data: {
        name: specName,
        unit,
      },
    });

    return NextResponse.json<typeof updatedSpecification>(
      updatedSpecification,
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log("[SPECIFICATION_PUT]", error);
    return NextResponse.json("Internal server error", {
      status: 500,
    });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { specId } = (await request.json()) as { specId: string };

    if (!specId) {
      return NextResponse.json("specId is required", {
        status: 400,
      });
    }

    const removedSpec = await db.specification.delete({
      where: {
        id: specId,
      },
    });

    return NextResponse.json<typeof removedSpec>(removedSpec, {
      status: 200,
    });
  } catch (error) {
    console.log("[SPECIFICATION_DELETE]", error);
    return NextResponse.json("Internal server error", {
      status: 500,
    });
  }
}
