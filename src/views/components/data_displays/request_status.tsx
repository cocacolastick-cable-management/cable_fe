import {Chip} from "@mui/material"
import {useEffect, useState} from "react";
import {requestStatus} from "../../../constants";

interface RequestStatusProps
{
   status: string
   size?: "small" | "medium"
}

function RequestStatus(props: RequestStatusProps)
{
   const [color, setColor] = useState<any>()

   useEffect(() => {
      switch (props.status) {
         case requestStatus.new: setColor("warning"); break
         case requestStatus.ready: setColor("info"); break
         case requestStatus.collected: setColor("success"); break
         case requestStatus.canceled: setColor("error"); break
      }
   }, [props.status])

   return <Chip sx={{textTransform: 'none'}} color={color} variant={"filled"} label={props.status} size={props.size}/>
}

export default RequestStatus