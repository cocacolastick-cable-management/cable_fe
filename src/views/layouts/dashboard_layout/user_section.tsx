import {Fade, IconButton, Menu, MenuItem} from "@mui/material";
import {useState, MouseEvent} from "react";
import {Logout, Email, MoreVert, ChangeCircle} from "@mui/icons-material";
import {RoleChip} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {cleanAuthData, cleanContractStore, cleanRequestStore, cleanUserStore, RootStateType} from "../../../stores";
import {localStore} from "../../../infras";

function UserSection()
{
   const dispatch = useDispatch()

   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);

   const author = useSelector((state: RootStateType) => state.auth.data!)

   const handleOpen = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(null);
   };

   const handleLogout = () => {
      localStore.clearAuthData()
      dispatch(cleanAuthData())
      dispatch(cleanRequestStore())
      dispatch(cleanContractStore())
      dispatch(cleanUserStore())
      window.location.replace('/');
   }

   return (
      <section className={cfn.cln}>

         <section>
            <div className={cfn.left.top.cln}>
               <p>{author.name}</p>
               <RoleChip size={"small"} role={author.role}/>
            </div>
            <p>{author.email} <Email fontSize={"small"}/></p>
         </section>

         <section>
            <IconButton onClick={handleOpen}>
               <MoreVert/>
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade}>
               <MenuItem onClick={handleLogout}>
                  <Logout/>
                  <p className={"ml-3"}>Logout</p>
               </MenuItem>
               <MenuItem onClick={handleLogout}>
                  <ChangeCircle/>
                  <p className={"ml-3"}>Change Password</p>
               </MenuItem>
            </Menu>
         </section>

      </section>
   )
}

const cfn = {
   cln: "border-t-[1px] border-t-slate-300 px-5 py-4 flex justify-between items-center",
   left: {
      top: {
         cln: "flex gap-2 items-center",
         chip: {

         }
      }
   }
}

export default UserSection