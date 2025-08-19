<script setup lang="ts">
import { ShoppingCartIcon } from "vue-tabler-icons";
import { useCartStore } from '@/store/cart'

const cart = useCartStore()

</script>

<template>
    <div  v-cloak>
        <transition name="fade">
            <v-btn id="basket"  class="position-fixed d-flex  d-md-none right-0 bottom-0 p-4 mr-10 z-1004 " style="margin-bottom: 110px"
                color="primary" size="x-large" elevation="0" icon>
                <ShoppingCartIcon size="30" /> <span>{{ cart.totalItems }}</span>
            </v-btn>
        </transition>
    </div>
</template>