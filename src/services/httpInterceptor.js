import axios from "axios"
import { urlApi } from "../config/config"

export function http(){
    // interceptar
    let auth = localStorage.getItem("authUser");
    // this.router.push('/carrito');
    if(auth){
        // admin, /productos
        const authUser = JSON.parse(auth)

        const jwtInterceptor = axios.create({
            baseURL: urlApi,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer '+authUser.access_token
            }
        });

        // verificar error 401
        jwtInterceptor.interceptors.response.use(
            (response) => {
                return response
            },
            async (error) => {
                if(error.response.status !== 401){
                    return Promise.reject(error);
                }else{
                    console.log("ERROR:   401")
                    axios.interceptors.response.eject(jwtInterceptor);
                    let respuesta = await jwtInterceptor.post("/auth/refresh");
                    if(respuesta && respuesta.data){
                        localStorage.setItem("authUser", JSON.stringify(respuesta.data))
                        // localStorage.clear();
                        // error.config.headers['Authorization'] = 'Bearer ' + response.data.access_token;
                        return axios(error.config)
                    }else{
                        return Promise.reject(error);
                    }
                }
            }
        )
        return jwtInterceptor        

    }else{    
        // login, register    
        return axios.create({
            baseURL: urlApi
        })
    }
}