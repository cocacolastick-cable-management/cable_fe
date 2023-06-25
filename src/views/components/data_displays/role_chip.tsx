import {Chip} from "@mui/material";
import {useEffect, useState} from "react";
import {roles} from "../../../constants";

interface RoleChipProps
{
   role: string
   size?: "small" | "medium"
}

function RoleChip(props: RoleChipProps)
{
   const [state, setState] = useState<{color: any, label: string}>()

   useEffect(() => {
      switch (props.role) {
         case roles.admin: setState({color: "secondary", label: "admin"}); break;
         case roles.planner: setState({color: "warning", label: "planner"}); break;
         case roles.contractor: setState({color: "success", label: "contractor"}); break;
         case roles.supplier: setState({color: "info", label: "supplier"}); break;
      }
   }, [props.role])

   return <Chip size={props.size ?? "medium"} variant={"filled"} color={state?.color}
                label={<p className={"text-white"}>{state?.label}</p>}/>
}

export default RoleChip