const _ = require('lodash');
const crypto = require('crypto');

const sortObjectAlphabetically = (map) => {
  const keys = _.sortBy(_.keys(map), (a) => {
    return a;
  });
  const newmap = {};
  _.each(keys, (k) => {
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
  return crypto.createHmac('sha512', key).update(JSON.stringify(data)).digest('hex');
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

module.exports = {
  generatePrivateKey,
  getClientBody,
  sortObjectAlphabetically,
};
