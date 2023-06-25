import {Alert} from "@mui/material";
import {AccountCircle} from "@mui/icons-material"
import {action, objectType, requestStatus} from "../../../constants";
import {ReactNode, useEffect, useState} from "react";
import {RequestStatusIcon} from "./index";
import {formatDatetime} from "../../../infras";
import {useDispatch} from "react-redux";
import {setNotificationIsReadToTrueById, setSelectedRequestById, setSelectedUserById} from "../../../stores";

interface NotificationItemProps
{
   // notification: NotificationRes
   notificationId: string
   action: string
   senderEmail: string
   objectId: string
   objectType: string
   objectName: string
   isRead: boolean
   createdAt: Date
}

// TODO, this component look stupid as hell
function NotificationItem(props: NotificationItemProps)
{
   const dispatch = useDispatch()

   const [state, setState] = useState<{
      color: any,
      message: ReactNode,
      status: any,
      icon: ReactNode
   }>({
      status: props.isRead ? "standard" : "filled",
      color: "",
      message: "",
      icon: props.objectType === objectType.request
         ? <RequestStatusIcon color={"inherit"} status={props.action}/>
         : <AccountCircle color={"inherit"}/>
   })

   useEffect(() => {

      if (props.objectType === objectType.request) {
         switch (props.action) {
            case requestStatus.new: setState({
               ...state,
               message: <><span className={"font-medium underline"}>{props.senderEmail}</span> created <span className={"font-medium underline"}>{props.objectName}</span> at <span className={"font-medium underline"}>{formatDatetime(props.createdAt)}</span></>,
               color: "warning",
               }); break;
            case requestStatus.ready: setState({
               ...state,
               message: <><span className={"font-medium underline"}>{props.senderEmail}</span> mark <span className={"font-medium underline"}>{props.objectName}</span> as <span className={"font-medium underline"}>{props.action}</span> at <span className={"font-medium underline"}>{formatDatetime(props.createdAt)}</span></>,
               color: "info",
               }); break;
            case requestStatus.collected: setState({
               ...state,
               message: <><span className={"font-medium underline"}>{props.senderEmail}</span> mark <span className={"font-medium underline"}>{props.objectName}</span> as <span className={"font-medium underline"}>{props.action}</span> at <span className={"font-medium underline"}>{formatDatetime(props.createdAt)}</span></>,
               color: "success",
               }); break;
            case requestStatus.canceled: setState({
               ...state,
               message: <><span className={"font-medium underline"}>{props.senderEmail}</span> canceled <span className={"font-medium underline"}>{props.objectName}</span> at <span className={"font-medium underline"}>{formatDatetime(props.createdAt)}</span></>,
               color: "error",
               }); break;
         }
      }

      if (props.objectType === objectType.user) {
         switch (props.action) {
            case action.create: setState({
               ...state,
               message: <><span className={"font-medium underline"}>{props.senderEmail}</span> created <span className={"font-medium underline"}>{props.objectName}</span> at <span className={"font-medium underline"}>{formatDatetime(props.createdAt)}</span></>,
               color: "info",
            }); break;
            case action.disable: setState({
               ...state,
               message: <><span className={"font-medium underline"}>{props.senderEmail}</span> disabled <span className={"font-medium underline"}>{props.objectName}</span> at <span className={"font-medium underline"}>{formatDatetime(props.createdAt)}</span></>,
               color: "warning",
            }); break;
            case action.enable: setState({
               ...state,
               message: <><span className={"font-medium underline"}>{props.senderEmail}</span> enabled <span className={"font-medium underline"}>{props.objectName}</span> at <span className={"font-medium underline"}>{formatDatetime(props.createdAt)}</span></>,
               color: "success",
            }); break;
         }
      }

   }, [])

   const handleFocus = () => {

      if (props.objectType === objectType.request)
         dispatch(setSelectedRequestById({id: props.objectId}))
      else if (props.objectType === objectType.user)
         dispatch(setSelectedUserById({id: props.objectId}))

      setState((pre) => ({
         ...pre,
         status: "outlined"
      }))
   }

   const handleBlur = () => {
      setState((pre) => ({
         ...pre,
         status: "standard"
      }))
      if (!props.isRead) {
         dispatch(setNotificationIsReadToTrueById({id: props.notificationId}))
      }
   }

   return (
      <button onFocus={handleFocus} onBlur={handleBlur}>
         <Alert className={"text-[17px]"} icon={state?.icon} variant={state?.status} color={state?.color}>
            {state?.message}
         </Alert>
      </button>
   )
}

export default NotificationItem