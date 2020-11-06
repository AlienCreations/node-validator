'use strict';

const V   = require('o-validator'),
      prr = require('prettycats');

const { error, errors } = require('@businesswire/bw-node-error');

const {
  isObjectOf,
  isPartialObjectOf,
  isArrayOf,
  isOptional,
  isRequired,
  label
} = require('jcvd').customErrors({
  handleInvalid     : () => errors.validation.VALUE(),
  handleMissing     : () => errors.validation.REQUIRED(),
  handleUnsupported : () => errors.validation.UNSUPPORTED()
});

const _customErrorHandler = identifier => caughtErrors => {
  const { property, errorCode } = caughtErrors[0],
        errorTemplate           = errors.validation[errorCode]({
          messageContext : `${identifier.toUpperCase()} -> ${property}`,
          debug          : {
            property,
            errorCode
          }
        });

  throw error(errorTemplate);
};

const validatePayload = identifier => schema => props => {
  return V.validateWithErrorHandler(_customErrorHandler(identifier), schema, props);
};

module.exports = {
  validatePayload,
  prr,
  V,
  isObjectOf,
  isPartialObjectOf,
  isArrayOf,
  isOptional,
  isRequired,
  label
};
