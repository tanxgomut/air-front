<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { PhotoPinIcon, HomeRibbonIcon } from 'vue-tabler-icons'
import { useDisplay } from 'vuetify'
import { useAddressBook } from '@/composables/useAddressbook'
import { useConfirmDialog } from "@/composables/useConfirmDialog";
import type { alertItem } from '@/types/dialog/alert'
const { showDialog } = useConfirmDialog()
import type { Province, District, Subdistrict, Zipcode, AddressData } from '@/types/pages/addressData';
const { $toast } = useNuxtApp()
const { t } = useI18n()


const drawer = ref(false)
const menu = ref(false)
const tab = ref('province')
const { smAndDown } = useDisplay()

const {
    name,
    tel,
    address,
    selectedLocation,
    provinceData,
    errors,
    submitAddressBook,
    validAddressBook,
    resetForm
} = useAddressBook()

const options = [
    { label: t('home'), value: 'home' },
    { label: t('condo'), value: 'condo' },
    { label: t('office'), value: 'office' },
    { label: t('townhouse'), value: 'townhouse' },
    { label: t('mall'), value: 'mall' },
    { label: t('commercial'), value: 'commercial' },
    { label: t('other'), value: 'other' }
]


onMounted(async () => {
    await fetchAddressBook()
})

// create update the drawer
const close = () => {
    drawer.value = false
}

watch(drawer, (val) => {
    if (val) {
        getProvince()
        document.body.style.overflow = 'hidden'
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
        selectedLocation.value = options[0].value
    } else {
        document.body.style.overflow = ''
        document.body.style.position = ''
        document.body.style.width = ''
        resetForm()
        menu.value = false
        tab.value = 'province'
    }
})


const addressString = (ad: any) => {
    return [
        ad?.province?.name,
        ad?.district?.name,
        ad?.subdistrict?.name,
        ad?.zipcode?.zipcode
    ].filter(Boolean).join(' · ')
}

const addressStringComputed = computed(() => {
    return addressString(provinceData.value)
})

const selectLocation = (value: string) => {
    selectedLocation.value = value
}


const provinces = ref<Province[]>([])
const getProvince = async () => {
    const { data } = await axios.get('/api/provinces')
    provinces.value = data
}

const districts = ref<District[]>([])
const getDistricts = async (provinceId: number) => {
    const { data } = await axios.get('/api/districts', { params: { provinceId } })
    districts.value = data
}
const subdistricts = ref<Subdistrict[]>([])
const getSubdistricts = async (districtId: number) => {
    const { data } = await axios.get('/api/subdistricts', { params: { districtId } })
    subdistricts.value = data
}
const zipcodes = ref<Zipcode[]>([])
const getZipcodes = async (subdistrictId: number) => {
    const { data } = await axios.get('/api/zipcodes', { params: { subdistrictId } })
    zipcodes.value = data
}
const handleProvinceChange = (provinceId: number | any) => {
    getDistricts(provinceId)
    provinceData.value.province = provinces.value.find(p => p.id === provinceId) || {}
    provinceData.value.district = {}
    provinceData.value.subdistrict = {}
    provinceData.value.zipcode = {}
    tab.value = 'district'
}
const handleDistrictChange = (districtId: number | any) => {
    getSubdistricts(districtId)
    provinceData.value.district = districts.value.find(d => d.id === districtId) || {}
    provinceData.value.subdistrict = {}
    provinceData.value.zipcode = {}
    tab.value = 'subdistrict'
}
const handleSubdistrictChange = (subdistrictId: number | any) => {
    getZipcodes(subdistrictId)
    provinceData.value.subdistrict = subdistricts.value.find(s => s.id === subdistrictId) || {}
    provinceData.value.zipcode = {}
    tab.value = 'zipcode'
}
const handleZipcodeChange = (zipcodeId: number | any) => {
    provinceData.value.zipcode = zipcodes.value.find(z => z.id === zipcodeId) || {}
    menu.value = false
}

