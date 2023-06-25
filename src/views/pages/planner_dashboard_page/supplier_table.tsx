import {UserTable} from "../../components";
import {useSelector} from "react-redux";
import {RootStateType} from "../../../stores";

function SupplierTable()
{
   const supplierList = useSelector((state: RootStateType) => state.user.supplierList)

   return (
      <div className={"max-h-[calc(100vh-130px)] h-full overflow-hidden"}>
         <UserTable userList={supplierList ?? []}/>
      </div>
   )
}

export default SupplierTable