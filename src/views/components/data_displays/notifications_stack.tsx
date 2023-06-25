import {Stack} from "@mui/material"
import {RootStateType} from "../../../stores";
import {useSelector} from "react-redux";
import {NotificationItem} from "./index";

function NotificationsStack()
{
   const notificationList = useSelector((state: RootStateType) => state.notification.notificationList)

   return (
      <div className={"max-h-[calc(100vh-130px)] overflow-auto"}>
         <Stack spacing={1.5} sx={{ padding: 3, paddingTop: 2 }}>
            {
               notificationList == null || notificationList.length === 0
               ? <div>There is no notification</div>
               : notificationList?.map(notification => {
                  return <NotificationItem key={notification.id} {...notification} notificationId={notification.id}/>
               })
            }
         </Stack>
      </div>
   )
}

export default NotificationsStack