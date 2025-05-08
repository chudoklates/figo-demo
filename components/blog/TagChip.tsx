import { ContentfulTagName } from "@/api/types/cms";
import { ColorfulChip } from "../shared";

const TAG_COLORS = {
  Ratgeber: "primary" as const,
  "Über uns": "secondary" as const,
  Gesellschaft: "info" as const,
  Erfahrungsberichte: "success" as const,
};

export default function TagChip({ label }: { label: ContentfulTagName }) {
  return (
    <ColorfulChip
      label={label}
      variant="seats"
      color={TAG_COLORS[label]}
      sx={{
        height: 28,
        flexBasis: "20px",
        flexGrow: 0,
        px: 1.25,
        py: 0.5,
        borderRadius: "6px",
        "& .MuiChip-label": {
          whiteSpace: "nowrap",
          fontWeight: "normal",
          fontSize: 16,
          lineHeight: "20px",
        },
      }}
    />
  );
}
