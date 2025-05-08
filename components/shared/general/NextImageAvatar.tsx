"use client";

import { ContentfulImage } from "@/components/cms";
import { Avatar, AvatarProps } from "@mui/material";
import Image from "next/image";
import { ImgHTMLAttributes } from "react";

const ImageSlot = (props: ImgHTMLAttributes<HTMLImageElement>) => {
  if (!props.src) return null;

  return (
    <Image
      width={props.width as number}
      height={props.height as number}
      src={props.src}
      alt={props.alt || ""}
      style={{
        width: (props.width as number) / 3,
        height: (props.height as number) / 3,
        objectFit: "cover",
      }}
    />
  );
};

const ContentfulImageSlot = (props: ImgHTMLAttributes<HTMLImageElement>) => {
  if (!props.src) return null;

  return (
    <ContentfulImage
      width={props.width as number}
      height={props.height as number}
      src={props.src}
      alt={props.alt || ""}
      style={{
        width: (props.width as number) / 3,
        height: (props.height as number) / 3,
        objectFit: "cover",
      }}
    />
  );
};

export default function NextImageAvatar({
  contentful = false,
  ...props
}: AvatarProps & { contentful?: boolean }) {
  const { sx, src, alt } = props;

  // @ts-ignore
  const width = sx?.width ? sx.width * 3 : 72;
  // @ts-ignore
  const height = sx?.height ? sx.height * 3 : 72;

  return (
    <Avatar
      {...props}
      slots={{
        img: contentful ? ContentfulImageSlot : ImageSlot,
      }}
      slotProps={{
        img: { src, alt, width, height },
      }}
    />
  );
}
