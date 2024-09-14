<template>
    <RouterView />
    <div>
      <div>
        <p v-if="errorMessageEmail" style="color: red;">{{ errorMessageEmail }}</p>
        <p v-if="errorMessagePassword" style="color: red;">{{ errorMessagePassword }}</p>
        <p v-if="errorMessagePassword" style="color: red;">{{ errorMessagePassword }}</p>
        <p v-if="errorMesageConfirmPassword" style="color: red;">{{ errorMesageConfirmPassword }}</p>
      </div>
      <form action="" @submit.prevent="submiteForm">
        <InputUsername @event-username="getUserName"/>
        <InputCivilite />
        <InputMail :errorMessageEmail="errorMessageEmail" @event-email="gerEmail"/>
        <InputPassWord @event-password="gerPassWord"/>
        <ConfirmInput :errorMesageConfirmPassword="errorMesageConfirmPassword" @event-confirmPw="gerPassWordConfirm" />
        <buttonRegister @event-register="validatePassword"/>
        <router-link to="/forgetPassWord" >forgot password ?</router-link>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import buttonRegister from './buttonRegister.vue';
  import InputCivilite from './InputCivilite.vue';
  import InputUsername from '@/components/InputUsername.vue';
  import InputPassWord from '@/components/InputPassWord.vue';
  import ConfirmInput from '@/components/ConfirmInput.vue';
  import InputMail from './InputMail.vue';
  import { ref, watch } from 'vue';
  import type { Ref } from 'vue'

  
  const username: Ref<string> = ref('');
  const email: Ref<string> = ref('');
  const errorMessageEmail : Ref<string> = ref('');
  const password : Ref<string> = ref('')
  const passwordConfirm : Ref<string> = ref('')
  const isCorrectPassword : Ref<boolean> = ref(true)
  const errorMessagePassword = ref ('')
  const errorMesageConfirmPassword : Ref<string> = ref('')
  
  const getUserName = (usernameInput : string) => {
    username.value = usernameInput
  } 
  const gerEmail = (emailInputComponent : string) =>{
    email.value = emailInputComponent
  }
  const gerPassWord = (passwordInputComponent : string) =>{
    password.value = passwordInputComponent
  }
  const gerPassWordConfirm = (passwordInputComponentConfirm : string) =>{
    passwordConfirm.value = passwordInputComponentConfirm
  }
  const validatePassword = () => {
    
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,6}$/
    
    if(!emailRegex.test(email.value)){
      errorMessageEmail.value = 'Incorrect email address'
      isCorrectPassword.value = false
    }else if(password.value.length < 6){
      errorMessageEmail.value = ''
      errorMessagePassword.value = 'Password must contain at least 6 characters.'
      isCorrectPassword.value = false
    }else if(!symbolRegex.test(password.value)){
      errorMessagePassword.value = 'assword must contain at least one symbol.'
      isCorrectPassword.value = false
    }else if(passwordConfirm.value !== password.value){
      errorMessagePassword.value =''
      errorMesageConfirmPassword.value = 'Passwords do not match'
      isCorrectPassword.value = false
    }else{
      isCorrectPassword.value = true
      errorMesageConfirmPassword.value = ''
    }
  }

  const submiteForm = () =>{
    if(isCorrectPassword.value === true){
      
    }
  }

  </script>
  
  <style scoped>
  
  </style>