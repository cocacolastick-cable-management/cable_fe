import {Chip} from "@mui/material";
import {useEffect, useState} from "react";

interface UserStatusProps
{
   isActive: boolean
   size?: "small" | "medium"
}

function UserStatus(props: UserStatusProps)
{
   const [state, setState] = useState<{color: any, label: string}>()

   useEffect(() => {
      if (props.isActive) {
         setState({color: "success", label: "active"})
      } else {
         setState({color: "default", label: "disable"})
      }
   }, [props.isActive])

   return <Chip color={state?.color} size={props.size} variant={"filled"} label={state?.label}/>
}

export default UserStatus