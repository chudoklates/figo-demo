export type LatLng = {
  lat: number;
  lng: number;
};

export type LocationInfo = {
  lat?: number;
  lng?: number;
  input?: string;
  postal_code?: string;
  country_code?: string;
  country_name?: string;
  state?: string;
  county?: string;
  city?: string;
  neighbourhood?: string;
  street?: string;
  house_number?: string;
};

export type LocationData = LocationInfo & LatLng;

export type FiltersLocation = LatLng & {
  input?: string;
  bounds?: {
    ne: google.maps.LatLngLiteral;
    sw: google.maps.LatLngLiteral;
  };
};

export type LocationSuggestion = google.maps.places.AutocompletePrediction;
