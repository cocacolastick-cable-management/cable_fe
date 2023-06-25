import {
   Autocomplete,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   TextField
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {ChangeEvent, ReactNode, useEffect, useState} from "react";
import {useFormik, getIn} from "formik";
import * as Yup from "yup";
import {addUpContractStock, pushToRequestList, RootStateType, setSelectedRequestById} from "../../../stores";
import {ContractStatus, UserStatus} from "../../components";
import {api} from "../../../infras";
import {CreateRequestRequest, RequestRes} from "../../../api_schema";

interface CreateRequestFormModalProps
{
   isOpen: boolean
   handleClose: () => void
}

// TODO: feedback me if you have any idea to make this code look better
function CreateRequestFormModal(props: CreateRequestFormModalProps)
{
   const dispatch = useDispatch()

   const contractList = useSelector((state: RootStateType) => state.contract.contractList)
   const contractorList = useSelector((state: RootStateType) => state.user.contractorList)

   const [contractListSelectData, setContractListSelectData] = useState<ContractSelectData[]>([])
   const [contractorListSelectData, setContractorListSelectData] = useState<ContractorSelectData[]>([])

   const form = useFormik<FormType>({

      initialValues: {
         amount: 0,
         contract: null,
         contractor: null
      },

      validationSchema: formValidation,
      validateOnChange: false,
      validateOnBlur: true,

      onSubmit: (values) => {
         const data: CreateRequestRequest = {
            contractCounter: values.contract!.contractCounter,
            contractorEmail: values.contractor!.contractorEmail,
            cableAmount: values.amount
         }
         api.post("/planner/requests", data)
            .then((res) => {
               const newRequest = res.data.payload as RequestRes
               dispatch(addUpContractStock({id: newRequest.contractId, increaseNum: -newRequest.cableAmount}))
               dispatch(pushToRequestList(newRequest))
               dispatch(setSelectedRequestById({id: newRequest.id}))
               form.resetForm()
               props.handleClose()
            })
            .catch((exc) => {
               const errors: any[] = exc.response.data.errors
               errors.forEach((error) => {
                  if (error.failedField === "cableAmount") form.setFieldError("amount", error.value)
               })
            })
      }

   })
   const { values, touched, errors, handleSubmit, handleBlur } = form

   const handleInputChange = (e: ChangeEvent<any>) => {
      form.setFieldError(e.target.name, "")
      form.handleChange(e)
   }

   useEffect(() => {
      setContractListSelectData(contractList?.map(contract => {
         return {
            label: `${contract.name} / stock: ${contract.stock} / ${contract.isAvailable ? "available" : "unavailable"}`,
            prettyLabel: (props: any) => <div {...props}>{contract.name} / stock: {contract.stock} / <ContractStatus size={"small"} isAvailable={contract.isAvailable}/></div>,
            contractCounter: contract.counter,
            stock: contract.stock,
            isSupplierActive: contract.supplierStatus,
            endDay: (new Date(contract.endDay)).getTime()
         }
      }) ?? [])
   }, [contractList])

   useEffect(() => {
      setContractorListSelectData(contractorList?.map(contractor => {
         return {
            label: `${contractor.email} / ${contractor.isActive ? "active" : "disable"}`,
            prettyLabel: (props: any) => <div {...props}>{contractor.email} <UserStatus size={"small"} isActive={contractor.isActive}/></div>,
            contractorEmail: contractor.email,
            isActive: contractor.isActive
         }
      }) ?? [])
   }, [contractorList])

   return (
      <Dialog  maxWidth={"xs"} fullWidth open={props.isOpen} onClose={props.handleClose}>

         <DialogTitle>Create New Request</DialogTitle>

         <DialogContent>

            {/*// TODO: feedback me if you have any idea to make this code look better*/}
            <Autocomplete
               onBlur={handleBlur("contract")}
               onChange={(_, value) => {
                  form.setFieldError("contract", "")
                  form.setFieldValue("contract", value)
               }}
               value={values.contract}
               renderOption={(props, option) => option.prettyLabel(props)}
               options={contractListSelectData}
               getOptionLabel={(option) => option.label}
               renderInput={(params) =>
                  <TextField {...params}
                    name={"contract"} id={"contract"}
                    helperText={touched.contract && (getIn(errors, "contract.stock") || getIn(errors, "contract.isSupplierActive") || getIn(errors, "contract.endDay") || getIn(errors, "contract"))}
                    error={!!(touched.contract && (getIn(errors, "contract.stock") || getIn(errors, "contract.isSupplierActive") || getIn(errors, "contract.endDay") || getIn(errors, "contract")))}
                    onBlur={handleBlur("contract")}
                    required margin={"normal"} label="Contract" />}
            />

            {/*// TODO: feedback me if you have any idea to make this code look better*/}
            <Autocomplete
               onBlur={handleBlur("contractor")}
               onChange={(_, value) => {
                  form.setFieldError("contractor", "")
                  form.setFieldValue("contractor", value)
               }}
               value={values.contractor}
               renderOption={(props, option) => option.prettyLabel(props)}
               options={contractorListSelectData}
               getOptionLabel={(option) => option.label}
               renderInput={(params) =>
                  <TextField {...params}
                    name={"contractor"} id={"contractor"}
                    helperText={touched.contractor && (getIn(errors, "contractor.isActive") || getIn(errors, "contractor"))}
                    error={!!(touched.contractor && (getIn(errors, "contractor.isActive") || getIn(errors, "contractor")))}
                    onBlur={handleBlur("contractor")}
                    required margin={"normal"} label="Contract" />}
            />

            <TextField
               fullWidth required
               error={!!(touched.amount && errors.amount)}
               helperText={touched.amount && errors.amount}
               value={values.amount} onChange={handleInputChange}
               onBlur={handleBlur} name={"amount"}
               margin={"normal"} label={"Amount"} type={"number"}/>

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

interface ContractSelectData
{
   label: string
   prettyLabel: (options: any) => ReactNode
   contractCounter: number
   stock: number
   isSupplierActive: boolean
   endDay: number
}

interface ContractorSelectData
{
   label: string
   prettyLabel: (options: any) => ReactNode
   contractorEmail: string
   isActive: boolean
}

interface FormType
{
   contract: ContractSelectData | null
   contractor: ContractorSelectData | null
   amount: number
}

const formValidation = Yup.object().shape({
   amount: Yup.number().min(1, "invalid cable amount").required('amount is required'),
   contract: Yup.object().required("contract is required").shape({
      stock: Yup.number().min(1, 'the contract is out of stock'),
      isSupplierActive: Yup.boolean().isTrue('this supplier of the contract is disable'),
      endDay: Yup.number().min((new Date()).getTime(), 'the contract is out date')
   }),
   contractor: Yup.object().required("contract is required").shape({
      isActive: Yup.boolean().isTrue('this contractor is disable')
   })
});

export default CreateRequestFormModal