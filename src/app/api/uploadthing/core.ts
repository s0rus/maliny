import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const imageRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 3 } })
    .middleware(() => {
      const user = auth();

      if (!user) throw new Error("Unauthorized");

      return { userId: user.userId };
    })
    .onUploadError(({ error }) => {
      console.log(error);
    })
    .onUploadComplete(({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type ImageRouter = typeof imageRouter;
