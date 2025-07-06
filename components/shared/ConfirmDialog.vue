<script setup lang="ts">
import { useConfirmDialog } from '@/composables/useConfirmDialog'

const { isOpen, options, confirm, cancel } = useConfirmDialog()

const { $toast } = useNuxtApp();

const iconMap: Record<string, string> = {
  info: 'mdi-information',
  success: 'mdi-check-circle',
  error: 'mdi-close-circle',
  warning: 'mdi-alert-circle',
}

const iconColorMap: Record<string, string> = {
  info: 'info',
  success: 'success',
  error: 'error',
  warning: 'warning',
}


function notify() {
  $toast.success('success!')
}
</script>


<template>
  <v-dialog v-model="isOpen" max-width="400" persistent>
    <v-card rounded="lg">
      <v-card-title class="d-flex text-h5 pa-4">
        <v-icon v-if="options.icon" class="align-self-center me-2" :color="iconColorMap[options.icon] || 'primary'"
          size="28">
          {{ iconMap[options.icon] || 'mdi-help-circle-outline' }}
        </v-icon>
        <p style="white-space: pre-line; word-break: break-word;">{{ options.title }}</p>
      </v-card-title>
      <v-card-text>
        {{ options.message }}
      </v-card-text>
      <v-card-actions v-if="options.textOk">
        <v-btn variant="flat" class="w-100" :color="options.colorOk || 'primary'" @click="confirm">
          {{ options.textOk }}
        </v-btn>
      </v-card-actions>
      <v-card-actions v-else>
        <v-spacer />
        <v-btn :color="options.colorCancel || 'grey'" @click="cancel">
          {{ options.textCancel || 'ยกเลิก' }}
        </v-btn>
        <v-btn variant="flat" :color="options.colorConfirm || 'primary'" @click="confirm">
          {{ options.textConfirm || 'ตกลง' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>
