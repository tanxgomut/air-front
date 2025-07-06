import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'

export const useLoginForm = () => {
    const { t } = useI18n()

    const schema = yup.object({
        tel: yup
            .string()
            .required(t('กรุณากรอกเบอร์โทร'))
            .matches(/^0[689]\d{8}$/, t('เบอร์โทรศัพท์ไม่ถูกต้อง')),
        password: yup
            .string()
            .required('กรุณากรอกรหัสผ่าน')
    })

    const { handleSubmit, errors, meta , resetForm} = useForm({
        validationSchema: schema,
        initialValues: {
            tel: '',
            password: '',
        },
    })

    const { value: tel } = useField<string>('tel')
    const { value: password } = useField<string>('password')

    const submitLogin = handleSubmit(() => {
        console.log('📥 Login Data:', )
        // 👉 API 
        return true
    })

    const validateLogin = handleSubmit(() => true, () => false)

    return {
        tel,
        password,
        errors,
        meta,
        submitLogin,
        validateLogin,
        resetForm
    }
}
