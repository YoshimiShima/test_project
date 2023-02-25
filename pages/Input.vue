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


</style>
