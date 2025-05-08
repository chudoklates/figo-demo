export type RandevuWebhookEvent = {
  id: string;
  code: string;
  id_marketplace: string;
  payload: any;
  triggered_at: string;
  data: any;
};

export type TransactionPayload = {
  id_transaction: string;
  id_state: string;
};

export type SupplyPayload = {
  id_supply: string;
  id_provider: string;
};
