import { ButtonProps } from "@mui/material";

export interface UpdateSubscriptionButtonProps extends ButtonProps {
  immediate?: boolean;
}

export type SubscriptionPopupState = "success" | "error" | "initial";

export interface RenewSubscriptionPopupContextType {
  open: boolean;
  closePopup: () => void;
  // setOpen: (open: boolean) => void;
  state: SubscriptionPopupState;
  setState: (state: SubscriptionPopupState) => void;
}

export interface UpdateSubscriptionPopupContextType
  extends RenewSubscriptionPopupContextType {
  immediate: boolean;
  setImmediate: (immediate: boolean) => void;
}
