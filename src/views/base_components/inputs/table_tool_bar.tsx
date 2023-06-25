import {GridToolbarExport, GridToolbarContainer, GridToolbarFilterButton, GridToolbarColumnsButton, GridToolbarQuickFilter} from "@mui/x-data-grid";
import {ReactNode} from "react";

type TableToolBarProps = {
   leftTool?: ReactNode
}

function TableToolBar(props: TableToolBarProps)
{
   return (
      <GridToolbarContainer className={"py-1 border-b-[1px] border-b-slate-300 flex items-center justify-between"}>
         <div className={"flex gap-3"}>
            {props.leftTool}
            <GridToolbarFilterButton
               // @ts-ignore
               size={"small"}/>
            <GridToolbarColumnsButton size={"small"}/>
            <GridToolbarExport size={"small"}/>
         </div>
         <GridToolbarQuickFilter sx={{width: 400, padding: 0}} variant={"outlined"} size={"small"}/>
      </GridToolbarContainer>
   )
}

export default TableToolBar