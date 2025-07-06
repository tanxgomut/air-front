<script setup lang="ts">
import { ref } from "vue";
const tab = ref(null);
const reviewstar = ref(5);
</script>
<template>
  <div class="find-real-estate">
    <!-- <v-container>
      <v-row>
        <v-col cols="12" lg="6" md="7" sm="8" data-aos="fade-right" data-aos-delay="200" data-aos-duration="1000">
          <div class="d-flex align-center mb-6">
            <span class="bg-success pa-2 rounded-circle mr-2"></span>
            <h6 class="text-subtitle-1 text-dark font-weight-bold">build everything</h6>
          </div>
          <h1 class="text-h1 text-dark mb-6">Amazingly fexible, customizable and easy to use</h1>
          <p class="text-body-1 text-muted mb-8">Build high quality landing pages using Landingpro now.</p>
          <v-btn variant="flat" color="primary" size="large" class="px-9">get started</v-btn>
        </v-col>
      </v-row>
      
    </v-container> -->
    <v-container>
      <v-row>
        <v-col cols="12" lg="6" md="7" sm="8" data-aos="fade-right" data-aos-delay="200" data-aos-duration="1000">
          <div class="d-flex align-center mb-6">
            <span class="bg-success pa-2 rounded-circle mr-2"></span>
            <h6 class="text-subtitle-1 text-dark font-weight-bold">
              จองคิวออนไลน์ ง่าย สะดวก รวดเร็ว
            </h6>
          </div>

          <h1 class="text-h3 text-lg-h1 text-md-h2 text-dark mb-6">
            ล้างแอร์ถึงบ้าน
            <br />
            ปลอดภัย สะอาด พร้อมบริการระดับมืออาชีพ
          </h1>

          <p class="text-body-1 text-dark mb-8">
            บริการล้างแอร์โดยช่างผู้เชี่ยวชาญ
            <br />
            นัดวันสะดวกได้ทันที ครอบคลุมพื้นที่กรุงเทพฯ และปริมณฑล
          </p>

          <v-btn variant="flat" color="primary" size="large" class="px-9">
            จองคิวล้างแอร์เลย
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>
