<template>
  <v-data-table
    :headers="columnas"
    :items="lista_productos"
    :options.sync="opciones"
    :page="page"
    :server-items-length="total_productos"
    :loading="cargando"
    :search="search"
  >

  <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>GESTION PRODUCTOS</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          label="Buscar"
          class="mx-4"
        ></v-text-field>

        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Nuevo Producto
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="9"
                    md="9"
                  >
                    <v-text-field
                      v-model="editedItem.nombre"
                      label="Ingrese Nombre del Producto"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="3"
                    md="3"
                  >
                    <v-text-field
                      v-model="editedItem.precio"
                      label="Precio"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.descripcion"
                      label="Descripción"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="8"
                    md="8"
                  >
                    <input type="file" ref="img" @change="imagenSeleccionada">
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                    md="4"
                  >
                    <v-select
                      v-model="editedItem.categoria_id"
                      :items="lista_categorias"
                      label="Categoria"
                      item-text="nombre"
                      item-value="id"
                    ></v-select>

                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
<img width="200px" :src="`http://127.0.0.1:8000${editedItem.imagen}`" alt="">
    
                  
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="guardarProducto"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>


        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Está seguro de eliminar el Producto?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Eliminar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialog_asignacion" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Asignación a Sucursal</v-card-title>
            <v-card-text>
              form
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="primary" text @click="deleteItemConfirm">Asignar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-toolbar>
  </template>

  <template v-slot:[`item.imagen`]="{ item }">
      <img width="80px" :src="`http://127.0.0.1:8000${item.imagen}`" alt="">
    </template>
<template v-slot:[`item.asignacion`]="{ item }">
  
    <v-btn color="warning" @click="dialog_asignacion = true">Asignar a Sucursal</v-btn>
      
</template>
  <template v-slot:[`item.acciones`]="{ item }">
      

      <v-icon
        small
        class="mr-2"
        @click="editarProducto(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>

  </v-data-table>
</template>

<script>
import * as prodServide from "../../services/productoService"
import * as catService from "../../services/categoriaService"

export default {
  data(){
    return {
      columnas: [
        { text: 'ID', value: 'id' },
        { text: 'NOMBRE', value: 'nombre' },
        { text: 'PRECIO', value: 'precio' },
        { text: 'CATEGORIA', value: 'categoria.nombre' },
        { text: 'IMAGEN', value: 'imagen' },
        { text: 'ASIGNACIÓN', value: 'asignacion' },
        { text: 'ACCIONES', value: 'acciones', sortable: false },
      ],
      lista_productos: [],
      lista_categorias: [],
      // datatable
      opciones: {
        itemsPerPage: 5
      },
      page: 1,
      total_productos: 0,
      cargando: true,
      search: '',
      dialog: false,
      dialog_asignacion: false,
      editedIndex: -1,
      editedItem: {
        nombre: '',
        precio: 0,
        descripcion: '',
        imagen: '',
        categoria_id: 2,
      },
      defaultItem: {
        nombre: '',
        precio: 0,
        descripcion: '',
        imagen: '',
        categoria_id: 2,
      },
      imagen: false,
      dialogDelete: false,
    }
  },
  async mounted(){
    const {data} = await catService.listaCategorias()
    this.lista_categorias = data;
    
    this.inicializarDatos()
    // const {data} = prodServide.listaProductos()
   
  },
  computed:{
    formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Producto' : 'Editar Producto'
    },
  },
  methods: {
    async inicializarDatos(){
      const { page, itemsPerPage } = this.opciones
      
      this.cargando = true
      const { data } = await prodServide.listaProductos(page, itemsPerPage, this.search)
      this.lista_productos = data.data
      this.total_productos = data.total

       this.cargando = false
    },

    imagenSeleccionada(event){
      console.log(event.target.files[0])
      this.editedItem.imagen = event.target.files[0]
      this.imagen = true
    },

    async guardarProducto(){
      let formdata = new FormData;
      formdata.append("nombre", this.editedItem.nombre)
      formdata.append("precio", this.editedItem.precio)
      formdata.append("descripcion", this.editedItem.descripcion)
      formdata.append("categoria_id", this.editedItem.categoria_id)
      if(this.imagen){
        formdata.append("imagen", this.editedItem.imagen)      
      }
      if(this.editedIndex > -1){
        formdata.append("_method", "PUT");
        const {data} = await prodServide.modificarProducto(this.editedItem.id, formdata);
        console.log(data)
        Object.assign(this.lista_productos[this.editedIndex], data.producto)
      }else{
        const {data} = await prodServide.guardarProducto(formdata)
        console.log(data)
        this.lista_productos.push(data.producto)

      }

      this.imagen = false;
      this.close();
    },
    editarProducto(item){
      this.editedIndex = this.lista_productos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      }, 
      deleteItem (item) {
        this.editedIndex = this.lista_productos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      async deleteItemConfirm () {
        await prodServide.eliminarProducto(this.editedItem.id)
        this.lista_productos.splice(this.editedIndex, 1)
        this.closeDelete()
      },


      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      filterOnlyCapsText (value, search, item) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
      },
  },
  watch: {
    opciones: {
      handler(){
        this.inicializarDatos();
      }
    },
    dialog(val){
      val || this.close()
    },
    search: {
      handler(){
        this.inicializarDatos();
      }
    }
  }

}
</script>

<style>

</style>