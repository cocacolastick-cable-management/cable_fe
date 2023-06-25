import {RequestPageSharp, ArticleSharp, NotificationsSharp} from "@mui/icons-material";
import {useEffect, useMemo} from "react";
import {DashboardLayout} from "../../layouts";
import {TabNav, TabRouteType} from "../../base_components";
import {fetchSupplierContractList, fetchSupplierRequestList, useRootDispatch} from "../../../stores";
import RequestTable from "./request_table";
import LeftSide from "./left_side";
import ContractTable from "./contract_table";
import {NotificationsStack} from "../../components";

function SupplierDashboardPage()
{
   const rootDispatch = useRootDispatch()

   useEffect(() => {
      rootDispatch(fetchSupplierRequestList())
      rootDispatch(fetchSupplierContractList())
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
         },
         {
            label: <div className={"flex items-center gap-1"}>
               <ArticleSharp fontSize={"small"}/>
               <p>contracts</p>
            </div>,
            element: <ContractTable/>
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

export default SupplierDashboardPage