<template>
  <div>
    <v-btn color="primary" to="/admin/sucursal/nuevo">
      Nueva Sucursal
    </v-btn>

    <v-card class="elevation-12">
      <v-card-text>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th v-for="(col, i) in columnas" :key="i">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sucursal, i) in lista_sucursales" :key="i">
            <td>{{ sucursal.nombre }}</td>
            <td>{{ sucursal.telefono }}</td>
            <td>{{ sucursal.direccion }}</td>
            <td>
              <v-dialog
                v-model="dialog"
                width="800"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="success"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    Mostrar Productos
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title class="text-h5 grey lighten-2">
                    Lista de Productos
                  </v-card-title>

                  <v-card-text>
                    <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Nombre
          </th>
          <th class="text-left">
            Precio
          </th>
          <th class="text-left">
            Stock
          </th>
          <th class="text-left">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="prod in sucursal.productos"
          :key="prod.id"
        >
          <td>{{ prod.nombre }}</td>
          <td>{{ prod.precio }}</td>
          <td>{{ prod.pivot.stock }}</td>
          <td></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
                    </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      text
                      @click="dialog = false"
                    >
                      Cerrar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </td>
            <td>
              <v-btn icon color="warning" :to="`/admin/sucursal/${sucursal.id}/editar`">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>

              <v-btn icon color="danger" @click="eliminarSucursal(sucursal, i)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data(){
    return {
      columnas: ["Nombre", "Telefono", "Dirección", "Productos", "Acciones"],
      lista_sucursales: [
        /* {nombre: "Casa matriz", telefono: "2342342", direccion: "Av 123 Abc"},
        {nombre: "Sucursal 2", telefono: "2342342", direccion: "Av 123 Abc"}
        */
      ]
    }
  },
  async created(){
    const respuesta = await axios.get('http://127.0.0.1:8000/api/sucursal');
    console.log(respuesta)
    this.lista_sucursales = respuesta.data
  },
  methods: {
    async eliminarSucursal(sucursal, pos){
      if(confirm("Está seguro de eliminar la Sucursal?")){
        await axios.delete('http://127.0.0.1:8000/api/sucursal/'+sucursal.id);
      this.lista_sucursales.splice(pos, 1);
      }
    }
  }

}
</script>
