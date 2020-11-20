'use strict';

var got = require('got');
var _isEmpty = require('lodash.isempty');
var alphabetizeObjectKeys = require('alphabetize-object-keys');
var sortBy = require('lodash.sortby');
var getKeys = require('lodash.keys');
var forEach = require('lodash.foreach');
var crypto = require('crypto');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var got__default = /*#__PURE__*/_interopDefaultLegacy(got);
var _isEmpty__default = /*#__PURE__*/_interopDefaultLegacy(_isEmpty);
var alphabetizeObjectKeys__default = /*#__PURE__*/_interopDefaultLegacy(alphabetizeObjectKeys);
var sortBy__default = /*#__PURE__*/_interopDefaultLegacy(sortBy);
var getKeys__default = /*#__PURE__*/_interopDefaultLegacy(getKeys);
var forEach__default = /*#__PURE__*/_interopDefaultLegacy(forEach);
var crypto__default = /*#__PURE__*/_interopDefaultLegacy(crypto);

var checkout = {
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
      currency: String,
      expireAt$: String,
      mchShortName$: String,
      payMethods: Array,
      payTypes: Array,
      productDesc$: String,
      productName$: String,
      reference$: String,
      returnUrl$: String,
      userPhone$: String,
      userRequestIp$: String,
    },
    default_body: {
      currency: 'NGN',
      payMethods: ['account', 'qrcode', 'bankCard', 'bankAccount'],
      payTypes: ['BalancePayment', 'BonusPayment', 'OWealth'],
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

var inquiry = {
  /**
   * Query Balance
   */
  queryBalance: {
    method: 'post',
    path: `balances`,
    authorization: 'PUBLIC_KEY',
    body: null,
  },

  /**
   * Validate OPay User
   */
  validateUser: {
    method: 'post',
    path: `info/user`,
    authorization: 'PUBLIC_KEY',
    body: { phoneNumber$: String },
  },

  /**
   * Validate OPay Merchant
   */
  validateMerchant: {
    method: 'post',
    path: `info/merchant`,
    authorization: 'PUBLIC_KEY',
    body: { email$: String },
  },

  /**
   * Validate Bank Account Number
   */
  validateBankAccount: {
    method: 'post',
    path: `verification/accountNumber/resolve`,
    authorization: 'PUBLIC_KEY',
    body: { bankAccountNo$: String, bankCode$: String, countryCode: String },
    default_body: { countryCode: 'NG' },
  },
};

var transfers = {
  /**
   * Transfer to User Wallet
   */
  transferToUserWallet: {
    method: 'post',
    path: `transfer/toWallet`,
    authorization: 'SIGNATURE',
    body: {
      amount$: String,
      country: String,
      currency: String,
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
      country: String,
      currency: String,
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
    body: { countryCode: String },
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

const sortObjectAlphabetically = (map) => {
  const keys = sortBy__default['default'](getKeys__default['default'](map), (a) => {
    return a;
  });
  const newmap = {};
  forEach__default['default'](keys, (k) => {
    newmap[k] = map[k];
  });
  return newmap;
};

const pluckDeep = (obj, key) => key.split('.').reduce((accum, item) => accum[item], obj);

const setDeep = (obj, key, value) => {
  var i;
  key = key.split('.');
  for (i = 0; i < key.length - 1; i++) obj = obj[key[i]];
  obj[key[i]] = value;
};

const generatePrivateKey = (key, data) => {
  return crypto__default['default'].createHmac('sha512', key).update(JSON.stringify(data)).digest('hex');
};

const isLiteralFalsey = (variable) => {
  return variable === '' || variable === false || variable === 0;
};

const checkTypeName = (target, type) => {
  let typeName = '';
  if (isLiteralFalsey(target)) {
    typeName = typeof target;
  } else {
    typeName = '' + (target && target.constructor.name);
  }
  return !!(typeName.toLowerCase().indexOf(type) + 1);
};

const isTypeOf = (value, type) => {
  let result = false;

  type = type || [];

  if (typeof type === 'object') {
    if (typeof type.length !== 'number') {
      return result;
    }

    let bitPiece = 0;
    type = [].slice.call(type);

    type.forEach((_type) => {
      if (typeof _type === 'function') {
        _type = (_type.name || _type.displayName).toLowerCase();
      }
      bitPiece |= 1 * checkTypeName(value, _type);
    });

    result = !!bitPiece;
  } else {
    if (typeof type === 'function') {
      type = (type.name || type.displayName).toLowerCase();
    }

    result = checkTypeName(value, type);
  }

  return result;
};

const isNullOrUndefined = (value) => {
  return isTypeOf(value, ['undefined', 'null']);
};

const getClientBody = (config, inputs) => {
  let body = {};
  let inputValues = {};

  for (var input in config.body) {
    if (config.body.hasOwnProperty(input)) {
      let key = input.replace('$', '');
      let value = pluckDeep(inputs, key);
      let type = config.body[input];
      let required = false;

      if (input.indexOf('$') + 1 === input.length) {
        required = true;
      }

      if ((isNullOrUndefined(value) || value === '') && required) {
        throw new Error(`Param: ${key} is required but not provided; please provide as needed`);
      } else {
        setDeep(body, key, isTypeOf(value, type) ? value : null);
        if (body[key] === null) {
          throw new Error(`Key: "${key}" is not of type ${type.name || type}; please provided as needed`);
        }
      }
    }
  }

  inputValues = JSON.stringify(body);
  return inputValues;
};

var utils = {
  generatePrivateKey,
  getClientBody,
  sortObjectAlphabetically,
};

const { generatePrivateKey: generatePrivateKey$1, getClientBody: getClientBody$1 } = utils;

const endpoints = Object.assign({}, checkout, inquiry, transfers);

const isEmpty = (value, defined) => {
  if (defined && _.isObject(value)) {
    return !_.some(value, function (value, key) {
      return value !== undefined;
    });
  }
  return _isEmpty__default['default'](value);
};

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

      if (!isEmpty(inputs, true)) {
        const body = getClientBody$1(config, alphabetizeObjectKeys__default['default'](inputs));
        payload = alphabetizeObjectKeys__default['default'](body);
      } else {
        throw new TypeError('Argument: [ params(s) ] Not Meant To Be Empty!');
      }
    }

    if (payload === false) {
      payload = '{}';
    }

    if (config.authorization === 'SIGNATURE') {
      customConfig.headers.Authorization = `Bearer ${generatePrivateKey$1(this.privateKey, JSON.parse(payload))}`;
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
      sandbox: 'http://sandbox-internalapi.opayweb.com',
      production: 'https://cashierapi.opayweb.com',
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

    this.httpClient = got__default['default'].extend(this.httpClientOptions);
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

var OPay_1 = OPay;

OPay_1.prototype.version = '1.0.0';

var opayNodejsSdk = OPay_1;

module.exports = opayNodejsSdk;
