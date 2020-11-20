# OPay NodeJS SDK

This NodeJS SDK makes it easy to integrate your applications & interact with the [OPay](https://opayweb.com) APIs.


## Introduction

To view OPay's API documentation, please [click here](https://documentation.opayweb.com).

Please note that you will need your public key, private/secret key and your merchantId. Please visit OPay's API documentation for more information on how to get this.

## OPay Services exposed

#### Checkout (Collect payment):
- Initializing a Transaction
- Checking status of a Transaction
- Closing a transaction

#### Transfers (Send money):
- Transfer to User Wallet
- Transfer to Merchant Wallet
- Transfer to Bank
- Wallet Transfer Status
- Get list of Banks
- Get list of Countries
- Bank Transfer Status

#### Inquiry (Check balance, Validate User/Merchant & Bank Account Number)
- Validate OPay User
- Validate OPay Merchant
- Query Balance
- Validate Bank Account Number

## Getting Started

### Installing SDK
``` npm install opay ```

### Usage Examples
You can get your publicKey and privateKey in from the OPay Merchant dashboard. Go [here](https://open.opayweb.com/) to get your keys.
```javascript
const OPay = require('opay');
const opay = new OPay(publicKey,  privateKey,  merchantID, appEnv =  'development');
```
