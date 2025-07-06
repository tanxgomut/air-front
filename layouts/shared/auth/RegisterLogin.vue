<script setup lang="ts">
import { useRegisterForm } from '@/composables/useRegisterForm'
const { $toast } = useNuxtApp()
const { t } = useI18n()
const localePath = useLocalePath()
import logo from '@/layouts/logo/WhiteLogoIcon.vue';

const { name, tel, password, errors, submitRegister, validateRegister, resetForm } = useRegisterForm()

const emit = defineEmits(['close', 'isLogin'])

const RegisterDialog = ref(false);
const otp = ref('')
const isError = ref<boolean>(true)
const otpError = ref('')
const isPages = ref<string>('register') // verify
const countdown = ref(0)
let timer: any = null
const resendCount = ref(0)
const maxResend = 2

watch(RegisterDialog, (val) => {
    if (!val) resetForm()
})

watch(otp, (val) => {
    if (otp.value.length == 6) {
        verifyOtp()
    }
})

const onRegister = async () => {
    const isValid = await validateRegister()
    if (!isValid) return
    isPages.value = 'verify'
    startCountdown()
}

const startCountdown = () => {
    countdown.value = 5
    timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
            clearInterval(timer)
        }
    }, 1000)
}

const resendCode = () => {
    if (resendCount.value >= maxResend) return
    otp.value = ''
    otpError.value = ''
    resendCount.value++
    startCountdown()
    // 👇 call resend API here
}

const verifyOtp = async () => {
    otpError.value = ''

    if (otp.value !== '123456') {
        otpError.value = 'Incorrect code. Please try again.'
        return
    }

    try {
        const data = await submitRegister()
        console.log('📦 รับค่ากลับ:', data)
        $toast.success('สมัครบัญชีสำเร็จ !')
        emit('close')
    } catch (err: any) {
        console.error('❌ สมัครไม่สำเร็จ:', err)
        $toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่')
    }
}

const backLogin = () => {
    emit('isLogin')
    otp.value = ''
    resetForm()
}

</script>
<template>
    <v-card>
        <div class="px-md-12 px-6 pt-md-15 pb-8">
            <!----Header---->
            <div class="text-center mb-6 ">
                <logo />
                <h4 class="text-h4 text-dark font-weight-bold mt-5 mb-sm-7 mb-4">{{ t('Register your account') }}
                </h4>
            </div>
            <!---------->
            <v-form v-show="isPages == 'register'" @submit.prevent="onRegister" class="project-form">
                <div class="mb-1">
                    <v-text-field v-model="name" :error-messages="errors.name" variant="outlined" type="text"
                        density="comfortable" :placeholder="t('Name')" color="primary" elevation="0"
                        class="custom-placeholer-color" />
                </div>
                <div class="mb-1">
                    <v-text-field v-model="tel" :error-messages="errors.tel" variant="outlined" type="tel"
                        density="comfortable" :placeholder="t('phone')" color="primary" elevation="0"
                        class="custom-placeholer-color" />
                </div>
                <div>
                    <v-text-field v-model="password" :error-messages="errors.password" variant="outlined"
                        type="password" density="comfortable" :placeholder="t('Password')" color="primary" elevation="0"
                        class="custom-placeholer-color" />
                </div>
                <div class="ml-n2 mt-n2">
                    <div class="">
                        <v-checkbox hide-details color="primary" :label="t('Remember me')" class="text-dark">
                        </v-checkbox>
                    </div>
                </div>
                <div class="mt-3">
                    <v-btn type="submit" size="large" color="primary" block variant="flat">
                        <LockIcon class="mr-3" size="20" /> {{ t('Register Now') }}
                    </v-btn>
                </div>
            </v-form>
            <v-card v-show="isPages == 'verify'" class="py-8  text-center " elevation="0" width="100%">

                <h3 class="text-h6 mb-2">
                    Please enter the one time password to verify your account
                </h3>

                <div>A code has been sent to *****2489</div>

                <v-sheet color="surface">
                    <v-otp-input v-model="otp" :error="!!otpError"></v-otp-input>

                </v-sheet>
                <div v-if="otpError" class="text-[12px] text-error  !py-[6px] ">{{ otpError }}</div>
                <!-- <v-btn class="my-4" color="primary" height="40" text="Verify" variant="flat" width="100%"></v-btn> -->

                <div class="text-muted">
                    Didn't receive the code? <span v-if="resendCount >= maxResend"> (Limit reached)</span>
                    <span v-else-if="countdown > 0" class="text-secondary">Resend in {{ countdown }}s</span>
                    <a v-else href="#" @click.prevent="resendCode" class="text-primary">Resend</a>
                </div>
            </v-card>
            <!----Footer---->
            <div class="text-right mt-5 pt-5">
                <v-btn @click="backLogin" variant="plain" density="compact"
                    class="no-effect px-0 text-dark op-1 text-h6 " min-width="auto" :ripple="false">
                    {{ t('Sign in') }}!
                </v-btn>
            </div>
            <!-------->
        </div>
    </v-card>
</template>