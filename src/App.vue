<script setup>
// Este es el componente raíz de la aplicación Qué Hay UT
</script>

<template>
  <div id="app">
    <MainLayout />
  </div>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue'

export default {
  name: 'App',
  components: {
    MainLayout
  }
}
</script>

<style>
#app {
  min-height: 100vh;
}
</style>
