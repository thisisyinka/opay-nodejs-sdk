'use strict';

module.exports = {
  /**
   * Transfer to User Wallet
   */
  transferToUserWallet: {
    method: 'post',
    path: `transfer/toWallet`,
    authorization: 'SIGNATURE',
    body: {
      amount$: String,
      country$: String,
      currency$: String,
      reason$: String,
      receiver$: Object,
      'receiver.name$': String,
      'receiver.phoneNumber$': String,
      'receiver.type$': String,
      reference$: String,
    },
    default_body: { country: 'NG', currency: 'NGN' },
  },

  /**
   * Transfer to Merchant Wallet
   */
  transferToMerchantWallet: {
    method: 'post',
    path: `transfer/toWallet`,
    authorization: 'SIGNATURE',
    body: {
      amount$: String,
      country$: String,
      currency$: String,
      reason$: String,
      receiver$: Object,
      'receiver.merchantId$': String,
      'receiver.name$': String,
      'receiver.type$': String,
      reference$: String,
    },
    default_body: { country: 'NG', currency: 'NGN' },
  },

  /**
   * Wallet Trasfer Status
   */
  walletTransferStatus: {
    method: 'post',
    path: `transfer/status/toWallet`,
    authorization: 'SIGNATURE',
    body: { orderNo$: String, reference$: String },
  },

  /**
   * Get list of banks
   */
  getBanks: {
    method: 'post',
    path: `banks`,
    authorization: 'PUBLIC_KEY',
    body: { countryCode$: String },
    default_body: { countryCode: 'NG' },
  },

  /**
   * Get list of countries
   */

  getCountries: {
    method: 'post',
    path: `countries`,
    authorization: 'PUBLIC_KEY',
    body: null,
  },

  /**
   * Transfer to Bank
   */
  transferToBank: {
    method: 'post',
    path: `transfer/toBank`,
    authorization: 'SIGNATURE',
    body: {
      amount$: String,
      country$: String,
      currency$: String,
      reason$: String,
      receiver$: Object,
      'receiver.bankAccountNumber$': String,
      'receiver.bankCode$': String,
      'receiver.name$': String,
      reference$: String,
    },
    default_body: { country: 'NG', currency: 'NGN' },
  },

  /**
   * Bank Transfer status
   */
  bankTransferStatus: {
    method: 'post',
    path: `transfer/status/toBank`,
    authorization: 'SIGNATURE',
    body: { orderNo$: String, reference$: String },
  },
};
