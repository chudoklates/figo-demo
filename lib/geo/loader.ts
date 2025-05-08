import { Loader } from "@googlemaps/js-api-loader";

const API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "MISSING_API_KEY";

const loader = new Loader({
  version: "beta",
  apiKey: API_KEY,
  language: "de",
  region: "DE",
});

export default loader;
