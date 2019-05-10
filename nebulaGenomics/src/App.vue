// eslint-disable-next-line
/* eslint-disable */
<template>
  <div id="app">
    <Navbar/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>


<style>
  #app{
    background-color: #FEFEFE;
    height: 100vh;
  }
</style>
