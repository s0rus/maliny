import { type ImageRouter } from "@/app/api/uploadthing/core";
import { generateComponents } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<ImageRouter>();

export const { useUploadThing } = generateReactHelpers<ImageRouter>();
