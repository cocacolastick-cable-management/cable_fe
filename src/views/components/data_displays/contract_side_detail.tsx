import {ContractDetail, UserDetail} from "./index";
import {ContractRes, UserRes} from "../../../api_schema";

interface ContractSideDetailProps
{
   contract?: ContractRes | null
   supplier?: UserRes | null
}

function ContractSideDetail(props: ContractSideDetailProps)
{
   return (
      <section className={"flex flex-col gap-5"}>
         <ContractDetail supplier={props.supplier} contract={props.contract}/>
         {props.supplier && <UserDetail authorRole={""} user={props.supplier}/>}
      </section>
   )
}

export default ContractSideDetail