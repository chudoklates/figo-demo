import { OrderStatus } from "@paypal/paypal-server-sdk";

export type WebhookEvent = {
  id: string;
  create_time: string;
  resource_type: string;
  event_version: string;
  event_type: string;
  summary: string;
  resource_version: string;
  resource: any;
  links: [
    {
      href: string;
      rel: string;
      method: "GET" | "POST";
    }
  ];
};

export type RestAPIOrder = {
  id: string;
  create_time: string;
  update_time: string;
  purchase_units: [
    {
      reference_id: string;
      description: string;
      custom_id: string;
      invoice_id: string;
      id: string;
      soft_descriptor: string;
      items: [
        {
          name: string;
          quantity: string;
          description: string;
          sku: string;
          url: string;
          category: string;
          image_url: string;
          unit_amount: {
            currency_code: string;
            value: string;
          };
          tax: {
            currency_code: string;
            value: string;
          };
          upc: {
            type: "UPC-A";
            code: string;
          };
        }
      ];
      most_recent_errors: [null];
      amount: {
        currency_code: string;
        value: string;
        breakdown: {
          item_total: {
            currency_code: string;
            value: string;
          };
          shipping: {
            currency_code: string;
            value: string;
          };
          handling: {
            currency_code: string;
            value: string;
          };
          tax_total: {
            currency_code: string;
            value: string;
          };
          insurance: {
            currency_code: string;
            value: string;
          };
          shipping_discount: {
            currency_code: string;
            value: string;
          };
          discount: {
            currency_code: string;
            value: string;
          };
        };
      };
      payee: {
        email_address: string;
        merchant_id: string;
      };
      payment_instruction: {
        platform_fees: [
          {
            amount: {
              currency_code: string;
              value: string;
            };
            payee: {
              email_address: string;
              merchant_id: string;
            };
          }
        ];
        payee_pricing_tier_id: string;
        payee_receivable_fx_rate_id: string;
        disbursement_mode: "INSTANT";
      };
      shipping: {
        type: "SHIPPING";
        options: [
          {
            id: string;
            label: string;
            selected: true;
            type: "SHIPPING";
            amount: {
              currency_code: string;
              value: string;
            };
          }
        ];
        name: {
          full_name: string;
        };
        email_address: string;
        phone_number: {
          country_code: string;
          national_number: string;
        };
        address: {
          address_line_1: string;
          address_line_2: string;
          admin_area_2: string;
          admin_area_1: string;
          postal_code: string;
          country_code: "st";
        };
        trackers: [
          {
            id: string;
            status: "CANCELLED";
            items: [
              {
                name: null;
                quantity: null;
                sku: null;
                url: null;
                image_url: null;
                upc: null;
              }
            ];
            links: [
              {
                href: null;
                rel: null;
                method: null;
              }
            ];
            create_time: string;
            update_time: string;
          }
        ];
      };
      supplementary_data: {
        card: {
          level_2: {
            invoice_id: string;
            tax_total: {
              currency_code: string;
              value: string;
            };
          };
          level_3: {
            ships_from_postal_code: string;
            line_items: [
              {
                name: null;
                quantity: null;
                description: null;
                sku: null;
                url: null;
                image_url: null;
                upc: null;
                commodity_code: null;
                unit_of_measure: null;
                unit_amount: null;
                tax: null;
                discount_amount: null;
                total_amount: null;
              }
            ];
            shipping_amount: {
              currency_code: string;
              value: string;
            };
            duty_amount: {
              currency_code: string;
              value: string;
            };
            discount_amount: {
              currency_code: string;
              value: string;
            };
            shipping_address: {
              address_line_1: string;
              address_line_2: string;
              admin_area_2: string;
              admin_area_1: string;
              postal_code: string;
              country_code: "st";
            };
          };
        };
        risk: {
          customer: {
            ip_address: string;
          };
        };
      };
      payments: {
        authorizations: [
          {
            status: "CREATED";
            status_details: {
              reason: "PENDING_REVIEW";
            };
            id: string;
            invoice_id: string;
            custom_id: string;
            links: [
              {
                href: null;
                rel: null;
                method: null;
              }
            ];
            amount: {
              currency_code: string;
              value: string;
            };
            network_transaction_reference: {
              id: string;
              date: string;
              acquirer_reference_number: string;
              network: "VISA";
            };
            seller_protection: {
              status: "ELIGIBLE";
              dispute_categories: [null];
            };
            expiration_time: string;
            create_time: string;
            update_time: string;
            processor_response: {
              avs_code: "A";
              cvv_code: "E";
              response_code: "0000";
              payment_advice_code: "01";
            };
          }
        ];
        captures: [
          {
            create_time: string;
            update_time: string;
            id: string;
            invoice_id: string;
            custom_id: string;
            final_capture: false;
            links: [
              {
                href: null;
                rel: null;
                method: null;
              }
            ];
            amount: {
              currency_code: string;
              value: string;
            };
            network_transaction_reference: {
              id: string;
              date: string;
              acquirer_reference_number: string;
              network: "VISA";
            };
            seller_protection: {
              status: "ELIGIBLE";
              dispute_categories: [null];
            };
            seller_receivable_breakdown: {
              platform_fees: [null];
              gross_amount: {
                currency_code: null;
                value: null;
              };
              paypal_fee: {
                currency_code: null;
                value: null;
              };
              paypal_fee_in_receivable_currency: {
                currency_code: null;
                value: null;
              };
              net_amount: {
                currency_code: null;
                value: null;
              };
              receivable_amount: {
                currency_code: null;
                value: null;
              };
              exchange_rate: {
                value: null;
                source_currency: null;
                target_currency: null;
              };
            };
            disbursement_mode: "INSTANT";
            processor_response: {
              avs_code: "A";
              cvv_code: "E";
              response_code: "0000";
              payment_advice_code: "01";
            };
          }
        ];
        refunds: [
          {
            status: "CANCELLED";
            status_details: {
              reason: "ECHECK";
            };
            id: string;
            invoice_id: string;
            custom_id: string;
            acquirer_reference_number: string;
            note_to_payer: string;
            seller_payable_breakdown: {
              platform_fees: [null];
              net_amount_breakdown: [null];
              gross_amount: {
                currency_code: null;
                value: null;
              };
              paypal_fee: {
                currency_code: null;
                value: null;
              };
              paypal_fee_in_receivable_currency: {
                currency_code: null;
                value: null;
              };
              net_amount: {
                currency_code: null;
                value: null;
              };
              net_amount_in_receivable_currency: {
                currency_code: null;
                value: null;
              };
              total_refunded_amount: {
                currency_code: null;
                value: null;
              };
            };
            links: [
              {
                href: null;
                rel: null;
                method: null;
              }
            ];
            amount: {
              currency_code: string;
              value: string;
            };
            payer: {
              email_address: string;
              merchant_id: string;
            };
            create_time: string;
            update_time: string;
          }
        ];
      };
    }
  ];
  links: [
    {
      href: string;
      rel: string;
      method: "GET";
    }
  ];
  payment_source: {
    card: {
      name: string;
      last_digits: string;
      available_networks: ["VISA"];
      from_request: {
        last_digits: string;
        expiry: string;
      };
      stored_credential: {
        payment_initiator: "CUSTOMER";
        payment_type: "ONE_TIME";
        usage: "FIRST";
        previous_network_transaction_reference: {
          id: string;
          date: string;
          acquirer_reference_number: string;
          network: "VISA";
        };
      };
      brand: "VISA";
      type: "CREDIT";
      authentication_result: {
        liability_shift: "NO";
        three_d_secure: {
          authentication_status: "Y";
          enrollment_status: "Y";
        };
      };
      attributes: {
        vault: {
          id: string;
          status: "VAULTED";
          links: [
            {
              href: string;
              rel: string;
              method: "GET";
            }
          ];
          customer: {
            id: string;
            email_address: string;
            phone: {
              phone_type: "FAX";
              phone_number: {
                national_number: null;
              };
            };
            merchant_customer_id: string;
          };
        };
      };
      expiry: string;
      bin_details: {
        bin: string;
        issuing_bank: string;
        products: [string];
        bin_country_code: string;
      };
    };
    bancontact: {
      card_last_digits: string;
      name: string;
      country_code: string;
      bic: string;
      iban_last_chars: string;
    };
    blik: {
      name: string;
      country_code: string;
      email: string;
      one_click: {
        consumer_reference: string;
      };
    };
    eps: {
      name: string;
      country_code: string;
      bic: string;
    };
    giropay: {
      name: string;
      country_code: string;
      bic: string;
    };
    ideal: {
      name: string;
      country_code: string;
      bic: string;
      iban_last_chars: string;
    };
    mybank: {
      name: string;
      country_code: string;
      bic: string;
      iban_last_chars: string;
    };
    p24: {
      payment_descriptor: string;
      method_id: string;
      method_description: string;
      name: string;
      email: string;
      country_code: string;
    };
    sofort: {
      name: string;
      country_code: string;
      bic: string;
      iban_last_chars: string;
    };
    trustly: {
      name: string;
      country_code: string;
      email: string;
      bic: string;
      iban_last_chars: string;
    };
    venmo: {
      user_name: string;
      attributes: {
        vault: {
          id: string;
          status: "VAULTED";
          links: [
            {
              href: string;
              rel: string;
              method: "GET";
            }
          ];
          customer: {
            id: string;
          };
        };
      };
      email_address: string;
      account_id: string;
      name: {
        given_name: string;
        surname: string;
      };
      phone_number: {
        national_number: string;
      };
      address: {
        address_line_1: string;
        address_line_2: string;
        admin_area_2: string;
        admin_area_1: string;
        postal_code: string;
        country_code: "st";
      };
    };
    paypal: {
      account_status: "VERIFIED";
      phone_type: "FAX";
      business_name: string;
      attributes: {
        vault: {
          id: string;
          status: "VAULTED";
          links: [
            {
              href: string;
              rel: string;
              method: "GET";
            }
          ];
          customer: {
            id: string;
            email_address: string;
            phone: {
              phone_type: "FAX";
              phone_number: {
                national_number: null;
              };
            };
            merchant_customer_id: string;
          };
        };
        cobranded_cards: [
          {
            labels: [string];
            payee: {
              email_address: string;
              merchant_id: string;
            };
            amount: {
              currency_code: string;
              value: string;
            };
          }
        ];
      };
      stored_credential: {
        payment_initiator: "CUSTOMER";
        charge_pattern: "IMMEDIATE";
        usage_pattern: "IMMEDIATE";
        usage: "FIRST";
      };
      email_address: string;
      account_id: string;
      name: {
        given_name: string;
        surname: string;
      };
      phone_number: {
        national_number: string;
      };
      birth_date: "stringstri";
      tax_info: {
        tax_id: string;
        tax_id_type: "BR_CPF";
      };
      address: {
        address_line_1: string;
        address_line_2: string;
        admin_area_2: string;
        admin_area_1: string;
        postal_code: string;
        country_code: "st";
      };
    };
    apple_pay: {
      id: string;
      token: string;
      stored_credential: {
        payment_initiator: "CUSTOMER";
        payment_type: "ONE_TIME";
        usage: "FIRST";
        previous_network_transaction_reference: {
          id: string;
          date: string;
          acquirer_reference_number: string;
          network: "VISA";
        };
      };
      name: string;
      email_address: string;
      phone_number: {
        national_number: string;
      };
      card: {
        name: string;
        last_digits: string;
        available_networks: ["VISA"];
        from_request: {
          last_digits: string;
          expiry: string;
        };
        stored_credential: {
          payment_initiator: "CUSTOMER";
          payment_type: "ONE_TIME";
          usage: "FIRST";
          previous_network_transaction_reference: {
            id: string;
            date: string;
            acquirer_reference_number: string;
            network: "VISA";
          };
        };
        brand: "VISA";
        type: "CREDIT";
        authentication_result: {
          liability_shift: "NO";
          three_d_secure: {
            authentication_status: "Y";
            enrollment_status: "Y";
          };
        };
        attributes: {
          vault: {
            id: string;
            status: "VAULTED";
            links: [
              {
                href: null;
                rel: null;
                method: null;
              }
            ];
            customer: {
              id: string;
              email_address: string;
              phone: {
                phone_type: null;
                phone_number: null;
              };
              merchant_customer_id: string;
            };
          };
        };
        expiry: string;
        bin_details: {
          bin: string;
          issuing_bank: string;
          products: [string];
          bin_country_code: string;
        };
        billing_address: {
          address_line_1: string;
          address_line_2: string;
          admin_area_2: string;
          admin_area_1: string;
          postal_code: string;
          country_code: "st";
        };
        country_code: string;
      };
      attributes: {
        vault: {
          id: string;
          status: "VAULTED";
          links: [
            {
              href: string;
              rel: string;
              method: "GET";
            }
          ];
          customer: {
            id: string;
          };
        };
      };
    };
    google_pay: {
      name: string;
      email_address: string;
      phone_number: {
        country_code: string;
        national_number: string;
      };
      card: {
        name: string;
        last_digits: string;
        type: "CREDIT";
        brand: "VISA";
        billing_address: {
          address_line_1: string;
          address_line_2: string;
          admin_area_2: string;
          admin_area_1: string;
          postal_code: string;
          country_code: "st";
        };
        authentication_result: {
          liability_shift: "NO";
          three_d_secure: {
            authentication_status: "Y";
            enrollment_status: "Y";
          };
        };
      };
    };
  };
  intent: "CAPTURE";
  payer: {
    email_address: string;
    payer_id: string;
    name: {
      given_name: string;
      surname: string;
    };
    phone: {
      phone_type: "FAX";
      phone_number: {
        national_number: string;
      };
    };
    birth_date: "stringstri";
    tax_info: {
      tax_id: string;
      tax_id_type: "BR_CPF";
    };
    address: {
      address_line_1: string;
      address_line_2: string;
      admin_area_2: string;
      admin_area_1: string;
      postal_code: string;
      country_code: "st";
    };
  };
  status: OrderStatus;
};

