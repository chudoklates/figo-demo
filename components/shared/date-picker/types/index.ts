import { Dayjs } from "dayjs";

export interface DayProps {
  day: Dayjs;
  onClick: () => void;
  selected?: boolean;
  disabled?: boolean;
}

export interface DatePickerProps {
  selectedDate: Date | null;
  firstAvailableDate: Date | undefined;
  onChange: (date: Date) => void;
  isDateDisabled: (date: Dayjs) => boolean;
}
