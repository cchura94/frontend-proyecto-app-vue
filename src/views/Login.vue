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
                        <v-form>
                            <v-text-field 
                                prepend-icon="mdi-account" 
                                name="login" 
                                label="Ingrese su Correo" 
                                type="email"
                                :rules="correoRules">
                            </v-text-field>
                            <v-text-field 
                                id="password" 
                                prepend-icon="mdi-lock" 
                                name="password" 
                                label="Ingrese su Contraseña" 
                                type="password"
                                :rules="[v => !!v || 'La contraseña es obligatorio']">
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary">Ingresar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</v-content>
</v-app>
</template>

<script>
export default {
    data(){
        return {
            correoRules: [
                v => !!v || 'El correo es obligatorio',
                v => v.length <= 100 || 'El correo debe ser menos de 100 caracteres',
                v => /.+@.+/.test(v) || 'El Correo es Incorrecto',
            ],
        }
    }

}
</script>

<style>

</style>