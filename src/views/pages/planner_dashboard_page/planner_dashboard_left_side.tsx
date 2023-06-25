import { CircularProgress } from "@mui/material";
import {ReactNode, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType, setSelectedContractById, setSelectedRequestById, setSelectedUserById} from "../../../stores";
import {ContractSideDetail, RequestSideDetail, UserDetail} from "../../components";
import {EmptySide} from "../../layouts";

function PlannerDashboardLeftSide()
{
   const dispatch = useDispatch()
   // const authorRole = useSelector((state: RootStateType) => state.auth.data?.role)
   const authorRole = "planner"

   // request
   // TODO refactor this code, push them in an Object
   const selectedRequest = useSelector((state: RootStateType) => state.request.selectedRequest)

   const requestContract = useSelector((state: RootStateType) =>
      state.contract.contractList?.find(contract => contract.id === selectedRequest?.contractId))

   const requestSupplier = useSelector((state: RootStateType) =>
      state.user.supplierList?.find(supplier => supplier.id === selectedRequest?.supplierId))

   const requestContractor = useSelector((state: RootStateType) =>
      state.user.contractorList?.find(contractor => contractor.id === selectedRequest?.contractorId))

   // contract
   // TODO refactor this code, push them in an Object
   const selectedContract = useSelector((state: RootStateType) => state.contract.selectedContract)

   const contractSupplier = useSelector((state: RootStateType) =>
      state.user.supplierList?.find(supplier => supplier.id === selectedContract?.supplierId))

   // user
   const selectedUser = useSelector((state: RootStateType) => state.user.selectedUser)

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

   useEffect(() => {
      if (selectedUser !== null) {
         handleSelectUser()
      }
   }, [selectedUser])

   const handleSelectRequest = () => {
      setContent(<CircularProgress />)

      // clean the other selection
      dispatch(setSelectedContractById({id: ""}))
      dispatch(setSelectedUserById({id: ""}))

      setTimeout(
      () => setContent(<RequestSideDetail
         authorRole={authorRole!} request={selectedRequest}
         supplier={requestSupplier} contractor={requestContractor}
         contract={requestContract}/>), 250)
   }

   const handleSelectContract = () => {
      setContent(<CircularProgress />)

      // clean the other selection
      dispatch(setSelectedRequestById({id: ""}))
      dispatch(setSelectedUserById({id: ""}))

      setTimeout(
         () => setContent(<ContractSideDetail supplier={contractSupplier} contract={selectedContract}/>),
         250)
   }

   const handleSelectUser = () => {
      setContent(<CircularProgress />)

      // clean the other selection
      dispatch(setSelectedRequestById({id: ""}))
      dispatch(setSelectedContractById({id: ""}))

      setTimeout(
         () => setContent(<UserDetail authorRole={authorRole} user={selectedUser}/>),
         200
      )
   }

   return (
      <div className={"h-[calc(100vh-80px-81.2px)] p-5 overflow-auto flex flex-col gap-5"}>
         {content}
      </div>
   )
}

export default PlannerDashboardLeftSide