import {TableToolBar} from "../../base_components";
import { Button } from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {useState} from "react";
import CreateUserFormModal from "./create_user_form_modal";

function UserTableToolBar()
{
   const [isCreateUserFormOpen, setIsCreateUserFormOpen] = useState<boolean>(false)

   const handleClose = () => {
      setIsCreateUserFormOpen(false)
   }

   return (
      <TableToolBar leftTool={
         <>
            <Button
               onClick={() => setIsCreateUserFormOpen(true)}
               size={"small"}
               variant="contained"
               startIcon={<AddBox sx={{color: "white"}}/>}
            >new user</Button>
            <CreateUserFormModal handleClose={handleClose} isOpen={isCreateUserFormOpen}/>
         </>
      }/>
   )
}

export default UserTableToolBar