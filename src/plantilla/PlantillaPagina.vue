<template>
  <div>
      <v-app-bar
        color="primary"  
        dark      
        >
        <v-toolbar-title>EMPRESA</v-toolbar-title>
        
        <v-spacer></v-spacer>

        <v-btn to="/" icon>
            <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn to="/publicaciones" icon>
        <v-icon>mdi-post</v-icon>
        </v-btn>
        <v-btn to="/carrito" icon>
            <v-icon>mdi-cart</v-icon>
        </v-btn>
        <v-btn to="/login" icon>
            <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main>
        <router-view/>

      </v-main>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>