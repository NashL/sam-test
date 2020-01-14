const tableName = process.env.TABLE_NAME || 'Table'
const dynamoDbClient = require('./tests/utils/dynamoDbClient');
let response;

exports.lambdaHandler = async (event, context) => {
	try {

		const params = {
			TableName: tableName,
			Key: {
				id: "1"
			}
		}
		let data = await dynamoDbClient.connect().get(params).promise();

		if (Object.entries(data).length === 0 && data.constructor === Object) {
			data.Item = {}
			data.Item.counter = 0
		}
		response = {
			statusCode: 200,
			body: JSON.stringify({ counter: data.Item.counter })
		};
		return response;
	} catch (err) {
		return err;
	}
}