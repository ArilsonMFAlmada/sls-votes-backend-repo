const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const _ = require('underscore')
const util =  require('./util.js')

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.VOTES_TABLE;

exports.handler = async (event) => {
    try {
        let vote_id = decodeURIComponent(event.pathParameters.note_id);

        let params = {
            TableName: tableName,
            IndexName: "vote_id-index",
            KeyConditionExpression: "vote_id = :vote_id",
            ExpressionAttributeValues: {
                ":vote_id": vote_id
            },
            Limit: 1
            
        };

        let data =  await dynamodb.query(params).promise();

        if(!_.isEmpty(data.Items)) {
            return {
                statusCode: 200,
                headers: util.getResponseHeaders(),
                body: JSON.stringify(data.Items[0])
            };
        } else {
            return {
                statusCode: 404,
                headers: util.getResponseHeaders()
            }
        }
       
    } catch (error) {
        console.log("Error", err)
        return {
            statusCode: err.statusCode ? err.statusCode : 500,
            headers: util.getResponseHeaders(),
            body: JSON.stringfy({
                error: err.name ? err.name : "Exception",
                message: err.message ? err.message : "Unknown error"
            })
        }
        
    }
}
