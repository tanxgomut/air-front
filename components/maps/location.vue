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
    map = L.map('map').setView([lat.value, lng.value], 18)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    // Add draggable marker
    marker = L.marker([lat.value, lng.value], { draggable: true }).addTo(map)


    // marker.on('dragend', () => {
    //     const pos = marker.getLatLng()
    //     lat.value = pos.lat
    //     lng.value = pos.lng
    // })

    // map.on('click', (e: L.LeafletMouseEvent) => {
    //     const pos = e.latlng
    //     marker.setLatLng(pos)
    //     lat.value = pos.lat
    //     lng.value = pos.lng
    // })
})

const getUserLocation = async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                lat.value = position.coords.latitude
                lng.value = position.coords.longitude
                const userLatLng = [lat.value, lng.value]
                map.setView(userLatLng, 15)
                marker.setLatLng(userLatLng)
            }, (error) => {
                alert('⚠️ ไม่สามารถเข้าถึงตำแหน่งของคุณได้: ' + error.message)
            }
        )
    } else {
        alert('เบราว์เซอร์ของคุณไม่รองรับ Geolocation API')
    }
}
</script>

<template>
    <div id="map"></div>
</template>

<style scoped>
#map {
    height: 400px;
    width: 100%;
}
</style>
