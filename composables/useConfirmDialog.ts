import type { alertItem } from '@/types/dialog/alert'

const isOpen = ref(false)
const options = ref()
const resolvePromise = ref<(value: boolean) => void>()


export function useConfirmDialog() {
  function showDialog(item: alertItem): Promise<boolean> {
    if (isOpen.value) return Promise.resolve(false)
    options.value = item
    isOpen.value = true

    return new Promise((resolve) => {
      resolvePromise.value = resolve
    })
  }

  function confirm() {
    isOpen.value = false
    resolvePromise.value?.(true)
  }

  function cancel() {
    isOpen.value = false
    resolvePromise.value?.(false)
  }

  return {
    isOpen,
    options,
    showDialog,
    confirm,
    cancel,
  }
}
