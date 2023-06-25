import {ContractDetail, RequestDetail, RequestHistoryLine, UserDetail} from "./index";
import {ContractRes, RequestRes, UserRes} from "../../../api_schema";

interface RequestSideDetailProps
{
   authorRole: string
   request?: RequestRes | null
   planner?: UserRes
   supplier?: UserRes
   contractor?: UserRes
   contract?: ContractRes
}

function RequestSideDetail(props: RequestSideDetailProps)
{

   return (
      <div className={"flex flex-col gap-5"}>
         <RequestDetail
            request={props.request}/>
         <RequestHistoryLine
            requestId={props.request?.id}
            authorRole={props.authorRole}
            historyList={props.request?.historyList}/>
         {props.contract && <ContractDetail supplier={props.supplier} contract={props.contract}/>}
         {props.supplier && <UserDetail authorRole={props.authorRole} user={props.supplier}/>}
         {props.contractor && <UserDetail authorRole={props.authorRole} user={props.contractor}/>}
      </div>
   )
}

export default RequestSideDetail