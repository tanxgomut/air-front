<script setup lang="ts">
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

/*change password*/
// password
const currentPwd = ref('')

const { $toast } = useNuxtApp();
function notify() {
    $toast.success('success!')
}

// 2) Define Yup schema
const schema = yup.object({
    newPwd: yup
        .string()
        .required('New password is required')
        .matches(
            /^[A-Za-z](?=.*\d)[A-Za-z\d]{7,}$/,
            'Must start with a letter, include letters+numbers, min 8 chars'
        ),
    confirmPwd: yup
        .string()
        .oneOf([yup.ref('newPwd')], 'Passwords must match')
        .required('Please confirm your password'),
})

// 3) Setup useForm without <Form>
const { validate, resetForm, meta } = useForm({ validationSchema: schema })
// 4) Setup each field for manual binding
const { value: newPwd, errorMessage: newPwdError } = useField<string>('newPwd')
const { value: confirmPwd, errorMessage: confirmPwdError } = useField<string>('confirmPwd')

// 5) Confirm button handler
async function onConfirm() {
    const isValid = await validate()
    if (!isValid) return
    // All valid → proceed
}


</script>

<template>
    <v-card elevation="10">
        <v-row class="ma-sm-n2 ma-n1">
            
            <v-col cols="12" sm="12">
                <v-card elevation="0">
                   
                        <h5 class="text-h5">Change Password</h5>
                        <div class="text-subtitle-1 text-medium-emphasis mt-2">To change your password please confirm
                            here</div>
                        <div class="mt-5">
                            <v-label class="mb-2 font-weight-medium">Current Password</v-label>
                            <v-text-field v-model="currentPwd" type="password" variant="outlined" color="primary" />
                            <v-label class="mb-2 font-weight-medium">New Password</v-label>
                            <v-text-field v-model="newPwd" type="password" variant="outlined" color="primary"
                                :error-messages="newPwdError ? [newPwdError] : []" />
                            <v-label class="mb-2 mt-2 font-weight-medium">Confirm Password</v-label>
                            <v-text-field v-model="confirmPwd" type="password" variant="outlined" color="primary"
                                :error-messages="confirmPwdError ? [confirmPwdError] : []" />
                        </div>
                 
                    <v-card-actions class="justify-end mt-6">
                        <v-btn color="primary" variant="text" @click="onConfirm" :disabled="!meta.valid || !currentPwd">
                            Confirm
                        </v-btn>
                        <v-btn color="error" variant="text" @click="resetForm(), currentPwd = ''">
                            reset
                        </v-btn>
                    </v-card-actions>
                    <!-- <v-col>
                        <div class="d-flex justify-end ">
                            <v-btn size="small" color="primary" @click="showDialog = true" class="mr-4"
                                flat>confirm</v-btn>
                        </div>
                    </v-col> -->
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>
