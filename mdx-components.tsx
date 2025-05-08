import { Link, Typography } from "@mui/material";
import type { MDXComponents } from "mdx/types";
// import Image from "next/image";
// import getImageSize from "image-size";
// import path from "node:path";

// const PUBLIC_FOLDER_NAME = "public";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props: any) => (
      <Typography
        {...props}
        component="h1"
        variant="h1"
        gutterBottom
        sx={{
          mb: 6,
          wordWrap: "break-word",
          ...props.sx,
        }}
      />
    ),
    h2: (props: any) => (
      <Typography
        {...props}
        component="h2"
        variant="h2"
        gutterBottom
        sx={{
          mb: 4,
          wordWrap: "break-word",
          ...props.sx,
        }}
      />
    ),
    h3: (props: any) => (
      <Typography
        {...props}
        component="h3"
        variant="h3"
        gutterBottom
        sx={{
          mb: 2,
          wordWrap: "break-word",
          ...props.sx,
        }}
      />
    ),
    h4: (props: any) => (
      <Typography
        {...props}
        component="h4"
        variant="h4"
        gutterBottom
        sx={{
          mb: 2,
          wordWrap: "break-word",
          ...props.sx,
        }}
      />
    ),
    h5: (props: any) => (
      <Typography
        {...props}
        component="h5"
        variant="h5"
        gutterBottom
        sx={{
          mb: 2,
          wordWrap: "break-word",
          ...props.sx,
        }}
      />
    ),
    h6: (props: any) => (
      <Typography
        {...props}
        component="h6"
        variant="h6"
        gutterBottom
        sx={{
          mb: 2,
          wordWrap: "break-word",
          ...props.sx,
        }}
      />
    ),
    p: (props: any) => (
      <Typography
        {...props}
        component="p"
        variant="body1"
        gutterBottom
        sx={{
          mb: 2,
          ...props.sx,
        }}
      />
    ),
    strong: (props: any) => (
      <Typography
        {...props}
        component="strong"
        variant="inherit"
        sx={{
          fontWeight: "bold",
          ...props.sx,
        }}
      />
    ),
    em: (props: any) => (
      <Typography
        {...props}
        component="em"
        variant="inherit"
        sx={{
          fontStyle: "italic",
          ...props.sx,
        }}
      />
    ),
    ul: (props: any) => (
      <Typography
        {...props}
        component="ul"
        variant="inherit"
        sx={{
          mb: 4,
          "& li > ul": {
            mb: 2,
          },
          ...props.sx,
        }}
      />
    ),
    ol: (props: any) => (
      <Typography
        {...props}
        component="ol"
        variant="inherit"
        sx={{
          mb: 4,
          ...props.sx,
        }}
      />
    ),
    li: (props: any) => (
      <Typography {...props} component="li" variant="inherit" />
    ),
    a: (props: any) => <Link {...props} variant="inherit" color="primary" />,
    /* All img tags are replaced with the `Image` component */
    // img: ({ alt, src }) => {
    //   if (!src || !alt) return null;

    //   const filePath = path.join(process.cwd(), PUBLIC_FOLDER_NAME, src);

    //   const defaultStyle = {
    //     maxWidth: "100%",
    //     height: "auto",
    //     display: "block",
    //     margin: "10px auto",
    //   };

    //   try {
    //     const imageSize = getImageSize(filePath);

    //     return (
    //       <Image
    //         alt={alt}
    //         src={src}
    //         width={imageSize.width}
    //         height={imageSize.height}
    //         style={defaultStyle}
    //       />
    //     );
    //   } catch (e) {
    //     // eslint-disable-next-line @next/next/no-img-element
    //     return <img src={src} alt={alt} style={defaultStyle} />;
    //   }
    // },
  };
}
