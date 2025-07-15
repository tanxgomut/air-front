<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'

const { smAndDown } = useDisplay()
const router = useRouter()
const route = useRoute()

const tabs = [
    { to: '/', label: 'main', icon: 'mdi-home-circle' },
    { to: '/booking', label: 'booking', icon: 'mdi-heart' },
    { to: '/', label: 'contact', icon: 'mdi-book-open-blank-variant' },
    { to: '/profile', label: 'profile', icon: 'mdi-account-circle-outline' },
]
const isActive = (tab: { to: string, label: string }) => {
    if (tab.label === 'contact') {
        return route.path === '/' && route.hash === '#contact'
    }
    if (tab.label === 'main') {

        return route.path === '/' && !route.hash
    }
    return route.path === tab.to
}

const gotoPage = async (path: string, label: string) => {
    if (label === 'contact') {
        if (route.path !== '/') {
            await router.push({ path: '/', hash: '#contact' })
            setTimeout(() => scrollToContact(), 300)
        } else {
            scrollToContact()
        }
    } else if (route.path == '/' && label == 'main') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        router.push(path)
    } else {
        if (route.path !== path) {
            router.push(path)
        }
    }
}



const scrollToContact = () => {
    const el = document.getElementById('contactSection')
    if (el) {
        const offsetTop = el.getBoundingClientRect().top + window.scrollY - 100
        window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
}
</script>

<template>
    <v-bottom-navigation v-if="smAndDown" elevation="0" grow class="!h-[80px]">
        <button v-for="tab in tabs" :key="tab.to" @click="gotoPage(tab.to, tab.label)"
            class="flex flex-col items-center justify-center w-full pb-6 transition-all rounded-md"
            :class="isActive(tab) ? 'navigation-active' : 'text-muted'">
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
