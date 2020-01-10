const AWS = require('aws-sdk');

const tableName = process.env.TABLE_NAME
let response;
let options = {};

if (process.env.AWS_SAM_LOCAL)
	options.endpoint = "http://host.docker.internal:8000";

const documentClient = new AWS.DynamoDB.DocumentClient(options);

exports.lambdaHandler = async (event, context) => {

	const newCounterValue = (await getCurrentCounter()) + 1;
	let item = {
		id: "1",
		counter: newCounterValue
	}

	try {
		let data = await documentClient.put({ TableName: tableName, Item: item }).promise();
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
		const data = await documentClient.get(params).promise();
		return data.Item.counter;
	} catch (err) {
		console.log("err", err);
		return 0;
	}
}