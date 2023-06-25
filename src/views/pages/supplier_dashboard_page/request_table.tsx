import {DataGrid, GridColDef, GridRenderCellParams, GridRowSelectionModel} from '@mui/x-data-grid'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {RootStateType, setSelectedRequestById} from "../../../stores";
import {RequestStatus} from "../../components";
import {formatDatetime} from "../../../infras";
import {TableToolBar} from "../../base_components";

function RequestTable()
{
   const dispatch = useDispatch()
   const requestList = useSelector((state: RootStateType) => state.request.requestList)
   const selectedRequest = useSelector((state: RootStateType) => state.request.selectedRequest)
   const [rows, setRows] = useState<any>()

   useEffect(() => {
      setRows(requestList?.map((request) => {
         return {id: request.id, name: request.name,
            status: request.status, amount: request.cableAmount,
            contract: request.contractName, contractor: request.contractorEmail,
            planner: request.plannerEmail, createdAt: request.createdAt
         }
      }))
   }, [requestList])

   const handleSelectRow = (rowSelectionModel: GridRowSelectionModel) => {
      dispatch(setSelectedRequestById({id: rowSelectionModel[0] as string}))
   }

   return (
      // man! the height of mui DataGrid is stupid as hell
      <div className={"max-h-[calc(100vh-130px)] h-full overflow-hidden"}>
         <DataGrid
            onRowSelectionModelChange={handleSelectRow}
            rowSelectionModel={selectedRequest != null ? [selectedRequest.id as string | number] : undefined}
            sx={cfg.sx}
            density={"comfortable"} columns={columns} rows={rows ?? []}
            slots={{toolbar: TableToolBar}}
         />
      </div>
   )
}

const cfg = {
   sx: {
      border: "none"
   }
}

const columns: GridColDef[] = [
   { field: 'name', headerName: 'name', flex: 1.25},
   { field: 'status', headerName: 'status', flex: 1.25, renderCell: (params: GridRenderCellParams) => <RequestStatus status={params.value}/> },
   { field: 'contract', headerName: 'contract', flex: 1},
   { field: 'amount', headerName: 'amount', flex: 1, renderCell: (params: GridRenderCellParams) => <p className={"text-xl text-[#666666] font-bold"}>{params.value}</p>},
   { field: 'contractor', headerName: 'contractor', flex: 1.75},
   { field: 'planner', headerName: 'planner', flex: 1.75},
   { field: 'createdAt', headerName: 'created at', flex: 2, renderCell: (params: GridRenderCellParams) => formatDatetime(params.value)},
];

export default RequestTable