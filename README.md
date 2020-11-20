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

### Setup & Usage
```javascript
const OPay = require('opay-node');

const public_key = "OPAYPUB16057006237420.047574601637614955";
const environment = process.env.NODE_ENV;
const merchantId = "256620111818015";

const opay = new OPay(public_key, merchantId, environment);

//Initialize transaction
const initializeTransaction = () => {
	try {
		const { body } = await opay.initializeTransaction({
			reference: "test_20191123132233",
		    mchShortName: "Jerry's shop",
		    productName: "Apple AirPods Pro",
		    productDesc: "The best wireless earphone in history",
		    userPhone: "+2349876543210",
		    userRequestIp: "123.123.123.123",
		    amount: "100",
		    callbackUrl: "https://you.domain.com/callbackUrl",
		    returnUrl: "https://you.domain.com/returnUrl",
		    expireAt: "10"
		});
	// do something with body
	}catch(e){
		// do something with error	
	}
}

// List of banks
const bankList = () => {
	try{
		const { body } = await opay.getBanks();
		// do something with body
	} catch(e) {
		// do something with error
	}
}
```


# Contributions

This project is open-sourced, thus we encourage other developers to contribute and help improve it. To get started please:

1. Fork this repo
2. Create your feature branch (``` git checkout -b your-feature-branch ```)
3. Off you go!
