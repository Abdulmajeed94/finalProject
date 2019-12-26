import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import * as AWS from 'aws-sdk' 
import * as uuid from 'uuid'
// import { getUserId } from '../utils'


import { CreateTodoRequest } from '../../requests/CreateTodoRequest'


const docClient = new AWS.DynamoDB.DocumentClient()



const groupTable = process.env.GROUPS_TABLE 
 


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event:', event)
  const parsedBody: CreateTodoRequest = JSON.parse(event.body)
  const itemId = uuid.v4()
  
  
  
  
  
  const authorazation = event.headers.authorazation
  const split = authorazation.split(' ')
  const jwtPayload = split[1]


   const newItem = {

    id:itemId,
    createdAt:new Date().toISOString(),
    // userId: getUserId(jwtToken),
    ...parsedBody,
    dueDate:new Date().toISOString()
  } 

  //  const groupId = event.pathParameters.groupId
  //  const validGroupId = await groupExist(groupId)



  await docClient.put({
    TableName: groupTable,
    Item: newItem
  }).promise()

  return{
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credential': true
    },
    body: JSON.stringify({
      newItem
    })
  }




//    TODO: Implement creating a new TODO item 
}
