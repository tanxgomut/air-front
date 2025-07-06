<script setup lang="ts">
import { useLoginForm } from '@/composables/useLoginForm'
const { tel, password, errors, meta, submitLogin, validateLogin, resetForm } = useLoginForm()
const { password: pswReset, errors: errReset } = useRegisterForm()
const { t } = useI18n()
const localePath = useLocalePath()
const { $toast } = useNuxtApp()
import { LockIcon, XIcon } from 'vue-tabler-icons'
import logo from '@/layouts/logo/WhiteLogoIcon.vue'
import RegisterLogin from './RegisterLogin.vue'

const LoginDialog = ref(false)
const isPage = ref<'login' | 'register' | 'forgot' | 'verifyForgot' | 'resetPassword' | ''>('')

// ✅ OTP & Countdown
const otp = ref('')
const otpError = ref('')
const countdown = ref(60)
const maxResend = 3
const resendCount = ref(0)
let countdownTimer: any = null

watch(LoginDialog, (val) => {
    if (!val) {
        resetForm()
        isPage.value = ''
        stopCountdown()
        otp.value = ''
        otpError.value = ''
    }
})

const onLogin = async () => {
    try {
        const isValid = await validateLogin()
        if (!isValid) return

        const data = await submitLogin()
        console.log('📦 รับค่ากลับ:', data)

        LoginDialog.value = false
    } catch (err) {
        console.error('❌ ล็อกอินไม่สำเร็จ:', err)
    }
}

const toRegister = () => {
    isPage.value = 'register'
    resetForm()
}

const onClose = () => {
    LoginDialog.value = false
}

const toForgotPassword = () => {
    isPage.value = 'forgot'
    resetForm()
}

// ✅ Forgot Password Flow
const submitForgotPassword = async () => {
    if (!tel.value) {
        return
    }

    // 🔐 Mock API ส่ง OTP
    console.log('📤 Sending OTP to:', tel.value)

    otp.value = ''
    otpError.value = ''
    resendCount.value = 0
    isPage.value = 'verifyForgot'
    startCountdown()
}

watch(otp, async (val) => {
    if (val.length === 6 && isPage.value === 'verifyForgot') {
        await verifyForgotOtp()
    }
})

const verifyForgotOtp = async () => {
    otpError.value = ''
    if (otp.value !== '123456') {
        otpError.value = 'Incorrect code. Please try again.'
        return
    }

    isPage.value = 'resetPassword'
    stopCountdown()
}

const resendCode = () => {
    if (resendCount.value >= maxResend) return

    otp.value = ''
    resendCount.value += 1
    console.log('🔁 Resending OTP...')
    startCountdown()
}

const startCountdown = () => {
    countdown.value = 60
    if (countdownTimer) clearInterval(countdownTimer)
    countdownTimer = setInterval(() => {
        countdown.value -= 1
        if (countdown.value <= 0) {
            clearInterval(countdownTimer)
        }
    }, 1000)
}

const stopCountdown = () => {
    clearInterval(countdownTimer)
    countdown.value = 0
}

// ✅ Reset Password
const submitResetPassword = async () => {
    if (!pswReset.value) {
        // errors.password = t('This field is required')
        return
    }

    // TODO: call API to reset password
    console.log('✅ Password reset for:', tel.value)

    $toast.success('Password has been reset successfully!')
    isPage.value = 'login'
    resetForm()
}

