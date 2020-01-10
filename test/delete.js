let response;

exports.lambdaHandler = async (event) => {
    try {
        throw new Error('something bad happened');
    } catch (err) {
        console.log(err);
        response = {
            'statusCode': 500,
            'body': JSON.stringify({
                message: 'Internal Server Error',
            })
        }
        return response;
    }
};
