# node-validator
Validator for Alien Creations node apps.

## Install

```
$ yarn add @aliencreations/node-validator
```

## Bundled Dependencies
- [prettycats](https://github.com/seancannon/prettycats)
- [jcvd](https://github.com/seancannon/jcvd)

## Usage
`validate` accepts two payloads - one is the schema and one is the payload. If the payload
does not satisfy the schema, the function will throw an error. 

Please see [node-error](https://github.com/aliencreations/node-error) for 
a complete list of validation errors. 

```js
const {
  isArrayOf,
  isObjectOf,
  isOptional,
  isRequired,
  label,
  prr
} = require('@aliencreations/node-validator');


const accountType = label('accountType', isObjectOf({
  accountName   : isRequired(prr.isStringOfLengthAtMost(30)),
  accountNumber : isRequired(prr.isPositiveNumber)
}));

const validateUser = label('validateUser', isObjectOf({
  firstName : isRequired(prr.isStringOfLengthAtMost(30)),
  lastName  : isRequired(prr.isStringOfLengthAtMost(30)),
  accounts  : isOptional(isArrayOf(accountType))
}));

// Example
try {
  validateUser({ 
    firstName : 'Joe',
    lastName  : 'Swanson',
    accounts  : [
      { 
        name   : 'My Main Account',
        number : 12345
      }
    ]
 });
} catch (e) {
  // threw because accounts -> [0] -> name is unsupported, should have been accountName
}

```
---
## Changelog

##### 1.0.0
  - Initial commit

##### 1.0.1
  - Tree-shake
