<template>
    <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawer"
        :clipped="$vuetify.breakpoint.lgAndUp"
        fixed
        app
      >

      <v-list>
        <template v-for="(item, i) in items" >
          <v-list-item v-if="!item.children" :key="i" :to="item.url">
            <v-list-item-icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>

            <v-list-item-title>{{item.text}}</v-list-item-title>
          </v-list-item>
          <v-list-group
            :key="i"  
            v-if="item.children"          
            :value="true"
            prepend-icon="mdi-account-circle"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </template>

            <v-list-item
              v-for="child in item.children"
              :key="child.text"
              :to="child.url"
            >
              <v-list-item-content>
                <v-list-item-title v-text="child.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          </v-list-group>
        </template>
          
    </v-list>

      </v-navigation-drawer>

      <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        color="blue darken-3"
        dark
        app
        fixed
      >

    

      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Empresa</span>
      </v-toolbar-title>
      
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-search"
        label="Buscar"
        class="hidden-sm-and-down"
      ></v-text-field>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          >
        </v-avatar>
      </v-btn>
    </v-app-bar>

    <v-main>
          
      <router-view/>

    </v-main>


    </v-app>
</template>

<script>
export default {
  data(){
    return {
      drawer: null,
      items: [
        { icon: 'mdi-accounts', text: 'Usuarios', url: '/admin/usuario'},
        { 
          icon: 'mdi-detail',
          text: 'Sucusal',
          children: [
            { icon: 'mdi-add', text: 'Nueva Sucursal', url: '/admin/sucursal/nuevo' },
            { icon: 'mdi-add', text: 'Lista Sucursal', url: '/admin/sucursal' }
          ] 
        },
        { icon: 'mdi-gavel', text: 'Producto', url: '/admin/producto' },
        { icon: 'mdi-widgets', text: 'Categoria', url: '/admin/categoria' },
        { icon: 'mdi-keyboard', text: 'Go to the old version' }
      ]
    }
  }

}
</script>

<style>

</style>