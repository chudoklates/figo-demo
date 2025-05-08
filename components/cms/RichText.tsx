import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { Content } from "@/api/types/cms";
import { Divider, Link, Typography } from "@mui/material";
import RichImage from "./RichImage";
import NextLink from "next/link";

const INITIAL_TEXT: Array<string | boolean | React.JSX.Element> = [];

export function RichText({ content }: { content: Content }) {
  const blockEntryMap = new Map(
    content?.links?.entries?.block?.map((entry) => [entry.sys.id, entry]) || []
  );

  return documentToReactComponents(content.json, {
    renderText: (text) => {
      return text.split("\n").reduce((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment];
      }, INITIAL_TEXT);
    },
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const entry = blockEntryMap.get(node.data.target.sys.id);

        if (!entry) return null;

        if (entry.__typename === "ComponentRichImage") {
          return <RichImage entry={entry} />;
        }

        return null;
      },
      [BLOCKS.HEADING_1]: (_node, children) => (
        <Typography variant="h1" component="h2" sx={{ mt: 6 }} gutterBottom>
          {children}
        </Typography>
      ),
      [BLOCKS.HEADING_2]: (_node, children) => (
        <Typography variant="h2" gutterBottom sx={{ mt: 4 }}>
          {children}
        </Typography>
      ),
      [BLOCKS.HEADING_3]: (_node, children) => (
        <Typography variant="h3" gutterBottom sx={{ mt: 2 }}>
          {children}
        </Typography>
      ),
      [BLOCKS.HEADING_4]: (_node, children) => (
        <Typography variant="h4" gutterBottom sx={{ mt: 1 }}>
          {children}
        </Typography>
      ),
      [BLOCKS.HEADING_5]: (_node, children) => (
        <Typography variant="h5" gutterBottom>
          {children}
        </Typography>
      ),
      [BLOCKS.HEADING_6]: (_node, children) => (
        <Typography variant="h6" gutterBottom>
          {children}
        </Typography>
      ),
      [BLOCKS.PARAGRAPH]: (_node, children) => (
        <Typography gutterBottom>{children}</Typography>
      ),
      [BLOCKS.HR]: () => <Divider sx={{ mb: 3 }} />,
      [INLINES.HYPERLINK]: (node, children) => (
        <Link
          href={node.data.uri}
          component={NextLink}
          target="_blank"
          rel="noopener noreferrer"
          underline="always"
        >
          {children}
        </Link>
      ),
    },
  });
}
