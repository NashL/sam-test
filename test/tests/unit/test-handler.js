const AWS = require("aws-sdk-mock");
const {get, put} = require('../../utils/dynamoDbClient');

const chai = require('chai');
const expect = chai.expect;

describe('Database actions tests', () => {
    afterEach(() => {
        AWS.restore('DynamoDB.DocumentClient');
    })
    it('Verifies Database getItems', async () => {        
        AWS.mock('DynamoDB.DocumentClient', 'get', function(params, callback) {
            callback(null, { Item: { id: 1, counter: 0}});
        });
        let result = await get({tableName: 'Table'});
        expect(result).to.be.an('object');
        expect(result.counter).to.be.eql(0);
        expect(result.id).to.be.eql(1);
    });

    it('Verifies Database putItems', async () => {        
        AWS.mock('DynamoDB.DocumentClient', 'put', function(params, callback) {
            callback(null, { Item: { id: 2, counter: 0}});
        });
        let result = await put({tableName: 'Table'});
        expect(result).to.be.an('object');
        expect(result.id).to.be.eql(2);
        expect(result.counter).to.be.eql(0);
    });
    
})