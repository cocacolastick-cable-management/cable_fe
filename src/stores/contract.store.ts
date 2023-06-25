import {ContractRes} from "../api_schema";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {api} from "../infras";

interface ContractStateType {
   contractList: ContractRes[] | null
   selectedContract: ContractRes | null
}

const initialState: ContractStateType = {
   contractList: null,
   selectedContract: null
}

const fetchPlannerContractList = createAsyncThunk("contract/fetchPlannerContractList", async () => {
   try {
      const res = await api.get("/planner/contracts")
      return res.data.payload as ContractRes[]
   } catch {
      // don't know what to do
   }
})

const fetchSupplierContractList = createAsyncThunk("contract/fetchSupplierContractList", async () => {
   try {
      const res = await api.get("/supplier/contracts")
      return res.data.payload as ContractRes[]
   } catch {
      // don't know what to do
   }
})

const contractSlice = createSlice({

   name: "contract",
   initialState,

   reducers: {
      setSelectedContractById: (state, action: PayloadAction<{id: string}>) => {
         state.selectedContract = state.contractList?.find(contract => contract.id === action.payload.id) ?? null
      },
      addUpContractStock: (state, action: PayloadAction<{id: string, increaseNum: number}>) => {
         const foundIndex = state.contractList?.findIndex(contract => contract.id === action.payload.id) ?? null
         if (foundIndex != null && foundIndex >= 0) {
            const foundContract = {...state.contractList![foundIndex]}
            foundContract.stock += action.payload.increaseNum
            foundContract.isAvailable = foundContract.stock !== 0
            state.contractList![foundIndex] = foundContract
         }
      },
      cleanContractStore: (state) => {
         state.contractList = null
         state.selectedContract = null
      }
   },

   extraReducers: (builder) => {
      builder
         .addCase(fetchPlannerContractList.fulfilled, (state, action) => {
            state.contractList = action.payload ?? null
         })
         .addCase(fetchSupplierContractList.fulfilled, (state, action) => {
            state.contractList = action.payload ?? null
         })
   }
})

export {fetchPlannerContractList, fetchSupplierContractList}
export const {setSelectedContractById, addUpContractStock, cleanContractStore} = contractSlice.actions
export default contractSlice.reducer