watch(() => menu.value, (val) => {
    if (!val) resetProvinceDataIfIncomplete()
})

function resetProvinceDataIfIncomplete() {
    const ad = provinceData.value
    if (!ad.province?.id || !ad.district?.id || !ad.subdistrict?.id || !ad.zipcode?.id) {
        provinceData.value = {
            province: {},
            district: {},
            subdistrict: {},
            zipcode: {}
        }
        tab.value = 'province'
    }
}
// This function is used to reset the address data when the user closes the menu without selecting a complete address.  


// This function is used to fetch the address book data from the API.
const addressBook = ref<AddressData[]>([])
const fetchAddressBook = async () => {
    const { data } = await axios.get('/api/addressbook')
    addressBook.value = data
}

const onSubmitAddressBook = async () => {
    const isValid = await validAddressBook()
    if (!isValid) return
    editAddressBookId.value = null
    $toast.success(t('Address book saved successfully!'))
    close()

}

// edit address book entry
const editAddressBookId = ref<number | null>(null)
const editAddressBook = async (id: number) => {
    const ad = addressBook.value.find(a => a.id === id)
    if (address) {
        editAddressBookId.value = id
        name.value = ad.name
        tel.value = ad.tel
        address.value = ad.address
        selectedLocation.value = ad.selectedLocation
        provinceData.value = {
            province: ad.provinceData.province,
            district: ad.provinceData.district,
            subdistrict: ad.provinceData.subdistrict,
            zipcode: ad.provinceData.zipcode
        }
        drawer.value = true
    }
}

// dailog for delete confirmation
const alertData = ref<alertItem>()
const onDelete = async () => {
    alertData.value = {
        title: t('ยืนยันการลบ ?'),
        message: 'ต้องการลบที่อยู่นี้? หากลบคุณจะไม่สามารถกู้คืนได้',
        textConfirm: 'ยืนยันการลบ',
        textCancel: 'ยกเลิก',
    }
    const confirmed = await showDialog(alertData.value!)
    if (confirmed) {
        close()

    } else {
        console.log('!confirmed');
    }
}


