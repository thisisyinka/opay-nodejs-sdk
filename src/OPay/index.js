'use strict'

const got = require('got');

const transfers = require('../apis/transfers');
const checkout = require('../apis/checkout');
const inquiry = require('../apis/inquiry');

const allEndpoints = {
    transfers: transfers,
    checkout: checkout,
    inquiry: inquiry,
}

const apiPrefix = {
    sandbox: 'http://sandbox.cashierapi.operapay.com/api/v3',
    production: 'https://cashierapi.operapay.com/api/v3'
}

class OPay {
    constructor (publicKey, appEnv = "development", merchantId) {
        const environment = /^(?:development|dev)$/

    this.httpOptions = {
        baseURL: environment.test(appEnv) ? `${apiPrefix.sandbox}/cashier/initialize` : `${apiPrefix.production}/cashier/initialize`,
        headers: {
            'Content-Type': 'application/json',
            'MerchantId': `${merchantId}`,
            'Authorization': `Bearer ${publicKey}`
        },
        errors: [
            (response) => {
                let errorMsg = ''
                switch (response.statusCode) {
                    case 400:
                        errorMsg = 'Bad Request (400)';
                        break;
                    case 401:
                        errorMsg = 'Unauthorized (401)';
                        break;
                    case 404:
                        errorMsg = 'Not Found (404)';
                    default:
                        break;
                }
            }
        ]
    }

    this.httpClient = got.extend(this.httpOptions)
    }
    
    combineHttpOptions(options) {
        this.httpClient = this.httpClient.extend(options)
    }
}

    for(let apiName in allEndpoints) {
        if(allEndpoints.hasOwnProperty(apiName)) {
            OPay.prototype[apiName] = createAPIMethod(allEndpoints[apiName]);
        }
    }   


module.exports = OPay;