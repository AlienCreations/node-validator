'use strict';

const {
  label,
  isRequired,
  isOptional,
  isObjectOf,
  isArrayOf,
  prr
} = require('../index');

const ALLOWED_FIELDS = ['foo', 'bar', 'baz'];

const fakeType = isObjectOf({ foo : prr.isString });

const fakeValidate = label('fakeValidate', isObjectOf({
  req1 : isRequired(prr.stringIsOneOf(ALLOWED_FIELDS)),
  req2 : isRequired(prr.isString),
  opt1 : isOptional(prr.isPositiveNumber),
  foos : isOptional(isArrayOf(fakeType))
}));

const FAKE_PAYLOAD_MISSING_PROP = {
  req2 : 'foo'
};

const FAKE_PAYLOAD_VALID = {
  req1 : 'foo',
  req2 : 'bar',
  foos : [
    { foo : 'bar' },
    { foo : 'baz' },
    { foo : 'bat' }
  ]
};


const FAKE_PAYLOAD_INVALID_NESTED_PROP = {
  req1 : 'foo',
  req2 : 'bar',
  foos : [
    { foo : 'bar' },
    { foo : 1234 },
    { foo : 'bat' }
  ]
};

const FAKE_PAYLOAD_UNSUPPORTED_PROP = {
  req1 : 'foo',
  req2 : 'bar',
  odd  : 'this is unsupported'
};

const FAKE_PAYLOAD_ILLEGAL_VALUE = {
  req1 : 'bat',
  req2 : 'bar'
};

describe('isolatedValidation', () => {

  it('gracefully allows a valid payload', () => {
    expect(() => {
      fakeValidate(FAKE_PAYLOAD_VALID);
    }).not.toThrow();
  });

  it('throws an error when a required property is missing', () => {
    expect(() => {
      fakeValidate(FAKE_PAYLOAD_MISSING_PROP);
    }).toThrow(new Error('fakeValidate -> req1 -> Missing required property'));
  });

  it('throws an error when given an unsupported property', () => {
    expect(() => {
      fakeValidate(FAKE_PAYLOAD_UNSUPPORTED_PROP);
    }).toThrow(new Error('fakeValidate -> odd -> Unsupported property'));
  });

  it('throws an error when given an illegal value for a supported property', () => {
    expect(() => {
      fakeValidate(FAKE_PAYLOAD_ILLEGAL_VALUE);
    }).toThrow(new Error('fakeValidate -> req1 -> Illegal value for property'));
  });

  it('throws an error when given an illegal value for a supported nested property', () => {
    expect(() => {
      fakeValidate(FAKE_PAYLOAD_INVALID_NESTED_PROP);
    }).toThrow(new Error('fakeValidate -> foos -> [1] -> foo -> Illegal value for property'));
  });

});
