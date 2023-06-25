import {UserRes} from "../api_schema"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {api} from "../infras";

interface UserStateType
{
   allUserList: UserRes[] | null
   contractorList: UserRes[] | null
   supplierList: UserRes[] | null
   selectedUser: UserRes | null
}

const initialState: UserStateType = {
   contractorList: null,
   supplierList: null,
   allUserList: null,
   selectedUser: null
}

const fetchContractorList = createAsyncThunk("user/fetchContractorList", async () => {
   try {
      const res = await api.get("/common/users?roles=contractor")
      return res.data.payload as UserRes[]
   } catch {
      // don't know what to do
   }
})

const fetchSupplierList = createAsyncThunk("user/fetchSupplierList", async () => {
   try {
      const res = await api.get("/common/users?roles=supplier")
      return res.data.payload as UserRes[]
   } catch {
      // don't know what to do
   }
})

const fetchAdminUserList = createAsyncThunk("user/fetchAdminUserList", async () => {
   try {
      const res = await api.get("/common/users?roles=supplier,contractor,planner")
      return res.data.payload as UserRes[]
   } catch {
      // don't know what to do
   }
})

const userSlice = createSlice({

   name: "user",
   initialState,

   reducers: {
      setSelectedUserById: (state, action: PayloadAction<{id: string}>) => {
         state.selectedUser = (state.allUserList?.find(user => user.id === action.payload.id)
            || state.contractorList?.find(user => user.id === action.payload.id)
            || state.supplierList?.find(user => user.id === action.payload.id)) ?? null
      },
      pushToAllUserList: (state, action: PayloadAction<UserRes>) => {
         state.allUserList = [action.payload, ...(state.allUserList ?? [])]
      },
      replaceSupplierByNew: (state, action: PayloadAction<UserRes>) => {
         const newSupplierList = state.supplierList!
         const index = newSupplierList.findIndex((user) => user.id === action.payload.id)
         if (index !== undefined && index >= 0) {
            newSupplierList[index] = action.payload
         } else {
            newSupplierList.unshift(action.payload)
         }
         state.supplierList = newSupplierList

         if (state.selectedUser?.id === action.payload.id) {
            state.selectedUser = action.payload
         }
      },
      replaceContractorByNew: (state, action: PayloadAction<UserRes>) => {
         const newContractorList = state.contractorList!
         const index = newContractorList.findIndex((user) => user.id === action.payload.id)
         if (index !== undefined && index >= 0) {
            newContractorList[index] = action.payload
         } else {
            newContractorList.unshift(action.payload)
         }
         state.contractorList = newContractorList

         if (state.selectedUser?.id === action.payload.id) {
            state.selectedUser = action.payload
         }
      },
      replaceUserByNew: (state, action: PayloadAction<UserRes>) => {
         const newUserList = state.allUserList!
         const index = newUserList.findIndex((user) => user.id === action.payload.id)
         if (index !== undefined && index >= 0) {
            newUserList[index] = action.payload
         } else {
            newUserList.unshift(action.payload)
         }
         state.allUserList = newUserList

         if (state.selectedUser?.id === action.payload.id) {
            state.selectedUser = action.payload
         }
      },
      cleanUserStore: (state) => {
         state.allUserList = null
         state.selectedUser = null
         state.contractorList = null
         state.supplierList = null
      }
   },

   extraReducers: (builder) => {
      builder
         .addCase(fetchContractorList.fulfilled, (state, action) => {
            state.contractorList = action.payload ?? null
         })
         .addCase(fetchSupplierList.fulfilled, (state, action) => {
            state.supplierList = action.payload ?? null
         })
         .addCase(fetchAdminUserList.fulfilled, (state, action) => {
            state.allUserList = action.payload ?? null
         })
   }
})

export {fetchContractorList, fetchSupplierList, fetchAdminUserList}
export const {replaceSupplierByNew, replaceContractorByNew, cleanUserStore, setSelectedUserById, replaceUserByNew, pushToAllUserList} = userSlice.actions
export default userSlice.reducer