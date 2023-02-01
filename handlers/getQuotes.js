import AWS from "aws-sdk";

AWS.config.update({region: process.env.REGION})

const s3 = new AWS.S3()

export const getQuotes = async (event) => {
    try {
        console.log("Incoming:::", event);

        //get json file from s3
        const bucketData = await s3.getObject({
                Bucket: "myjsonbucket",
                Key: "quotes.json"
            }
        ).promise()

        const jsonData = JSON.parse(bucketData.Body)
        console.log("JSON:::", jsonData);

        // create response
        return {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Origin": "*",
            },
            statusCode: 200,
            body: JSON.stringify(jsonData)
        }

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: error.message})
        }
    }

}
