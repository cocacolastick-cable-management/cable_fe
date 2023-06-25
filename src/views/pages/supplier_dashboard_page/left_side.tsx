import {useDispatch, useSelector} from "react-redux";
import {RootStateType, setSelectedContractById, setSelectedRequestById} from "../../../stores";
import {ReactNode, useEffect, useState} from "react";
import {EmptySide} from "../../layouts";
import {CircularProgress} from "@mui/material";
import {ContractSideDetail, RequestSideDetail} from "../../components";

function LeftSide()
{
   const dispatch = useDispatch()

   const authorRole = "supplier"

   // TODO refactor this code, push them in an Object
   const selectedRequest = useSelector((state: RootStateType) => state.request.selectedRequest)

   const requestContract = useSelector((state: RootStateType) =>
      state.contract.contractList?.find(contract => contract.id === selectedRequest?.contractId))

   const requestContractor = useSelector((state: RootStateType) =>
      state.user.contractorList?.find(contractor => contractor.id === selectedRequest?.contractorId))


   // TODO refactor this code, push them in an Object
   const selectedContract = useSelector((state: RootStateType) => state.contract.selectedContract)

   const [content, setContent] = useState<ReactNode>(<EmptySide/>)


   useEffect(() => {
      if (selectedRequest !== null) {
         handleSelectRequest()
      }
   }, [selectedRequest])

   useEffect(() => {
      if (selectedContract !== null) {
         handleSelectContract()
      }
   }, [selectedContract])


   const handleSelectRequest = () => {
      setContent(<CircularProgress />)

      // clean the other selection
      dispatch(setSelectedContractById({id: ""}))

      setTimeout(
         () => setContent(<RequestSideDetail
            authorRole={authorRole!}
            request={selectedRequest}
            contractor={requestContractor}
            contract={requestContract}/>), 250)
   }

   const handleSelectContract = () => {
      setContent(<CircularProgress />)

      // clean the other selection
      dispatch(setSelectedRequestById({id: ""}))

      setTimeout(
         () => setContent(<ContractSideDetail contract={selectedContract}/>), 250)
   }

   return (
      <div className={"h-[calc(100vh-80px-81.2px)] p-5 overflow-auto flex flex-col gap-5"}>
         {content}
      </div>
   )
}

export default LeftSide