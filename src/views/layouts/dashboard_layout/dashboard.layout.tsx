import {ReactNode, useEffect} from "react";
import {EmptySide, UserSection} from "./index";
import {fetchNotificationList, useRootDispatch} from "../../../stores";
import {NotificationSection} from "../../components";

interface DashboardLayoutProps
{
   leftSide?: ReactNode
   main?: ReactNode
}

// TODO - this should be a higher order component(HOC), not a layout
function DashboardLayout(props: DashboardLayoutProps)
{
   const rootDispatch = useRootDispatch()

   useEffect(() => {
      rootDispatch(fetchNotificationList())
   }, [])
   
   return (
      <section className={cfn.cln}>
         <NotificationSection/>
         <div className={cfn.wrap.cln}>
            <section className={cfn.wrap.leftSide.cln}>
               <>{props.leftSide ?? <EmptySide/>}</>
               <UserSection/>
            </section>
            <>{props.main}</>
         </div>
      </section>
   )
}

const cfn = {
   cln: "h-screen p-10 bg-gray-200",
   wrap: {
     cln: "grid grid-cols-[400px_1fr] " +
        "bg-white h-full rounded-2xl shadow-2xl " +
        "border-[1px] border-slate-200 ",
      leftSide: {
         cln: "border-r-[1px] border-r-slate-300 h-full flex flex-col"
      }
   },
}

export default DashboardLayout