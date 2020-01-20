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
			Key: {
				id: "1"
			}
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
  const newCounterValue = (await getCurrentCounter(deps)) + 1;
	let item = {
		id: "1",
		counter: newCounterValue
	}

	try {
    let data = await deps.dynamo.put({ TableName: tableName, Item: item }).promise();
    return response(200, {counter: newCounterValue});
	} catch (err) {
		// console.log(err);
		return response(400, { message: err.message });
	}
}

const getCurrentCounter = async (deps) => {
	const params = {
		TableName: tableName,
		Key: {
			id: "1"
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
