<script setup lang="ts">
import Header from '@/layouts/header/RightHeader.vue';
import BlogGrid from '~/components/pages/blog/blog-grid/Index.vue'

import DontMiss from '~/components/pages/blog/blog-grid/DontMiss.vue';
import Footer from '@/layouts/footer/nftFooter.vue';

</script>
<template>
        <BlogGrid/>
</template>

<!-- <template>
  <div class="space-y-6">
    <h2 class="text-xl font-bold">สร้างบทความ</h2>

    <v-tabs v-model="activeLocale" grow>
      <v-tab v-for="locale in locales" :key="locale" :value="locale">
        {{ locale.toUpperCase() }}
      </v-tab>
    </v-tabs>

    <div v-for="locale in locales" :key="locale" v-show="activeLocale === locale" class="space-y-4">
      <v-text-field v-model="form.title[locale]" label="Title" outlined dense />
      <v-text-field v-model="form.slug[locale]" label="Slug" outlined dense />
      <v-textarea v-model="form.summary[locale]" label="Summary" outlined />
      <v-textarea v-model="form.content[locale]" label="Content" rows="10" outlined />
    </div>

    <v-btn color="primary" @click="submitForm">บันทึกบทความ</v-btn>
  </div>
</template>

<script setup lang="ts">
const locales = ['th', 'en']
const activeLocale = ref('th')

const form = reactive({
  title: { th: '', en: '' },
  slug: { th: '', en: '' },
  summary: { th: '', en: '' },
  content: { th: '', en: '' }
})

const submitForm = () => {
  console.log('📄 Form Submitted:', form)
}
</script> -->
