import { createVuetify } from "vuetify";
import type { ThemeDefinition } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import PerfectScrollbar from "vue3-perfect-scrollbar";
import VueTablerIcons from "vue-tabler-icons";

//Mock Api data
import "../_mockApis";

import "vue3-carousel/dist/carousel.css";

//import style
import "@/assets/scss/style.scss";

//i18
// import { createI18n } from "vue-i18n";
// import messages from "@/utils/locales/messages";

// date picker
import DateFnsAdapter from '@date-io/date-fns'
import enUS from 'date-fns/locale/en-US'
import th from 'date-fns/locale/th'

//Declare theme colors
const themecolors: ThemeDefinition = {
    dark: false,
    variables: {
        'border-color': '#e5eaef',
        'border-opacity': 1,
    },
    colors: {
        primary: '#5D87FF',
        secondary: '#49BEFF',
        info: '#539BFF',
        success: '#13DEB9',
        accent: '#FFAB91',
        warning: '#FFAE1F',
        error: '#D32F2F',
        lightprimary: '#ECF2FF',
        lightsecondary: '#E8F7FF',
        lightsuccess: '#E6FFFA',
        lighterror: '#FDEDE8',
        lightinfo: '#EBF3FE',
        lightwarning: '#FEF5E5',
        textPrimary: '#2A3547',
        textSecondary: '#718096',
        borderColor: '#e5eaef',
        inputBorder: '#DFE5EF',
        containerBg: '#ffffff',
        background: '#ffffff',
        hoverColor: '#f6f9fc',
        surface: '#fff',  // ถ้ามี variant
        'on-surface-variant': '#fff',
        grey100: '#F2F6FA',
        grey200: '#EAEFF4'
    }
};

const dark: ThemeDefinition = {
    dark: true,
    variables: {
        'border-color': '#333F55',
        'border-opacity': 1,
    },
    colors: {
        primary: '#5D87FF',
        secondary: '#49BEFF',
        lightprimary: '#253662',
        lightsecondary: '#1C455D',
        lightsuccess: '#1B3C48',
        lighterror: '#4B313D',
        lightinfo: '#223662',
        lightwarning: '#4D3A2A',
        textPrimary: '#EAEFF4',
        textSecondary: '#F5F5F5',
        borderColor: '#333F55',
        inputBorder: '#465670',
        containerBg: '#2a3447',
        background: '#2a3447',
        hoverColor: '#333f55',
        surface: '#2a3447',
        'on-surface-variant': '#2a3447',
        grey100: '#333F55',
        grey200: '#465670'
    }
};

export default defineNuxtPlugin((nuxtApp) => {
    const locale = nuxtApp.$i18n.locale
    const vuetify = createVuetify({
        ssr: true,
        components,
        directives,
        theme: {
            defaultTheme: "light",
            themes: {
                light: themecolors,
                dark: dark,
                variables: {},
            },
        },
        defaults: {
            VBtn: {
                style: "text-transform: capitalize; letter-spacing:0;",
                rounded: "md",
            },
        },

        date: {
            adapter: DateFnsAdapter,
            locale: {
                en: enUS,
                th: th,
            },
        },
        locale: {
            locale: locale.value,
            fallback: 'en',
        },
    });

    watch(locale, (newLocale) => {
        vuetify.locale.current.value = newLocale
    }, { immediate: true })

    nuxtApp.vueApp.use(vuetify);
    nuxtApp.vueApp.use(PerfectScrollbar);
    nuxtApp.vueApp.use(VueTablerIcons);


});
