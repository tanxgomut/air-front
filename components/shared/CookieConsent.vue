<script setup lang="ts">

const cookieConsent = useCookie<boolean>('cookie_consent', {
    default: () => false,
    maxAge: 60 * 60 * 24 * 365
})

const showConsent = ref(true)

onMounted(() => {
    // if (!cookieConsent.value) {
    //     showConsent.value = true
    // }
})

function acceptCookies() {
    cookieConsent.value = true
    showConsent.value = false
    console.log(showConsent.value);
    
}
</script>

<template>
    <div v-if="showConsent"
        class="fixed bottom-0 left-0 right-0 z-50 border-t bg-white backdrop-blur supports-[backdrop-filter]:bg-background/80 py-4">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
            <p class="text-sm text-dark ">
                เว็บไซต์นี้ใช้คุกกี้เพื่อพัฒนาประสบการณ์การใช้งานของคุณ
                การใช้งานเว็บไซต์นี้ถือว่าคุณยอมรับนโยบายคุกกี้ของเรา
            </p>

            <div class="flex items-center gap-2">
                <v-btn class="me-2" variant="text" color="grey" @click="showConsent = false">ปิด</v-btn>
                <v-btn color="primary" @click="acceptCookies">ยอมรับ</v-btn>
            </div>
        </div>
    </div>
</template>
