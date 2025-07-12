<script setup lang="ts">
import ScrollTop from '@/components/shared/BackToTop.vue'
import CookieConsent from '@/components/shared/CookieConsent.vue'
import Header from '@/layouts/header/CenterHeader.vue';
import Footer from '@/layouts/footer/CorporateFooter.vue';
import "aos/dist/aos.css";
import AOS from "aos";
import { Toaster } from 'vue-sonner'
import { ChevronUpIcon } from "vue-tabler-icons";
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue'
import SharedBottomAppBar from '@/components/shared/BottomAppBar.vue';

usePageSeo('index')

const { setTitle, description } = useSeoText()
onMounted(() => {
  AOS.init();
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
        <SharedBottomAppBar/>
        <CookieConsent />
        <ScrollTop />
      </v-main>
    </v-app>
  </v-locale-provider>
</template>