import RootStore, {RootStateType, useRootDispatch} from "./root.store";
import {setAuthData, cleanAuthData} from "./auth.store";
import {cleanRequestStore, fetchContractorRequestList, setRequestList, fetchRequestList, fetchSupplierRequestList, setSelectedRequestById, pushToRequestList, replaceRequestByNew, setSelectedRequestId} from "./request.store";
import {cleanContractStore, addUpContractStock, fetchPlannerContractList, setSelectedContractById, fetchSupplierContractList} from "./contract.store";
import {replaceSupplierByNew, replaceContractorByNew, cleanUserStore, fetchContractorList, fetchSupplierList, fetchAdminUserList, setSelectedUserById, replaceUserByNew, pushToAllUserList} from "./user.store"
import {fetchNotificationList, pushToNotificationList, setNotificationIsReadToTrueById} from "./notification.store"

export {
   RootStore,
   useRootDispatch,
   type RootStateType,

   setAuthData,
   cleanAuthData,

   fetchRequestList,
   fetchSupplierRequestList,
   fetchContractorRequestList,
   setRequestList,
   setSelectedRequestById,
   pushToRequestList,
   replaceRequestByNew,
   cleanRequestStore,
   setSelectedRequestId,

   fetchPlannerContractList,
   fetchSupplierContractList,
   setSelectedContractById,
   addUpContractStock,
   cleanContractStore,

   fetchContractorList,
   fetchSupplierList,
   fetchAdminUserList,
   setSelectedUserById,
   replaceUserByNew,
   pushToAllUserList,
   cleanUserStore,
   replaceSupplierByNew,
   replaceContractorByNew,

   fetchNotificationList,
   setNotificationIsReadToTrueById,
   pushToNotificationList
}