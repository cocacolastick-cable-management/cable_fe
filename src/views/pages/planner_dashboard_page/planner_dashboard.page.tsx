import {NotificationsSharp, RequestPageSharp, ArticleSharp, CableSharp, PrecisionManufacturingSharp} from "@mui/icons-material"
import {useEffect, useMemo} from "react";
import {DashboardLayout} from "../../layouts";
import {TabNav, TabRouteType} from "../../base_components";
import {ContractorTable, PlannerDashboardLeftSide, RequestTable, SupplierTable} from "./index";
import {NotificationsStack} from "../../components";
import ContractTable from "./contract_table";
import {
   fetchContractorList,
   fetchPlannerContractList,
   fetchRequestList,
   fetchSupplierList,
   useRootDispatch
} from "../../../stores";

function PlannerDashboardPage()
{
   const rootDispatch = useRootDispatch()
   
   useEffect(() => {
      rootDispatch(fetchRequestList())
      rootDispatch(fetchPlannerContractList())
      rootDispatch(fetchContractorList())
      rootDispatch(fetchSupplierList())
   }, [rootDispatch])
   
   // TODO well, the mui tab make things rerender when switching tabs, even using useMemo, try to optimize this
   // I tried to put this array outside of the function, but it crash the app, don't know why
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
         },
         {
            label: <div className={"flex items-center gap-1"}>
               <CableSharp fontSize={"small"}/>
               <p>supplier</p>
            </div>,
            element: <SupplierTable/>
         },
         {
            label: <div className={"flex items-center gap-1"}>
               <PrecisionManufacturingSharp fontSize={"small"}/>
               <p>contractors</p>
            </div>,
            element: <ContractorTable/>
         }
      ]
   }, [])

   return (
      <DashboardLayout
         leftSide={<PlannerDashboardLeftSide/>}
         main={<div className={"flex flex-col"}>
            <TabNav routes={routes}/>
         </div>}
      />
   )
}

// const initRoutes: TabRouteType[] = [
//    {
//       label: <div className={"flex items-center gap-1"}>
//          <NotificationsSharp fontSize={"small"}/>
//          <p>(10)notifications</p>
//       </div>,
//       element: null
//    },
//    {
//       label: <div className={"flex items-center gap-1"}>
//          <RequestPageSharp fontSize={"small"}/>
//          <p>requests</p>
//       </div>,
//       element: <RequestTable/>
//    },
//    {
//       label: <div className={"flex items-center gap-1"}>
//          <ArticleSharp fontSize={"small"}/>
//          <p>contracts</p>
//       </div>,
//       element: null
//    },
//    {
//       label: <div className={"flex items-center gap-1"}>
//          <CableSharp fontSize={"small"}/>
//          <p>supplier</p>
//       </div>,
//       element: null
//    },
//    {
//       label: <div className={"flex items-center gap-1"}>
//          <PrecisionManufacturingSharp fontSize={"small"}/>
//          <p>contractors</p>
//       </div>,
//       element: null
//    }
// ]


export default PlannerDashboardPage