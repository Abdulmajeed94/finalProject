import 'source-map-support/register'

import * as AWS from 'aws-sdk' 

import * as uuid from 'uuid'

const docClient = new AWS.DynamoDB.DocumentClient()

const s3 = new AWS.S3({

    signatureVersion: 'v4'
  })

const groupTable = process.env.GROUPS_TABLE
const imagesTable = process.env.IMAGES_TABLE
const bucketName = process.env.IMAGE_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION


import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
 const groupId = event.pathParameters.groupId

  //TODO: Return a presigned URL to upload a file for a TODO item with the provided id

  const validGroupId = await groupExist(groupId)

  if (!validGroupId){
      return {
          statusCode: 404,
          headers:{
              'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
              error: 'Group not exist'
          })
      }
  }


  
  const imageId = uuid.v4()
  const newItem = await createImage(groupId,imageId,event)
  const url = getUploadUrl(imageId)

  return{
      statusCode:201,
      headers:{
          'Access-Control-Allow-Origins': '*'
      },
      body: JSON.stringify({
          newItem: newItem,
          uploadUrl:url
      })
  }
  async function groupExist(groupId:string){
    const result = await docClient.get({
      TableName:groupTable,
      Key:{
        id: groupId
      }

    }).promise()

    console.log('Get group: ',result)

    return !!result.Item

  }
  

  
  async function createImage(groupId: string , imageId:string , event:any){
    const timestamp = new Date().toISOString
    const newImage = JSON.parse(event.body)

    const newItem = {
      groupId,
      timestamp,
      imageId,
      ...newImage ,
      imageUrl: 'https://${bucketName}.s3.amazon.com/${imageId}' 
    }
    console.log('Storing new item', newItem)

    await docClient
    .put({
      TableName:imagesTable,
      Item: newItem
    }).promise()

    return newItem
  }


  function getUploadUrl(imageId: string){
    return s3.getSignedUrl('putObject',{
  
      Bucket: bucketName,
      Key: imageId,
      Expires: urlExpiration
    })
  }
  
}
