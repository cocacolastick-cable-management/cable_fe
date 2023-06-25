import {Chip} from "@mui/material";
import {useEffect, useState} from "react";

interface ContractStatusProps
{
   isAvailable: boolean
   size?: "small" | "medium"
}

function ContractStatus(props: ContractStatusProps)
{
   const [state, setState] = useState<{color: any, label: string}>()

   useEffect(() => {
      if (props.isAvailable) {
         setState({
            color: "info",
            label: "available"
         })
      } else {
         setState({
            color: "error",
            label: "unavailable"
         })
      }
   }, [props.isAvailable])

   return <Chip color={state?.color} label={state?.label} variant={"filled"} size={props.size} />
}

export default ContractStatus