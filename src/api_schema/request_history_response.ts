interface RequestHistoryRes
{
   id: string
   requestId: string
   creatorId: string
   creatorEmail: string
   creatorRole: string
   createdAt: Date
   status: string
   action: string
}

export default RequestHistoryRes