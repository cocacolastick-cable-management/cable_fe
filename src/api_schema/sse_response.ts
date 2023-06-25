import NotificationRes from "./notification_response";
import RequestRes from "./request_response";
import UserRes from "./user_response";

interface SseResponse
{
   data: {
      notification: NotificationRes,
      object: RequestRes | UserRes
   },
   receiverId: string
}

export default SseResponse
// Data
//    :
//    notification
//       :
//       action
//          :
//          "ready"
// createdAt
//    :
//    "2023-06-25T01:13:59.080697+07:00"
// id
//    :
//    "fcb0c001-8e27-40fd-9f9f-1b0981f76fec"
// isRead
//    :
//    false
// objectId
//    :
//    "3547d111-ce01-4ff7-b161-983a6a7a2737"
// objectName
//    :
//    "request-102"
// objectType
//    :
//    "request"
// senderEmail
//    :
//    "supplier@yopmail.com"
// senderId
//    :
//    "6a8e0900-3d63-47db-86d7-b8e3d9753b9d"
//       [[Prototype]]
// :
// Object
// object
//    :
//    cableAmount
//       :
//       9
// contractId
//    :
//    "6a8e0900-3d63-47db-86d7-b8e3d9753b9d"
// contractName
//    :
//    "contract-1"
// contractorEmail
//    :
//    "contractor@yopmail.com"
// contractorId
//    :
//    "189e0bea-a90f-49c3-88d6-0a97293b194f"
// createdAt
//    :
//    "2023-06-24T16:50:42.708399Z"
// historyList
//    :
//    (2) [{…}, {…}]
// id
//    :
//    "3547d111-ce01-4ff7-b161-983a6a7a2737"
// name
//    :
//    "request-102"
// plannerEmail
//    :
//    "planner@yopmail.com"
// plannerId
//    :
//    "28fa436a-ad48-451c-bb1e-684c30720c80"
// status
//    :
//    "ready"
// supplierEmail
//    :
//    "supplier@yopmail.com"
// supplierId
//    :
//    "6a8e0900-3d63-47db-86d7-b8e3d9753b9d"
//       [[Prototype]]
// :
// Object
// receiverId
//    :
//    "28fa436a-ad48-451c-bb1e-684c30720c80"
//       [[Prototype]]
// :
// Object
// ReceiverId
//    :
//    "28fa436a-ad48-451c-bb1e-684c30720c80"