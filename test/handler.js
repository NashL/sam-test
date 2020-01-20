const tableName = process.env.TABLE_NAME || 'Table'
const response = (statusCode, body, additionalHeaders) => ({
	statusCode,
	body: JSON.stringify(body),
	headers: { 'Content-Type': 'application/json', ...additionalHeaders },
});

exports.getHandler = (deps) => async (event) => {
	try {
		const params = {
			TableName: tableName,
			Key: JSON.parse(event.body)
		}
		let data = await deps.dynamo.get(params).promise();

		if (Object.entries(data).length === 0 && data.constructor === Object) {
			data.Item = {}
			data.Item.counter = 0
		}
		return response(200, { counter: data.Item.counter })
	} catch (err) {
		return response(400, { message: err.message });
	}
};

exports.putHandler = deps => async (event) => {
	const currentValue = await getCurrentCounter(deps, event);
	const newCounterValue = parseInt(currentValue) + 1;
	const parsedBody = JSON.parse(event.body);
	parsedBody.counter = newCounterValue;
	try {
		let data = await deps.dynamo.put({ TableName: tableName, Item: parsedBody }).promise();
		return response(200, { counter: newCounterValue });
	} catch (err) {
		// console.log(err);
		return response(400, { message: err.message });
	}
}

const getCurrentCounter = async (deps, event) => {
	const params = {
		TableName: tableName,
		Key: {
			id: JSON.parse(event.body).id
		}
	}

	try {
		const data = await deps.dynamo.get(params).promise();
		return data.Item.counter;
	} catch (err) {
		console.log("err", err);
		return 0;
	}
}

exports.deleteHandler = deps => async (event) => {
	try {
		throw new Error('something bad happened');
	} catch (err) {
		// console.log(err);
		return response(500, { message: 'Internal Server Error' });
	}
};
