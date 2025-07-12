<script setup lang="ts">
import { watch, nextTick } from 'vue'
import AOS from 'aos'
import airTypeItem from '@/_mockApis/pages/booking';
import mapsBooking from '@/components/maps/booking.vue'
const { t } = useI18n()
const { $toast } = useNuxtApp()
import { subDays, format } from 'date-fns'
import { th } from 'date-fns/locale'
import { useBookingForm } from '@/composables/useBookingForm'
import { useFileUpload } from '@/composables/useFileUpload'
import qrCode from '/images/qr-code/qrcode.png'
const {
    name,
    tel,
    address,
    date,
    time,
    selectedLocation,
    slips,
    imagesBooking,
    airType,
    errors,
    meta,
    validate,
    submitBookingAir,
    validBookingAir,
    resetBooking
} = useBookingForm(airTypeItem.airTypeItem)


const {
    images,
    image,
    errorMessage,
    handleFileUpload,
    removeImage,
    clearAll
} = useFileUpload()

const dialog = ref<boolean>(false)

const minDate = format(subDays(new Date(), 1), 'yyyy-MM-dd')
const options = [
    { label: t('home'), value: 'home' },
    { label: t('condo'), value: 'condo' },
    { label: t('office'), value: 'office' },
    { label: t('townhouse'), value: 'townhouse' },
    { label: t('mall'), value: 'mall' },
    { label: t('commercial'), value: 'commercial' },
    { label: t('other'), value: 'other' }
]

const bookingSection = ref<HTMLElement | null>(null)
const stepBooking = ref<number>(1)

watch(stepBooking, async () => {
    await nextTick()
    AOS.refresh()
})

const selectLocation = (value: string) => {
    selectedLocation.value = value
}

const toggleSelect = (item: any) => {
    item.selected = !item.selected
    if (!item.selected) item.sum = 0
}

const increase = (item: any) => {
    item.sum++
}

const decrease = (item: any) => {
    if (item.sum > 0) item.sum--
}

const onDateChange = (val: string) => {
    console.log('เลือกวันที่:', val)
}

const formatDateThai = (date: string | number | Date | any) => {
    return format(new Date(date), 'd MMMM yyyy', { locale: th })
}



const saveBooking = () => {
    slips.value
    submitBookingAir()
    $toast.success('จองคิวล้างแอร์สำเร็จ !')
    stepBooking.value = 1
    resetBooking()
    scrollToBooking()
}

const submitBooking = (tab: number) => {
    validBookingAir().then((isValid) => {
        if (isValid) {
            stepBooking.value = tab
            scrollToBooking()
        }
    })
}

const fileInput = ref<HTMLInputElement | null>(null)
const slipsInput = ref<HTMLInputElement | null>(null)

function triggerFileInput(type = 'image') {
    if (type == 'image') {
        fileInput.value?.click()
    } else {
        slipsInput.value?.click()
    }

}

watch(images, (val) => {
    imagesBooking.value = val
}, { immediate: true, deep: true })

watch(image, (val) => {
    slips.value = val
}, { immediate: true, deep: true })


