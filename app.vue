<script setup lang="ts">
import ScrollTop from '@/components/shared/BackToTop.vue'
import Basket from '@/components/shared/basket.vue'
import CookieConsent from '@/components/shared/CookieConsent.vue'
import Header from '@/layouts/header/CenterHeader.vue';
import Footer from '@/layouts/footer/CorporateFooter.vue';
import "aos/dist/aos.css";
import AOS from "aos";
import { Toaster } from 'vue-sonner'
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue'
import { useCartStore } from '@/store/cart'

const cart = useCartStore()

onMounted(() => {
  AOS.init();
  cart.initCart()
});


</script>
<template>
  <ConfirmDialog />
  <Toaster position="top-right" richColors />
  <v-locale-provider>
    <v-app>
      <v-main>
        <!--Content-->
        <NuxtLoadingIndicator />
        <NuxtLayout>
          <Header />
          <NuxtPage />
          <Footer />
        </NuxtLayout>
        <SharedBottomAppBar />
        <CookieConsent />
        <ScrollTop />
        <Basket />
      </v-main>
    </v-app>
  </v-locale-provider>
</template>