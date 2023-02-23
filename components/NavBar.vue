<template lang="pug">
header
  .header-link
    a(href="/") Cartrader
    nav
      NuxtLink(to="./Detail") recommend
      NuxtLink(to="./posts") posts
    p.box
</template>

<style>
.header-link {
  font-family: 'Courier New', Courier, monospace;
  color: gray;
  font-size: 28px;
  font-weight: 600;
  display: flex;
  grid-column-gap: 20px;
  padding: 20px;
  background-color: rgba(98, 163, 165, 0.7);
}
nav {
  font-size: 15px;
  display: flex;
  gap: 20px;
}
@media only screen and (max-width: 1000px) and (min-width: 768px) {
  .header-link {
    font-size: 20px;
  }
  nav {
  font-size: 12px;
  gap: 10px;
  }
}
@media only screen and (max-width: 767px) {
  .header-link {
    font-size: 16px;
  }
  nav {
  font-size: 12px;
  gap: 5px;
  }
}
.p {
  border-bottom: 1px solid gray;
}
</style>