</script>
<template>
    <v-btn color="primary" variant="outlined" class="rounded-md d-md-flex d-none white-outline ms-4"
        @click="LoginDialog = true; isPage = 'login'">
        <NuxtImg src="/images/icon/icon-login-user.png" class="me-2" alt="Sign in" />{{ t('Sign in') }}
    </v-btn>
    <!------Login Dialog------>
    <v-dialog v-model="LoginDialog" max-width="450">
        <RegisterLogin v-if="isPage == 'register'" @close="onClose" @isLogin="isPage = 'login'" />
        <template v-else>


            <v-card class="px-md-12 px-6 pt-md-15 pb-8">
                <div class="text-center ">
                    <logo />

                </div>
                <div v-if="isPage == 'login'" class="">
                    <!----Header---->
                    <h4 class="text-h4 text-dark text-center font-weight-bold mt-5 mb-sm-7 mb-4">{{ t('Sign in to your account')
                        }}
                    </h4>
                    <!---------->
                    <!----Form---->
                    <v-form @submit.prevent="onLogin" class="project-form">
                        <div class="">
                            <v-text-field v-model="tel" :error-messages="errors.tel" variant="outlined" type="tel"
                                density="comfortable" color="primary" :placeholder="t('phone')" elevation="0"
                                class="custom-placeholer-color" />
                        </div>
                        <div>
                            <v-text-field v-model="password" :error-messages="errors.password" variant="outlined"
                                type="password" :placeholder="t('password')" density="comfortable" color="primary"
                                elevation="0" class="custom-placeholer-color" />
                        </div>
                        <div>
                            <div class="ml-n2">
                                <div class="d-flex flex-wrap align-center">
                                    <v-checkbox hide-details color="primary" :label="t('Remember me')"
                                        class="text-dark">
                                    </v-checkbox>
                                    <div class="ml-sm-auto">
                                        <v-btn color="primary" block variant="text" class="text-primary"
                                            @click="toForgotPassword">
                                            {{ t('Forgot Password') }}
                                        </v-btn>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4">
                            <v-btn type="submit" size="large" color="primary" block variant="flat">
                                <LockIcon class="mr-3" size="20" /> {{ t('Sign in') }}
                            </v-btn>
                        </div>
                    </v-form>
                    <!-------->
                    <!----Footer---->
                    <div class="text-right mt-5 pt-5">
                        <v-btn @click="toRegister()" variant="plain" density="compact"
                            class="no-effect px-0 text-dark op-1 text-h6 " min-width="auto" :ripple="false">
                            {{ t('register') }}!
                        </v-btn>
                    </div>
                    <!-------->
                </div>
                <div v-else-if="isPage === 'forgot'" class="">
                    <!----Header---->
                    <h4 class="text-h4 text-center text-dark font-weight-bold mt-5 mb-sm-7 mb-4">{{ t('Forgot Password')
                        }}
                    </h4>
                    <v-form @submit.prevent="submitForgotPassword">
                        <v-text-field v-model="tel" :error-messages="errors.tel" variant="outlined" type="tel"
                            :placeholder="t('phone')" color="primary" class="mb-4" />
                        <v-btn type="submit" color="primary" block>{{ t('Send OTP') }}</v-btn>
                        <div class="text-right mt-5 pt-5">
                            <v-btn @click="isPage = 'login'" variant="plain" density="compact"
                                class="no-effect px-0 text-dark op-1 text-h6 " min-width="auto" :ripple="false">
                                {{ t('Sign in') }}!
                            </v-btn>
                        </div>
                    </v-form>
                </div>
                <div v-else-if="isPage === 'verifyForgot'" class="text-center">
                    <h4 class="text-h4 text-center text-dark font-weight-bold mt-5 mb-sm-7 mb-4">{{ t('New Password')
                        }}
                    </h4>
                    <h3 class="text-h6 mb-2">Please enter the OTP to reset your password</h3>
                    <div>A code has been sent to *****{{ tel.slice(-4) }}</div>

                    <v-sheet color="surface">
                        <v-otp-input v-model="otp" :error="!!otpError" />
                    </v-sheet>
                    <div v-if="otpError" class="text-[12px] text-error !py-[6px]">{{ otpError }}</div>

                    <div class="text-muted">
                        Didn’t receive the code?
                        <span v-if="resendCount >= maxResend"> (Limit reached)</span>
                        <span v-else-if="countdown > 0" class="text-secondary">Resend in {{ countdown }}s</span>
                        <a v-else href="#" @click.prevent="resendCode" class="text-primary">Resend</a>
                    </div>
                </div>
                <div v-else-if="isPage === 'resetPassword'" class="text-center">
                    <h3 class="text-h6 mb-4 text-center">Set your new password</h3>
                    <v-form @submit.prevent="submitResetPassword">
                        <v-text-field v-model="pswReset" :error-messages="errReset.password" variant="outlined"
                            type="password" color="primary" :placeholder="t('New Password')" />
                        <v-btn type="submit" color="primary" block class="mt-4">Confirm</v-btn>
                    </v-form>
                </div>
            </v-card>
        </template>
    </v-dialog>
</template>