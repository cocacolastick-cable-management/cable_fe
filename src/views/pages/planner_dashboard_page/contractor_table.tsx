import {UserTable} from "../../components";
import {useSelector} from "react-redux";
import {RootStateType} from "../../../stores";

function ContractorTable()
{
   const contractorList = useSelector((state: RootStateType) => state.user.contractorList)

   return (
      <div className={"max-h-[calc(100vh-130px)] h-full overflow-hidden"}>
         <UserTable userList={contractorList ?? []}/>
      </div>
   )
}

export default ContractorTable