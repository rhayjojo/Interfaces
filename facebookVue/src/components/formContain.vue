<template>
  <RouterView />
  <div class="m-9">
    <div></div>
    <form @submit.prevent="handleSubmit" class="w-full p-10 mx-auto mt-10 items-center text-center shadow-lg shadow-indigo-500/50 ">
      <h1 class="text-xl text-blue-700 font-bold font-sans">Register to task_Manage</h1>
      <div class="block gap-2.5">
        <InputFirstName  v-model="state.firstName" class=""/>
        <small  class="text-red-700 m-0"  v-if="v$.firstName.$error">{{ v$.firstName.$errors[0].$message }}</small>

        <InputLastName   v-model="state.lastName"/>
        <small class="text-red-700" v-if="v$.lastName.$error">{{ v$.lastName.$errors[0].$message }}</small>

        <InputAgeUser @updateBirthDay="handleBirthDayChange"/>

        <!--        <ListBoxSelectCivility @updateCivility="handleCivilityChange" />-->



        <InputMail  v-model="state.email"/>
        <small class="text-red-700" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</small>

        <InputPassWord  v-model="state.password"></InputPassWord>
        <small class="text-red-700" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</small>

        <ConfirmInput  v-model="state.confirmPassword"/>
        <small class="text-red-700" v-if="v$.confirmPassword.$error ">{{ v$.confirmPassword.$errors[0].$message }}</small>
      </div>


      <buttonRegister ></buttonRegister>
      <router-link class='text-blue-500 text-xs underline decoration-1' to="/login">login</router-link>
    </form>
  </div>
</template>

<script setup lang="ts">
import InputFirstName from "@/components/inputFirstName.vue";
import InputLastName from "@/components/InputLastName.vue";
import InputAgeUser from "@/components/InputAgeUser.vue";
import InputMail from './InputMail.vue';
import InputPassWord from '@/components/InputPassWord.vue';
import ConfirmInput from '@/components/ConfirmInput.vue';
import buttonRegister from '@/components/buttonRegister.vue';
import ListBoxSelectCivility from "@/components/listBoxSelectCivility.vue";
import { helpers } from '@vuelidate/validators';
import { reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, sameAs } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import axios from "axios";



const { t } = useI18n();
const hasSymbol = helpers.regex(/[!@#\$%\^\&*\)\(+=._-]+/);



const state = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  birthDay: {
    day: 1,
    year: 1980,
    month: 'Jan'
  }
});

// const handleCivilityChange = (value) => {
//   state.selectedCivility = value
// }
const handleBirthDayChange = (value) => {
  state.birthDay = value;
};
const rules = computed(() =>{
  return{
    firstName:{ required, minLength:minLength(4) },
    lastName:{ required, minLength:minLength(4) },
    email: { required, email },
    password: { required, minLength:minLength(6), pattern:helpers.withMessage('Password must contain at least one special symbol', hasSymbol) },
    confirmPassword: { required, sameAs: sameAs(state.password) }
  }
})
const v$ = useVuelidate(rules, state);



const handleSubmit = async(): Promise<void> => {
  const result = await v$.value.$validate();
  if (!result) {
    console.log('Le formulaire contient des erreurs');
  } else {
    localStorage.setItem('user', JSON.stringify(state))
    router.push('/home')

    // axios.post('https://jsonplaceholder.typicode.com/posts', state)
    //     .then(response => {
    //
    //       state.id = response.data.id; // Mise à jour correcte de state
    //       console.log('Success:', response.data);
    //     })
    //     .catch(error => {
    //       console.error("There was an error!", error);
    //     });
  }
};

</script>
