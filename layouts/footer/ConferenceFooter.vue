<script setup lang="ts">
import WhiteLogo from "@/layouts/logo/WhiteLogo.vue"
import { SendIcon } from "vue-tabler-icons";
import { ConferenceFooterExloreLinks, ConferenceFooterFeatureLinks, ConferenceFooterResourceLinks, ConferenceFooterPlateformLinks } from '@/_mockApis/footer/ConferenceFooter';
import { ConferenceSocialLinksIcons } from '@/_mockApis/footer/ConferenceFooter';
import { MailIcon, MapPinIcon, PhoneCallIcon } from 'vue-tabler-icons';
</script>
<template>
    <section class="conference-footer bg-themecolordark position-relative">
        <v-container class="pb-3">
            <v-row>
                <v-col cols="12" sm="6">
                    <WhiteLogo />
                </v-col>
                <v-col cols="12" sm="6">
                    <div class="d-sm-flex align-center newsletter">
                        <div class="mr-7 mb-sm-0 mb-3">Sign up for updates</div>
                        <div class="d-flex align-center flex-fill ">
                            <v-text-field variant="solo" density="comfortable" color="primary"
                                class="position-relative bg-inputdark rounded-md pr-9"
                                placeholder="Enter Your Email address" single-line hide-details>
                                <v-btn color="primary" :ripple="false" size="large"
                                    class="no-effect position-absolute right-0 top-50 mt-n2 mr-n15 px-0" variant="text"
                                    density="compact">
                                    <SendIcon class="text-muted me-6 mt-1" size="22" />
                                </v-btn>
                            </v-text-field>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" class="mt-2"><v-divider></v-divider></v-col>
            </v-row>
            <!--Footer links-->

            <v-row class="pt-sm-5">
                <v-col cols="6" md="2" sm="6">
                    <div class="font-weight-medium mb-5">Explore</div>
                    <ul>
                        <li class="mb-2" v-for="link in ConferenceFooterExloreLinks" :key="link.title">
                            <NuxtLink :to="link.url"
                                class="text-muted text-decoration-none text-capitalize font-weight-regular position-relative ">
                                {{
                                    link.title }}
                                <v-chip v-if="link.tag" class="bg-success rounded-md ml-2 ">hiring</v-chip>
                            </NuxtLink>
                        </li>
                    </ul>
                </v-col>
                <v-col cols="6" md="2" sm="6">
                    <div class="font-weight-medium mb-5">Features</div>
                    <ul>
                        <li class="mb-2" v-for="link in ConferenceFooterFeatureLinks" :key="link.title">
                            <NuxtLink :to="link.url"
                                class="text-muted text-decoration-none text-capitalize font-weight-regular position-relative ">
                                {{
                                    link.title }}
                                <v-chip v-if="link.tag" class="bg-success">hiring</v-chip>
                            </NuxtLink>
                        </li>
                    </ul>
                </v-col>
                <v-col cols="6" md="2" sm="6">
                    <div class="font-weight-medium mb-5">Features</div>
                    <ul>
                        <li class="mb-2" v-for="link in ConferenceFooterResourceLinks" :key="link.title">
                            <NuxtLink :to="link.url"
                                class="text-muted text-decoration-none text-capitalize font-weight-regular position-relative ">
                                {{
                                    link.title }}
                                <v-chip v-if="link.tag" class="bg-success">hiring</v-chip>
                            </NuxtLink>
                        </li>
                    </ul>
                </v-col>
                <v-col cols="6" md="2" sm="6">
                    <div class="font-weight-medium mb-5">Platform</div>
                    <ul>
                        <li class="mb-2" v-for="link in ConferenceFooterPlateformLinks" :key="link.title">
                            <NuxtLink :to="link.url"
                                class="text-muted text-decoration-none text-capitalize font-weight-regular position-relative ">
                                {{
                                    link.title }}
                                <v-chip v-if="link.tag" class="bg-success">hiring</v-chip>
                            </NuxtLink>
                        </li>
                    </ul>
                </v-col>
                <v-col cols="12" md="4">
                    <div class="text-muted mb-4 d-flex align-start">
                        <MapPinIcon size="22" class="mr-3" />
                        221b Baker St, London NW1 6XE, United Kingdom
                    </div>
                    <div class="text-muted mb-4 d-flex align-start">
                        <PhoneCallIcon size="22" class="mr-3" />
                        +1 (123) 123 1234
                    </div>
                    <div class="text-muted mb-4 d-flex align-start">
                        <MailIcon size="22" class="mr-3" />
                        info@landingpro.com
                    </div>
                    <div class="mt-sm-8 mt-7">
                        <div class="font-weight-medium mb-4">Get Social</div>
                        <ul class="d-flex align-center">
                            <li v-for="social in ConferenceSocialLinksIcons" class="mr-4">
                                <NuxtLink :to="social.url" class="text-decoration-none text-muted">
                                    <component :is="social.icon" stroke-width="2" size="22" />
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                </v-col>
            </v-row>
            <div class="footer-bottom border-top-dark mt-sm-12 mt-6">
                <div class="d-sm-flex justify-space-between pt-4 align-center">
                    <div class="text-muted mb-sm-0 mb-4">©Copyright 2024 by LandingPro.</div>
                    <div class="text-muted mb-sm-0 mb-4">Privacy - Cookies - Disclaimer</div>
                    <div class="text-muted">
                        <div class="d-flex">
                            <NuxtLink to="/">
                                <img src="/images/download/apple-2.png" alt="apple app" class="mr-md-6 mr-6" />
                            </NuxtLink>
                            <NuxtLink to="/">
                                <img src="/images/download/gp-2.png" alt="google pay app" />
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
    </v-container>
</section></template>