import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import axios from '@/utils/axios'

export const useRegisterForm = () => {
    const { t } = useI18n()

    const schema = yup.object({
        name: yup
            .string()
            .required(t('กรุณากรอกชื่อ')),
        tel: yup
            .string()
            .required(t('กรุณากรอกเบอร์โทร'))
            .matches(/^0[689]\d{8}$/, t('เบอร์โทรศัพท์ไม่ถูกต้อง')),
        password: yup
            .string()
            .required('กรุณากรอกรหัสผ่าน')
            .matches(
                /^[A-Za-z](?=.*\d)[A-Za-z\d]{7,}$/,
                'รหัสผ่านต้องขึ้นต้นด้วยตัวอักษร มีอย่างน้อย 1 ตัวเลข และมีความยาวขั้นต่ำ 8 ตัวอักษร'
            ),
    })

    const { handleSubmit, errors, meta, resetForm } = useForm({
        validationSchema: schema,
        initialValues: {
            name: '',
            tel: '',
            password: '',
        },
    })

    const { value: name } = useField<string>('name')
    const { value: tel } = useField<string>('tel')
    const { value: password } = useField<string>('password')

    const submitRegister = handleSubmit(async (formData) => {
        try {
            const res = await axios.post('/api/register', {
                name: name.value,
                tel: tel.value,
                password: password.value,
            })
            return res.data
        } catch (err: any) {
            console.error('❌ สมัครล้มเหลว:', err.response?.data?.message || err.message)
            throw err
        }
    })

    const validateRegister = handleSubmit(() => true, () => false)

    return {
        name,
        tel,
        password,
        errors,
        meta,
        submitRegister,
        validateRegister,
        resetForm
    }
}
