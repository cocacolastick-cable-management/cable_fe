import {UserTable as UserTableCpn} from "../../components"
import {useSelector} from "react-redux";
import {RootStateType} from "../../../stores";
import {UserTableToolBar} from "./index";

function UserTable()
{
   const userList = useSelector((state: RootStateType) => state.user.allUserList)
   const selectedUser = useSelector((state: RootStateType) => state.user.selectedUser)

   return (
      <div className={"max-h-[calc(100vh-82px)] h-full overflow-hidden"}>
         <UserTableCpn
            selectedUser={selectedUser}
            toolBar={UserTableToolBar}
            userList={userList ?? []}/>
      </div>
   )
}

export default UserTable