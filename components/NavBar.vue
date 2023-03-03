<template lang="pug">
header
  .header-link
    a(href="/") Cartrader
    nav
      NuxtLink(to="./Detail") recommend
      NuxtLink(to="./input") register
    p.box
</template>

<style>
header{
  background-color: rgba(98, 163, 165, 0.7);
  width: 100%;
  padding: 0px;
  height: 90px;
  margin: 0px;
}
.header-link {
  font-family: 'Courier New', Courier, monospace;
  color: gray;
  font-size: 28px;
  font-weight: 600;
  display: flex;
  padding: 20px

}
nav {
  font-size: 15px;
  display: flex;
  grid-column-gap: 30px;
  padding-left: 25px;
}
@media only screen and (max-width: 1000px) and (min-width: 768px) {
  header{
    height: 80px;
  }
  .header-link {
    font-size: 20px;
    height: 40px;
    padding: 10px
  }
  nav {
  font-size: 12px;
  gap: 10px;
  }
}
@media only screen and (max-width: 767px) {
  header{
    height: 60px;
  }
  .header-link {
    font-size: 16px;
    padding: 5px;
  }
  nav {
  font-size: 12px;
  gap: 5px;
  }
}
</style>