export type BookingsListProps = {
  title: string;
  filter: BookingState[];
  inactive?: boolean;
};

export type FilterChipProps = {
  label: string;
  filter: BookingState[];
  onClick: () => void;
};
