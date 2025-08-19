<script setup lang="ts">

import Services from '@/components/demos/corporate/Services.vue';
import Testimonials from '@/components/demos/corporate/Testimonials.vue';
import FindRealEstate from '~/components/demos/corporate/FindRealEstate.vue';
import ContactUs from '@/components/pages/contact/ContactUs.vue';

usePageSeo('index')

const { t } = useI18n()
const localePath = useLocalePath()
import { onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

onMounted(async () => {
const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
})

import { useCartStore } from '@/store/cart'

const cart = useCartStore()

const product = {
  id: 1,
  name: 'Air Conditioner'
}

const productB = {
  id: 3,
  name: 'Air Conditioner'
}

const addToCart = () => {
  cart.addItem(product)
}

</script>
<template>
    <FindRealEstate />
    <Services />
    <v-btn color="primary" @click="addToCart">เพิ่มสินค้าเข้าตะกร้า</v-btn>
    <ContactUs />
    <Testimonials />
</template>
