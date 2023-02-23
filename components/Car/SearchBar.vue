<script>
export default {
  data () {
    return {
      searchValue: ''
    }
  },
  props: {
    value:String
  },
  methods: {
    onClickEmit(){
      this.$emit("input-emit", this.searchValue);
    }
  }
}
</script>
<!-- v-model="value" -->
<!-- @input="$emit('input-emit',value)" -->
<template lang="pug">
#search-bar
  input(
    type= "text",
    placeholder="Input your wish..."
    v-model="searchValue"
  )
  button(type="button" @click="onClickEmit")|Dream

</template>

<style>
  input {
    width: 400px;
    height: 40px;
    font-size: 32px;
    margin: 0 auto;
  }
  button {
    color: blue;
    height: 38px;
    font-size: 22px;
  }

  /* タブレット */
  @media only screen and (max-width: 1000px) and (min-width: 768px) {
    input {
      width: 250px;
      height: 29px;
      font-size: 24px;
    }
    button {
    color: blue;
    height: 28px;
    font-size: 20px;
    }
  }
  @media only screen and (max-width: 767px) {
    input {
      width: 160px;
      height: 16px;
      font-size: 12px;
    }
    button {
    color: blue;
    height: 16px;
    font-size: 10px;
    }
  }
</style>