</script>
<template>
    <Teleport to="body">
        <div v-if="drawer" @click="close" class="fixed inset-0 bg-black/10" style="z-index: 1008;"></div>
        <transition name="slide-panel">
            <div v-if="drawer" :class="[
                'drawer-bg fixed shadow-lg bg-auto transition-transform duration-300 flex flex-col',
                smAndDown ? 'top-0 left-0 w-full h-full' : 'top-0 right-0 h-full w-[600px]',
                drawer ? (smAndDown ? 'translate-y-0' : 'translate-x-0') : (smAndDown ? 'translate-y-full' : 'translate-x-full')
            ]" style="z-index: 1009;">

                <div class="flex items-center justify-start px-4 py-3 border-b">
                    <v-btn icon="mdi-chevron-left" variant="text" @click="close"></v-btn>
                    <h5 class="text-h5 ml-2">เพิ่มสมุดที่อยู่</h5>

                </div>
                <v-card elevation="0" class="flex-1 overflow-y-auto overflow-x-hidden">
                    <v-form @submit.prevent="onSubmitAddressBook" class="">
                        <v-row class="d-flex flex-column ga-4 pa-4 " dense>
                            <h6 class="text-h6 text-dark  ">{{ t('ข้อมูลที่อยู่') }}</h6>
                            <v-col cols="12">
                                <v-text-field v-model="name" label="ชื่อ - นามสกุล" variant="outlined"
                                    density="comfortable" elevation="0" color="primary" hide-details="auto"
                                    :error-messages="errors.name" required />
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="tel" label="เบอร์โทรศัพท์" variant="outlined"
                                    density="comfortable" elevation="0" color="primary" hide-details="auto"
                                    :error-messages="errors.tel" required />
                            </v-col>
                            <v-col cols="12">
                                <v-textarea v-model="address" label="ที่อยู่" variant="outlined" density="comfortable"
                                    elevation="0" color="primary" hide-details="auto" :error-messages="errors.address"
                                    required />
                            </v-col>
                            <h6 class="text-h6 text-dark  ">{{ t('จังหวัด/เขต(อำเภอ)/แขวง(ตำบล)/รหัสไปรษณีย์') }}
                            </h6>
                            <v-col cols="12">
                                <v-menu v-model="menu" :close-on-content-click="false" location="bottom" offset-y>
                                    <template v-slot:activator="{ props }">
                                        <v-text-field v-bind="props" :value="addressStringComputed" variant="outlined"
                                            density="comfortable" elevation="0" color="primary" hide-details="auto"
                                            required readonly />
                                    </template>

                                    <v-card elevation="3" width="100%" min-height="400px" max-height="400px"
                                        class="mt-2 overflow-y-auto">
                                        <v-tabs v-model="tab" bg-color="transparent" grow class="theme-tab"
                                            min-height="50" height="50" color="primary">
                                            <v-tab value="province">
                                                <span class="d-block ">
                                                    เลือกจังหวัด</span>
                                            </v-tab>
                                            <v-tab value="district" :disabled="!provinceData.province?.id">
                                                <span class="d-block ">เขต/อำเภอ</span>
                                            </v-tab>
                                            <v-tab value="subdistrict" :disabled="!provinceData.district?.id">
                                                <span class="d-block ">เลือกแขวง/ตำบล</span>
                                            </v-tab>
                                            <v-tab value="zipcode" :disabled="!provinceData.subdistrict?.id">
                                                <span class="d-block  ">เลือกเขต</span>
                                            </v-tab>
                                        </v-tabs>
                                        <v-window v-model="tab">
                                            <v-window-item value="province" class="pa-2">
                                                <div v-for="province in provinces" :key="province.id"
                                                    class="flex justify-between items-center py-4 px-2 cursor-pointer "
                                                    @click="handleProvinceChange(province.id)">

                                                    <span>{{ province.name }}</span>

                                                    <v-icon
                                                        v-if="provinceData.province && provinceData.province.id === province.id"
                                                        color="primary" class="ml-2">mdi-check</v-icon>
                                                </div>
                                            </v-window-item>
                                            <v-window-item value="district" class="pa-2">
                                                <div v-for="district in districts" :key="district.id"
                                                    class="flex justify-between items-center py-4 px-2 cursor-pointer "
                                                    @click="handleDistrictChange(district.id)">

                                                    <span>{{ district.name }}</span>

                                                    <v-icon
                                                        v-if="provinceData.district && provinceData.district.id === district.id"
                                                        color="primary" class="ml-2">mdi-check</v-icon>
                                                </div>
                                            </v-window-item>
                                            <v-window-item value="subdistrict" class="pa-2">
                                                <div v-for="subdistrict in subdistricts" :key="subdistrict.id"
                                                    class="flex justify-between items-center py-4 px-2 cursor-pointer "
                                                    @click="handleSubdistrictChange(subdistrict?.id)">

                                                    <span>{{ subdistrict.name }}</span>

                                                    <v-icon
                                                        v-if="provinceData.subdistrict && provinceData.subdistrict.id === subdistrict.id"
                                                        color="primary" class="ml-2">mdi-check</v-icon>
                                                </div>
                                            </v-window-item>
                                            <v-window-item value="zipcode" class="pa-2">
                                                <div v-for="zipcode in zipcodes" :key="zipcode.id"
                                                    class="flex justify-between items-center py-4 px-2 cursor-pointer "
                                                    @click="handleZipcodeChange(zipcode.id)">

                                                    <span>{{ zipcode.zipcode }}</span>

                                                    <v-icon
                                                        v-if="provinceData.zipcode && provinceData.zipcode.id === zipcode.id"
                                                        color="primary" class="ml-2">mdi-check</v-icon>
                                                </div>
                                            </v-window-item>
                                        </v-window>
                                    </v-card>
                                </v-menu>
                            </v-col>

                            <v-col cols="12" class="d-flex flex-column ga-4 ">
                                <h6 class="text-h6 text-dark  ">{{ t('ประเภทสถานที่') }}</h6>
                                <div>
                                    <div class="d-flex flex-wrap gap-2">
                                        <v-btn v-for="option in options" :key="option.value"
                                            :color="selectedLocation === option.value ? 'primary' : 'grey'" rounded="lg"
                                            @click="selectLocation(option.value)">
                                            {{ t(option.label) }}
                                        </v-btn>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-form>
                    <div class="px-4 py-2">
                        <v-btn v-if="editAddressBookId" @click.stop="onDelete" prepend-icon="mdi-delete-outline"
                            variant="outlined" color="accent" class="w-100">ลบที่อยู่</v-btn>
                    </div>

                </v-card>

                <div class="flex justify-end gap-2 px-4 py-6 mt-auto">
                    <v-btn variant="text" color="error" @click="close()">ยกเลิก</v-btn>
                    <v-btn color="primary" type="submit" @click.stop="onSubmitAddressBook">บันทึก</v-btn>
                </div>

            </div>
        </transition>
    </Teleport>
    <v-card elevation="10">
        <v-row class="ma-sm-n2 ma-n1">
            <v-col cols="12" sm="12">
                <v-card elevation="0">
                    <h5 class="text-h5">Address Book</h5>
                    <div class="text-subtitle-1 text-medium-emphasis mt-2">This is where you can manage your address
                        book entries.</div>
                    <div class="mt-5">
                        <v-row>
                            <v-col cols="12">
                                <v-btn color="primary" variant="outlined" prepend-icon="mdi-plus" width="100%"
                                    @click.stop="drawer = !drawer">เพิ่มที่อยู่</v-btn>
                            </v-col>
                            <v-col cols="12" v-for="address in addressBook" :key="address.id">
                                <v-card elevation="0" class="border-b">
                                    <div class="flex px-2 py-4">
                                        <div class="">
                                            <PhotoPinIcon size="30" class="text-accent mr-2" />
                                        </div>
                                        <div class="flex-1">
                                            <div class="text-h6">{{ address.name }} <span
                                                    class="text-subtitle-1 text-muted pl-4">{{ address.tel }}</span>
                                            </div>
                                            <div class="text-subtitle-1 mt-2">{{ address.address }}</div>
                                            <div class="text-subtitle-1 mt-2">{{ addressString(address.provinceData) }}
                                            </div>
                                            <v-chip class="mt-2" color="secondary" label>
                                                {{ address.selectedLocation }}
                                            </v-chip>
                                        </div>
                                        <v-btn color="secondary" variant="text"
                                            @click.stop="editAddressBook(address.id)">
                                            แก้ไข
                                        </v-btn>
                                    </div>
                                </v-card>

                            </v-col>
                        </v-row>

                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<style scoped lang="scss">
.drawer-bg {
    background: rgb(var(--v-theme-surface));
}

.slide-panel-enter-active,
.slide-panel-leave-active {
    transition: transform 0.3s;
}

.slide-panel-enter-from.mobile,
.slide-panel-leave-to.mobile {
    transform: translateY(100%);
}

.slide-panel-enter-to.mobile,
.slide-panel-leave-from.mobile {
    transform: translateY(0);
}

.slide-panel-enter-from,
.slide-panel-leave-to {
    transform: translateX(100%);
}

.slide-panel-enter-to,
.slide-panel-leave-from {
    transform: translateX(0);
}

.theme-tab.v-tabs {
    .v-tab.v-slide-group-item--active {
        background-color: rgb(var(--v-theme-primary)) !important;
        color: white !important;
    }
}
</style>