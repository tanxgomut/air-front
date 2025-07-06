<script setup lang="ts">
import { useRegisterForm } from '@/composables/useRegisterForm'
const { t } = useI18n()
const localePath = useLocalePath()
import logo from '@/layouts/logo/WhiteLogoIcon.vue';

const { name, tel, password, errors, submitRegister, validateRegister, resetForm } = useRegisterForm()

const RegisterDialog = ref(false);

watch(RegisterDialog, (val) => {
    if (!val) resetForm()
})

const onRegister = async () => {
    try {
        const isValid = await validateRegister()
        if (!isValid) return
        
        const data = await submitRegister()
        console.log('📦 รับค่ากลับ:', data)

        RegisterDialog.value = false
    } catch (err) {
        console.error('❌ สมัครไม่สำเร็จ:', err)
    }
}
</script>
<template>
    <v-btn color="primary" class="ms-3 sticky-border d-lg-flex d-none" variant="flat" @click="RegisterDialog = true">{{
        t('Register') }}</v-btn>
    <v-dialog v-model="RegisterDialog" max-width="450">
        <v-card>
            <div class="px-md-12 px-6 pt-md-15 pb-8">
                <!----Header---->
                <div class="text-center mb-6 ">
                    <logo />
                    <h4 class="text-h4 text-dark font-weight-bold mt-5 mb-sm-7 mb-4">{{ t('Register your account') }}
                    </h4>
                </div>
                <!---------->
                <v-form @submit.prevent="onRegister" class="project-form">
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
                            type="password" density="comfortable" :placeholder="t('Password')" color="primary"
                            elevation="0" class="custom-placeholer-color" />
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
                <!----Footer---->
                <div class="text-right mt-5 pt-5">
                    <v-btn @click="RegisterDialog = false" variant="plain" density="compact"
                        class="no-effect px-0 text-dark op-1 text-h6 " min-width="auto" :ripple="false">
                        {{ t('Got it, thanks!') }}
                    </v-btn>
                </div>
                <!-------->
            </div>
        </v-card>
    </v-dialog>
    </template>