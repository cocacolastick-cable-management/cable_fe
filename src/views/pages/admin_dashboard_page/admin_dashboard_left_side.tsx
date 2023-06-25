import {ReactNode, useEffect, useState} from "react";
import {EmptySide} from "../../layouts";
import {useSelector} from "react-redux";
import {RootStateType} from "../../../stores";
import {UserDetail} from "../../components";
import {CircularProgress} from "@mui/material";

function AdminDashboardLeftSide()
{
   const [content, setContent] = useState<ReactNode>(<EmptySide/>)
   const selectedUser = useSelector((state: RootStateType) => state.user.selectedUser)

   useEffect(() => {
      if (selectedUser != null) {
         setContent(<CircularProgress />)
         setTimeout(
            () => setContent(<UserDetail authorRole={"admin"} user={selectedUser}/>),
            200
         )
      }
   }, [selectedUser])

   return (
      <div className={"h-[calc(100vh-80px-81.2px)] p-5 overflow-auto flex flex-col gap-5"}>
         {content}
      </div>
   )
}

export default AdminDashboardLeftSide