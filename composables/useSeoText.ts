export const useSeoText = () => {
    const { t } = useI18n()

    function setTitle(title: string) {
        return  `${title} - จองคิวล้างแอร์ออนไลน์ - AirCleanPro`
    }

    const description = 'บริการล้างแอร์ทั่วกรุงเทพฯ โดยทีมช่างมืออาชีพ รับประกันความสะอาด จองคิวออนไลน์ได้ทันที'

    return { setTitle, description }
}
