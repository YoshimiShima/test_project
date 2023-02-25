<script lang="ts" setup>
import {
  NConfigProvider,
  NMessageProvider,
  NNotificationProvider,
  NTable
} from 'naive-ui'
import ProvideData from '../components/ProvidedData.vue'

</script>

<template lang="pug">
NConfigProvider
  NMessageProvider
    NNotificationProvider
      ProvideData
</template>

<style>
body {
  padding: 16px;
}
tr {
grid-auto-flow: 10px;
}

</style>
