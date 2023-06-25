import {RequestHistoryRes} from "./";

interface RequestRes
{
   id: string
   name: string
   status: string
   cableAmount: number

   historyList: RequestHistoryRes[]

   contractName: string
   contractId: string

   supplierEmail: string
   supplierId: string

   contractorEmail: string
   contractorId: string

   plannerEmail: string
   plannerId: string

   createdAt: Date
}

export default RequestRes

