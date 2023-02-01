import AWS from 'aws-sdk';
import axios from 'axios';

const sns = new AWS.SNS();

const apiUrl = "https://2vbmgthiwf.execute-api.us-east-1.amazonaws.com/dev"

const publishToSNS = async (message) => {
    await sns.publish({
        Message: message,
        TopicArn: process.env.SNS_TOPIC_ARN
    }).promise();
};

const buildEmailBody = (id, form) => {
    return `
         Message: ${form.message}
         Name: ${form.name}
         Email: ${form.email}
         Service information: ${id.sourceIp} - ${id.userAgent}
      `;
};

export const staticMailer = async (event) => {
    try {

        console.log("EVENT::", event);
        const data = JSON.parse(event.body)
        const emailBody = buildEmailBody(event.requestContext.identity, data)

        await publishToSNS(emailBody);

        const subscribeResponse = await axios.post(
            `${apiUrl}/subscribe`,
            {email: data.email}
        );

        console.log("USER SUBSCRIBE RESPONSE", subscribeResponse);


        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": false, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({message: "OK"}),
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: error.message})
        }
    }
}
