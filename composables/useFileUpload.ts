import { ref } from 'vue'

interface UploadedFile {
    file: File
    preview: string
}

export const useFileUpload = () => {
    const images = ref<UploadedFile[]>([])
    const image = ref<UploadedFile | null>(null)
    const errorMessage = ref<string>('')

    const handleFileUpload = (type: 'multi' | 'single', event: Event) => {
        const files = (event.target as HTMLInputElement).files
        if (!files) return

        const validTypes = ['image/jpeg', 'image/png']
        const maxSize = 1024 * 100000 // 1000 KB

        Array.from(files).forEach((file) => {
            if (!validTypes.includes(file.type)) {
                errorMessage.value = 'เฉพาะไฟล์ JPG หรือ PNG เท่านั้น'
                return
            }

            if (file.size > maxSize) {
                errorMessage.value = 'ขนาดไฟล์ต้องไม่เกิน 500KB'
                return
            }

            const preview = URL.createObjectURL(file)
            const uploaded = { file, preview }

            if (type === 'multi') {
                images.value.push(uploaded)
            } else if (type === 'single') {
                image.value = uploaded
            }
        })

            ; (event.target as HTMLInputElement).value = ''
    }

    const removeImage = (index: number) => {
        images.value.splice(index, 1)
    }

    const clearAll = () => {
        images.value = []
        image.value = null
    }

    return {
        images,
        image,
        errorMessage,
        handleFileUpload,
        removeImage,
        clearAll,
    }
}
