import {useSelector} from "react-redux";
import {RootStateType} from "../../../stores";
import {ReactNode, useEffect, useState} from "react";
import {EmptySide} from "../../layouts";
import {CircularProgress} from "@mui/material";
import {RequestSideDetail} from "../../components";

function LeftSide()
{
   const authorRole = "contractor"

   const selectedRequest = useSelector((state: RootStateType) => state.request.selectedRequest)

   const [content, setContent] = useState<ReactNode>(<EmptySide/>)

   useEffect(() => {
      if (selectedRequest !== null) {
         handleSelectRequest()
      }
   }, [selectedRequest])

   const handleSelectRequest = () => {
      setContent(<CircularProgress />)
      setTimeout(
         () => setContent(<RequestSideDetail
            authorRole={authorRole!}
            request={selectedRequest}/>), 250)
   }

   return (
      <div className={"h-[calc(100vh-80px-81.2px)] p-5 overflow-auto flex flex-col gap-5"}>
         {content}
      </div>
   )
}

export default LeftSide