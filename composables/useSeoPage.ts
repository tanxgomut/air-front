export const usePageSeo = (key: string, jsonLd?: Record<string, any>) => {
  const { t } = useI18n()
  const route = useRoute()
  const runtimeConfig = useRuntimeConfig()
  const site = useSiteConfig()

  const suffix = t('seo.suffix')
  const title = `${t(`seo.${key}.title`)} - ${suffix}`
  const description = t(`seo.${key}.description`)
  const ogImage = t(`seo.${key}.ogImage`, '/default-og.jpg')
  const twitterImage = t(`seo.${key}.twitterImage`, '/default-twitter.jpg')
  const baseUrl = runtimeConfig.public?.baseUrl || site.url || ''
  const canonicalUrl = baseUrl + route.path

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    ogUrl: canonicalUrl,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage
  })

  useHead({
    link: [
      { rel: 'canonical', href: canonicalUrl }
    ],
    meta: [
      { property: 'og:site_name', content: site.name },
      { property: 'og:type', content: 'website' }
    ],
    script: jsonLd
      ? [{
        key: `ldjson-${key}`,                
        type: 'application/ld+json',
        innerHTML: JSON.stringify(jsonLd),     
        tagPosition: 'head'                   
      }]
      : []
  })
}
