<template>
  <div class="col-md-4 mt-4">
      
      <div class="card bg-info">
            <img :src="articulo.cover_image" class="card-img-top" alt="" />
            <div class="card-body">
              <h5 class="card-title">{{ articulo.title }}</h5>
              <p class="card-text">{{ articulo.description }}</p>
              <a :href="articulo.url" target="_blank" class="btn btn-primary"
                >ver articulo</a
              >
            </div>
          </div>
  </div>
</template>

<script>
export default {
    props: {
        articulo: {
            type: Object
        }
    },
    data(){
        return {
        }
    }

}
</script>
