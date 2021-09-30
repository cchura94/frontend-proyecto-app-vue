import { http } from "./httpInterceptor"

export const listaCategorias = async function(){
    return await http().get("/categoria");
}

export const guardarCategoria = async function(datos){
    return await http().post("/categoria", datos);
}

export const modificarCategoria = async function(id, datos){
    return await http().put("/categoria/"+id, datos);
}

export const mostrarCategoria = async function(id){
    return await http().get("/categoria/"+id);
}

export const eliminarCategoria = async function(id){
    return await http().delete("/categoria/"+id);
}