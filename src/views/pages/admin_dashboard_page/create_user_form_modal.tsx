import {DialogTitle, Dialog, DialogActions, Button, DialogContent, TextField, MenuItem, SelectChangeEvent} from "@mui/material";
import * as Yup from "yup";
import {roles} from "../../../constants";
import {Select} from "../../base_components";
import {RoleChip} from "../../components";
import {useFormik} from "formik";
import {CreateUserRequest} from "../../../api_schema";
import {ChangeEvent} from "react";
import {api} from "../../../infras";
import {useDispatch} from "react-redux";
import {pushToAllUserList, setSelectedUserById} from "../../../stores";

interface CreateUserFormModalProps
{
   isOpen: boolean
   handleClose: () => void
}

function CreateUserFormModal(props: CreateUserFormModalProps)
{
   const dispatch = useDispatch()
   const form = useFormik<CreateUserRequest>({
      initialValues: {
         role: "",
         email: "",
         name: ""
      },

      validationSchema: formValidation,
      validateOnChange: false,
      validateOnBlur: true,

      onSubmit: values => {
         api.post("/admin/users", values)
            .then((res) => {
               dispatch(pushToAllUserList(res.data.payload))
               dispatch(setSelectedUserById({id: res.data.payload.id}))
               form.resetForm()
               props.handleClose()
            })
            .catch(exc => {
               const errors: any[] = exc.response.data.errors
               errors.forEach((error) => {form.setFieldError(error.failedField, error.value)})
            })
      }
   })
   const { values, touched, errors, handleSubmit, handleBlur } = form;

   const handleInputChange = (e: ChangeEvent<any> | SelectChangeEvent) => {
      form.setFieldError(e.target.name, "")
      form.handleChange(e)
   };

   return (
      <Dialog maxWidth={"xs"} fullWidth open={props.isOpen} onClose={props.handleClose}>

         <DialogTitle>Create New User</DialogTitle>

         <DialogContent>

            <Select
               error={!!(touched.role && errors.role)}
               helperText={touched.role && errors.role}
               name={"role"} value={values.role}
               onChange={handleInputChange} onBlur={handleBlur}
               label={"Role"} required
               fullWidth margin={"normal"}
               renderOptions={renderRoleSelect}/>

            <TextField
               error={!!(touched.email && errors.email)}
               helperText={touched.email && errors.email} value={values.email}
               onBlur={handleBlur} onChange={handleInputChange}
               fullWidth required name={"email"}
               margin={"normal"} label={"Email"} type={"email"}/>

            <TextField
               error={!!(touched.name && errors.name)}
               helperText={touched.name && errors.name} value={values.name}
               onBlur={handleBlur} onChange={handleInputChange}
               fullWidth required name={"name"}
               margin={"normal"} label={"Display Name"} type={"text"}/>

         </DialogContent>

         <DialogActions>
            <Button onClick={props.handleClose} color="secondary">
               Cancel
            </Button>
            <Button onClick={() => handleSubmit()} variant={"contained"} color="primary">
               Submit
            </Button>
         </DialogActions>

      </Dialog>
   )
}

const renderRoleSelect = () => {
   return roleSelectData.map((option, i) => (
      <MenuItem key={i} value={option.role}>
         <RoleChip role={option.role}/>
      </MenuItem>
   ))
}

const roleSelectData = Object.values(roles).map((role, i) => ({
   id: i,
   role: role
}))

const formValidation = Yup.object().shape({
   role: Yup.string().required('Role is required'),
   email: Yup.string().email('Invalid email address').required('Email is required'),
   name: Yup.string().required(`Display name is required`)
});


export default CreateUserFormModal