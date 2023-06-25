import {RequestPageSharp, Brightness1, ProductionQuantityLimits, YardSharp} from "@mui/icons-material";
import {RequestRes} from "../../../api_schema";
import {RequestStatus} from "./index";

interface RequestDetailProps
{
   request?: RequestRes | null
}

function RequestDetail(props: RequestDetailProps)
{
   return (
      <div>
         {/*<RequestPageSharp fontSize={"small"}/>*/}
         <p className={"font-bold"}>Request </p>
         <div className={"border-l-[2px] border-l-slate-300 pl-2 flex items-start flex-col gap-[5px] mt-1 ml-1"}>
            <div className={"flex items-end gap-1 "}>
               <RequestPageSharp fontSize={"small"}/>
               <p>{props.request?.name}</p>
            </div>
            <div className={"flex items-end gap-1 "}>
               <ProductionQuantityLimits fontSize={"small"}/>
               <p>{props.request?.cableAmount}</p>
            </div>
            <div className={"flex items-center gap-1 "}>
               <Brightness1 fontSize={"small"}/>
               <RequestStatus size={"small"} status={props.request?.status ?? ""} />
            </div>
            <div className={"flex items-end gap-1 "}>
               <YardSharp fontSize={"small"}/>
               <p>{props.request?.plannerEmail} <span className={"font-medium"}>(planner)</span></p>
            </div>
         </div>
      </div>
   )
}

export default RequestDetail