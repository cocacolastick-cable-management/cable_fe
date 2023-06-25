import {DashboardLayout} from "../../layouts";
import {TabNav, TabRouteType} from "../../base_components";
import {useEffect, useMemo} from "react";
import {NotificationsSharp, RequestPageSharp} from "@mui/icons-material";
import {NotificationsStack} from "../../components";
import RequestTable from "./request_table";
import {fetchContractorRequestList, useRootDispatch} from "../../../stores";
import LeftSide from "./left_side";

function ContractorDashboardPage()
{
   const rootDispatch = useRootDispatch()

   useEffect(() => {
      rootDispatch(fetchContractorRequestList())
   }, [])

   const routes = useMemo<TabRouteType[]>(() => {
      return [
         {
            label: <div className={"flex items-center gap-1"}>
               <NotificationsSharp fontSize={"small"}/>
               <p>(10)notifications</p>
            </div>,
            element: <NotificationsStack/>
         },
         {
            label: <div className={"flex items-center gap-1"}>
               <RequestPageSharp fontSize={"small"}/>
               <p>requests</p>
            </div>,
            element: <RequestTable/>
         }
      ]
   }, [])

   return (
      <DashboardLayout
         leftSide={<LeftSide/>}
         main={<div className={"flex flex-col"}>
            <TabNav routes={routes}/>
         </div>}
      />
   )
}

export default ContractorDashboardPage