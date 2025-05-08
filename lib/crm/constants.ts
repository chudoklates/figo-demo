export const HUBSPOT_CONTACT_LIFECYCLE_STAGES = {
  Customer: "customer" as const,
  /**
   * @deprecated
   */
  "Event Participant": 637221599 as const,
};

export const HUBSPOT_DEAL_PIPELINE = 1018455229 as const;

export const HUBSPOT_DEAL_STAGES = {
  "First Contact Completed": 1422194899 as const,
  "Interested to Participate": 1422194900 as const,
  "Payment Link Sent": 1422194901 as const,
  "Payment Completed": 1422194904 as const,
  "Lost - Not Interested": 1422194905 as const,
  "Lost - Refunded": 1422194906 as const,
};
