import axios from "axios"
import { isTokenValid } from './AuthService'
import { type APIRequest } from '@/types/APIRequest'
import { useAuthStore } from "@/stores/AuthStore"
import { type CustomAxiosResponse, responseHandler, responseErrorHandler } from "./AxiosResponseHandlerService"

const instance = axios.create({
    // baseURL: global.localback,
    baseURL: global.api,
    withCredentials: true
})
let refreshing: boolean = false

instance.interceptors.response.use(responseHandler, responseErrorHandler)
instance.defaults.headers.post["Content-Type"] = 'application/json'
instance.defaults.headers.put["Content-Type"] = 'application/json'
instance.interceptors.request.use(
    async (config) => {
        if(!isTokenValid(useAuthStore().authToken) && !refreshing && (useAuthStore().currentUser !== null || useAuthStore().authToken !== null)){
            refreshing = true
            const res = await refreshToken()
            if(!res.error && res.data.token){
                localStorage.setItem('token', res.data.token )
                useAuthStore().refreshUser(res.token)
            }
            else{
                useAuthStore().logUserOut()
            }
            refreshing = false
        }
        return config
    }
);

async function getData(dateName: string): Promise<APIRequest>{
    const res = (await instance.get((dateName as string))as CustomAxiosResponse)
    return{
        error: res.error,
        message: res.message,
        code: res.status,
        data: res.data.items??res.data
    }
}

async function postData(dataName: string, data: Object): Promise<APIRequest>{
    const res = (await instance.post((dataName as string), data) as CustomAxiosResponse)
    return{
        error: res.error,
        message: res.message,
        code: res.status,
        data: res.data.items??res.data
    }
}

async function deleteData(dateName: string): Promise<APIRequest>{
    const res = (await instance.delete((dateName as string))as CustomAxiosResponse)
    return{
        error: res.error,
        message: res.message,
        code: res.status,
        data: res.data.items??res.data
    }
}

async function updateData(dataName: string, data: Object): Promise<APIRequest>{
    const res = (await instance.put((dataName as string), data) as CustomAxiosResponse)
    return{
        error: res.error,
        message: res.message,
        code: res.status,
        data: res.data.items??res.data
    }
}

async function getUserAuthData(email: string, passw: string): Promise<APIRequest>{
    const res= (await instance.post('/login', {email, password: passw}, {
        headers: {
            'Content-Type' : 'application/json'
        }, 
    }) as CustomAxiosResponse)

    // console.log(res.data)
    return{
        error: res.error,
        message: res.message,
        code: res.status,
        data: res.data.items??res.data.user,
        token: res.data.token
    };
}

async function refreshToken(): Promise<APIRequest> {
    const res = (await instance.post('/refresh', {
        headers: {
            'Content-Type' : 'application/json',
        },
    })as CustomAxiosResponse);
    return{
        error: res.error,
        message: res.message,
        code: res.status,
        data: res.data.items??res.data,
        token: res.data.token
    };
}

export {getData, postData, deleteData, updateData, getUserAuthData, refreshToken}