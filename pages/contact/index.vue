<script setup lang="ts">
usePageSeo('booking')
import Header from '@/layouts/header/CenterHeader.vue';
import ContactUs from '@/components/pages/contact/ContactUs.vue';
import OnlineConsultation from '@/components/pages/contact/OnlineConsultation.vue';
import HeadOffice from '@/components/pages/contact/HeadOffice.vue';
import MapsLocation from '@/components/maps/location.vue'

const { setTitle, description } = useSeoText()

</script>
<template>
    <ContactUs />
    <OnlineConsultation />
    <HeadOffice />
</template>