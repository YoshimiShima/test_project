<script>
// useHead({
//   title: "Cartrader",
// });
import Hero from '../components/Car/Hero.vue'
import ResultMessage from '../components/ResultMessage.vue'

export default {
  components: {
    Hero,
    ResultMessage
  },
  data () {
    return {
      message: '',
      result: '',
    }
  },
  // props: {
  //   result:String
  // },
  methods: {
    receivedMessage(message) {
      this.caughtResult(message);
      // console.log(message.value)
    },
    caughtResult(result) {
      this.result = result;
    //   console.log(this.result);
    }
  }
}

</script>

<template lang="pug">
.page
  .carHero
    CarHero(message="text" @received-message="receivedMessage")
  .result
    //- ResultMessage(:result="message")
    ResultMessage(:result="result" @caught-result="caughtResult")


</template>

<style>
.page{
  display: grid;
  height: 1500px;
  grid-template-rows:47% 53%;
  grid-template-columns: 100%;
}
.carHero{
  grid-row: 1;
  grid-column: 1;
}
.result{
  grid-row: 2;
  grid-column: 1;
  font-size: 28px;
  color: sienna;
  font-family: serif;
}
h1{
  margin: 5px;
}
span{
  color: crimson;
}
/* タブレット */
  @media only screen and (max-width: 1000px) and (min-width: 768px) {
    .page{
      height:1000px;
    }
    .result{
      font-size: 24px;
    }
    h1{
      margin: 20px;
    }
  }
    /* スマホ */
  @media only screen and (max-width: 767px) {
    .page{
      height:600px;
    }
    .result{
      font-size: 12px;
    }
    h1{
      margin: 20px;
    }
    }
  </style>