'use strict';

module.exports = {
  /**
   * Initialize Transaction
   */
  initializeTransaction: {
    method: 'post',
    path: `cashier/initialize`,
    authorization: 'PUBLIC_KEY',
    body: {
      amount$: String,
      callbackUrl$: String,
      currency$: String,
      expireAt$: String,
      mchShortName$: String,
      payMethods$: Array,
      payTypes$: Array,
      productDesc$: String,
      productName$: String,
      reference$: String,
      returnUrl$: String,
      userPhone$: String,
      userRequestIp$: String,
    },
  },

  /**
   * Cashier Status
   */
  cashierStatus: {
    method: 'post',
    path: `cashier/status`,
    authorization: 'PUBLIC_KEY',
    body: { orderNo$: String, reference$: String },
  },

  /**
   * Close Transaction
   */
  closeStatus: {
    method: 'post',
    path: `cashier/close`,
    authorization: 'PUBLIC_KEY',
    body: { orderNo$: String, reference$: String },
  },
};
