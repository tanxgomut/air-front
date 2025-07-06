import { object, string, number, array, boolean } from 'yup'
import { useForm, useField } from 'vee-validate'
import airTypedefault from '@/_mockApis/pages/booking';


export const useBookingForm = (airTypeItem: any[]) => {
  const { t } = useI18n()

  const airType = ref<any[]>([...airTypeItem])
  const slips = ref<{ file: File; preview: string } | null>(null)
  const imagesBooking = ref<{ file: File; preview: string }[]>([])

  const schema = object({
    name: string().required(t('กรุณากรอกชื่อ')),
    tel: string()
      .required('กรุณากรอกเบอร์โทร')
       .matches(/^0[689]\d{8}$/, 'เบอร์โทรศัพท์ไม่ถูกต้อง'),
    address: string().required('กรุณากรอกที่อยู่'),
    date: string().required('กรุณาเลือกวันที่'),
    time: string().required('กรุณาเลือกช่วงเวลา'),
    selectedLocation: string().required('กรุณาเลือกประเภทที่อยู่'),
    airType: array()
      .of(
        object({
          selected: boolean().required(),
          sum: number().required(),
        })
      )
      .test(
        'at-least-one-selected-with-sum',
        'กรุณาเลือกประเภทแอร์อย่างน้อย 1 เครื่อง และกรอกจำนวนเครื่องเป็นตัวเลขมากกว่า 0',
        (value) => {
          return Array.isArray(value) && value.some(item => item.selected && item.sum > 0)
        }
      ),
  })

  const { handleSubmit, errors, meta, setFieldValue, validate, resetForm } = useForm({
    validationSchema: schema,
    initialValues: {
      name: '',
      tel: '',
      address: '',
      airType: airType.value,
      date: null,
      time: '',
      selectedLocation: '',
    },
  })

  const { value: name } = useField<string>('name')
  const { value: tel } = useField<string>('tel')
  const { value: address } = useField<string>('address')
  const { value: date } = useField<string | null>('date')
  const { value: time } = useField<string>('time')
  const { value: selectedLocation } = useField<string>('selectedLocation')

  watch(airType, (val) => {
    setFieldValue('airType', val)
  }, { deep: true }
  )

  const resetBooking = () => {
    imagesBooking.value = []
    airType.value = airTypedefault.airTypedefault
    console.log(airTypedefault.airTypedefault);
    
    resetForm()
  }

  const validBookingAir = handleSubmit(() => true, () => false)

  const submitBookingAir = handleSubmit((formData) => {
    const completeData = {
      ...formData,
      slips: slips.value,
      iamges: imagesBooking.value
    }
    console.log('📦 Booking Data:', completeData)
  })

  return {
    name,
    tel,
    address,
    date,
    time,
    selectedLocation,
    slips,
    imagesBooking,
    airType,
    errors,
    meta,
    submitBookingAir,
    validate,
    validBookingAir,
    resetBooking
  }
}
