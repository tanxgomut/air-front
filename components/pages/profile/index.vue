<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from 'vue-router'
import {
    UserCircleIcon,
    BellIcon,
    ArticleIcon,
    LockIcon,
} from "vue-tabler-icons";

const router = useRouter()
const route = useRoute()

const tab = ref('Progress') // default tab
const validTabs = ['Progress', 'Record', 'Account', 'Security']

onMounted(() => {
    const queryTab = route.query.tab as string
    if (validTabs.includes(queryTab)) {
        tab.value = queryTab
    }
})

watch(tab, (newTab) => {
    router.replace({
        query: { ...route.query, tab: newTab },
    })
})

</script>

<template>
    <v-row>
        <PagesProfileBanner />
    </v-row>
    <v-row class="justify-center">
        <v-col cols="12" md="12">
            <v-card elevation="0" class=" " rounded="md">
                <v-tabs v-model="tab" bg-color="transparent" grow class="theme-tab" min-height="50" height="50"
                    color="primary">
                    <v-tab value="Progress">
                        <BellIcon class="mr-2" size="20" /><span class="d-none d-sm-block d-md-block ">In
                            Progress</span>
                    </v-tab>
                    <v-tab value="Record">
                        <ArticleIcon class="mr-2" size="20" /><span class="d-none d-sm-block d-md-block ">Record</span>
                    </v-tab>
                    <v-tab value="Account">
                        <UserCircleIcon class="mr-2" size="20" /> <span
                            class="d-none d-sm-block d-md-block  ">Account</span>
                    </v-tab>
                    <v-tab value="Security">
                        <LockIcon class="mr-2" size="20" /><span class="d-none d-sm-block d-md-block ">Security</span>
                    </v-tab>
                </v-tabs>
                <v-card-text class="pa-sm-6 pa-3 pb-sm-6 pb-6">
                    <v-window v-model="tab">
                        <v-window-item value="Progress">
                            <PagesProfileProgressTab/>
                        </v-window-item>
                        <v-window-item value="Record">
                            <PagesProfileRecordTab/>
                        </v-window-item>
                        <v-window-item value="Account">
                            <PagesProfileAccountTab />
                        </v-window-item>
                        <v-window-item value="Security">
                            <PagesProfileChangePasswordTab />
                        </v-window-item>
                    </v-window>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
<style lang="scss">
.theme-tab.v-tabs {
    .v-tab.v-slide-group-item--active {
        background-color: rgb(var(--v-theme-primary)) !important;
        color: white !important;
    }
}
</style>