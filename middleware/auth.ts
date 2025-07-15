export default defineNuxtRouteMiddleware(() => {
    const isLogin = useCookie('isLogin')

    if (!isLogin.value) {
        return navigateTo('/')
    }
})