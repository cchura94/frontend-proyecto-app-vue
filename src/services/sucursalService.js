import { http } from "./httpInterceptor"

export const listaSucursal = async function(){
    return await http().get("/sucursal");
}

export const guardarSucursal = async function(datos){
    return await http().post("/sucursal", datos);
}

export const modificarSucursal = async function(id, datos){
    return await http().put("/sucursal/"+id, datos);
}

export const mostrarSucursal = async function(id){
    return await http().get("/sucursal/"+id);
}

export const eliminarSucursal = async function(id){
    return await http().delete("/sucursal/"+id);
}
