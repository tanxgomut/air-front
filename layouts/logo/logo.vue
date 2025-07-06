<script setup lang="ts">
const localePath = useLocalePath()
</script>
<template>
    
      <NuxtLink :to="localePath('/')" >
        <NuxtImg src="/images/logos//logo.svg" class="w-[170px]" />
      </NuxtLink>
   
  </template>
