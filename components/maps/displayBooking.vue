<script setup lang="ts">
const lat = ref(13.7563)
const lng = ref(100.5018)

let map: any
let marker: any

onMounted(async () => {
    const L = await import('leaflet')

    // Fix icon path
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })
    //await getUserLocation()
    map = L.map('mapDisplayBooking').setView([lat.value, lng.value], 18)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

     marker = L.marker([lat.value, lng.value], { draggable: true }).addTo(map)
})

</script>

<template>
    <div id="mapDisplayBooking"></div>
</template>

<style scoped>
#mapDisplayBooking {
    height: 280px;
    width: 100%;
}
</style>
