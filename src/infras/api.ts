import axios from "axios";
import {localStore} from "./index";

const api = axios.create({
   baseURL: 'http://localhost:8080/',
})

api.defaults.headers.common['Content-Type'] = 'application/json'

api.interceptors.request.use(
   (cfn) => {
      const accessToken = localStore.getAuthData()?.authToken.accessToken
      cfn.headers.Authorization = "Bearer " + accessToken
      return cfn
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