export type BookingCardProps = {
  booking: TransactionLight;
  inactive?: boolean;
  handleCancel?: (booking: TransactionLight) => void;
};
