"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { type Images } from "./ui/dropzone-form-field";
import { Icon } from "./ui/icon";

interface ImageBrowerProps extends Images {
  withoutBigPreview?: boolean;
}

export function ImageBrowser({
  images,
  withoutBigPreview = false,
}: ImageBrowerProps) {
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);

  if (!images.length) {
    return null;
  }

  const isMultipleImages = images.length > 1;

  const mainImageUrl = images[mainImageIndex].fileUrl ?? "";

  function handleImageIndexChange({
    type,
  }: {
    type: "increment" | "decrement";
  }) {
    const lastIndex = images.length - 1;
    if (type === "decrement") {
      setMainImageIndex((prevIndex) =>
        prevIndex === 0 ? lastIndex : prevIndex - 1,
      );
    } else {
      setMainImageIndex((prevIndex) =>
        prevIndex === lastIndex ? 0 : prevIndex + 1,
      );
    }
  }

  return (
    <Dialog>
      <div className="flex flex-col gap-2">
        {mainImageIndex >= 0 && !withoutBigPreview && (
          <DialogTrigger asChild>
            <Image
              src={mainImageUrl}
              alt="image"
              width={300}
              height={364}
              priority
              className="h-auto max-w-full cursor-pointer"
            />
          </DialogTrigger>
        )}
        <div className="flex flex-row gap-4">
          {images.map((image, index) => (
            <DialogTrigger key={image.fileKey} asChild>
              <Button
                key={image.fileKey}
                className={cn(
                  "flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-md border object-contain object-center p-2",
                  mainImageIndex === index
                    ? " border-primary"
                    : " border-primary-foreground",
                )}
                onMouseEnter={() => setMainImageIndex(index)}
                onClick={() => setMainImageIndex(index)}
                variant="outline"
                size="icon"
              >
                <Image
                  src={image.fileUrl}
                  alt="image"
                  width={64}
                  height={64}
                  className="h-auto"
                />
              </Button>
            </DialogTrigger>
          ))}
        </div>
      </div>
      <DialogContent className="h-screen w-screen max-w-none">
        <div className="relative flex flex-row justify-between">
          <div className="flex h-full items-center">
            {isMultipleImages && (
              <Button
                onClick={() => handleImageIndexChange({ type: "decrement" })}
                variant="outline"
                size="icon"
              >
                <Icon.chevronLeft className="h-8 w-8" />
              </Button>
            )}
          </div>
          <div className="flex items-center justify-center object-contain object-center p-2">
            <Image
              src={mainImageUrl}
              alt="image"
              width={300}
              height={364}
              priority
              className="h-auto max-w-full cursor-pointer"
            />
          </div>
          <div className="flex h-full items-center">
            {isMultipleImages && (
              <Button
                onClick={() => handleImageIndexChange({ type: "increment" })}
                variant="outline"
                size="icon"
              >
                <Icon.chevronRight className="h-8 w-8" />
              </Button>
            )}
          </div>
          <div className="absolute left-1/2 top-full -translate-x-[50%] -translate-y-[50%] pb-12">
            <div className="flex flex-row gap-4">
              {images.map((image, index) => (
                <Button
                  key={image.fileKey}
                  className={cn(
                    "flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-md border object-contain object-center p-2",
                    mainImageIndex === index
                      ? " border-primary"
                      : " border-primary-foreground",
                  )}
                  onMouseEnter={() => setMainImageIndex(index)}
                  onClick={() => setMainImageIndex(index)}
                  variant="outline"
                  size="icon"
                >
                  <Image
                    src={image.fileUrl}
                    alt="image"
                    width={64}
                    height={64}
                    className="h-auto w-auto"
                  />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
