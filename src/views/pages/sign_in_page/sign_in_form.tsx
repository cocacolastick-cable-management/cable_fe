import {Button, TextField} from "@mui/material"
import {ChangeEvent} from "react"
import {useFormik} from "formik"
import * as Yup from "yup"
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {SignInRequest, SignInResponse} from "../../../api_schema"
import {api, apiCode, localStore} from "../../../infras"
import {setAuthData} from "../../../stores"

function SignInForm()
{
   const dispatch = useDispatch()

   const form = useFormik<SignInRequest>({
      initialValues: {
         email: "",
         password: ""
      },

      validationSchema: formValidation,
      validateOnChange: false,
      validateOnBlur: true,

      onSubmit: (values) => {
         api.post("/common/sign-in", values)
            .then(res => {
               handleSignInSuccess(res.data.payload)
            })
            .catch(exc => {
               handleSignInFailed(exc.response.data)
            })
      }
   })
   const { values, touched, errors, handleSubmit, handleBlur } = form

   const handleInputChange = (e: ChangeEvent<any>) => {
      form.setFieldError(e.target.name, "")
      form.handleChange(e)
   }

   const handleSignInSuccess = (data: SignInResponse) => {
      dispatch(setAuthData(data))
      localStore.setAuthData(data)
      window.location.replace('/dashboard');
   }

   const handleSignInFailed = (data: any) => {
      switch (data.code) {
         case apiCode.AF:
            form.setFieldError("email", "incorrect email or password")
            form.setFieldError("password", "incorrect email or password")
            break // I think if else better than switch case
         case apiCode.DA:
            form.setFieldError("email", "your account is disable")
            break // I think if else better than switch case
      }
   }

   return (
      <form className={sty.cln}>

         <TextField
            error={!!(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            value={values.email} onChange={handleInputChange}
            onBlur={handleBlur} name={"email"} required
            label={"Email"} type={"email"}/>

         <TextField
            error={!!(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            value={values.password} onChange={handleInputChange}
            onBlur={handleBlur} name={"password"} required
            label={"Password"} type={"password"}/>

         <Button
            onClick={() => handleSubmit()}
            variant={sty.submitBtn.variant} size={"large"}>
            Sign in
         </Button>

      </form>
   )
}

const sty = {
   cln: "flex flex-col gap-6",
   submitBtn: {
      variant: "contained" as any
   }
}

const formValidation = Yup.object().shape({
   email: Yup.string().email('Invalid email address').required('Email is required'),
   password: Yup.string().required('Password is required')
});

export default SignInForm