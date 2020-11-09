'use strict'

const sandboxURL = `http://sandbox.cashierapi.operapay.com/api/v3`;

module.exports = {
    /**
     * Initialize Transaction
     */
    initializeTransaction: {
        method: 'post',
        path: `${sandboxURL}/cashier/initialize`,
        params: ['merchantid*', 'content-type', 'authorization*'],
        body: {
            "reference": "test_20191123132233",
            "mchShortName": "Jerry's shop",
            "productName": "Apple AirPods Pro",
            "productDesc": "The best wireless earphone in history",
            "userPhone": "+2349876543210",
            "userRequestIp": "123.123.123.123",
            "amount": "100",
            "currency": "NGN",
            "payMethods": ["account", "qrcode"],
            "payTypes": ["BalancePayment", "BonusPayment"],
            "callbackUrl": "https://you.domain.com/callbackUrl",
            "returnUrl": "https://you.domain.com/returnUrl",
            "expireAt": "10"
        },
        default_params: {'content-type': 'application/json'},
    },

    /**
     * Cashier Status
     */
    cashierStatus: {
        method: 'post',
        path: `${sandboxURL}/cashier/status`,
        params: ['content-type', 'authorization*', 'merchantid*'],
        body: {
            "orderNo": "20019212912901281821982",
            "reference": "test_20191123132233"
          },
        default_params: {'content-type': 'application/json'}
    },

    /**
     * Close Transaction
     */
    closeStatus: {
        method: 'post',
        path: `${sandboxURL}/cashier/close`,
        params: ['content-type', 'authorization*', 'merchantid*'],
        body: {
            "orderNo": "20019212912901281821982",
            "reference": "test_20191123132233"
          },
        default_params: {'content-type': 'application/json'}
    }
}