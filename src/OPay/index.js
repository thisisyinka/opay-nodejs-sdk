'use strict';
const got = require('got');
const _ = require('lodash');
const alphabetizeObjectKeys = require('alphabetize-object-keys');

const checkout = require('../apis/checkout');
const inquiry = require('../apis/inquiry');
const transfers = require('../apis/transfers');

const { generatePrivateKey, getClientBody } = require('../lib/utils');

const endpoints = Object.assign({}, checkout, inquiry, transfers);

_.mixin(
  (function () {
    var _isEmpty = _.isEmpty;
    return {
      isEmpty: function (value, defined) {
        if (defined && _.isObject(value)) {
          return !_.some(value, function (value, key) {
            return value !== undefined;
          });
        }
        return _isEmpty(value);
      },
    };
  })(),
);

const createApiFunction = (config) => {
  let customConfig = { headers: {} };
  return function (params = {}) {
    let payload = false;
    let inputs = {};

    if (config.body !== null) {
      if (config.default_body) {
        inputs = Object.assign({}, config.default_body, params);
      } else {
        inputs = Object.assign({}, params);
      }

      if (!(params instanceof Object)) {
        throw new TypeError('Argument: [ params(s) ] Should Be An Object Literal');
      }

      if (!_.isEmpty(inputs, true)) {
        const body = getClientBody(config, alphabetizeObjectKeys(inputs));
        payload = alphabetizeObjectKeys(body);
      } else {
        throw new TypeError('Argument: [ params(s) ] Not Meant To Be Empty!');
      }
    }

    if (payload === false) {
      payload = '{}';
    }

    if (config.authorization === 'SIGNATURE') {
      customConfig.headers.Authorization = `Bearer ${generatePrivateKey(this.privateKey, JSON.parse(payload))}`;
    }

    customConfig.body = payload;
    return this.httpClient[config.method](config.path, customConfig);
  };
};

function OPayError(message) {
  this.name = 'OPayError';
  this.message = message || '';
}

OPayError.prototype = Error.prototype;

class OPay {
  constructor(publicKey, privateKey, merchantID, appEnv = 'development') {
    const environment = /^(?:development|local|dev)$/;
    this.privateKey = privateKey;

    this.base_url = {
      sandbox: 'http://sandbox.cashierapi.operapay.com/api/v3/',
      production: 'https://cashierapi.operapay.com/api/v3/',
    };

    this.httpClientOptions = {
      prefixUrl: environment.test(appEnv) ? this.base_url.sandbox : this.base_url.production,
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${publicKey}`,
        MerchantID: merchantID,
      },
      mutableDefaults: true,
      hooks: {
        onError: [
          (error) => {
            const { response } = error;
            if (response && response.body) {
              error.name = 'OPayError';
              error.message = `${response.body.code}: ${response.body.message} (${error.statusCode})`;
            }
            return error;
          },
        ],
        afterResponse: [
          (response) => {
            if (response.body.code !== '00000') {
              let message = `${response.body.code}: ${response.body.message}`;
              throw new OPayError(message);
            }
            return response;
          },
        ],
      },
      responseType: 'json',
    };

    this.httpClient = got.extend(this.httpClientOptions);
  }

  mergeClientOptions(options) {
    this.httpClient = this.httpClient.extend(options);
  }
}

for (let endpoint in endpoints) {
  if (endpoints.hasOwnProperty(endpoint)) {
    OPay.prototype[endpoint] = createApiFunction(endpoints[endpoint]);
  }
}

module.exports = OPay;
