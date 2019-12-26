// import 'source-map-support/register'

// import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

// //import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'

// import * as AWS from "aws-sdk";



// const docClient = new AWS.DynamoDB.DocumentClient()
// const groupTable = process.env.GROUPS_TABLE

// export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//   const itemId = event.pathParameters.itemId
//   const body = JSON.parse(event.body)
//   //const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
  
//   const paramsName = body.paramsName
//   const paramsValue = body.paramsValue
//   const date = new Date()
//   const dueDate= date.toString()
    
  


//   const result = await docClient.update({
//     TableName: groupTable,
    
//     Key:{
//       itemId
//     },
//     ConditionExpression: 'attribute_exists(itemId)',
//     UpdateExpression: 'set ' + paramsName + '= :v',
//   ExpressionAttributeValues:{
//       ':v': paramsValue
//   },
//     ReturnValues: 'ALL NEW'
// }).promise()
     
//     const updatedItem = result.ItemCollectionMetrics
  

//   return{
//     statusCode:200,
//     headers:{
//       'Access-Control-Allow-Origin': '*'
//     },

//     body: JSON.stringify({
//       updatedItem,
//       dueDate,
      
//     })

//   }


//    //TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
// }
