<script setup lang="ts">
usePageSeo('index')
import Header from '@/layouts/header/CenterHeader.vue';
import Footer from '@/layouts/footer/CorporateFooter.vue';
import HeroBanner from '@/components/demos/corporate/HeroBanner.vue';
import Services from '@/components/demos/corporate/Services.vue';
import BuildAmazing from '@/components/demos/corporate/BuildAmazing.vue';
import BuildFeature from '@/components/demos/corporate/BuildFeature.vue';
import Testimonials from '@/components/demos/corporate/Testimonials.vue';
import StartProject from '@/components/demos/corporate/StartProject.vue';
import FindRealEstate from '~/components/demos/corporate/FindRealEstate.vue';
import PagesBooking from '@/components/pages/booking/index.vue'
import ContactUs from '@/components/pages/contact/ContactUs.vue';
const { t } = useI18n()
const localePath = useLocalePath()
import { onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
onMounted(async () => {

})

</script>
<template>
    <FindRealEstate />
    <Services />
    <!-- <PagesBooking /> -->
    <!-- <BuildAmazing /> -->
    <!-- <BuildFeature /> -->
    <ContactUs />
    <Testimonials />
</template>
