import AWS from "aws-sdk";

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

export const getSubscribers = async (event) => {

    try {
        const params = {
            TableName: USERS_TABLE
        }

        const userList = await dynamoDbClient.scan(params).promise()

        return {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Origin": "*",
            },
            statusCode: 200,
            body: JSON.stringify(userList.Items)
        }

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: error.message})
        }
    }



}
