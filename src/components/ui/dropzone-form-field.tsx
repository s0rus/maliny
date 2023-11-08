"use client";

import { useIsClient } from "@/hooks/use-is-client";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import { useMutation } from "react-query";
import { ImageBrowser } from "../image-browser";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Skeleton } from "./skeleton";
import { UploadDropzone } from "./uploadthing";

export type Images = {
  images: {
    fileKey: string;
    fileUrl: string;
  }[];
};

interface DropzoneFormFieldProps {
  withoutBigPreview?: boolean;
}

export function DropzoneFormField<T extends FieldValues & Images>({
  withoutBigPreview,
}: DropzoneFormFieldProps) {
  const { isClient } = useIsClient();
  const form = useFormContext<T>();
  const images = form.watch("images" as Path<T>) as T["images"];

  const deleteImagesMutation = useMutation<Response, Error, T["images"]>({
    mutationFn: (images: T["images"]) => {
      const imageKeys = images.map((image) => image.fileKey);

      return fetch(`/api/uploadthing`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ images: imageKeys }),
      });
    },
  });

  if (!isClient) {
    return <Skeleton className="h-24 w-full" />;
  }

  return (
    <FormField
      control={form.control}
      name={"images" as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Images</FormLabel>
          <ImageBrowser
            images={field.value}
            withoutBigPreview={withoutBigPreview}
          />
          <FormControl>
            {isClient && (
              <UploadDropzone
                endpoint="imageUploader"
                onUploadBegin={() => {
                  if (images.length) {
                    deleteImagesMutation.mutate(images);
                  }
                }}
                onClientUploadComplete={field.onChange}
                content={{
                  uploadIcon: <></>,
                }}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
