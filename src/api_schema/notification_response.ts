//
// {
//    "id": "9f2ff696-be03-4414-9d08-1bdfc7074e57",
//    "action": "ready",
//    "isRead": false,
//    "objectType": "request",
//    "objectId": "ad2baa8f-8393-47d8-b264-2a3522130435",
//    "objectName": "request-62",
//    "senderEmail": "supplier1@yopmail.com",
//    "senderId": "6a8e0900-3d63-47db-86d7-b8e3d9753b9d"
// }

interface NotificationRes
{
   id: string
   action: string
   isRead: boolean
   objectType: string
   objectId: string
   objectName: string
   senderEmail: string
   senderId: string
   createdAt: Date
}

export default NotificationRes