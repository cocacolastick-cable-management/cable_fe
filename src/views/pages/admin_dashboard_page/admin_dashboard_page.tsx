import {DashboardLayout} from "../../layouts";
import {UserTable} from "./index";
import {fetchAdminUserList, useRootDispatch} from "../../../stores";
import {useEffect} from "react";
import AdminDashboardLeftSide from "./admin_dashboard_left_side";

function AdminDashboardPage()
{
   const rootDispatch = useRootDispatch()

   useEffect(() => {
      rootDispatch(fetchAdminUserList())
   }, [rootDispatch])

   return (
      <DashboardLayout
         leftSide={<AdminDashboardLeftSide/>}
         main={<UserTable/>}
      />
   )
}

export default AdminDashboardPage