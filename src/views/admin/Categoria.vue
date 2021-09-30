<template>
  <v-data-table
    :headers="columnas"
    :items="lista_categorias"
    :loading="cargando"
    sort-by="calories"
    class="elevation-1"
  >

  <template v-slot:top>
      <v-toolbar
        flat
      >
      <v-toolbar-title>GESTIÓN CATEGORIAS</v-toolbar-title>

      <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>

        <v-spacer></v-spacer>

        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
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
              Nueva Categoria
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
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.nombre"
                      label="Nombre de Categoria"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.detalle"
                      label="Detalle de la Categoria"
                    ></v-text-field>
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
                @click="guardarCategoria"
              >
                Guardar Categoria
              </v-btn>
            </v-card-actions>

          </v-card>

        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Está seguro de eliminar la Categoria?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Eliminar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-toolbar>
  </template>

  <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
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
import * as catService from "../../services/categoriaService.js"

export default {
  data(){
    return {
      cargando: true,
      search: '',
      columnas: [
        {
          text: 'ID',
          align: 'start',
          sortable: true,
          value: 'id',
        },
        { text: 'NOMBRE', value: 'nombre' },
        { text: 'DETALLES', value: 'detalle' },
        { text: 'ACCIONES', value: 'actions', sortable: false },
      ],
      lista_categorias: [],
      dialog: false,
      defaultItem: {
        nombre: '',
        detalle: '',
      },
      editedItem: {
        nombre: '',
        detalle: '',
      },
      editedIndex: -1,
      formTitle: 'Nueva Categoria',
      dialogDelete: false,
    }
  },
  mounted(){
    this.listarCategorias();
  },
  methods: {
    async listarCategorias(){
      this.cargando = true
      const {data} = await catService.listaCategorias()
      this.lista_categorias = data

      this.cargando = false

    },
    async guardarCategoria(){
      this.cargando = true

      if (this.editedIndex > -1) {
          // Object.assign(this.desserts[this.editedIndex], this.editedItem)
          await catService.modificarCategoria(this.editedItem.id, this.editedItem)
        } else {
          
          await catService.guardarCategoria(this.editedItem)
        }
      this.close()
      this.listarCategorias();
      this.cargando = false
    },

    deleteItem (item) {
        this.editedIndex = this.lista_categorias.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      async deleteItemConfirm () {
        await catService.eliminarCategoria(this.editedItem.id)
        this.lista_categorias.splice(this.editedIndex, 1)
        this.closeDelete()
      },


      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

     close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

       editItem (item) {
        this.editedIndex = this.lista_categorias.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

  }
}
</script>
