// ===============================|| Blank Layout ||=============================== //
<script setup lang="ts">
import CookieConsent from '@/components/shared/CookieConsent.vue'
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue'
import Header from '@/layouts/header/CenterHeader.vue';
</script>
<template>

  <Header />
  <NuxtPage />
  <CookieConsent />

</template>
