'use strict'

const sandboxURL = `http://sandbox.cashierapi.operapay.com/api/v3`;

module.exports = {
    /**
     * Validate OPay User
     */
    validateUser: {
        method: 'post',
        path: `${sandboxURL}/info/user`,
        params: ['merchantid*', 'content-type', 'authorization*'],
        body: {
            "phoneNumber": "+2349876543210"
        },
        default_params: {'content-type': 'application/json'},
    },

    /**
     * Validate OPay Merchant
     */
    validateMerchant: {
        method: 'post',
        path: `${sandboxURL}/info/merchant`,
        params: ['merchantid*', 'content-type', 'authorization*'],
        body: {
            "phoneNumber": "+2349876543210"
        },
        default_params: {'content-type': 'application/json'},
    },

    /**
     * Validate Bank Account Number
     */
    validateMerchant: {
        method: 'post',
        path: `${sandboxURL}/verification/accountNumber/resolve`,
        params: ['merchantid*', 'content-type', 'authorization*'],
        body: {
            "bankCode": "105100005",
            "bankAccountNo": "23456784334",
            "countryCode": "NG"
          },
        default_params: {'content-type': 'application/json'},
    },
}