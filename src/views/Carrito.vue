<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 bg-info">
                <h1>Lista Productos</h1>
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOMBRE</th>
                            <th>PRECIO</th>
                            <th>CANTIDAD</th>
                            <th>ACCION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(prod, i) in lista_productos" :key="i">
                            <td>{{ i }}</td>
                            <td>{{ prod.nombre }}</td>
                            <td>{{ prod.precio }}</td>
                            <td>{{ prod.cantidad }}</td>
                            <td>
                                <button class="btn btn-primary" @click="addCarrito(prod)">seleccionar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-md-4 bg-warning">
                <h1>Carrito</h1>
                <table class="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>NOMBRE</th>
                            <th>PRECIO</th>
                            <th>CANT.</th>
                            <th>S.T.</th>
                            <th>ACCION</th>
                        </tr>
                    </thead>
                    <tr v-for="(carr, i) in carrito" :key="i">
                        <td>{{ carr.nombre }}</td>
                        <td>{{ carr.precio }}</td>
                        <td>{{ carr.cantidad }}</td>
                        <td>{{ carr.cantidad * carr.precio }}</td>
                        <td>
                            <button class="btn btn-danger" @click="quitarCarrito(i, carr)">x</button>
                        </td>
                    </tr>
                </table>
                <hr>
                <h2>TOTAL: {{ total }}</h2>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            lista_productos: [
                {nombre: "Mesa", precio: 450, cantidad: 6},
                {nombre: "Silla", precio: 120, cantidad: 24},
                {nombre: "Estante", precio: 520, cantidad: 14},
                {nombre: "Escritorio", precio: 647.89, cantidad: 6},
            ],
            carrito: [],
            total: 0
        }
    },
    methods:{
        addCarrito(prod){
            prod.cantidad--;
            let c =  {nombre: prod.nombre, precio: prod.precio, cantidad: 1}
            this.carrito.push(c)

            this.montoTotal()
        },
        montoTotal(){
            this.total = 0
            for (let i = 0; i < this.carrito.length; i++) {
                const element = this.carrito[i];
                this.total += element.precio;                
            }
        },
        quitarCarrito(pos, prod){
            this.carrito.splice(pos, 1);
            this.montoTotal()
        }
    }

}
</script>

<style>

</style>