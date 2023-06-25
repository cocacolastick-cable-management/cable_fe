import {DataGrid, GridColDef, GridRenderCellParams, GridRowSelectionModel} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType, setSelectedContractById} from "../../../stores";
import {formatDateExpire, formatDatetime} from "../../../infras";
import {ContractStatus} from "../../components";
import {TableToolBar} from "../../base_components";

function ContractTable()
{
   const dispatch = useDispatch()
   const contractList = useSelector((state: RootStateType) => state.contract.contractList)
   const [rows, setRows] = useState<any>()

   useEffect(() => {
      setRows(contractList?.map((contract) => {
         return {id: contract.id, name: contract.name, amount: contract.cableAmount,
            stock: contract.stock, startDay: contract.startDay,
            endDay: contract.endDay, expireIn: contract.endDay,
            isAvailable: contract.isAvailable ? "available" : "unavailable"
         }
      }))
   }, [contractList])

   const handleSelectRow = (rowSelectionModel: GridRowSelectionModel) => {
      dispatch(setSelectedContractById({id: rowSelectionModel[0] as string}))
   }

   return (
      <div className={"max-h-[calc(100vh-130px)] h-full overflow-hidden"}>
         <DataGrid
            onRowSelectionModelChange={handleSelectRow}
            sx={cfg.sx}
            density={"comfortable"} columns={columns} rows={rows ?? []}
            slots={{ toolbar: TableToolBar }}
         />
      </div>
   )
}

const cfg = {
   sx: {
      border: "none",
   }
}

const columns: GridColDef[] = [
   { field: 'name', headerName: 'name', flex: 1},
   { field: 'isAvailable', headerName: 'status', flex: 1, renderCell: (params: GridRenderCellParams) => <ContractStatus isAvailable={params.value === "available"}/> },
   { field: 'amount', headerName: 'original amount', flex: 1},
   { field: 'stock', headerName: 'stock', flex: 1},
   { field: 'startDay', headerName: 'start day', flex: 1.5, renderCell: (params: GridRenderCellParams<Date>) => formatDatetime(params.value) },
   { field: 'endDay', headerName: 'end day', flex: 1.5, renderCell: (params: GridRenderCellParams<Date>) => formatDatetime(params.value)},
   { field: 'expireIn', headerName: 'expire in', flex: 1.5,  renderCell: (params: GridRenderCellParams<Date>) => formatDateExpire(params.value)},
];

export default ContractTable