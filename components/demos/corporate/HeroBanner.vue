<script setup lang="ts">
const { $toast } = useNuxtApp()
function notify() {
    $toast.success('success!')
}

</script>
<template>
    <div class="corporate-banner pt-md-16 pt-8 pb-md-12 pb-8 mt-95">
        <v-container>
            <v-row class="align-center justify-space-between pt-md-7">
                <v-col cols="12" md="5" data-aos="fade-right" data-aos-delay="200" data-aos-duration="1000">
                    <div class="d-flex align-center mb-6">
                        <span class="bg-success pa-2 rounded-circle mr-2"></span>
                        <h6 class="text-subtitle-1 text-dark font-weight-bold">build everything</h6>
                    </div>
                    <h1 class="text-h1 text-dark mb-6" >Amazingly fexible, customizable and easy to use</h1>
                    <p class="text-body-1 text-muted mb-8">Build high quality landing pages using Landingpro now.</p>
                    <v-btn variant="flat" color="primary" size="large" class="px-9" @click="notify()">get started</v-btn>
                    <div class="d-flex align-center mt-11  mb-md-0 mb-sm-5 mb-8">
                        <div class="d-flex align-center">
                            <v-avatar size="48" class="mr-n2">
                                <img src="/images/corporate/user-1.png" alt="profile" height="48"
                                    width="48">
                            </v-avatar>
                            <v-avatar size="48" class="mr-n2">
                                <img src="/images/corporate/user-2.png" alt="profile" height="48"
                                    width="48">
                            </v-avatar>
                            <v-avatar size="48" class="mr-n2">
                                <img src="/images/corporate/user-3.png" alt="profile" height="48"
                                    width="48">
                            </v-avatar>
                        </div>
                        <p class="text-subtitle-1 ml-6">Need help? <NuxtLink to="/" class="text-decoration-none text-primary">Contact our experts</NuxtLink><br> Tell us about your project</p>
                    </div>
                </v-col>
                <v-col cols="12" md="6">
                    <div class="position-relative text-center text-lg-start">
                        <img src="/images/shape/shapeline-2.png" alt="shape" class="img-fluid position-absolute top-0 right-0 mt-n10 mr-n16" />
                        <div class="position-relative z-index1 rounded-md overflow-hidden">
                            <img src="/images/corporate/corporate-banner.jpg" alt="banner" class="img-fluid rounded-md"/>
                        </div>
                        <img src="/images/shape/circle-line-3.png" alt="shape" class="img-fluid position-absolute bottom-0 left-0 mb-n10 ml-n12 " />
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>