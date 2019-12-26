// import { DocumentClient } from "aws-sdk/clients/dynamodb"



import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from "aws-sdk";


const docClient = new AWS.DynamoDB.DocumentClient()
const groupTable = process.env.GROUPS_TABLE


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const itemId = event.pathParameters.itemId
   
    
      
    

    
     await docClient.delete({
      TableName: groupTable, 
      Key : {
          "id": itemId
      }
    
      
    }).promise()

    return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      itemId
      
    })
  } 

        

        
        
     
      


    

    


     //TODO: Remove a TODO item by id
  }

