export const usePageSeo = (key: string) => {
   const { t, locale } = useI18n()

  const suffix = t('seo.suffix')
  const title = `${t(`seo.${key}.title`)} - ${suffix}`
  const description = t(`seo.${key}.description`)
  const ogImage = t(`seo.${key}.ogImage`, '/default-og.jpg')
  const twitterImage = t(`seo.${key}.twitterImage`, '/default-twitter.jpg')
  const baseUrl = 'https://yourdomain.com'
  const fullPath = locale.value === 'th' ? '/' : `/${locale.value}/`
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    ogUrl: baseUrl + fullPath,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage
  })
}
