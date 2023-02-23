<template>
<!-- //- NForm(ref='formRef', :model='model', :rules='rules')
//-   NFormItem(label='name', path='name', required='')
//-     NInput(v-model:value='model.name', placeholder='input your full name', width='200px')
//-   NFormItem(label='email', path='email', required='')
//-     NInput(v-model:value='model.email', placeholder='input your email')
//-   NFormItem(label='mobile-phone', path='mobile', required='')
//-     NInput(v-model:value='model.mobile', placeholder='input your mobile phone number without hyphens')
//-   NFormItem(label='birthday', path='birthDate', required='')
//-     NDatePicker(v-model:value='model.birthDate', type='date', placeholder='choose your birthday')
//-   NButton(type='primary', @click='submitForm')| send -->

  <NForm ref="formRef" :model="model" :rules="rules">
      <NFormItem label="name" path="name" required>
          <NInput v-model:value="model.name" placeholder="input your full name" width="200px"></NInput>
      </NFormItem>
      <NFormItem label="email" path="email" required>
          <NInput v-model:value="model.email" placeholder="input your email"></NInput>
      </NFormItem>
      <NFormItem label="mobile-phone" path="mobile" required>
          <NInput v-model:value="model.mobile" placeholder="input your mobile phone number without hyphens"></NInput>
      </NFormItem>
      <NFormItem label="birthday" path="birthDate" required>
          <NDatePicker v-model:value="model.birthDate" type="date" placeholder="choose your birthday"></NDatePicker>
      </NFormItem>
      <NButton type="primary" @click="submitForm"> send</NButton>
  </NForm>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  FormInst,
  NForm,
  NFormItem,
  NInput,
  NDatePicker,
  NButton,
  FormItemRule,
  FormValidationError,
  useMessage,
  FormRules
} from 'naive-ui';

const formRef = ref<FormInst | null>(null)
const message =useMessage()
interface ModelType {
  name: string | null
  email: string | null
  mobile: string | null
  birthDate: number| null
}

const model = ref<ModelType>({
  name: null,
  email: null,
  mobile: null,
  birthDate: null
})

const rules: FormRules = {
  name:[
    {
      validator (rule: FormItemRule, value: string) {
        const regex = /^[a-zA-Z0-9][a-zA-Z0-9._-]{1,18}[a-zA-Z0-9]$/;
        if (!value) {
          return new Error('name is required');
        } else if (!regex.test(value)) {
          return new Error('Name must be 3-20 characters, only letters, numbers, and ._- symbols are allowed, and no symbols are allowed at the beginning or end of the name');
        } else {
          return true;
        }
      },
      trigger: 'blur'
    }
  ],
  email: [
    {
      validator (rule: FormItemRule, value: string) {
        const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;;
        if (!value) {
          return new Error('email is required')
        } else if (!regex.test(value)) {
          return new Error('put valid email');
        } else {
          return true;
        }
      },
      trigger: 'blur'
    }
  ],
  mobile: [
    {
      validator (rule: FormItemRule, value: string) {
        const regex = /^0[789]0\d{8}$/;
        if (!value) {
          return new Error('mobile phone number is required')
        } else if (!regex.test(value)) {
          return new Error('mobile phone number must be started with 070, 080, or 090 and must be 11 digits');
        } else {
          return true;
        }
      },
      trigger: 'blur'
    }
  ],
  birthDate: [
  {
    required: true,
    message: 'choose your birthday',
  },
  {
    validator (rule: FormItemRule, value: Date) {
      const selectedDate = new Date(value);
      const now = new Date();
      if (selectedDate > now) {
        return new Error('Choose a date in the past or present');
      } else {
      return true;
      }
    },
    trigger: 'blur'
  }
],
};

const submitForm = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log(errors);
      message.success('Valid')
    } else {
      console.log(errors);
      message.error('Invalid')
    }
  });
};
</script>

<style>
.NInput {
  width: 200px;
}
</style>