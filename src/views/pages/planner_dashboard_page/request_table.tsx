import {DataGrid, GridColDef, GridRenderCellParams, GridRowSelectionModel} from '@mui/x-data-grid'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {RequestToolBar} from "./index";
import {RootStateType, setSelectedRequestById} from "../../../stores";
import {RequestStatus} from "../../components";
import {formatDatetime} from "../../../infras";

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
            contract: request.contractName, supplier: request.supplierEmail,
            contractor: request.contractorEmail, planner: request.plannerEmail,
            createdAt: request.createdAt
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
            slots={{ toolbar: RequestToolBar }}
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
   { field: 'name', headerName: 'name', flex: 1},
   { field: 'status', headerName: 'status', flex: 1, renderCell: (params: GridRenderCellParams) => <RequestStatus status={params.value}/> },
   { field: 'contract', headerName: 'contract', flex: 1},
   { field: 'amount', headerName: 'amount', flex: 1, renderCell: (params: GridRenderCellParams) => <p className={"text-xl text-[#666666] font-bold"}>{params.value}</p>},
   { field: 'supplier', headerName: 'supplier', flex: 1.5},
   { field: 'contractor', headerName: 'contractor', flex: 1.5},
   { field: 'planner', headerName: 'planner', flex: 1.5},
   { field: 'createdAt', headerName: 'created at', flex: 1.5, renderCell: (params: GridRenderCellParams) => formatDatetime(params.value)},
];

export default RequestTable