const scrollToBooking = () => {
    if (bookingSection.value) {
        const offsetTop = bookingSection.value.getBoundingClientRect().top + window.scrollY - 100
        window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
}



</script>

<template>
    <div class="mt-10 pt-md-16 pt-5 border-top">
        <div class="border-bottom">
            <v-container>
                <div class="mb-sm-16 mb-8 pb-md-5">
                    <h2 ref="bookingSection"
                        class="text-sm-h3 text-md-h2 text-dark mb-sm-15 mb-7 text-sm-start text-center">
                        {{ t('จองคิวล้างแอร์กับทีมงานมืออาชีพ') }}
                    </h2>

                    <v-form v-if="stepBooking === 1" key="step1" @submit.prevent="submitBooking(2)" class="">
                        <v-row>
                            <v-col cols="12" md="8" lg="8" class="">

                                <div class="d-flex flex-column ga-6">
                                    <h6 class="text-h6 text-dark  ">{{ t('ข้อมูลผู้ติดต่อ') }}</h6>
                                    <v-text-field v-model="name" :error-messages="errors.name" label="ชื่อ - นามสกุล"
                                        variant="outlined" density="comfortable" elevation="0" color="primary"
                                        placeholder="full name" hide-details="auto" class="" />
                                    <v-text-field v-model="tel" :error-messages="errors.tel" label="เบอร์โทรศัพท์"
                                        variant="outlined" density="comfortable" elevation="0" color="primary"
                                        placeholder="(+66) 90 000 0000" hide-details="auto" class="" />

                                    <h6 class="text-h6 text-dark  ">{{ t('เลือกประเภทแอร์') }}</h6>
                                    <div>
                                        <v-row>
                                            <v-col cols="4" lg="4" v-for="item in airType" :key="item.type">
                                                <v-card @click="toggleSelect(item)" elevation="10" rounded="lg" :class="[
                                                    'rounded-lg transition-all duration-300 overflow-hidden w-100 sm:h-[120px] md:h-[140px]',
                                                    item.selected ? 'border-2 border-primary' : 'border-2 !border-transparent'
                                                ]">

                                                    <NuxtImg :src="item.image"
                                                        class="w-100 h-100  overflow-hidden" />
                                                    <v-card-subtitle class="py-2 text-center">
                                                        <div>{{ t(item.label) }}</div>
                                                    </v-card-subtitle>
                                                </v-card>
                                                <div class="d-flex flex-nowrap my-2">
                                                    <v-btn @click.stop="decrease(item)" icon="mdi-minus" size="x-small"
                                                        class="" rounded="full" :disabled="!item.selected"></v-btn>
                                                    <div class="w-100 align-self-center text-center">{{ item?.sum }}
                                                    </div>
                                                    <v-btn @click.stop="increase(item)" icon="mdi-plus" size="x-small"
                                                        class="" rounded="full" :disabled="!item.selected"></v-btn>
                                                </div>
                                            </v-col>
                                        </v-row>
                                        <div v-if="meta.touched" class="text-[12px] text-error !px-[16px] !pt-[6px] ">{{
                                            errors.airType }}</div>
                                    </div>
                                    <h6 class="text-h6 text-dark  ">{{ t('รูปภาพหน้างาน') + ' (' +
                                        t('อัปโหลดได้หลายรูป') + ')' }}</h6>
                                    <div>
                                        <v-row dense>
                                            <v-col v-for="(image, index) in imagesBooking" :key="index" cols="12" sm="6"
                                                md="4" lg="3">
                                                <v-card class="rounded-lg overflow-hidden position-relative"
                                                    elevation="10">
                                                    <NuxtImg :src="image.preview"
                                                        class="w-100 h-[120px] md:h-[180px] object-cover" />
                                                    <v-btn icon density="compact" color="red"
                                                        class="position-absolute top-1 right-1 m-1 z-10"
                                                        @click="removeImage(index)">
                                                        <v-icon size="18">mdi-close</v-icon>
                                                    </v-btn>
                                                </v-card>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4" lg="3">
                                                <v-hover v-slot:default="{ isHovering, props }">
                                                    <v-card v-bind="props"
                                                        class="d-flex align-center justify-center rounded-lg cursor-pointer h-[120px] md:h-[180px]"
                                                        elevation="10" @click="triggerFileInput('image')">
                                                        <input ref="fileInput" type="file" multiple accept="image/*"
                                                            @change="handleFileUpload('multi', $event)" hidden />
                                                        <v-icon size="26" color="black">
                                                            {{ isHovering ? 'mdi-camera-plus' : 'mdi-plus-box' }}
                                                        </v-icon>
                                                    </v-card>
                                                </v-hover>
                                            </v-col>
                                        </v-row>
                                    </div>
                                </div>
                            </v-col>
                            <v-col cols="12" md="4" lg="4" class="pb-1 ">
                                <div class="d-flex flex-column ga-6">
                                    <h6 class="text-h6 text-dark  ">{{ t('เวลา / วันที่') }} </h6>
                                    <div>
                                        <v-radio-group v-model="time" :error-messages="errors.time" inline
                                            hide-details="auto">
                                            <v-radio label="09:00 - 11:00" value="09:00 - 11:00" color="info"></v-radio>
                                            <v-radio label="13:00 - 14:00" value="13:00 - 14:00" color="info"></v-radio>
                                            <v-radio label="15:00 - 17:00" value="15:00 - 17:00" color="info"></v-radio>
                                        </v-radio-group>
                                    </div>
                                    <div class="flex justify-center">
                                        <v-date-picker v-model="date" :error-messages="errors.date"
                                            @update="onDateChange" width="500" if-adjacent-months :min="minDate"
                                            hide-details="auto"></v-date-picker>

                                    </div>
                                    <div v-if="meta.touched" class="text-[12px] text-error !px-[16px] !pt-[6px] ">{{
                                        errors.date }}</div>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="8" lg="8" class="d-flex flex-column ga-6">
                                <h6 class="text-h6 text-dark  ">{{ t('รายละเอียดที่อยู่') }} </h6>
                                <div>
                                    <v-textarea v-model="address" :error-messages="errors.address"
                                        label="บ้านเลขที่ ซอย แขวง เชต ฯลฯ" color="primary" variant="outlined"
                                        row-height="20" rows="6" auto-grow hide-details="auto"></v-textarea>
                                </div>
                            </v-col>
                            <v-col cols="12" md="4" lg="4" class="d-flex flex-column ga-6 ">
                                <h6 class="text-h6 text-dark  ">{{ t('ประเภทสถานที่') }} </h6>
                                <div>
                                    <div class="d-flex flex-wrap gap-2">
                                        <v-btn v-for="option in options" :key="option.value"
                                            :color="selectedLocation === option.value ? 'primary' : 'grey'" rounded="lg"
                                            @click="selectLocation(option.value)">
                                            {{ t(option.label) }}
                                        </v-btn>
                                    </div>
                                    <div class="text-[12px] text-error !px-[16px] !pt-[6px] ">{{
                                        errors.selectedLocation }}</div>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="d-flex flex-column ga-6">
                                <h6 class="text-h6 text-dark  ">{{ t('ตำแหน่งของคุณ') + ' (' + t('ปักหมุดได้') + ')'
                                    }}
                                </h6>
                                <mapsBooking />
                            </v-col>
                        </v-row>
                        <v-col class="flex justify-end">
                            <v-btn type="submit" color="primary" class="mt-4" @click="submitBooking(2)">{{
                                t('ยืนยันการจอง') }} </v-btn>
                        </v-col>
                    </v-form>

                    <div v-if="stepBooking === 2" key="step2" class="">

                        <v-row>
                            <v-col cols="12" md="7" lg="7">
                                <v-card elevation="10">
                                    <v-card-title>{{ t('ข้อมูลการจอง') }}</v-card-title>
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="12">
                                                <div class="flex justify-start items-center">
                                                    <div class="min-w-[100px]">
                                                        <v-avatar size="80">
                                                            <NuxtImg alt="John"
                                                                src="https://cdn.vuetifyjs.com/images/john.jpg">
                                                            </NuxtImg>
                                                        </v-avatar>
                                                    </div>
                                                    <div class="flex-1">
                                                        <div class="text-body-2 mb-4">
                                                            {{ t(name) }}
                                                        </div>
                                                        <div>
                                                            <v-icon class="mr-2" color="dark">mdi-phone</v-icon>
                                                            {{ tel }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6" lg="6">

                                                <div><v-icon class="mr-2" color="dark">mdi
                                                        mdi-clock-time-eleven</v-icon> เวลา <span>{{ time }}</span>
                                                </div>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6" lg="6">
                                                <div><v-icon class="mr-2" color="dark">mdi
                                                        mdi-clipboard-text-clock</v-icon> วันที่ <span>{{
                                                            formatDateThai(date) }}</span>
                                                </div>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6" lg="6">
                                                <div>ที่อยู่</div>
                                                <div class="mt-2">{{ t(address) }}</div>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6" lg="6">
                                                <div>ประเภทสถานที่</div>
                                                <div class="mt-2"><v-chip color="primary"> {{ t(selectedLocation)
                                                }}</v-chip></div>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>

                                </v-card>
                            </v-col>
                            <v-col cols="12" md="5" lg="5">
                                <MapsDisplayBooking v-if="stepBooking === 2" />
                            </v-col>
                        </v-row>
                        <v-row v-if="imagesBooking.length > 0">
                            <v-col cols="12">
                                <v-card elevation="10">
                                    <v-card-title>{{ t('รูปภาพหน้างาน') }}</v-card-title>
                                    <v-card-text>
                                        <div class="flex flex-wrap gap-4">
                                            <div v-for="(image, index) in imagesBooking" :key="index"
                                                class="w-[200px] h-[200px] rounded-lg overflow-hidden shadow-md">
                                                <NuxtImg :src="image.preview" class="object-cover w-full h-full" />
                                            </div>
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-card elevation="10">
                                    <v-card-text class="w-100">
                                        <v-row>
                                            <v-col cols="12" sm="6" md="6" lg="6">
                                                <v-card-title><v-icon class="mr-2" color="dark">mdi
                                                        mdi-air-conditioner
                                                    </v-icon>{{ t('ประเภทแอร์ และ จำนวน') }}</v-card-title>
                                                <div v-for="air in airType">
                                                    <div v-if="air.selected" class="text-h3 text-sm-h3">{{ t(air.label)
                                                    }} <span>{{ air.sum }}</span> ตัว</div>
                                                </div>
                                                <!-- <div class="text-h2 text-sm-h3">แอร์แขวน <span>3</span> ตัว</div> -->
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6" lg="6" class=" text-end">
                                                <v-card-title>{{ t('ราคา') }}</v-card-title>
                                                <h2 class="text-h2">900 <span class="text-subtitle-1">{{ t('บาท')
                                                        }}</span>
                                                </h2>

                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="7" lg="7">
                                <v-card elevation="10">
                                    <v-card-title>
                                        {{ t('แสกนเพื่อชำระเงิน') }}
                                    </v-card-title>
                                    <v-card-text>
                                        <div class="flex justify-center items-center">
                                            <NuxtImg :src="qrCode" class="h-[300px] w-[300px]" />
                                        </div>
                                        <div class="text-center mt-2">
                                            {{ t('บัญชี : น.ส ธัญญารัตน์ อนันทสุข') }}
                                        </div>
                                        <div class="text-center ">
                                            {{ t('หลังจากชำระเงิน จะมีเจ้าหน้าที่ติดต่อไปคอนเฟร์มอีกทีกนะคะ') }}
                                        </div>

                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col cols="12" md="5" lg="5">
                                <div class="flex justify-end">
                                    <v-btn color="dark" variant="outlined" @click="dialog = true">{{
                                        t('รายละเอียดการทำงาน') }} </v-btn>
                                    <v-dialog v-model="dialog" max-width="800">
                                        <v-card>
                                            รายละเอียดการทำงาน
                                        </v-card>
                                    </v-dialog>
                                </div>
                                <v-card elevation="0">
                                    <v-card-title>
                                        {{ t('อัปโหลดสลิป') }}
                                    </v-card-title>
                                    <v-card-text>
                                        <v-card v-if="slips" class="rounded-lg overflow-hidden position-relative"
                                            elevation="10">
                                            <div class="flex justify-center ">
                                                <NuxtImg :src="slips.preview"
                                                    class="w-[50%] h-[120px] md:h-[180px] object-cover" />
                                            </div>

                                            <v-btn icon density="compact" color="red"
                                                class="position-absolute top-1 right-1 m-1 z-10" @click="slips = null">
                                                <v-icon size="18">mdi-close</v-icon>
                                            </v-btn>
                                        </v-card>
                                        <v-hover v-else v-slot:default="{ isHovering, props }">
                                            <v-card v-bind="props"
                                                class="d-flex align-center justify-center rounded-lg cursor-pointer h-[120px] md:h-[180px]"
                                                elevation="10" @click="triggerFileInput('slips')">
                                                <input ref="slipsInput" type="file" multiple accept="image/*"
                                                    @change="handleFileUpload('single', $event)" hidden />
                                                <v-icon size="26" color="black">
                                                    {{ isHovering ? 'mdi-camera-plus' : 'mdi-plus-box' }}
                                                </v-icon>
                                            </v-card>
                                        </v-hover>
                                    </v-card-text>
                                </v-card>
                                <div class="flex justify-between mt-4">
                                    <v-btn color="dark" variant="outlined" class=""
                                        @click="slips = null, submitBooking(1)">{{
                                            t('กลับไปแก้ไขข้อมูล') }} </v-btn>
                                    <v-btn type="submit" color="primary" class="" :disabled="!slips"
                                        @click="saveBooking">{{
                                            t('ยืนยันการชำระเงิน') }} </v-btn>
                                </div>
                            </v-col>
                        </v-row>
                    </div>

                    <div v-if="stepBooking === 3" key="step3" class="">
                        2
                    </div>
                </div>
            </v-container>
        </div>
    </div>
</template>