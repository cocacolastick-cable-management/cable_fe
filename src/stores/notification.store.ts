import {NotificationRes} from "../api_schema";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {api} from "../infras";

interface NotificationStateType {
   notificationList: NotificationRes[] | null
}

const initialState: NotificationStateType = {
   notificationList: null
}

const fetchNotificationList = createAsyncThunk("notification/fetchNotificationList", async () => {
   try {
      const res = await api.get("/common/notifications")
      return res.data.payload as NotificationRes[]
   } catch {
      // don't know what to do
   }
})

const notificationSlice = createSlice({

   name: "notification",
   initialState,

   reducers: {
      pushToNotificationList: (state, action: PayloadAction<NotificationRes>) => {
         state.notificationList = [action.payload,...(state.notificationList ?? [])]
      },
      setNotificationIsReadToTrueById: (state, action: PayloadAction<{id: string}>) => {
         const foundIndex = state.notificationList?.findIndex((noti) => noti.id === action.payload.id)

         if (foundIndex != null && foundIndex >= 0) {
            const foundNoti = state.notificationList![foundIndex]

            if (!foundNoti.isRead) {
               foundNoti.isRead = true
               state.notificationList![foundIndex] = foundNoti

               api.patch(`/common/notifications/${foundNoti.id}`, {isRead: true})
            }
         }
      }
   },

   extraReducers: (builder) => {
      builder
         .addCase(fetchNotificationList.fulfilled, (state, action) => {
            state.notificationList = action.payload ?? null
         })
   }

})

export {fetchNotificationList}
export const {setNotificationIsReadToTrueById, pushToNotificationList} = notificationSlice.actions
export default notificationSlice.reducer
