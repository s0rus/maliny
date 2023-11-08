import { env } from "@/lib/env.mjs";
import { NextResponse, type NextRequest } from "next/server";
import { createNextRouteHandler } from "uploadthing/next";
import { UTApi } from "uploadthing/server";
import { imageRouter } from "./core";

export const { GET, POST } = createNextRouteHandler({
  router: imageRouter,
});

//TODO: Make it a singleton
const UTapi = new UTApi({
  apiKey: env.UPLOADTHING_SECRET,
});

export async function DELETE(request: NextRequest) {
  try {
    const { images } = (await request.json()) as { images: string[] };

    if (!images) {
      return NextResponse.json("Images are required", {
        status: 400,
      });
    }

    const ok = await UTapi.deleteFiles(images);

    if (!ok) {
      return NextResponse.json("Images could not be deleted", {
        status: 400,
      });
    }

    return NextResponse.json("Images removed", {
      status: 200,
    });
  } catch (error) {
    console.log("[IMAGES_DELETE]", error);
    return NextResponse.json("Internal server error", {
      status: 500,
    });
  }
}
