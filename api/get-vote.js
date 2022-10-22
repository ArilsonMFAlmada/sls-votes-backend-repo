const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const util =  require('./util.js')

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.VOTES_TABLE;

exports.handler = async (event) => {
    try {
        
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
