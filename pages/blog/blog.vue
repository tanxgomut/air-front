<script setup lang="ts">
import BlogGrid from '~/components/pages/blog/blog-grid/Index.vue'
const { t } = useI18n()
const { locale } = useI18n()
const localePath = useLocalePath()

</script>
<template>
        <BlogGrid/>
</template>

