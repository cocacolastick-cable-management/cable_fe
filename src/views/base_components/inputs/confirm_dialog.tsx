import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

type ConfirmDialogProps = {
   handleClose?: () => void
   handleSubmit?: () => void
   isOpen?: boolean
   title?: string
   message?: string
}

function ConfirmDialog(props: ConfirmDialogProps)
{
   return (
      <Dialog
         fullWidth
         maxWidth={"xs"}
         open={props.isOpen ?? false}
         onClose={props.handleClose}
      >
         <DialogTitle id="alert-dialog-title">
            {props.title}
         </DialogTitle>
         <DialogContent>
            <DialogContentText id="alert-dialog-description">
               {props.message ?? "This action can not undo, are you sure about it"}
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button onClick={props.handleClose} variant={"contained"}>close</Button>
            <Button onClick={props.handleSubmit}>sure</Button>
         </DialogActions>
      </Dialog>

   )
}

export default ConfirmDialog