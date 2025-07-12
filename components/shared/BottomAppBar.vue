<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'

const { smAndDown } = useDisplay()
const router = useRouter()
const route = useRoute()

const tabs = [
    { to: '/', label: 'main', icon: 'mdi-home-circle' },
    { to: '/contact', label: 'concact', icon: 'mdi-heart' },
    { to: '/blog/blog', label: 'blog', icon: 'mdi-book-open-blank-variant' },
    { to: '/profile', label: 'profile', icon: 'mdi-account-circle-outline' },
]

const isActive = (path: string) => route.path === path
</script>

<template>
    <v-bottom-navigation v-if="smAndDown" elevation="0" grow class="!h-[80px]">
        <button v-for="tab in tabs" :key="tab.to" @click="router.push(tab.to)"
            class="flex flex-col items-center justify-center w-full pb-6 transition-all rounded-md"
            :class="isActive(tab.to) ? 'navigation-active' : 'text-muted'">
            <v-icon :icon="tab.icon" size="22" />
            <span class="text-xs mt-1">{{ tab.label }}</span>
        </button>
    </v-bottom-navigation>
</template>

<style scoped lang="scss">
.navigation-active {
    color: rgb(var(--v-theme-primary));
}
</style>
