import axios from "axios";
import {localStore} from "./index";
import {useDispatch} from "react-redux";
import {cleanAuthData} from "../stores";

const api = axios.create({
   baseURL: 'api/',
})

api.defaults.headers.common['Content-Type'] = 'application/json'

api.interceptors.request.use(
   (cfn) => {
      const accessToken = localStore.getAuthData()?.authToken.accessToken
      cfn.headers.Authorization = "Bearer " + accessToken
      return cfn
   }
)

api.interceptors.response.use(
   (response) => response,
   function (error) {

      console.log(error)
      if (error.response.config.url === "/common/sign-in") {
         console.log(error)
         return Promise.reject(error)
      }

      if (error.response.status === 401 || error.response.status === 403) {
         localStore.clearAuthData()
         window.location.replace("/")
         return
      }

      console.log(error)
      return Promise.reject(error)
   }
)

// this apiCode is NOT the http code,
// this is a private sign communicate between client and server
enum apiCode {
   DA = "DA", // account is disable
   AF = "AF", // authenticate failed
}

export default api
export { apiCode }