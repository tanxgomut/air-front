<script setup lang="ts">
const lat = ref(13.7563)
const lng = ref(100.5018)
const addressText = ref('')

// ----- Search state -----
type SuggestItem = { label: string; lat: number; lon: number; raw: any }
const searchQuery = ref('')
const searchItems = ref<SuggestItem[]>([])
const searchLoading = ref(false)
let searchTimer: any = null

let map: any
let marker: any

const mapUrl = computed(() => {
    const la = Number(lat.value).toFixed(6)
    const ln = Number(lng.value).toFixed(6)
    return `https://maps.google.com/?q=${la},${ln}`
})

onMounted(async () => {
    const L = await import('leaflet')

    // Fix icon path
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })
    await getUserLocation()
    map = L.map('map').setView([lat.value, lng.value], 18)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    // Add draggable marker
    marker = L.marker([lat.value, lng.value], { draggable: true }).addTo(map)


    marker.on('dragend', () => {
        const pos = marker.getLatLng()
        lat.value = pos.lat
        lng.value = pos.lng
    })

    map.on('click', (e: L.LeafletMouseEvent) => {
        const pos = e.latlng
        marker.setLatLng(pos)
        lat.value = pos.lat
        lng.value = pos.lng
    })
})

const getUserLocation = async () => {
    if (!navigator.geolocation) {
        alert('เบราว์เซอร์ของคุณไม่รองรับ Geolocation API')
        return
    }
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
}

const copyUrl = async () => {
    try {
        await navigator.clipboard.writeText(mapUrl.value)
        
    } catch {
        prompt('คัดลอกลิงก์นี้:', mapUrl.value)
    }
}

// พุ่งกล้อง + ย้ายหมุด
function moveTo(la: number, ln: number, zoom = 18) {
  lat.value = la
  lng.value = ln
  if (marker) marker.setLatLng([la, ln])
  if (map) map.setView([la, ln], zoom)
}


// -------- Forward Geocoding (ค้นหาแล้วมุดไปปัก) --------
async function searchPlaces(query: string) {
  if (!query || query.length < 2) { searchItems.value = []; return }
  searchLoading.value = true
  try {
    const url = 'https://nominatim.openstreetmap.org/search'
    const params = new URLSearchParams({
      q: query,
      format: 'json',
      'accept-language': 'th',
      addressdetails: '1',
      limit: '8'
    })
    const res = await fetch(`${url}?${params.toString()}`, {
      headers: { 'User-Agent': 'air-front/1.0 (your-email@example.com)' }
    })
    const data = await res.json() as any[]
    searchItems.value = data.map(d => ({
      label: d.display_name as string,
      lat: Number(d.lat),
      lon: Number(d.lon),
      raw: d
    }))
  } finally {
    searchLoading.value = false
  }
}

// debounce ตอนพิมพ์
watch(searchQuery, (q) => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => searchPlaces(q), 350)
})

// เลือกผลลัพธ์จาก autocomplete
function onSelectPlace(item: SuggestItem | null) {
  if (!item) return
  moveTo(item.lat, item.lon, 18)
  const a = item.raw?.address || {}
  addressText.value = item.label
}

// กด Enter เพื่อพุ่งไปผลแรก
function onSubmitSearch() {
  if (searchItems.value.length > 0) onSelectPlace(searchItems.value[0])
}

</script>

<template>
      <!-- Search bar -->
  <div class="mb-3">
    <v-autocomplete
      v-model:search="searchQuery"
      :items="searchItems"
      :loading="searchLoading"
      item-title="label"
      return-object
      label="ค้นหาสถานที่ / ที่อยู่"
      variant="outlined"
      hide-no-data
      clearable
      @update:modelValue="onSelectPlace"
      @keydown.enter.prevent="onSubmitSearch"
    />
  </div>

    <div id="map"></div>
    <v-textarea v-model="addressText" label="ที่อยู่หน้างาน" variant="outlined"></v-textarea>

    <div class="mt-3 flex gap-2 items-center flex-wrap">
        <VBtn @click="getUserLocation">ใช้ตำแหน่งของฉัน</VBtn>

        <!-- ปุ่มเปิด Google Maps -->
        <VBtn :href="mapUrl" target="_blank" rel="noopener">เปิดใน Google Maps</VBtn>

        <!-- ปุ่มคัดลอกลิงก์ -->
        <VBtn variant="outlined" @click="copyUrl">คัดลอกลิงก์</VBtn>
    </div>

    <div class="mt-4 grid grid-cols-2 gap-4 max-w-md">
        <div>
            <p class="font-medium">Latitude</p>
            <p>{{ Number(lat).toFixed(6) }}</p>
        </div>
        <div>
            <p class="font-medium">Longitude</p>
            <p>{{ Number(lng).toFixed(6) }}</p>
        </div>

        <div class="col-span-2">
            <p class="font-medium">ลิงก์ Google Maps</p>
            <a :href="mapUrl" target="_blank" rel="noopener" class="text-blue-600 underline break-all">
                {{ mapUrl }}
            </a>
        </div>
    </div>
</template>

<style scoped>
#map {
    height: 500px;
    width: 100%;
}
</style>
