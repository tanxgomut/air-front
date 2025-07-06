<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { HeartIcon, PhotoIcon, UserCircleIcon, UsersIcon } from 'vue-tabler-icons';

const tab = ref(null);
const items = shallowRef([
    { tab: 'Profile', icon: UserCircleIcon, href: '/apps/user/profile' },
    { tab: 'Followers', icon: HeartIcon, href: '/apps/user/profile/followers' },
    { tab: 'Friends', icon: UsersIcon, href: '/apps/user/profile/friends' },
    { tab: 'Gallery', icon: PhotoIcon, href: '/apps/user/profile/gallery' }
]);


</script>

<template>
    <v-card elevation="10" class="overflow-hidden">
        <img :src="'/images/backgrounds/air-conditioning.jpg'" alt="profile" class="w-100" />
        <div>
            <v-row class="mt-1 pb-4">
                <v-col cols="12" lg="12" sm="12" class="d-flex justify-center ">
                    <div class="text-center top-spacer">
                        <div class="avatar-border">
                            <v-avatar size="100" class="userImage">
                                <img :src="'/images/user/user-2.jpg'" width="100" alt="Mathew" />
                            </v-avatar>
                        </div>
                        <h5 class="text-h5 mt-3">Mathew Anderson</h5>
                        <span class="text-h6 font-weight-regular">Designer</span>
                    </div>
                </v-col>
            </v-row>
        </div>
    </v-card>
</template>
<style lang="scss">
.avatar-border {
    background-image: linear-gradient(rgb(80, 178, 252), rgb(244, 76, 102));
    border-radius: 50%;
    width: 110px;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    .userImage {
        border: 4px solid rgb(255, 255, 255);
    }
}

.top-spacer {
    margin-top: -95px;
}

.profiletab .v-slide-group__content {
    justify-content: end;
    .v-btn--variant-text .v-btn__overlay {
        background: transparent;
    }
}

@media (max-width: 1023px) {
    .order-sm-second {
        order: 2;
    }
    .order-sml-first {
        order: 1;
    }
    .order-sm-third {
        order: 3;
    }
    .order-sm-last {
        order: 4;
    }
}

.btn-brand-facebook {
    background-color: rgb(24, 119, 242) !important;
    color: rgb(var(--v-theme-surface)) ;
}
.btn-brand-twitter {
    background-color: rgb(29, 161, 242) !important;
    color: rgb(var(--v-theme-surface)) ;
}
.btn-brand-dribbble {
    background-color: rgb(234, 76, 137) !important;
    color: rgb(var(--v-theme-surface)) ;
}
.btn-brand-youtube {
    background-color: rgb(205, 32, 31) !important;
    color: rgb(var(--v-theme-surface)) ;
}
</style>
