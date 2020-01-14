'use strict';

const getFunc = require('../../get.js');
const putFunc = require('../../put.js');
const deleteFunc = require('../../delete.js');
const chai = require('chai');
const expect = chai.expect;
var event, context;

describe('When we get the counter', function () {
    it('verifies successful response', async () => {
        const result = await getFunc.lambdaHandler(event, context);
        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let parsedResponse = JSON.parse(result.body);
        expect(parsedResponse).to.be.an('object');
        expect(parsedResponse.counter).to.be.a('number');
    });
});


describe('When we increment the counter', function () {
  it('verifies successful response', async () => {
      const result = await putFunc.lambdaHandler(event, context);
      expect(result).to.be.an('object');
      expect(result.statusCode).to.equal(200);
      expect(result.body).to.be.an('string');

      let parsedResponse = JSON.parse(result.body);
      expect(parsedResponse).to.be.an('object');
      expect(parsedResponse.counter).to.be.a('number');
  });
});

describe('When we try to delete the counter', function () {
  it('verifies error response', async () => {
      const result = await deleteFunc.lambdaHandler(event, context);
      expect(result).to.be.an('object');
      expect(result.statusCode).to.equal(500);
      expect(result.body).to.be.an('string');

      let parsedResponse = JSON.parse(result.body);
      expect(parsedResponse).to.be.an('object');
      expect(parsedResponse.message).to.be.equal('Internal Server Error');
  });
});
