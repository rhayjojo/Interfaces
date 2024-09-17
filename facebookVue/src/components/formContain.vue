<template>
  <RouterView />
  <div>
    <form @submit.prevent="submitForm">
      <h1>Register to task_Manage</h1>
      <InputFirstName v-model="state.firstName"/>
      <small v-if="v$.firstName.$error && v$.firstName.$touch" style="color: red;">{{ v$.firstName.$errors[0].$message }}</small>

      <InputLastName  v-model="state.lastName"/>
      <small v-if="v$.lastName.$error && v$.lastName.$touch" style="color: red;">{{ v$.lastName.$errors[0].$message }}</small>

      <InputAgeUser v-model="state.birthDate"/>
      <small v-if="v$.birthDate.$error && v$.birthDate.$touch" style="color: red;">{{ v$.birthDate.$errors[0].$message }}</small>

      <InputMail  v-model="state.email"/>
      <small v-if="v$.email.$error && v$.email.$touch" style="color: red;">{{ v$.email.$errors[0].$message }}</small>

      <InputPassWord  v-model="state.password"></InputPassWord>
      <small v-if="v$.password.$error && v$.password.$touch" style="color: red;">{{ v$.password.$errors[0].$message }}</small>

      <ConfirmInput  v-model="state.confirmPassword"/>
      <small v-if="v$.confirmPassword.$error && v$.confirmPassword.$touch" style="color: red;">{{ v$.confirmPassword.$errors[0].$message }}</small>

      <buttonRegister />
      <router-link to="/forgetPassWord">forgot password ?</router-link>
    </form>
  </div>
</template>

<script setup lang="ts">const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
import InputFirstName from "@/components/inputFirstName.vue";
import InputLastName from "@/components/InputLastName.vue";
import InputAgeUser from "@/components/InputAgeUser.vue";
import InputMail from './InputMail.vue';
import InputPassWord from '@/components/InputPassWord.vue';
import ConfirmInput from '@/components/ConfirmInput.vue';
import buttonRegister from './buttonRegister.vue';

import {ref, reactive } from 'vue';
import type { Ref } from 'vue'
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, maxLength } from '@vuelidate/validators';


const state = reactive({
  firstName: '',
  lastName: '',
  birthDate: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const rules = {
  firstName: { required, minLength: minLength(4), maxLength: maxLength(20) },
  lastName: { required, minLength: minLength(4), maxLength: maxLength(20) },
  birthDate: { required },
  email: { required, email },
  password: { required },
  confirmPassword: { required }
};

const v$ = useVuelidate(rules, state);

const submitForm = async () => {
  const isValid = await v$.$validate();
  if (isValid) {
    v$.$touch();
    console.log('Form is valid');
  } else {
    console.log('Form is invalid');
  }
};
</script>

