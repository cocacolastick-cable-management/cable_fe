import {requestStatus} from "../../../constants";
import {NewReleases, Checklist, NoCrash, DoDisturb} from "@mui/icons-material"

interface RequestStatusIconProps
{
   status: string
   color?: "inherit" | null
}

function RequestStatusIcon(props: RequestStatusIconProps)
{
   switch (props.status) {
      case requestStatus.new:
         return <NewReleases color={props.color ?? "warning"} fontSize={"small"} />
      case requestStatus.ready:
         return <Checklist color={props.color ?? "info"} fontSize={"small"} />
      case requestStatus.collected:
         return <NoCrash color={props.color ?? "success"} fontSize={"small"} />
      case requestStatus.canceled:
         return <DoDisturb color={props.color ?? "error"} fontSize={"small"} />

      default: return <></>
   }
}

export default RequestStatusIcon