'use strict';

module.exports = {
  /**
   * Validate OPay User
   */
  queryBalance: {
    method: 'post',
    path: `balances`,
    authorization: 'PUBLIC_KEY',
    body: null,
  },

  /**
   * Validate OPay User
   */
  validateUser: {
    method: 'post',
    path: `info/user`,
    authorization: 'PUBLIC_KEY',
    body: { phoneNumber$: String },
  },

  /**
   * Validate OPay Merchant
   */
  validateMerchant: {
    method: 'post',
    path: `info/merchant`,
    authorization: 'PUBLIC_KEY',
    body: { email$: String },
  },

  /**
   * Validate Bank Account Number
   */
  validateBankAccount: {
    method: 'post',
    path: `verification/accountNumber/resolve`,
    authorization: 'PUBLIC_KEY',
    body: { bankCode$: String, bankAccountNo$: String, countryCode$: String },
    default_body: { countryCode: 'NG' },
  },
};
