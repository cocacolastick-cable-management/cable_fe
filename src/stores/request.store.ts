import {RequestRes} from "../api_schema"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {api} from "../infras";

interface RequestStateType {
   requestList: RequestRes[] | null
   selectedRequest: RequestRes | null
   selectedRequestId: string | null
}

const initialState: RequestStateType = {
   requestList: null,
   selectedRequest: null,
   selectedRequestId: null
}

const fetchRequestList = createAsyncThunk("request/fetchRequestList", async () => {
   try {
      const res = await api.get("/planner/requests")
      return res.data.payload as RequestRes[]
   } catch {
      // don't know what to do
   }
})

const fetchSupplierRequestList = createAsyncThunk("request/fetchSupplierRequestList", async () => {
   try {
      // console.log("abc")
      const res = await api.get("/supplier/requests")
      return res.data.payload as RequestRes[]
   } catch {
      // don't know what to do
   }
})

const fetchContractorRequestList = createAsyncThunk("request/fetchContractorRequestList", async () => {
   try {
      // console.log("abc")
      const res = await api.get("/contractor/requests")
      return res.data.payload as RequestRes[]
   } catch {
      // don't know what to do
   }
})

const requestSlice = createSlice({

   name: "request",
   initialState,

   reducers: {
      setRequestList: (state, action: PayloadAction<RequestRes[]>) => {
         state.requestList = action.payload
      },
      setSelectedRequestById: (state, action: PayloadAction<{id: string}>) => {
         state.selectedRequest = state.requestList?.find((req) => req.id === action.payload.id) ?? null
      },
      setSelectedRequestId: (state, action: PayloadAction<{id: string}>) => {
         state.selectedRequestId = action.payload.id
      },
      pushToRequestList: (state, action: PayloadAction<RequestRes>) => {
         state.requestList = [action.payload, ...(state.requestList ?? [])]
      },
      replaceRequestByNew: (state, action: PayloadAction<RequestRes>) => {
         const newRequestList = state.requestList!
         const index = newRequestList.findIndex((request) => request.id === action.payload.id)
         if (index !== undefined && index >= 0) {
            newRequestList[index] = action.payload
         } else {
            newRequestList.unshift(action.payload)
         }
         state.requestList = newRequestList
      },
      cleanRequestStore: (state) => {
         state.requestList = null
         state.selectedRequest = null
         state.selectedRequestId = null
      }
   },

   extraReducers: (builder) => {
      builder
         .addCase(fetchRequestList.fulfilled, (state, action) => {
            state.requestList = action.payload ?? null
         })
         .addCase(fetchSupplierRequestList.fulfilled, (state, action) => {
            state.requestList = action.payload ?? null
         })
         .addCase(fetchContractorRequestList.fulfilled, (state, action) => {
            state.requestList = action.payload ?? null
         })
   }

})

export { fetchRequestList, fetchSupplierRequestList, fetchContractorRequestList }
export const { cleanRequestStore, setRequestList, setSelectedRequestById, pushToRequestList, replaceRequestByNew, setSelectedRequestId} = requestSlice.actions
export default requestSlice.reducer