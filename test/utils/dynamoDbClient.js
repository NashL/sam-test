const AWS = require('aws-sdk');
const awsRegion = process.env.AWS_REGION || 'us-east-1'
let dynamoDbClient;

const makeClient = () => {
  const options = {
    region: awsRegion
  }
  if (process.env.AWS_SAM_LOCAL) {
    options.endpoint = 'http://host.docker.internal:8000';
  }
  dynamoDbClient = new AWS.DynamoDB.DocumentClient(options)
  return dynamoDbClient
}

module.exports = {
  connect: () => dynamoDbClient || makeClient()
}