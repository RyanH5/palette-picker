const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});