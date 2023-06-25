import {Timeline, timelineItemClasses} from "@mui/lab";
import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import {RequestHistoryItem} from "./index";
import {RequestHistoryRes, RequestRes} from "../../../api_schema";
import {requestStatus, roles} from "../../../constants";
import {api} from "../../../infras";
import {useDispatch} from "react-redux";
import {addUpContractStock, replaceRequestByNew, setSelectedRequestById} from "../../../stores";
import {ConfirmDialog} from "../../base_components";

interface RequestHistoryLineProps
{
   authorRole?: string
   requestId?: string
   historyList?: RequestHistoryRes[] | null
}

// TODO put all together make code dirty, refactor it
function RequestHistoryLine(props: RequestHistoryLineProps)
{
   const dispatch = useDispatch()
   const [btnHandleState, setBtnHandleState] = useState<{label: string, color: any, variant: any, handler: () => void} | null>(null)
   const [isConfirmFormOpen, setIsConfirmFormOpen] = useState(false)

   useEffect(() => {
      if (props.historyList == null) return
      const lastHistory = props.historyList[props.historyList.length - 1]

      // TODO create UpdateRequestButton
      switch (true) {
         case props.authorRole === roles.planner && lastHistory.status !== requestStatus.canceled && lastHistory.status !== requestStatus.collected:
            setBtnHandleState({
               color: "error",
               label: "cancel?",
               variant: "outlined",
               handler: handleUpdateRequestStatus(requestStatus.canceled)
            })
            break;

         case props.authorRole === roles.supplier && lastHistory.status === requestStatus.new:
            setBtnHandleState({
               color: "primary",
               label: "ready?",
               variant: "contained",
               handler: handleUpdateRequestStatus(requestStatus.ready)
            })
            break;

         case props.authorRole === roles.contractor && lastHistory.status === requestStatus.ready:
            setBtnHandleState({
               color: "success",
               label: "collected?",
               variant: "contained",
               handler: handleUpdateRequestStatus(requestStatus.collected)
            })
            break;

         default: setBtnHandleState(null)
      }
   }, [props.authorRole, props.historyList])

   const handleUpdateRequestStatus = (newStatus: string) => {
      return () => {
         api.patch(`/common/requests/${props.requestId}`, {
            status: newStatus
         }).then((res) => {

            const request: RequestRes = res.data.payload

            if (newStatus === requestStatus.canceled) {
               dispatch(addUpContractStock({id: request.contractId, increaseNum: request.cableAmount}))
            }

            dispatch(replaceRequestByNew(request))
            dispatch(setSelectedRequestById({id: request.id}))
         })
      }
   }

   return (
      <div className={""}>
         <p className={"font-bold"}>History </p>
         <Timeline sx={{[`& .${timelineItemClasses.root}:before`]: {flex: 0,padding: 0,}, padding: 0, paddingTop: 1}}>
            {props.historyList?.map((history) => {
                  return <RequestHistoryItem
                     key={history.id}
                     {...history}/>
            })}
         </Timeline>
         {btnHandleState !== null
            ? <>
               <Button
                  size={"small"}
                  sx={{marginTop: "15px", textTransform: "none"}}
                  variant={btnHandleState.variant}
                  color={btnHandleState.color}
                  onClick={() => setIsConfirmFormOpen(true)}
               >{btnHandleState.label}</Button>
               <ConfirmDialog
                  title={"update request"}
                  isOpen={isConfirmFormOpen}
                  handleClose={() => setIsConfirmFormOpen(false)}
                  handleSubmit={btnHandleState.handler}
               />
            </>
            : null}
      </div>
   )
}

export default RequestHistoryLine