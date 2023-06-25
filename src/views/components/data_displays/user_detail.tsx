import {CableSharp, Email, AccessTimeFilled, Brightness1, PrecisionManufacturingSharp, YardSharp} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {Button} from "@mui/material";
import {ReactNode, useEffect, useState} from "react";
import {RoleChip, UserStatus} from "./index";
import {api, formatDatetime} from "../../../infras";
import {roles} from "../../../constants";
import {UserRes} from "../../../api_schema";
import {ConfirmDialog} from "../../base_components";
import {replaceUserByNew, setSelectedUserById} from "../../../stores";

interface UserDetailProps
{
   authorRole: string
   user?: UserRes | null
}

function UserDetail(props: UserDetailProps)
{
   const dispatch = useDispatch()
   const [userIcon, setUserIcon] = useState<ReactNode>()
   const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

   const handleCloseForm = () => {
      setIsFormOpen(false)
   }

   const handleOpenForm = () => {
      setIsFormOpen(true)
   }

   const handleSubmitUpdateUserForm = () => {
      api.patch(`/admin/users/${props.user?.id}`, {
         isActive: !props.user?.isActive
      }).then((res) => {
         dispatch(replaceUserByNew(res.data.payload))
         dispatch(setSelectedUserById({id: res.data.payload.id}))
      })
      handleCloseForm()
   }

   useEffect(() => {
      switch (props.user?.role)
      {
         case roles.supplier: setUserIcon(<CableSharp fontSize={"small"}/>); break;
         case roles.contractor: setUserIcon(<PrecisionManufacturingSharp fontSize={"small"}/>); break;
         case roles.planner: setUserIcon(<YardSharp fontSize={"small"}/>); break;
      }
   }, [props.user?.role])

   return (
      <section>
         {/*{userIcon}*/}
         <p className={"font-bold capitalize"}>{props.user?.role} </p>
         <div className={"border-l-[2px] border-l-slate-300 pl-2 flex items-start flex-col gap-[5px] mt-1 ml-1"}>
            <div className={"flex items-end gap-1 "}>
               {userIcon}
               <p>{props.user?.name}</p>
            </div>
            <div className={"flex items-end gap-1"}>
               <Email fontSize={"small"}/>
               <p>{props.user?.email}</p>
            </div>
            <div className={"flex items-center gap-1"}>
               <Brightness1 fontSize={"small"}/>
               <UserStatus size={"small"} isActive={!!props.user?.isActive}/>
            </div>
            {
               props.authorRole === roles.admin
               ? <>
                  <div className={"flex items-center gap-1"}>
                     <Brightness1 fontSize={"small"}/>
                     <RoleChip role={props.user?.role ?? ""} size={"small"}/>
                  </div>
                  <div className={"flex items-end gap-1"}>
                     <AccessTimeFilled fontSize={"small"}/>
                     <p>{formatDatetime(new Date())}</p></div>
                  </>
               : null
            }
            {
               props.authorRole === roles.admin
               ? <>
                  <Button
                     onClick={handleOpenForm}
                     size={"small"} variant={"outlined"}
                     color={props.user?.isActive ? "warning" : "success"}
                     sx={{marginTop: "10px", textTransform: "none"}}>
                     {props.user?.isActive ? "disable?" : "active?"}</Button>
                  <ConfirmDialog
                     title={props.user?.isActive ? "Disable Account" : "Enable Account"}
                     message={"Are you sure about it?"}
                     handleClose={handleCloseForm}
                     handleSubmit={handleSubmitUpdateUserForm}
                     isOpen={isFormOpen}/>
               </>
               : null
            }
         </div>
      </section>
   )
}

export default UserDetail