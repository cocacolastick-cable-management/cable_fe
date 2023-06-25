import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {RootLayout} from "../views";
import {roles} from "../constants";
import {lazy} from "react"
import {useSelector} from "react-redux";
import {RootStateType} from "../stores";

const SignInPage = lazy(() => import('../views/pages/sign_in_page/sign_in.page'));
const AdminDashboardPage = lazy(() => import('../views/pages/admin_dashboard_page/admin_dashboard_page'));
const ContractorDashboardPage = lazy(() => import('../views/pages/contractor_dashboard_page/contractor_dashboard.page'));
const PlannerDashboardPage = lazy(() => import('../views/pages/planner_dashboard_page/planner_dashboard.page'));
const SupplierDashboardPage = lazy(() => import('../views/pages/supplier_dashboard_page/supplier_dashboard.page'));

function RootRouter()
{
   const role = useSelector((state: RootStateType) => state.auth.data?.role)

   return (
      <BrowserRouter>
         <Routes>
            <Route element={<RootLayout/>}>
               <Route path={""} element={<SignInPage/>}/>

               {role === roles.planner && (
                  <Route path={"dashboard"} element={<PlannerDashboardPage/>}/>
               )}

               {role === roles.supplier && (
                  <Route path={"dashboard"} element={<SupplierDashboardPage/>}/>
               )}

               {role === roles.contractor && (
                  <Route path={"dashboard"} element={<ContractorDashboardPage/>}/>
               )}

               {role === roles.admin && (
                  <Route path={"dashboard"} element={<AdminDashboardPage/>}/>
               )}

               {!role && <Route path="*" element={<Navigate to="/" replace />} />}
            </Route>
         </Routes>
      </BrowserRouter>
   )
}

export default RootRouter