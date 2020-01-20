'use strict';
const { getHandler, putHandler, deleteHandler } = require('../../handler');
const AWS = require("aws-sdk-mock");
const eventFactory = require('../../utils/mockEventFactory');

const chai = require('chai');
const expect = chai.expect;

const dynamoDbClient = require('../../utils/dynamoDbClient');

describe('When we GET the counter', () => {
  afterEach(() => {
    AWS.restore('DynamoDB.DocumentClient');
  })

  it('verifies successful response', async () => {
    AWS.mock('DynamoDB.DocumentClient', 'get', function (params, callback) {
      callback(null, { Item: { id: 1, counter: 0 } });
    });

    const { headers, statusCode, body } = await getHandler({ dynamo: dynamoDbClient.connect() })(eventFactory.emptyEvent());
    expect(headers['Content-Type']).to.equal('application/json');
    expect(statusCode).to.equal(200);
    expect(body).to.be.an('string');

    let parsedBody = JSON.parse(body);
    expect(parsedBody).to.be.an('object');
    expect(parsedBody.counter).to.be.equal(0);
  });

  it('verifies error response if dynamoDb fails', async () => {
    AWS.mock('DynamoDB.DocumentClient', 'get', function (params, callback) {
      callback(new Error('fail'));
    });

    const { headers, statusCode, body } = await getHandler({ dynamo: dynamoDbClient.connect() })(eventFactory.emptyEvent());
    expect(headers['Content-Type']).to.equal('application/json');
    expect(statusCode).to.equal(400);
    expect(JSON.parse(body).message).to.equal('fail');
  });
});

describe('When we increment the counter with PUT method', function () {
  afterEach(() => {
    AWS.restore('DynamoDB.DocumentClient');
  })

  it('verifies successful response after increasing the counter for the first time', async () => {
    AWS.mock('DynamoDB.DocumentClient', 'get', function (params, callback) {
      callback(null, { Item: { id: 1, counter: 0 } });
    });
    AWS.mock('DynamoDB.DocumentClient', 'put', function (params, callback) {
      callback(null, { Item: { id: 1, counter: 1 } });
    });

    const { headers, statusCode, body } = await putHandler({ dynamo: dynamoDbClient.connect() })(eventFactory.putEvent());

    expect(headers['Content-Type']).to.equal('application/json');
    expect(statusCode).to.equal(200);
    expect(body).to.be.an('string');

    let parsedBody = JSON.parse(body);
    expect(parsedBody).to.be.an('object');
    expect(parsedBody.counter).to.be.equal(1);
  });

  it('verifies error response if dynamoDb fails', async () => {
    AWS.mock('DynamoDB.DocumentClient', 'put', function (params, callback) {
      callback(new Error('fail'));
    });

    const { headers, statusCode, body } = await putHandler({ dynamo: dynamoDbClient.connect() })(eventFactory.putEvent());
    expect(headers['Content-Type']).to.equal('application/json');
    expect(statusCode).to.equal(400);
    expect(JSON.parse(body).message).to.equal('fail');
  });
});

describe('When we try to delete the counter', function () {
  it('verifies error response', async () => {
    const { headers, statusCode, body } = await deleteHandler({ dynamo: dynamoDbClient.connect() })(eventFactory.emptyEvent());

    expect(headers['Content-Type']).to.equal('application/json');
    expect(statusCode).to.equal(500);
    expect(body).to.be.an('string');

    let parsedBody = JSON.parse(body);
    expect(parsedBody).to.be.an('object');
    expect(parsedBody.message).to.be.equal('Internal Server Error');

  });
});
