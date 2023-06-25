import {Background, SignInForm} from "./index";
import {Link} from "@mui/material";
import {useSelector} from "react-redux";
import {RootStateType} from "../../../stores";

function SignInPage()
{
   const auth = useSelector((state: RootStateType) => state.auth.data)

   if (auth) {
      window.location.replace("/dashboard");
   }

   return (
      <div className={sty.cln}>

         <Background/>

         <section className={sty.wrap.cln}>
            {/*TODO split this to Logo component*/}
            <img className={"w-[60px]"} src={require("../../../assets/images/3d-casual-life-green-energy.png")} alt=""/>

            <header className={sty.wrap.header.cln}>
               <p className={sty.wrap.header.title.cln}>Sign in</p>
               <Link className={sty.wrap.header.forgotBtn.cln}>forgot password?</Link>
            </header>

            <SignInForm/>

         </section>

      </div>
   )
}

const sty = {
   cln: "relative min-h-screen flex justify-center",
   wrap: {
      cln: "w-[470px] rounded-lg p-14 self-center",
      header: {
         cln: "flex justify-between items-end mb-6",
         title: {
            cln: "text-2xl font-medium"
         },
         forgotBtn: {
            cln: "hover:cursor-pointer"
         }
      }
   }
}

export default SignInPage