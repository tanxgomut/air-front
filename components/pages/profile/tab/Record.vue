<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { TrashIcon } from 'vue-tabler-icons';

const store = ref([
    {
        id: 4,
        name: 'Daniel Kristeen',
        phone: '0647898524',
        status: 'ดำเนินการสำเร็จ',
        color: 'success',
        title: [{
            typeAir: 'แอร์สี่ทิศทาง',
            count: 2,
        }],
        typePlace: 'คอนโด',
        address: '459 / 452 ถ.สี่มุม ต.บ้านแพรว จ.กรุงเทพ 325622',
        price: '1200',
        time: '09:00 - 11:00',
        datef: '2023-06-03T23:28:56.782Z'
    }
]);

onMounted(() => {

});

const getNotes = computed(() => {
    return store.value
});

const NoteItem = getNotes;

const searchValue = ref('');
// const filteredNotes = computed(() => {
//     return NoteItem.value.filter((note) => {
//         return note.title?.toLowerCase().includes(searchValue.value.toLowerCase());
//     });
// });
</script>
<template>
    <div class="pa-0 pa-sm-0 pa-md-6">
        <!-- <h4 class="text-h6 mb-6 font-bold">In Progress</h4> -->

        <v-sheet v-for="item in store" :key="item.id"
            :class="'note-sheet rounded-xl border pa-8 mb-5 transition-all  bg-light' + item.color">
            <!-- Top Row: Name + Status -->
            <div class="flex items-start justify-between mb-4">
                <div>
                    <h2 class="text-h5 ">คุณ {{ item.name }}</h2>
                    <p class="text-subtitle-1 text-muted">{{ item.phone }}</p>
                </div>
                <div class="text-sm font-medium px-3 py-1 rounded-full" :class="{
                    'bg-green-100 text-green-700': item.color === 'success',
                }">
                    {{ item.status }}
                </div>
            </div>

            <!-- Title: List of air types -->
            <div class="mb-4 space-y-1">
                <div v-for="(air, idx) in item.title" :key="idx" class="text-sm text-muted">
                    ✅ {{ air.typeAir }} <span class="ml-2 text-muted">x{{ air.count }}</span>
                </div>
            </div>

            <!-- Address & Type -->
            <div class="flex justify-between items-center text-sm text-muted mb-2">
                <div>
                    <span class="font-medium text-dark">ที่อยู่:</span> {{ item.address }}
                </div>
                <div>
                    <span class="font-medium text-dark">สถานที่:</span> <v-chip color="">{{ item.typePlace }}</v-chip>
                </div>
            </div>

            <!-- Date & Time -->
            <div class="text-sm text-muted flex justify-between items-center mb-1">
                <span>🗓 {{ new Date(item.datef).toLocaleDateString() }}</span>
                <span>🕒 {{ item.time }}</span>
            </div>

            <!-- Price + Actions -->
            <div class="flex justify-end items-center mt-3">
                <div class="text-h3 font-semibold text-error">฿ {{ item.price }}</div>
            </div>
        </v-sheet>

        <!-- If no data -->
        <div v-if="store.length === 0" class="text-center mt-10">
            <v-alert type="error" title="Oops" text="ไม่พบรายการ"></v-alert>
        </div>
    </div>
</template>
<style lang="scss">
.note-sheet {
    transition: 0.1s ease-in;

    &:hover {
        transform: scale(1.02);
    }
}
</style>
