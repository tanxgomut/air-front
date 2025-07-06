<script setup lang="ts">
import { useTheme } from 'vuetify'
import Logo from "@/layouts/logo/logo.vue";
import { Menu2Icon, SearchIcon } from "vue-tabler-icons";
import Login from "@/layouts/shared/auth/Login.vue";
import Register from "@/layouts/shared/auth/Register.vue";
import sidebarItem from "@/_mockApis/header/Menu";
import NavGroup from "./NavGroup/index.vue";
import NavItem from "./NavItem/index.vue";
import NavCollapse from "./NavCollapse/NavCollapse.vue";
import MobileNavCollapse from "./NavCollapse/MobileNavCollapse.vue";

import {
    UserCircleIcon,
    BellIcon,
    ArticleIcon,
    LockIcon,
} from "vue-tabler-icons";

const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
const router = useRouter()

const en = ref({ title: 'English', subtext: 'UK', value: 'en', avatar: '/images/it/mobile.png' })
const th = ref({ title: 'Thai', subtext: 'TH', value: 'th', avatar: '/images/it/project.png' })


const drawer = ref(false);
//For on Scroll Effect on Header
onBeforeMount(() => {
  window.addEventListener("scroll", handleScroll);
});
const stickyHeader = ref(false);
function handleScroll() {
  if (window.pageYOffset) {
    stickyHeader.value = true;
  } else {
    stickyHeader.value = false;
  }
}



const theme = useTheme()

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const toggleThemeLanguage = () => {
  const newLocale = locale.value === 'en' ? 'th' : 'en'
  const newPath = switchLocalePath(newLocale)
  if (newPath) router.push(newPath)
}
</script>

<template>
  <div class="header white-header mt-n95">
    <!----sidebar menu drawer start----->
    <ClientOnly>
      <v-navigation-drawer color="white" class="drawer" v-model="drawer" temporary>
        <perfect-scrollbar class="scrollnavbar">
          <!-- <MobileNavigation /> -->
          <v-list class="menu text-capitalizew-100">
            <!---Menu Loop -->
            <template v-for="(item, i) in sidebarItem">
              <!---Item Sub Header -->
              <NavGroup :item="item" v-if="item.header" :key="item.title" />
              <!---If Has Child -->
              <MobileNavCollapse class="" :item="item" :level="0" v-else-if="item.children" />
              <!---Single Item-->
              <NavItem :item="item" v-else class="" />
              <!---End Single Item-->
            </template>
          </v-list>
        </perfect-scrollbar>
      </v-navigation-drawer>

      <!----sidebar menu drawer end----->
      <v-app-bar flat class="header-card bg-surface py-4" :class="stickyHeader ? 'sticky' : ''">
        <v-container class="py-0">
          <v-toolbar class="h-auto d-flex bg-surface">
            <Logo />
            <v-list class="d-md-flex d-none flex-wrap py-0  menu text-capitalize justify-center w-100">
              <!---Menu Loop -->
              <template v-for="(item, i) in sidebarItem">
                <!---Item Sub Header -->
                <NavGroup :item="item" v-if="item.header" :key="item.title" />
                <!---If Has Child -->
                <NavCollapse class="" :item="item" :level="0" v-else-if="item.children" />
                <!---Single Item-->
                <NavItem :item="item" v-else class="" />
                <!---End Single Item-->
              </template>
            </v-list>

            <div class="d-md-flex  d-none justify-end min-w-[250px]">
              <div class="position-relative">

              </div>
              <!-----Login Button and Popup----->

              <!-----Register Button and Popup----->
              <v-sheet rounded="circle" class="cursor-pointer text-center ml-2 " elevation="0" @click="toggleTheme">
                <v-btn icon :class="theme.global.name.value" class="" size="small" variant="text" color="primary">
                  <SunIcon v-if="theme.global.name.value == 'light'" :class="theme.global.name.value" height="22" />
                  <MoonIcon v-if="theme.global.name.value == 'dark'" :class="theme.global.name.value" height="22" />
                </v-btn>
              </v-sheet>

              <v-sheet rounded="circle" class="cursor-pointer text-center ml-2" elevation="0"
                @click="toggleThemeLanguage">
                <v-btn icon variant="text" color="primary" class="" size="small">
                  <v-avatar size="22">
                    <p class="text-primary text-subtitle-1">{{ locale === 'en' ? 'EN' : 'TH' }}</p>
                  </v-avatar>
                </v-btn>
              </v-sheet>
              <Login />
              <NuxtLink :to="localePath('/profile')">
                <v-sheet rounded="circle" class="cursor-pointer text-center ml-2" elevation="0">
                  <v-btn icon variant="text" color="primary" class="" size="small">
                    <UserCircleIcon class="" size="30" />
                  </v-btn>
                </v-sheet>
              </NuxtLink>

            </div>
            <Menu2Icon class="d-md-none d-flex drawer-icon no-effect ml-auto mr-0" @click.stop="drawer = !drawer"
              size="30">
            </Menu2Icon>
          </v-toolbar>
        </v-container>
      </v-app-bar>
    </ClientOnly>
  </div>
</template>
