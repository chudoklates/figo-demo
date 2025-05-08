"use client";

import Image, { ImageProps } from "next/image";

const contentfulLoader = ({ src, width, quality, fill }: ImageProps) => {
  if (fill) return `${src}?q=${quality || 75}`;

  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function ContentfulImage({ alt, ...props }: ImageProps) {
  return (
    <Image
      alt={alt}
      loader={() => contentfulLoader({ alt, ...props })}
      {...props}
    />
  );
}
