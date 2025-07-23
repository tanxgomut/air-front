<script setup lang="ts">
import { useTheme } from 'vuetify'
import Logo from "@/layouts/logo/logo.vue";
import { Menu2Icon, SearchIcon } from "vue-tabler-icons";
import Login from "@/layouts/shared/auth/Login.vue";
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
const route = useRoute()
const router = useRouter()
const colorMode = useColorMode()
const theme = useTheme()
const isLogin = useCookie('isLogin')
const en = ref({ title: 'English', subtext: 'UK', value: 'en', avatar: '/images/it/mobile.png' })
const th = ref({ title: 'Thai', subtext: 'TH', value: 'th', avatar: '/images/it/project.png' })


const drawer = ref(false);
const contactSection = ref<HTMLElement | null>(null)

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

// toggle theme based on color mode preference
watch(() => colorMode.preference, (newPreference) => {
  if (newPreference) {
    theme.global.name.value = newPreference
  }
})

const toggleTheme = () => {
  const newTheme = theme.global.current.value.dark ? 'light' : 'dark'
  theme.global.name.value = newTheme
  colorMode.preference = newTheme
}


const toggleThemeLanguage = () => {
  const newLocale = locale.value === 'en' ? 'th' : 'en'
  const newPath = switchLocalePath(newLocale)
  if (newPath) router.push(newPath)
}

const goToContact = () => {
  if (route.path == '/') {
    scrollToContact()
  } else {
    router.push({ path: '/' })
    setTimeout(() => { scrollToContact() }, 300)
  }
}

const scrollToContact = () => {
  const el = document.getElementById('contactSection')
  if (el) {
    const offsetTop = el.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top: offsetTop, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="header white-header mt-n95 z-50">
    <!----sidebar menu drawer start----->
    <ClientOnly>
      <!----sidebar menu drawer end----->
      <v-app-bar flat class="header-card bg-surface py-4" :class="stickyHeader ? 'sticky' : ''">
        <v-container class="py-0">
          <v-toolbar class="h-auto d-flex bg-surface">
            <Logo />
            <v-list class="d-md-flex d-none flex-wrap py-0  menu text-capitalize justify-center w-100">
              <!---Menu Loop -->

              <v-btn to="/booking" variant="text" color="primary" class="" size="small">booking</v-btn>
              <v-btn @click="goToContact()" variant="text" color="primary" class="" size="small">contact</v-btn>
            </v-list>

            <div class="d-md-flex d-none justify-end min-w-[250px]">
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

              <Login v-if="!isLogin" />

              <NuxtLink v-if="isLogin" :to="localePath('/profile')">
                <v-sheet rounded="circle" class="cursor-pointer text-center ml-2" elevation="0">
                  <v-btn icon variant="text" color="primary" class="" size="small">
                    <UserCircleIcon class="" size="30" />
                  </v-btn>
                </v-sheet>
              </NuxtLink>
            </div>
            <!-- <v-btn variant="flat" color="primary" size="small" to="/booking"
              class="d-md-none d-flex justify-end ml-auto px-6 py-4  text-sm-body-2 text-md-body-1">
              จองคิว
            </v-btn> -->
            <div class="ml-auto d-md-none d-flex">
              <Login />
            </div>
            <!-- <Menu2Icon class="d-md-none d-flex drawer-icon no-effect ml-2 mr-0" @click.stop="drawer = !drawer"
              size="30">
            </Menu2Icon> -->
            <v-menu elevation="0" class="">
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" variant="text" class="d-md-none d-flex" v-bind="props"></v-btn>
              </template>

              <v-list elevation="0">
                <v-list-item elevation="0">
                  <v-sheet rounded="circle" class="cursor-pointer text-center " elevation="0"
                    @click="toggleThemeLanguage">
                    <v-btn icon variant="text" color="primary" class="" size="small">
                      <v-avatar size="22">
                        <p class="text-primary text-subtitle-1">{{ locale === 'en' ? 'EN' : 'TH' }}</p>
                      </v-avatar>
                    </v-btn>
                  </v-sheet>
                </v-list-item>
                <v-list-item elevation="0">
                  <v-sheet rounded="circle" class="cursor-pointer text-center  " elevation="0" @click="toggleTheme">
                    <v-btn icon :class="theme.global.name.value" class="" size="small" variant="text" color="primary">
                      <SunIcon v-if="theme.global.name.value == 'light'" :class="theme.global.name.value" height="22" />
                      <MoonIcon v-if="theme.global.name.value == 'dark'" :class="theme.global.name.value" height="22" />
                    </v-btn>
                  </v-sheet>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-container>
      </v-app-bar>
    </ClientOnly>
  </div>
</template>
