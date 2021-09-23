import { http } from "./httpInterceptor"

export async function login(usuario){    
    const {data} = await http().post("/auth/login", usuario)
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