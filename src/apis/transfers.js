'use strict'

module.exports = {
    /**
     * Transfer to Wallet
     */
    transferToWallet: {
        method: 'post',
        path: `${process.env.OPAY_URL}/transfer/toWallet`,
        params: ['merchantid*', 'content-type', 'authorization*'],
        default_params: {'content-type': 'application/json'},
    },

    /**
     * Transfer to Bank
     */
    transferToBank: {
        method: 'post',
        path: `${process.env.OPAY_URL}/transfer/toBank`,
        params: ['merchantid*', 'content-type', 'authorization*'],
        default_params: {'content-type': 'application/json'},
    },

    /**
     * Wallet Trasfer Status
     */
    transferStatus: {
        method: 'post',
        path: `${process.env.OPAY_URL}/transfer/status/toWallet`,
        params: ['merchantid*', 'content-type', 'authorization*'],
        default_params: {'content-type': 'application/json'},
    }
}