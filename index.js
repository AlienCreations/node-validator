'use strict';

const prr = require('prettycats');

const { errors } = require('@aliencreations/node-error');

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

module.exports = {
  prr,
  isObjectOf,
  isPartialObjectOf,
  isArrayOf,
  isOptional,
  isRequired,
  label
};
