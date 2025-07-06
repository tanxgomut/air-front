<script setup lang="ts">
usePageSeo('booking')
import PagesBooking from '@/components/pages/booking/index.vue'
const { t } = useI18n()
const localePath = useLocalePath()

</script>
<template>
    <PagesBooking />
</template>