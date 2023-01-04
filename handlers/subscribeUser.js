import AWS from 'aws-sdk';
import {v4 as uuid} from 'uuid';

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();



export const subscribeUser = async (event, context) => {
    try {
        const data = JSON.parse(event.body);
        console.log("EVENT:::", data);

        const timestamp = new Date().getTime()

        if (typeof data.email !== "string") {
            console.error("Validation Failed: email should be a string");
        }

        const params = {
            TableName: USERS_TABLE,
            Item: {
                userId: uuid(),
                email: data.email,
                subscriber: true,
                createdAt: timestamp,
                updatedAt: timestamp
            }
        }

        // write the user to the database
        const subscribedUser = await dynamoDbClient.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(subscribedUser)
        }

    } catch (error) {
        console.error(error.message);
        return new Error(error.message)
    }
}
