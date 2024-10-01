<template>
  <RouterView />
  <div class="flex items-center justify-center min-h-screen overflow-hidden lg:mt-[-30px]">
    <div class="m-9 grid grid-cols-1 md:grid-cols-2 md:gap-0 w-full max-w-5xl">
      <div class="hidden md:block">
        <img
            class="w-full h-full object-cover shadow-xl shadow-indigo-950/100"
            alt="calender"
            src="https://media.istockphoto.com/id/1279922227/es/foto/el-primer-plano-del-calendario-y-el-reloj-despertador-en-la-mesa-azul-la-planificaci%C3%B3n-para-la.jpg?s=612x612&w=0&k=20&c=eB1yqz2URl_fEPnaKfJxSL07c7r8KlGtfPVwGO4uqxs="
        />
      </div>
      <form @submit.prevent="handleSubmit" class="w-full p-8 mx-auto text-center shadow-xl shadow-indigo-950/100 md:w-full md:max-w-md bg-gray-200">
        <h1 class="text-xl text-blue-700 font-bold">{{ title }}</h1>
        <div class="block gap-4 mt-4">
          <InputFirstName :errormessage="v$.firstName.$error" v-model="state.firstName" />
          <small data-test="firstName" class="text-red-700" v-if="v$.firstName.$error">{{ v$.firstName.$errors[0].$message }}</small>

          <InputLastName  :errormessage="v$.lastName.$error" v-model="state.lastName" />
          <small data-test="lastName" class="text-red-700" v-if="v$.lastName.$error">{{ v$.lastName.$errors[0].$message }}</small>

          <InputAgeUser @updateBirthDay="handleBirthDayChange" />

          <InputMail :errormessage="v$.email.$error" v-model="state.email" />
          <small data-test="email" class="text-red-700" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</small>

          <InputPassWord :errormessage="v$.password.$error" v-model="state.password"></InputPassWord>
          <small data-test="password" class="text-red-700" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</small>

          <ConfirmInput :errormessage="v$.confirmPassword.$error" v-model="state.confirmPassword" />
          <small data-test="confirmPassword" class="text-red-700" v-if="v$.confirmPassword.$error">{{ v$.confirmPassword.$errors[0].$message }}</small>
        </div>

        <buttonRegister class="mt-4"></buttonRegister>

        <router-link id="login-link" to="/login">
          <div class="text-blue-500 text-xs hover:underline mt-2">
            <p>Login</p>
          </div>
        </router-link>
      </form>
    </div>
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
import { useRouter } from 'vue-router';




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


const handleBirthDayChange = (value) => {
  state.birthDay = value;
};
const rules = computed(() => {
  return {
    firstName: {
      required: helpers.withMessage(t('message.firstNameRequired'), required),
      minLength: helpers.withMessage(t('message.firstNameMinLength'), minLength(4))
    },
    lastName: {
      required: helpers.withMessage(t('message.lastNameRequired'), required),
      minLength: helpers.withMessage(t('message.lastNameMinLength'), minLength(4))
    },
    email: {
      required: helpers.withMessage(t('message.emailRequired'), required),
      email: helpers.withMessage(t('message.emailInvalid'), email)
    },
    password: {
      required: helpers.withMessage(t('message.passwordRequired'), required),
      minLength: helpers.withMessage(t('message.passwordMinLength'), minLength(6)),
      pattern: helpers.withMessage(t('message.passwordInvalid'), hasSymbol)
    },
    confirmPassword: {
      required: helpers.withMessage(t('message.confirmPasswordRequired'), required),
      sameAs: helpers.withMessage(t('message.confirmPasswordInvalid'), sameAs(state.password))
    }
  };
});
const v$ = useVuelidate(rules, state);
const router = useRouter();
const title = t('message.titleRegister')

const handleSubmit = async(): Promise<void> => {
  const result = await v$.value.$validate();
  if (!result) {
    console.log('the form has some errors');
  } else {
      localStorage.setItem('user', JSON.stringify(state));
      await router.push('/login');

    // axios.post('http://localhost:8080/RegisterUser', state)
    //     .then(response => {
    //
    //       state.id = response.data.id;
    //       console.log('Success:', response.data);
    //     })
    //     .catch(error => {
    //       console.error("There was an error!", error);
    //     });
  }
};

</script>
