import {TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator} from "@mui/lab";
import {Mail} from "@mui/icons-material"
import {Box} from "@mui/material";
import {formatDatetime} from "../../../infras";
import {RequestStatus} from "./index";
import {RequestStatusIcon} from "../../components";

type RequestHistoryItemProps = {
   id: string
   status: string
   createdAt: Date
   creatorEmail: string
}

function RequestHistoryItem(props: RequestHistoryItemProps)
{
   return (
      <TimelineItem key={props.id} >
         <TimelineSeparator>
            <TimelineConnector sx={{bgcolor: "#cbd5e1"}}/>
            <TimelineDot sx={{bgcolor: "#cbd5e1"}}>
               <RequestStatusIcon status={props.status}/>
            </TimelineDot>
            <TimelineConnector sx={{bgcolor: "#cbd5e1"}}/>
         </TimelineSeparator>
         <TimelineContent sx={{ py: '20px', px: 2 }}>
            <Box>
               <RequestStatus size={"small"} status={props.status}/>
               <span className={"text-xs ml-2 text-gray-400"}>{formatDatetime(props.createdAt)}</span>
            </Box>
            <div className={"mt-1"}><Mail fontSize={"small"}/> {props.creatorEmail}</div>
         </TimelineContent>
      </TimelineItem>
   )
}

export default RequestHistoryItem