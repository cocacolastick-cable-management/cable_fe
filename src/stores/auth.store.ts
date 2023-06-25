import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SignInResponse} from "../api_schema";
import {localStore} from "../infras";

interface AuthStateType {
   data: SignInResponse | null
}

const initialState: AuthStateType = {
   data: localStore.getAuthData()
}

const authSlice = createSlice({

   name: "auth",
   initialState,

   reducers: {
      setAuthData: (state, action: PayloadAction<SignInResponse>) => {
         state.data = action.payload
      },
      cleanAuthData: (state) => {
         state.data = null
      }
   }
})

export const { setAuthData, cleanAuthData } = authSlice.actions
export default authSlice.reducer