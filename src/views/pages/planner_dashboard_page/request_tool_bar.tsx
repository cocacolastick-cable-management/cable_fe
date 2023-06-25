import {useState} from "react";
import { Button } from "@mui/material";
import { AddBox } from "@mui/icons-material";
import {TableToolBar} from "../../base_components";
import {CreateRequestFormModal} from "./index";

function RequestToolBar()
{
   const [isCreateRequestFormOpen, setIsCreateRequestFormOpen] = useState<boolean>(false)

   const handleClose = () => {
      setIsCreateRequestFormOpen(false)
   }

   return (
      <TableToolBar
         leftTool={<>
            <Button
               onClick={() => setIsCreateRequestFormOpen(true)}
               size={"small"}
               variant="contained"
               startIcon={<AddBox sx={{color: "white"}}/>}
            >New Request</Button>
            <CreateRequestFormModal handleClose={handleClose} isOpen={isCreateRequestFormOpen}/>
         </>}
      />
   )
}

export default RequestToolBar