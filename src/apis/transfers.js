'use strict'

const sandboxURL = `http://sandbox.cashierapi.operapay.com/api/v3`;

module.exports = {
    /**
     * Transfer to Wallet
     */
    transferToWallet: {
        method: 'post',
        path: `${sandboxURL}/transfer/toWallet`,
        params: ['merchantid*', 'content-type', 'authorization*'],
        default_params: {'content-type': 'application/json'},
    },

    /**
     * Wallet Trasfer Status
     */
    walletTransferStatus: {
        method: 'post',
        path: `${sandboxURL}/transfer/status/toWallet`,
        params: ['merchantid*', 'content-type', 'authorization*'],
        default_params: {'content-type': 'application/json'},
    },

    /**
     * Get list of banks
     */
    getBanks: {
        method: 'post',
        path: `${sandboxURL}/banks`,
        params: ['merchantid*', 'content-type', 'authorization*'],
        default_params: {'content-type': 'application/json', countryCode: 'NG'},
    },

    /**
     * Transfer to Bank
     */
    transferToBank: {
        method: 'post',
        path: `${sandboxURL}/transfer/toBank`,
        params: ['merchantid*', 'content-type', 'authorization*'],
        default_params: {'content-type': 'application/json'},
    },

    /**
     * Bank Transfer status
     */
    bankTransferStatus: {
        method: 'post',
        path: `${sandboxURL}/transfer/status/toBank`,
        params: ['merchantid*', 'content-type', 'authorization*'],
        default_params: {'content-type': 'application/json'},
    }
}