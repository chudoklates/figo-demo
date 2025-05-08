export interface InterestCardProps {
  interest: Interest;
  active: boolean;
  handleSelectInterest: (interest: string) => void;
}

export type Option<K> = {
  value: K;
  label: string;
};

export type Interest =
  | "acting"
  | "cantienica"
  | "coaching"
  | "creative_writing"
  | "dancing"
  | "it"
  | "drawing"
  | "knitting"
  | "meditation"
  | "kungfu"
  | "language_classes"
  | "macrame"
  | "painting"
  | "photography"
  | "pilates"
  | "pottery"
  | "qigong"
  | "sewing"
  | "singing"
  | "tai_chi"
  | "theater"
  | "yoga";
