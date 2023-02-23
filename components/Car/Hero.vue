<script>
import SearchBar from './SearchBar.vue'
export default {
  components: {
    SearchBar:SearchBar
  },
  data () {
    return {
      value: ''
    }
  },
  props: {
    message:String
  },
  methods: {
    receive(value) {
      this.$emit('received-message', value);
    }
  }
}
</script>
<!-- //- .h1.h1 find your drive -->
<template lang="pug">
#receive-area
  div
    .top-view
      .top-bg
      .h1.h1 what is your dream car?
        CarSearchBar(value="text" @input-emit="receive")
</template>

<style>
  .top-view {
    width: 100%;
    height: 700px;
    background-image: url('https://carconfigurator.ferrari.com/assets/cars/portofinom/packages/default/car-ferrari-portofino-m_splash.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    text-align: center;
    color: white;
    position:relative;
  }
  .top-bg {
    /* width: 100%;
    height: 800px; */
    background-color: rgba(0,0,0,0.6);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .h1 {
    position:absolute;
    font-size: 70px;
    font-family: serif;
    font-weight: 900;
    top:50%;
    left:50%;
    margin:0px;
    transform: translateY(-50%) translateX(-50%);
    -webkit-transform: translateY(-50%) translateX(-50%);
  }
  /* タブレット */
  @media only screen and (max-width: 1000px) and (min-width: 768px) {
    .top-view{
      height: 500px;
      font-size: 32px;
      vertical-align: bottom;
      background-size: contain;
      background-repeat: no-repeat;
    }
    .h1{
      font-size: 48px;
    }
  }
    /* スマホ */
  @media only screen and (max-width: 767px) {
    .top-view {
      height: 300px;
      font-size: 16px;
    }
    .h1 {
      font-size: 18px;
    }
  }
</style>