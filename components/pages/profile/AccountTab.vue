<script setup lang="ts">
import { ref } from 'vue';
/*Location Select*/
const select = ref('Thailand');
const location = ref(['United States', 'United Kingdom', 'Japan', 'Thailand']);


/*change password*/
// password
const currentPwd = ref('')

/*personal detail*/
const namemodel = ref('Mathew Anderson');
const storemodel = ref('Maxima Studio');
const storemail = ref('info@modernize.com');
const storephone = ref('0647849536');
const storeaddress = ref('814 Howard Street, 120065, thailand');


const { $toast } = useNuxtApp();
function notify() {
    $toast.success('success!')
}


</script>

<template>
    <v-card elevation="10">
        <v-row class="ma-sm-n2 ma-n1">
            <v-col cols="12">
                <v-card elevation="0">

                    <h5 class="text-h5">Personal Details</h5>
                    <div class="text-subtitle-1 text-medium-emphasis mt-2">To change your personal detail , edit and
                        save from here</div>
                    <div class="mt-5">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium">Your Name</v-label>
                                <v-text-field color="primary" variant="outlined" type="text" v-model="namemodel"
                                    hide-details />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium">Location</v-label>
                                <v-select v-model="select" :items="location" item-title="state" item-value="abbr"
                                    label="Select" return-object single-line variant="outlined" hide-details></v-select>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium">Email</v-label>
                                <v-text-field color="primary" variant="outlined" type="email" v-model="storemail"
                                    hide-details></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium">Phone</v-label>
                                <v-text-field color="primary" variant="outlined" type="text" v-model="storephone"
                                    hide-details></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-label class="mb-2 font-weight-medium">Address</v-label>
                                <v-text-field color="primary" variant="outlined" type="text" v-model="storeaddress"
                                    hide-details></v-text-field>
                            </v-col>
                        </v-row>
                    </div>

                </v-card>
            </v-col>
        </v-row>
        <div class="d-flex justify-end mt-5">
            <v-btn size="large" color="primary" class="mr-4" flat>Save</v-btn>
            <v-btn size="large" class="bg-lighterror text-error" flat>Cancel</v-btn>
        </div>
    </v-card>
</template>
