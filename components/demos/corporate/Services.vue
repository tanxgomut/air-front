<script setup lang="ts">
import { ServicesData } from '@/_mockApis/demos/corporate';
</script>
<template>
    <div class="pt-md-15 pt-8">
        <v-container>
            <v-card elevation="10" class="p">
                <v-row class="">
                    <v-col cols="12" lg="4" sm="4" v-for="item in ServicesData" :key="item.title" class="">
                        <div class="text-center px-md-10 px-4 " data-aos="fade-up" data-aos-delay="400"
                            data-aos-duration="1000">
                            <div class="d-flex justify-center mb-2">
                                <NuxtImg :src="item.img" height="30" width="30" />
                            </div>
                            <h4 class="text-h2 text-lg-h1 text-dark font-weight-bold mt-6 mb-2">{{ item.title }}</h4>
                            <p class="text-muted text-body-1 ">{{ item.desc }}</p>
                        </div>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>
    </div>
</template>