const tableName = process.env.TABLE_NAME || 'Table'
const dynamoDbClient = require('./tests/utils/dynamoDbClient');
let response;


exports.lambdaHandler = async (event, context) => {

	const newCounterValue = (await getCurrentCounter()) + 1;
	let item = {
		id: "1",
		counter: newCounterValue
	}

	try {
		let data = await dynamoDbClient.connect().put({ TableName: tableName, Item: item }).promise();
		response = {
			statusCode: 200,
			body: JSON.stringify({ counter: newCounterValue })
		};
		return response;
	} catch (err) {
		console.log(err);
		return err;
	}
}

const getCurrentCounter = async () => {
	const params = {
		TableName: tableName,
		Key: {
			id: "1"
		}
	}

	try {
		const data = await dynamoDbClient.connect().get(params).promise();
		return data.Item.counter;
	} catch (err) {
		console.log("err", err);
		return 0;
	}
}