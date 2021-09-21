import { urlApi } from "./../config/config"
import axios from "axios"

export async function login(usuario){
    const {data} = await axios.post(urlApi + "/auth/login", usuario)
    return data;    
}

/*
const login2 = async function(usuario){
    const {data} = await axios.post(urlApi + "/auth/login", usuario)
    return data;  
}

const login3 = async (usuario) => {
    const {data} = await axios.post(urlApi + "/auth/login", usuario)
    return data;  
}*/