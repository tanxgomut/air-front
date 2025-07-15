export default defineNuxtRouteMiddleware((to, from) => {
  // const isLogin = useCookie('isLogin') // ควรเซ็ตค่าเป็น 'true' ตอน login

  // if (!isLogin.value && to.path !== '/') {
  //   return navigateTo('/')
  // } else if (isLogin.value && to.path === '/') {
  //   return navigateTo('/') // หรือเส้นทางอื่นที่เหมาะสม
  // }
})
