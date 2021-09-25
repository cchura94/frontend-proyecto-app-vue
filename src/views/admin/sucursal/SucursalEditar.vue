<template>
<div>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md8>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                    <v-toolbar-title>Editar Sucursal</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>

     <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="sucursal.nombre"
          :counter="50"
          :rules="nombreRules"
          label="Nombre Sucursal"
          required
        ></v-text-field>

        <v-text-field
          v-model="sucursal.telefono"
          :counter="12"
          label="ingrese Telefono"
          required
        ></v-text-field>

        <v-text-field
          v-model="sucursal.direccion"
          label="ingrese Dirección"
          required
        ></v-text-field>

    <v-btn color="primary" @click="modificarSucursal()" :disabled="!valid">Guardar Sucursal</v-btn>
     </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
    
  </div>
</template>

<script>
import axios from "axios"

export default {
  data(){
    return {
       sucursal: {
          nombre: "",
          telefono: "",
          direccion: "",
          user_id: 1
        },
        valid: true,
        nombreRules: [
          v => !!v || 'El nombre de la Sucursal es Oblogatoria',
          v => (v && v.length <= 50) || 'Debe contener menos de 50 caracteres',
        ],
    }
  },
  async created(){
    let id = this.$route.params.id
    const { data } = await axios.get("http://127.0.0.1:8000/api/sucursal/"+id);
    this.sucursal = data
  },
  methods:{
    async modificarSucursal(){
      let id = this.$route.params.id

      const { data } = await axios.put("http://127.0.0.1:8000/api/sucursal/"+id, this.sucursal);
      this.$router.push("/admin/sucursal")
    }
  }

}
</script>

<style>

</style>