import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import AuthStore from "./auth.store";
import RequestStore from "./request.store";
import ContractStore from "./contract.store";
import UserStore from "./user.store"
import NotificationStore from "./notification.store"

const RootStore = configureStore({
   reducer: {
      auth: AuthStore,
      request: RequestStore,
      contract: ContractStore,
      user: UserStore,
      notification: NotificationStore
   }
})

export const useRootDispatch: () => typeof RootStore.dispatch = useDispatch
export type RootStateType = ReturnType<typeof RootStore.getState>
export default RootStore