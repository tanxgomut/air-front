<script setup lang="ts">
// import { CheckIcon } from 'vue-tabler-icons';

</script>

<template>
    <div class="py-md-15 py-8">
        <div class="py-md-15 py-sm-8">
            <v-container>
                <v-row class="align-center">
                    <v-col cols="12" md="6">
                        <div class="text-md-start text-center">
                            <img src="/images/corporate/build-everything.png" alt="image" class="img-fluid" />
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" data-aos="fade-left" data-aos-delay="200" data-aos-duration="1000"> 
                        <div class="d-flex align-center mb-5">
                            <span class="bg-success pa-2 rounded-circle mr-2"></span>
                            <h6 class="text-subtitle-1 text-dark font-weight-bold">ทำไมต้องเลือกล้างแอร์</h6>
                        </div>
                        <h2 class="text-h2 text-dark mb-md-8 mb-6">บริการล้างแอร์คุณภาพสูง สะอาด ปลอดภัย</h2>
                        <p class="text-muted mb-md-11 mb-5 text-body-1">ร้านล้างแอร์ใกล้ฉัน เรามีทั้งช่างล้างแอร์, ซ่อมแอร์, และติดตั้งแอร์ โดยทีมช่างผู้เชี่ยวชาญ มุ่งเน้นคุณภาพและมาตรฐานการทำงาน ช่างล้างแอร์สุภาพใจดี รักษาความสะอาด เก็บกวาดเรียบร้อย</p>
                        <v-row class="mb-sm-4 mb-1">
                            <v-col cols="12" sm="6" class="pb-sm-4 pb-0">
                                <div class="d-flex align-center mb-4">
                                    <v-avatar size="26" class="bg-lightinfo"><CheckIcon class="text-primary"  stroke-width="4" size="13" /></v-avatar>
                                    <div class="ml-6 text-body-1">ทีมงานมืออาชีพ</div>
                                </div>
                                <div class="d-flex align-center mb-4">
                                    <v-avatar size="26" class="bg-lightinfo"><CheckIcon class="text-primary"  stroke-width="4" size="13" /></v-avatar>
                                    <div class="ml-6 text-body-1">บริการหลังการขาย</div>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6" class="pt-sm-4 pt-0">
                                <div class="d-flex align-center mb-4">
                                    <v-avatar size="26" class="bg-lightinfo"><CheckIcon class="text-primary"  stroke-width="4" size="13" /></v-avatar>
                                    <div class="ml-6 text-body-1">ตรงต่อเวลา</div>
                                </div>
                                <div class="d-flex align-center mb-4">
                                    <v-avatar size="26" class="bg-lightinfo"><CheckIcon class="text-primary"  stroke-width="4" size="13" /></v-avatar>
                                    <div class="ml-6 text-body-1">ราคาคุ้มค่า</div>
                                </div>
                            </v-col>
                        </v-row>   
                        <v-btn variant="flat" color="primary" size="large" class="px-9">get started</v-btn> 
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>