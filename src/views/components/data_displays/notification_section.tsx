import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
   addUpContractStock,
   pushToNotificationList, replaceContractorByNew,
   replaceRequestByNew, replaceSupplierByNew,
   RootStateType, setSelectedContractById,
   setSelectedRequestById
} from "../../../stores";
import {RequestRes, SseResponse, UserRes} from "../../../api_schema";
import {objectType, requestStatus} from "../../../constants";

function NotificationSection()
{
   const dispatch = useDispatch()
   const accessToken = useSelector((state: RootStateType) => state.auth.data?.authToken.accessToken)

   const selectedRequest = useSelector((state: RootStateType) => state.request.selectedRequest)
   const selectedContract = useSelector((state: RootStateType) => state.contract.selectedContract)

   const [eventSource, setEventSource] = useState<EventSource>()

   useEffect(() => {
      const newEventSource = new EventSource(`api/sse/notifications?access_token=${accessToken}`);
      setEventSource(newEventSource);
      return () => {
         newEventSource.close();
      };
   }, [accessToken])

   useEffect(() => {
      if (!eventSource) return;

      const onMessage = (event: MessageEvent) => {
         const response = JSON.parse(event.data) as SseResponse;
         handleOnMessage(response);
      };

      eventSource.addEventListener("message", onMessage);

      return () => {
         eventSource.removeEventListener("message", onMessage);
      };
   }, [eventSource, selectedRequest, selectedContract])

   const handleOnMessage = (response: SseResponse) => {
      const { notification, object } = response.data;

      if (notification.objectType === objectType.request) {
         handleRequestUpdate(object as RequestRes, notification.action)
      }

      if (notification.objectType === objectType.user) {
         handleUserUpdate(object as UserRes, notification.action)
      }

      dispatch(pushToNotificationList(notification));
   }

   const handleUserUpdate = (user: UserRes, action: string) => {
      dispatch(replaceSupplierByNew(user))
      dispatch(replaceContractorByNew(user))

      if (user.id === selectedContract?.supplierId) {
         dispatch(setSelectedContractById({id: selectedContract.id}))
      }
   }

   const handleRequestUpdate = (request: RequestRes, action: string) => {
      dispatch(replaceRequestByNew(request));

      let increaseNum = 0
      switch (action) {
         case requestStatus.new: increaseNum = -request.cableAmount; break;
         case requestStatus.canceled: increaseNum = request.cableAmount; break;
      }
      dispatch(addUpContractStock({id: request.contractId, increaseNum: increaseNum}))

      if (request.contractId === selectedContract?.id) {
         dispatch(setSelectedContractById({id: request.contractId}))
      }

      if (request.id === selectedRequest?.id) {
         dispatch(setSelectedRequestById({ id: request.id }));
      }
   }

   // const

   return (
      <></>
   )
}

export default NotificationSection