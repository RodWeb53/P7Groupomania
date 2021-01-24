<template>
  <div id="app" class="fond">
    <header-top></header-top>
    <router-view></router-view>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'


export default {
  name: 'App',
  components: {
    'header-top': Header,
    'footer-bottom': Footer

  }
};
</script>

<style>

.fond {
  background-image: url('../src/assets/fond1.png');
  max-height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

</style>
