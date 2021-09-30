import { http } from "./httpInterceptor"

export const listaProductos = async function(page, limit){
    return await http().get(`/producto?page=${page}&limit=${limit}`);
}

export const guardarProducto = async function(datos){
    return await http().post("/producto", datos);
}

export const modificarProducto = async function(id, datos){
    return await http().post("/producto/"+id, datos);
}

export const mostrarProducto = async function(id){
    return await http().get("/producto/"+id);
}

export const eliminarProducto = async function(id){
    return await http().delete("/producto/"+id);
}