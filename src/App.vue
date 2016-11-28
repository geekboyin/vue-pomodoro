<template>
  <div id="app">
    <site-body></site-body>
  </div>
</template>

<script>
import SiteBody from './components/Body'

export default {
  name: 'app',
  components: {
    SiteBody
  }
}
</script>

<style lang="scss">
  $ionicons-font-path: './sass/fonts';
  @import "sass/_reset.scss";
  @import './sass/ionicons/ionicons';
  body {
    font-size: 16px;
    line-height: 1.5;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