export type RestAPIPayment = {
  status: "COMPLETED";
  status_details: {
    reason: "BUYER_COMPLAINT";
  };
  id: string;
  invoice_id: string;
  custom_id: string;
  final_capture: false;
  disbursement_mode: "INSTANT";
  links: [
    {
      href: string;
      rel: string;
      method: "GET";
    }
  ];
  amount: {
    currency_code: string;
    value: string;
  };
  network_transaction_reference: {
    id: string;
    date: string;
    acquirer_reference_number: string;
    network: "VISA";
  };
  seller_protection: {
    status: "ELIGIBLE";
    dispute_categories: [string];
  };
  seller_receivable_breakdown: {
    platform_fees: [
      {
        amount: {
          currency_code: string;
          value: string;
        };
        payee: {
          email_address: string;
          merchant_id: string;
        };
      }
    ];
    gross_amount: {
      currency_code: string;
      value: string;
    };
    paypal_fee: {
      currency_code: string;
      value: string;
    };
    paypal_fee_in_receivable_currency: {
      currency_code: string;
      value: string;
    };
    net_amount: {
      currency_code: string;
      value: string;
    };
    receivable_amount: {
      currency_code: string;
      value: string;
    };
    exchange_rate: {
      value: string;
      source_currency: string;
      target_currency: string;
    };
  };
  processor_response: {
    avs_code: "A";
    cvv_code: "E";
    response_code: "0000";
    payment_advice_code: "01";
  };
  create_time: string;
  update_time: string;
  supplementary_data: {
    related_ids: {
      order_id: string;
      authorization_id: string;
      capture_id: string;
    };
  };
  payee: {
    email_address: string;
    merchant_id: string;
  };
};
