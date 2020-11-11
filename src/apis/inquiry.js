'use strict'

module.exports = {
    /**
     * Validate OPay User
     */
    validateUser: {
        method: 'post',
        path: `/v3/info/user`,
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
        path: `/v3/info/merchant`,
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
        path: `/v3/verification/accountNumber/resolve`,
        params: ['merchantid*', 'content-type', 'authorization*'],
        body: {
            "bankCode": "105100005",
            "bankAccountNo": "23456784334",
            "countryCode": "NG"
          },
        default_params: {'content-type': 'application/json'},
    },
}