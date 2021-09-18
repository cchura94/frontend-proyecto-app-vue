<template>
  <div>
    <h1>{{ titulo }}</h1>
    <h3>{{ lista_articulos }}</h3>
    <ul>
      <li v-for="(valor, i) in lista_articulos" :key="i">{{ valor }}</li>
    </ul>

    

    <div class="container">
      <div class="row">

        <Tarjeta v-for="(articulo, j) in lista_articulos_dev" :key="j" :articulo="articulo"></Tarjeta>
    
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import Tarjeta from "@/components/Tarjeta.vue"

export default {
    components: {
        Tarjeta
    },
  // data() declarar los datos o variables auxiliares
  data() {
    return {
      titulo: "Lista de Articulos",
      lista_articulos: ["PHP", "Javascript", "Java", "GO", "laravel"],
      lista_articulos_dev: [],
    };
  },

  // created() o mounted()  es lo primero que se ejecuta (contructor)
  mounted() {
    this.obtenerArticulos();
  },
  // methods donde registramos todas las funciones
  methods: {
    async obtenerArticulos() {
      const { data } = await axios.get("https://dev.to/api/articles");
      this.lista_articulos_dev = data;
    },
  },

  // components
};
</script>


<style>
</style>