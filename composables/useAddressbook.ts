import { object, string } from 'yup'
import { useForm, useField } from 'vee-validate'

export const useAddressBook = () => {
  const { t } = useI18n()

  const schema = object({
    name: string()
      .required(t('กรุณากรอกชื่อ-นามสกุล'))
      .min(2, t('กรุณากรอกชื่อ-นามสกุลอย่างน้อย 2 ตัวอักษร'))
      .max(50, t('กรุณากรอกชื่อ-นามสกุลไม่เกิน 50 ตัวอักษร'))
      .matches(/^[ก-๙a-zA-Z\s]{2,50}$/, t('ชื่อ-นามสกุลต้องเป็นตัวอักษรเท่านั้น')),
    tel: string()
      .required(t('กรุณากรอกเบอร์โทร'))
      .matches(/^0[689]\d{8}$/, t('เบอร์โทรศัพท์ไม่ถูกต้อง')),
    address: string()
      .required(t('กรุณากรอกที่อยู่'))
      .min(2, t('กรุณากรอกที่อยู่อย่างน้อย 2 ตัวอักษร'))
      .max(50, t('กรุณากรอกที่อยู่ไม่เกิน 50 ตัวอักษร')),
    selectedLocation: string().required(t('กรุณาเลือกประเภทที่อยู่')),
    provinceData: object({
      province: object()
        .test('province-required', t('กรุณาเลือกจังหวัด'), v => !!v && !!v.id)
        .required(),
      district: object()
        .test('district-required', t('กรุณาเลือกอำเภอ/เขต'), v => !!v && !!v.id)
        .required(),
      subdistrict: object()
        .test('subdistrict-required', t('กรุณาเลือกตำบล/แขวง'), v => !!v && !!v.id)
        .required(),
      zipcode: object()
        .test('zipcode-required', t('กรุณาเลือกรหัสไปรษณีย์'), v => !!v && !!v.id)
        .required(),
    }).required(t('กรุณากรอกข้อมูลจังหวัด อำเภอ ตำบล แขวง และรหัสไปรษณีย์')),
  })

  const { handleSubmit, errors, meta, setFieldValue, validate, resetForm } = useForm({
    validationSchema: schema,
    initialValues: {
      name: '',
      tel: '',
      address: '',
      selectedLocation: '',
      provinceData: {
        province: {},
        district: {},
        subdistrict: {},
        zipcode: {},
      },
    },
  })

  const { value: name } = useField<string>('name')
  const { value: tel } = useField<string>('tel')
  const { value: address } = useField<string>('address')
  const { value: selectedLocation } = useField<string>('selectedLocation')
  const { value: provinceData } = useField<any>('provinceData')

  const validAddressBook = handleSubmit(() => true, () => false)

  const submitAddressBook = handleSubmit((formData) => {
    console.log('📦 AddressBook Data:', formData)
  })

  return {
    name,
    tel,
    address,
    selectedLocation,
    provinceData,
    errors,
    meta,
    submitAddressBook,
    validAddressBook,
    resetForm
  }
}
