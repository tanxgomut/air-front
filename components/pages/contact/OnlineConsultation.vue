<script setup lang="ts">
import { ref } from "vue";
import { useConfirmDialog } from "@/composables/useConfirmDialog";
import type { alertItem } from '@/types/dialog/alert'
const { t } = useI18n()
const localePath = useLocalePath()

const selected = ref('Choose...');
const items = ref(["..."]);
const alertData = ref<alertItem>()


const { showDialog } = useConfirmDialog()
async function onDelete() {
    alertData.value = {
        title: t('คุณต้องการลบข้อมูลใช่หรือไม่ ?'),
        icon: 'error',
        message: 'เมื่อกดยืนยันแล้วไม่สามารถย้อนกลับได้ ',
        textConfirm: 'ยืนยัน',
        textCancel: 'ยกเลิก',
    }
    const confirmed = await showDialog(alertData.value!)
    if (confirmed) {
        console.log('confirmed');

    } else {
        console.log('!confirmed');
    }
}
</script>
<template>
    <div class="py-md-15 py-8">
        <div class="py-md-9">
            <v-container>
                <v-row class="align-center">
                    <v-col cols="12" md="6">
                        <div>
                            <h2 class="text-h2 text-dark mb-md-10 mb-6">Get Online Consultation</h2>
                            <v-btn @click="onDelete">onDelete</v-btn>
                            <v-form>
                                <v-row>
                                    <v-col cols="12" sm="6" class="pb-1">
                                        <v-label class="text-muted mb-2">First Name*</v-label>
                                        <v-text-field density="comfortable" variant="outlined" hide-details
                                            class="custom-placeholer-color"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" class="pb-1">
                                        <v-label class="text-muted mb-2">Last Name*</v-label>
                                        <v-text-field density="comfortable" variant="outlined" hide-details
                                            class="custom-placeholer-color"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" class="pb-1">
                                        <v-label class="text-muted mb-2">Email*</v-label>
                                        <v-text-field density="comfortable" type="email" variant="outlined" hide-details
                                            class="custom-placeholer-color"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" class="pb-1">
                                        <v-label class="text-muted mb-2">Specialist*</v-label>
                                        <v-select :items="items" variant="outlined" v-model="selected"
                                            density="comfortable" class="text-muted custom-placeholer-color"
                                            hide-details></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" class="pb-1">
                                        <v-label class="text-muted mb-2">Date*</v-label>
                                        <v-text-field density="comfortable" type="date" variant="outlined" hide-details
                                            class="custom-placeholer-color date-time"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" class="pb-1">
                                        <v-label class="text-muted mb-2">Time*</v-label>
                                        <v-text-field density="comfortable" type="time" variant="outlined" hide-details
                                            class="custom-placeholer-color date-time"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="mt-3 text-md-start text-center">
                                        <v-btn color="primary" size="large" variant="flat">make an appoinment</v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </div>
                    </v-col>
                    <v-col cols="12" md="6">
                        <div class="text-center text-lg-end mt-md-0 mt-5">
                            <NuxtImg src="/images/get-consultation/online-consultation.jpg" alt="contact banner"
                                class="img-fluid  rounded-md overflow-hidden" />
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>