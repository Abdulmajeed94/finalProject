import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

import * as AWS from 'aws-sdk'
import {parseUserId} from '../../auth/utils'


const docClient = new AWS.DynamoDB.DocumentClient()

const groupTable = process.env.GROUPS_TABLE
const userIdIndex = process.env.USER_ID_INDEX



export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  console.log('processing event' , event) 


const authorazation = event.headers.Authorazation

const userId = parseUserId(authorazation.split(" ")[1]);



  const result = await docClient.query({
    TableName: groupTable,
    IndexName: userIdIndex,
    KeyConditionExpression: "userId =userId",
    ExpressionAttributeValues: {
      "userId": userId
    }
    
  }).promise()

  const items = result.Items

  return{
    statusCode:200,
    headers:{
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credential': true
    },

    body: JSON.stringify({
      items
    })

  }


//   const groupId = event.pathParameters.groupId

//   const validGroupId = await groupExist(groupId)

//   if (!validGroupId) {
//     return{
//       statusCode: 404,
//       headers: {
//         'Access-Control-Allow-Origin': '*'
//       },

//       body: JSON.stringify({
//         error: 'Group does not exist'
//       })
//     }
//   }

//   const images = await getImagesPerGroup(groupId)

//   return{
//     statusCode: 200,
//     headers: {
//       'Access-Control-Allow-Origin': '*'
//     },
//     body: JSON.stringify({
//       items:images
//     })
//   }
//   TODO: Get all TODO items for a current user
// }

// async function groupExist(groupId:string){


//   const result = await docClient
//     .get ({
//       TableName: groupTable,
//       Key: {
//         id:groupId
//       }
//     }).promise()

//     console.log('Get group: ' , result)
//     return !!result.Item
// }


// async function getImagesPerGroup(groupId: string){
//   const result = await docClient.query({
//     TableName: imageTable,
//     KeyConditionExpression: 'groupId =:groupId',
//     ExpressionAttributeValues:{

//       'groupId': groupId

//     },
//     ScanIndexForward:false
//   }).promise()
// 

}
