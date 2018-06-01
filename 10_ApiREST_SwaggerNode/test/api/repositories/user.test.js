// // user.test.js

// /* global describe, before, after, it */

// const proxyquire = require('proxyquire').noCallThru();

// const mongooseMock = require('mongoose-mock');

// let user;

// describe('User - Tests', () => {
//   before(() => {
//     user = proxyquire(
//       '../../../api/repositories/user',
//       {
//         mongoose: mongooseMock,
//       } // eslint-disable-line comma-dangle
//     );
//   });
// });
