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

//Declare theme colors
const themecolors: ThemeDefinition = {
    colors: {
        primary: '#2f73f2',
        secondary: '#46c4ff',
        danger: '#dc3545',
        info: '#6bc1f9',
        success: '#3cd278',
        warning: '#f9c78f',
        light: '#f0f6fa',
        muted: '#668199',
        dark: '#102d47',
        purple: '#cad7fd',
        lightmuted: '#f8fafc',
        lightprimary: '#DAE7FF',
        lightinfo: '#f3f9fd',
        lightinverse: '#dfebfc',
        lightgray: '#e2e8f3',
        lightprimarygray: '#effbff',
        darkprimarygray: '#1358d8',
        lightdarkdanger: '#fbcac9',
        lightdarkwarning: '#ffe8af',
        lightdarksuccess: '#7df9c2',
        lightsuccess: '#cefcf4',
        lightdarkgray: '#bccfe1',
        themecolordark: '#102c46',
        inputdark: '#143655',
        darkprimary: '#2862ce',
        darkBorder: '#153757',
        darkblue: '#102d47',
        lightborder: '#E5ECF8',
        background: '#fff',
        surface: '#fff',
        'on-surface-variant': '#fff',
        white: '#fff',
    },
};

const dark: ThemeDefinition = {
    dark: true,
    variables: {
        'border-color': '#333F55',
        'border-opacity': 1,
    },
    colors: {
        primary: "#5D87FF",
        secondary: "#49BEFF",
        lightprimary: "#253662",
        lightsecondary: "#1C455D",
        lightsuccess: "#1B3C48",
        lighterror: "#4B313D",
        lightinfo: "#223662",
        lightwarning: "#4D3A2A",
        textPrimary: "#EAEFF4",
        textSecondary: "#7C8FAC",
        borderColor: "#333F55",
        darkprimary: '#2862ce',
        inputBorder: "#465670",
        containerBg: "#2a3447",
        background: "#2a3447",
        hoverColor: "#333f55",
        surface: "#2a3447",
        "on-surface-variant": "#2a3447",
        grey100: "#333F55",
        grey200: "#465670",
        white: '#fff',
    },
};




export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
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
    });


    nuxtApp.vueApp.use(vuetify);
    nuxtApp.vueApp.use(PerfectScrollbar);
    nuxtApp.vueApp.use(VueTablerIcons);
});
