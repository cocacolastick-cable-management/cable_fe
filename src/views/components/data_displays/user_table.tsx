import {DataGrid, GridColDef, GridRenderCellParams, GridRowSelectionModel} from "@mui/x-data-grid";
import {JSXElementConstructor, useEffect, useState} from "react";
import {TableToolBar} from "../../base_components";
import {UserRes} from "../../../api_schema";
import {formatDatetime} from "../../../infras";
import {RoleChip, UserStatus} from "./index";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType, setSelectedUserById} from "../../../stores";

interface UserTableProps
{
   toolBar?: JSXElementConstructor<any>
   userList?: UserRes[]
   selectedUser?: UserRes | null
}

function UserTable(props: UserTableProps)
{
   const dispatch = useDispatch()
   const [rows, setRows] = useState<any>()

   useEffect(() => {
      setRows(props.userList?.map((user) => {
         return { id: user.id, name: user.name,
            email: user.email, role: user.role,
            status: user.isActive ? "active" : "disable", createdAt: user.createdAt
         }
      }))
   }, [props.userList])

   const handleRowSelection = (rowSelectionModel: GridRowSelectionModel) => {
      dispatch(setSelectedUserById({id: rowSelectionModel[0] as string}))
   }

   return (
      <DataGrid
         sx={cfg.sx}
         rowSelectionModel={props.selectedUser != null ? [props.selectedUser?.id] : undefined}
         onRowSelectionModelChange={handleRowSelection}
         density={"comfortable"} columns={columns} rows={rows ?? []}
         slots={{ toolbar: props.toolBar === undefined ? TableToolBar : props.toolBar }}
      />
   )
}

const cfg = {
   sx: {
      border: "none",
   }
}

const columns: GridColDef[] = [
   { field: 'name', headerName: 'name', flex: 1},
   { field: 'status', headerName: 'status', flex: 1, renderCell: (params: GridRenderCellParams) => <UserStatus isActive={params.value === "active"}/>},
   { field: 'email', headerName: 'email', flex: 2},
   { field: 'role', headerName: 'role', flex: 1, renderCell: (params: GridRenderCellParams) => <RoleChip role={params.value}/>},
   { field: 'createdAt', headerName: 'created at', flex: 1.5, renderCell: (params: GridRenderCellParams<Date>) => formatDatetime(params.value)},
];

export default UserTable