'use strict'

module.exports = {
    /**
     * Transfer to Wallet
     */
    transferToWallet: {
        method: 'post',
        path: `/v3/transfer/toWallet`,
        params: ['merchantid*', 'content-type', 'authorization*'],
        default_params: {'content-type': 'application/json'},
    },

    /**
     * Wallet Trasfer Status
     */
    walletTransferStatus: {
        method: 'post',
        path: `/v3/transfer/status/toWallet`,
        params: ['merchantid*', 'content-type', 'authorization*'],
        default_params: {'content-type': 'application/json'},
    },

    /**
     * Get list of banks
     */
    getBanks: {
        method: 'post',
        path: `/v3/banks`,
        params: ['merchantid*', 'content-type', 'authorization*'],
        default_params: {'content-type': 'application/json', countryCode: 'NG'},
    },

    /**
     * Transfer to Bank
     */
    transferToBank: {
        method: 'post',
        path: `/v3/transfer/toBank`,
        params: ['merchantid*', 'content-type', 'authorization*'],
        default_params: {'content-type': 'application/json'},
    },

    /**
     * Bank Transfer status
     */
    bankTransferStatus: {
        method: 'post',
        path: `/v3/transfer/status/toBank`,
        params: ['merchantid*', 'content-type', 'authorization*'],
        default_params: {'content-type': 'application/json'},
    }
}