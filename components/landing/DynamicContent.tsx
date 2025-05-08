import type { DynamicContentType } from "@/graphql/types/cms";
import BackgroundHero from "./BackgroundHero";
import FeaturedBlogArticleSection from "./FeaturedBlogArticleSection";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import TextSection from "./TextSection";
import { UpcomingEventsSection } from "../meetups";

export default async function DynamicContent({
  content,
  draft,
}: {
  content: DynamicContentType;
  draft?: boolean;
}) {
  return content.items.map((section, index) => {
    switch (section.__typename) {
      case "ComponentBackgroundHero":
        return <BackgroundHero key={index} {...section} />;
      case "ComponentFeaturedArticleSection":
        return <FeaturedBlogArticleSection key={index} {...section} />;
      case "ComponentHowItWorksSection":
        return <HowItWorks key={index} {...section} />;
      case "ComponentTestimonialsSection":
        return <Testimonials key={index} {...section} />;
      case "ComponentTextImageSection":
        return <TextSection key={index} {...section} />;
      case "ComponentUpcomingEventsSection":
        return <UpcomingEventsSection key={index} draft={draft} {...section} />;
      default:
        return null;
    }
  });
}
