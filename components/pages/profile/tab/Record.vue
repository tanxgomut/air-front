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
            price: '590',
            image: '/images/air/air-5.png',
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
    <v-card elevation="10">
        <v-row class="ma-sm-n2 ma-n1">
            <v-col cols="12" sm="12">
                <v-card elevation="0">

                    <div class="mt-5">
                        <v-row>
                            <v-col cols="12" v-for="item in store" :key="item.id">
                                <v-card elevation="0" class="border-b note-sheet">
                                    <div class="flex justify-between pr-4 ">
                                        <span class="text-h6 text-dark"> </span> <span
                                            :class="`text-sm text-${item.color}`">{{ item.status
                                            }}</span>
                                    </div>
                                    <div class="flex px-2 py-4">

                                        <!-- <div class="">
                                            <PhotoPinIcon size="30" class="text-accent mr-2" />
                                        </div> -->
                                        <div class="flex-1">
                                            <div class="text-h6">{{ item.name }} , {{ item.phone }}</div>


                                            <div v-for="(air, idx) in item.title" :key="idx"
                                                class="flex justify-between items-center text-subtitle-1 ">
                                                <NuxtImg :src="air.image" width="40" height="40" />
                                                <div class="flex-1 pl-2">
                                                    <span>{{ air.typeAir }} </span>
                                                </div>
                                                <span class="ml-2 text-accent">฿ {{ air.price }} x{{
                                                    air.count }}</span>

                                            </div>
                                            <div class="text-subtitle-1 text-muted ">วันที่ {{ new
                                                Date(item.datef).toLocaleDateString() }} เวลา {{ item.time }}</div>
                                            <div class="text-subtitle-1 mt-2">{{ item.address }}</div>

                                            <v-chip class="mt-2 text-sm" color="secondary" label>
                                                {{ item.typePlace }}
                                            </v-chip>
                                            <div class="text-end text-h6 mt-2"><span
                                                    class="text-subtitle-1 text-muted text-sm">ราคารวม : </span> ฿ {{
                                                        item.price }}
                                            </div>
                                        </div>
                                        <!-- <v-btn color="secondary" variant="text" @click.stop="">
                                            แก้ไข
                                        </v-btn> -->
                                    </div>
                                </v-card>

                            </v-col>
                        </v-row>

                    </div>
                </v-card>
            </v-col>
            <v-col cols="12">
                <div v-if="store.length === 0" class="text-center mt-10">
                    <v-alert type="error" title="Oops" text="ไม่พบรายการ"></v-alert>
                </div>
            </v-col>
        </v-row>
    </v-card>
</template>
<style lang="scss">
.note-sheet {
    transition: 0.1s ease-in;

    &:hover {
        transform: scale(1.02);
    }
}
</style>
