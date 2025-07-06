<script setup>
const localePath = useLocalePath()
const { t } = useI18n()
const props = defineProps({ item: Object, level: Number });


</script>

<template>
    <!---Single Item-->
    <v-list-item :to="item.type === 'external' ? '' : localePath(item.to)"
        :href="item.type === 'external' ? localePath(item.to) : ''" :disabled="item.disabled"
        :target="item.type === 'external' ? '_blank' : ''" :ripple="false">
        <v-list-item-title>{{ t(item.title) }}</v-list-item-title>
        <!---If Caption-->
        <v-list-item-subtitle v-if="item.subCaption" class="text-caption mt-n1 hide-menu">
            {{ t(item.subCaption) }}
        </v-list-item-subtitle>
    </v-list-item>
</template>
