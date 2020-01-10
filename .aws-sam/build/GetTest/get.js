const AWS = require('aws-sdk');

const tableName = process.env.TABLE_NAME
let response;
let options = {};

if (process.env.AWS_SAM_LOCAL) 
	options.endpoint = "http://host.docker.internal:8000";

const documentClient = new AWS.DynamoDB.DocumentClient(options);

exports.lambdaHandler = async (event, context) => {
	const params = {
		TableName: tableName,
		Key: {
			id: "1"
		}
	}
	try {
		let data = await documentClient.get(params).promise();

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
		console.log(err);
		return err;
	}
}

// let response;

// exports.lambdaHandler = async (event, context) => {
//     try {
//         // const ret = await axios(url);
//         response = {
//             'statusCode': 200,
//             'body': JSON.stringify({
//                 message: 'Display the current counter',
//                 // location: ret.data.trim()
//             })
//         }
//     } catch (err) {
//         console.log(err);
//         return err;
//     }

//     return response
// };

// exports.handler = async (event) => {
//     // TODO implement
//     const response = {
//         satatusCode: 200,
//         body: JSON.stringify('Hello from Lambda!'),
//     };
//     return response;
// };

