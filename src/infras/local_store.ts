import {SignInResponse} from "../api_schema";

const authDataKey = "auth_data"

// well, I wonder do I need to create an interface for this to reduce coupling

function setAuthData(data: SignInResponse) {
   const dataStr = JSON.stringify(data)
   localStorage.setItem(authDataKey, dataStr)
}

function getAuthData(): SignInResponse | null {
   const dataStr = localStorage.getItem(authDataKey)
   return dataStr === null ? null : JSON.parse(dataStr)
}

function clearAuthData() {
   localStorage.removeItem(authDataKey)
}

const localStore = Object.freeze({
   setAuthData,
   getAuthData,
   clearAuthData
})

export default localStore