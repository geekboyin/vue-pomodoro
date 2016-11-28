<template>
  <div id="app">
    <site-body></site-body>
  </div>
</template>

<script>
import WebFont from 'webfontloader'
import SiteBody from './components/Body'

WebFont.load({
  google: {
    families: ['Roboto']
  }
})
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
  @import './sass/variable';
  body {
    font-size: 16px;
    line-height: 1.5;
  }
  #app {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .vp-button {
    background: none;
    border: 1px solid #fff;
    color: #fff;
    padding: 10px 20px;
    font-family: inherit;
    outline: none;
    border-radius: 3px;
    font-size: 16px;
    cursor: pointer;
    i.pos-left {
      padding-right: 10px;
    }
    &--full {
      background: #fff;
      color: $primary_color;
    }
  }
</style>
