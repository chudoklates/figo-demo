import type { SvgIconComponent } from "@mui/icons-material";

export type LandingItemProps = {
  title: string;
  subtitle: string;
  Icon: SvgIconComponent;
};

export type TestimonialItem = {
  sources: { src: string; type: string }[];
  quote: string;
  name: string;
  subtitle: string;
};
