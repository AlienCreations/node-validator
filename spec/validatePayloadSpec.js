'use strict';

const { V, prr, validatePayload } = require('../index');

const validate = validatePayload('fakeData');

const ALLOWED_FIELDS = ['foo', 'bar', 'baz'];

const fakeValidate = validate({
  req1 : V.required(prr.stringIsOneOf(ALLOWED_FIELDS)),
  req2 : V.required(prr.isString),
  opt1 : prr.isPositiveNumber
});

const FAKE_PAYLOAD_MISSING_PROP = {
  req2 : 'foo'
};

const FAKE_PAYLOAD_VALID = {
  req1 : 'foo',
  req2 : 'bar'
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

describe('validatePayload', () => {

  it('gracefully allows a valid payload', () => {
    expect(() => {
      fakeValidate(FAKE_PAYLOAD_VALID);
    }).not.toThrow();
  });

  it('throws an error when a required property is missing', () => {
    expect(() => {
      fakeValidate(FAKE_PAYLOAD_MISSING_PROP);
    }).toThrow(new Error('Missing required property: FAKEDATA -> req1'));
  });

  it('throws an error when given an unsupported property', () => {
    expect(() => {
      fakeValidate(FAKE_PAYLOAD_UNSUPPORTED_PROP);
    }).toThrow(new Error('Unsupported property: FAKEDATA -> odd'));
  });

  it('throws an error when given an illegal value for a supported property', () => {
    expect(() => {
      fakeValidate(FAKE_PAYLOAD_ILLEGAL_VALUE);
    }).toThrow(new Error('Illegal value for property: FAKEDATA -> req1'));
  });

});
