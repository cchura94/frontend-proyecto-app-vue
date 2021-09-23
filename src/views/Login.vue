<template>
<v-app id="inspire">
 <v-content>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                    <v-toolbar-title>INGRESAR</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="formLogin" v-model="valid" lazy-validation>
                            <v-text-field 
                                prepend-icon="mdi-account" 
                                name="login" 
                                label="Ingrese su Correo" 
                                type="email"
                                v-model="usuario.email"
                                :rules="correoRules">
                            </v-text-field>
                            <v-text-field 
                                id="password" 
                                prepend-icon="mdi-lock" 
                                name="password" 
                                label="Ingrese su Contraseña" 
                                type="password"
                                v-model="usuario.password"
                                :rules="[v => !!v || 'La contraseña es obligatorio']">
                            </v-text-field>
                        </v-form>
                        {{ usuario }}
                    </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="ingresar()" :disabled="!valid">Ingresar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</v-content>

<v-snackbar
      v-model="error"
      :timeout="3000"
      color="red"
      absolute
      right
      rounded="pill"
      top
    >
      Credenciales Incorrectas
    </v-snackbar>
</v-app>
</template>

<script>
import { login } from "./../services/authService"
import * as authService from "./../services/authService"

export default {
    data(){
        return {
            correoRules: [
                v => !!v || 'El correo es obligatorio',
                v => v.length <= 100 || 'El correo debe ser menos de 100 caracteres',
                v => /.+@.+/.test(v) || 'El Correo es Incorrecto',
            ],
            usuario: {
                email: '',
                password: ''
            },
            error: false,
            valid: true
        }
    },
    methods: {
        async ingresar(){
            if(this.$refs.formLogin.validate()){

                try{
                    let datos = await authService.login(this.usuario)
                    console.log(datos)
                    localStorage.setItem("authUser", JSON.stringify(datos))
                    this.$router.push("/admin")
                }catch(error){
                    this.error = true
                    console.log(error.response.data.error)
                }

            }
        }
    }

}
</script>

<style>

</style>