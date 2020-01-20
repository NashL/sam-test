const {getHandler} = require('./handler');
const dynamoDbClient = require('./utils/dynamoDbClient');

exports.lambdaHandler = getHandler({
  dynamo: dynamoDbClient.connect(),
});