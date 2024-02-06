<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from './layouts/HeaderComponent.vue'

export default {
  components: {
    Header
  }
}
</script>