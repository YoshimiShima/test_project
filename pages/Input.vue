<script lang="ts" setup>
import {
  NDialogProvider,
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
      NDialogProvider
        ProvideData
</template>

<style>


</style>
