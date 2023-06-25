import {ArticleSharp, CableSharp, ProductionQuantityLimits, UploadSharp, DownloadSharp, WatchLaterSharp} from "@mui/icons-material";
import {formatDateExpire, formatDatetime} from "../../../infras";
import {ContractRes, UserRes} from "../../../api_schema";
import {useEffect, useState} from "react";

interface ContractDetailProps
{
   contract?: ContractRes | null
   supplier?: UserRes | null
}

function ContractDetail(props: ContractDetailProps)
{
   const [warningReasonList, setWarningReasonList] = useState<string[]>([])
   const [isOutDate, setIsOutDate] = useState(props.contract != null && (new Date(props.contract.endDay)).getTime() <= (new Date()).getTime())

   useEffect(() => {
      setIsOutDate(props.contract != null && (new Date(props.contract.endDay)).getTime() <= (new Date()).getTime())
   }, [props.contract?.endDay])

   useEffect(() => {
      // I think this should be done by backend
      const reasonList: string[] = []
      if (isOutDate) reasonList.push("the contract is out date")
      if (props.contract != null && props.contract.stock <= 0) reasonList.push("the contract ran out of stock")
      if (props.supplier?.isActive === false) reasonList.push("the supplier of this contract is disable")

      setWarningReasonList(reasonList)
   }, [props.supplier?.isActive, props.contract?.stock])

   return (
      <section>
         {/*<ArticleSharp fontSize={"small"}/>*/}
         <p className={"font-bold capitalize"}>Contract </p>

         <div className={"border-l-[2px] border-l-slate-300 pl-2 flex items-start flex-col gap-[5px] mt-1 ml-1"}>

            {
               // I think this should be done by backend
               warningReasonList.length > 0
               ? (<><div className={"px-2 pl-3 py-1 w-full rounded-r-lg border-[1px] border-l-0 border-red-500 text-red-500"}>
                     <p className={"font-medium"}>Warning: </p>
                     {warningReasonList.map((reason, i) => <p key={i}>- {reason}</p>)}
                  </div><div className={"h-[10px]"}></div></>)
               : null
            }

            <div className={"flex items-end gap-1 "}>
               <ArticleSharp fontSize={"small"}/>
               <p>{props.contract?.name}</p>
            </div>
            <div className={"flex items-end gap-1 "}>
               <CableSharp fontSize={"small"}/>
               <p>{props.contract?.supplierEmail} <span className={"font-medium"}>(supplier)</span></p>
            </div>

            {/*just too lazy, this is for space*/}
            <div className={"h-[10px]"}></div>

            <div className={"flex items-end gap-1 "}>
               <ProductionQuantityLimits fontSize={"small"}/>
               <p>{props.contract?.cableAmount} <span className={"font-medium"}>(amount)</span></p>
            </div>
            <div className={"flex items-end gap-1 "}>
               <ProductionQuantityLimits fontSize={"small"}/>
               <p>{props.contract?.stock} <span className={"font-medium"}>(stock)</span></p>
            </div>

            <div className={"h-[10px]"}></div>

            <div className={"flex items-end gap-1 "}>
               <DownloadSharp fontSize={"small"}/>
               <p>{formatDatetime(props.contract?.startDay ?? new Date())} <span className={"font-medium"}>(start)</span></p>
            </div>
            <div className={"flex items-end gap-1 "}>
               <UploadSharp fontSize={"small"}/>
               <p>{formatDatetime(props.contract?.endDay ?? new Date())} <span className={"font-medium"}>(end)</span></p>
            </div>
            <div className={"flex items-end gap-1 "}>
               <WatchLaterSharp fontSize={"small"}/>
               <p>{!isOutDate ? "expire in" : ""}  {formatDateExpire(props.contract?.endDay ?? new Date())}</p>
            </div>

         </div>
      </section>
   )
}

export default ContractDetail