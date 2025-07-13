<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from 'vue-router'
import {
    UserCircleIcon,
    BellIcon,
    ArticleIcon,
    AddressBookIcon
} from "vue-tabler-icons";

const router = useRouter()
const route = useRoute()

const tab = ref('Progress') // default tab
const validTabs = ['Progress', 'Record', 'Account', 'AddressBook']

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
// sticky header functionality
const stickyHeader = ref(false);
function handleScroll() {
    if (window.pageYOffset) {
        stickyHeader.value = true;
    } else {
        stickyHeader.value = false;
    }
}
</script>

<template>
    <v-row>
        <PagesProfileBanner />
    </v-row>
    <v-row class=""> 
        <v-col cols="12" md="12">
            <v-card elevation="0" class=" " rounded="md">
                <div class="sticky  sm:top-[95px top-[95px] z-30">
                    <v-sheet>
                        <v-tabs v-model="tab" bg-color="transparent" grow class="d-block theme-tab" min-height="50"
                            height="50" color="primary">
                            <v-tab value="Progress">
                                <BellIcon class="mr-2" size="20" /><span class="d-none d-sm-block d-md-block ">In
                                    Progress</span>
                            </v-tab>
                            <v-tab value="Record">
                                <ArticleIcon class="mr-2" size="20" /><span
                                    class="d-none d-sm-block d-md-block ">Record</span>
                            </v-tab>
                            <v-tab value="Account">
                                <UserCircleIcon class="mr-2" size="20" /> <span
                                    class="d-none d-sm-block d-md-block  ">Account</span>
                            </v-tab>
                            <v-tab value="AddressBook">
                                <AddressBookIcon class="mr-2" size="20" /><span
                                    class="d-none d-sm-block d-md-block ">Address Book</span>
                            </v-tab>
                        </v-tabs>
                    </v-sheet>
                </div>
                <v-window v-model="tab">
                    <v-window-item value="Progress">
                        <PagesProfileTabProgress />
                    </v-window-item>
                    <v-window-item value="Record">
                        <PagesProfileTabRecord />
                    </v-window-item>
                    <v-window-item value="Account">
                        <PagesProfileTabAccount />
                    </v-window-item>
                    <v-window-item value="AddressBook">
                        <PagesProfileTabAddressBook />
                    </v-window-item>
                </v-window>
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