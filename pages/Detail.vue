<template lang="pug">
title-notice
  h1 this week's special!
img(src="../assets/image/Volvo.jpg")
special-deals
  h1 Volvo XC40
car-explain
  h3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt enim ad unde eius doloribus velit, sunt rerum alias possimus aspernatur placeat hic consectetur. Quo, officia? Ipsum quod sint ratione pariatur.
car-price
  h2 $39,555
</template>
<style>
img{
  width: 600px;
  margin: 0 auto;
}
title-notice{
  color: crimson;
  font-family: cursive;
  font-size: 36px;
}
special-deals{
  font-family: 'Courier New', Courier, monospace;
  font-size: 24px;

  }
car-price{
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 36px;
  color:crimson
}


@media only screen and (max-width: 1000px) and (min-width: 768px) {
  img{
  width: 700px;
  margin: 0 auto;
  }
  title-notice{
    font-size: 28px;
  }
  special-deals{
    font-size: 20px;
  }
  car-explain{
    font-size: 12px;
  }
  car-price{
    font-size: 20px;
  }
}
@media only screen and (max-width: 767px) {
  img{
    width: 300px;
    margin: 0 auto;
  }
  title-notice{
    font-size: 20px;
  }
  special-deals{
    font-size: 18px;
  }
  car-explain{
    font-size: 8px;
  }
  car-price{
    font-size: 16px;
  }
}
</style>