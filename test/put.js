const {putHandler} = require('./handler');
const dynamoDbClient = require('./utils/dynamoDbClient');

exports.lambdaHandler = putHandler({
  dynamo: dynamoDbClient.connect(),
});
