const AWS = require('aws-sdk');
const region = process.env.AWS_REGION || 'us-east-1'

const makeClient = () => {

  const options = {
    region,
    apiVersion: '2012-08-10'
  }
  if (process.env.AWS_SAM_LOCAL) {
    options.endpoint = 'http://host.docker.internal:8000';
  }
  const dynamoDbClient = new AWS.DynamoDB.DocumentClient(options)
  return dynamoDbClient
}

module.exports = {
  connect: () => makeClient() ,
  get: async (params) => {
    const dynamo = new AWS.DynamoDB.DocumentClient({region, apiVersion: '2012-08-10'});
    const {Item} = await dynamo.get({ TableName: params.tableName, Key: { id: 1}}).promise();
    return Item;
  },
  put: async (params) => {
    const dynamo = new AWS.DynamoDB.DocumentClient({region, apiVersion: '2012-08-10'});
    const {Item} = await dynamo.put({ TableName: params.tableName, Item: { id: 2, counter: 0}}).promise();
    return Item;
  }
}