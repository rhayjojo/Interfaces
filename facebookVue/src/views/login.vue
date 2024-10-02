<template>
  <div class="flex items-center justify-center min-h-screen ">
    <div class="m-9 grid grid-cols-1 md:grid-cols-2 md:gap-0 w-full max-w-5xl">
      <div class="hidden md:block">
        <img
            class="w-full h-full object-cover shadow-xl shadow-indigo-950/100"
            alt="calender"
            src="https://media.istockphoto.com/id/1279922227/es/foto/el-primer-plano-del-calendario-y-el-reloj-despertador-en-la-mesa-azul-la-planificaci%C3%B3n-para-la.jpg?s=612x612&w=0&k=20&c=eB1yqz2URl_fEPnaKfJxSL07c7r8KlGtfPVwGO4uqxs="
        />
      </div>
      <form data-test="loginForm" @submit.prevent="handleSubmit" id="login-form" class="w-full p-10 mx-auto items-center text-center shadow-lg shadow-indigo-500/40  bg-gray-200">
        <h1 class="text-xl text-blue-700 font-bold">{{ title }}</h1>
        <div   v-if="errorMessage !=='' " class="text-red-700 p-2 border border-gray-300 rounded">
          <p data-test="errormessage">{{ errorMessage }}</p>
        </div>
        <div class="block gap-4 mt-4">

          <InputText data-test="inputFirstname" :field-id="firstname" :field-name="firstname" :placeholder="placeholderFirstname" :errormessage="v$.firstName.$error ? v$.firstName.$errors[0].$message : ''" v-model="state.firstName" />

          <InputPassWord  data-test="inputPassWord" :field-id="password" :field-name="password" :placeholder="placeholderPassword"  :errormessage="v$.password.$error ? v$.password.$errors[0].$message: '' " v-model="state.password"></InputPassWord>
        </div>

        <button-submit data-test="submit-login">{{ login }}</button-submit>
        <router-link data-test="forgetPassWord" to="forgetPassWord" class="text-blue-500 text-xs hover:underline decoration-1">{{ forgetPassWord }}</router-link>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputPassWord from '@/components/InputPassWord.vue';
import { helpers, minLength, required } from "@vuelidate/validators";
import { computed, reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { useRouter } from 'vue-router';
import {useI18n} from "vue-i18n";
import InputText from "@/components/inputText.vue";
import ButtonSubmit from "@/components/ButtonSubmit.vue";

const hasSymbol = helpers.regex(/[!@#\$%\^\&*\)\(+=._-]+/);
const state = reactive({
  firstName: '',
  password: '',
});
const { t } = useI18n();
const firstname = ref('firstname')
const password = ref('password')

const rules = computed(() => ({
  firstName: {
    required: helpers.withMessage(t('message.firstNameRequired'), required),
    minLength: helpers.withMessage(t('message.firstNameMinLength'), minLength(4))
  },
  password: {
    required: helpers.withMessage(t('message.passwordRequired'), required),
    minLength: helpers.withMessage(t('message.passwordMinLength'), minLength(6)),
    pattern: helpers.withMessage(t('message.passwordInvalid'), hasSymbol)
  },
}));

const v$ = useVuelidate(rules, state);
const router = useRouter();
const errorMessage = ref('')
const title = t('message.titleLogin')
const login =t('message.login')
const forgetPassWord = t('message.forgetPassWord')
const placeholderFirstname =t('message.placeholderFirstname')
const placeholderPassword = t('message.placeholderPassword')

const handleSubmit = async (): Promise<void> => {
  const result = await v$.value.$validate();
  if (!result) {
    console.log('Validation failed');
  } else {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser.firstName === state.firstName && storedUser.password === state.password) {
      console.log('Login successful');
      await router.push('/home');
      errorMessage.value = '';
    } else {
      console.log(storedUser);
      errorMessage.value = t('message.errorMessage');
    }
  }
};
</script>
