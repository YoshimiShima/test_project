<script lang="ts" setup>
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  FormItemRule,
  FormInst,
  FormValidationError,
  NTable,
  useMessage,
  FormRules
} from 'naive-ui';
import Query from '../apollo/Query.gql'
import InsertModel from '../apollo/InsertModel.gql'
import UpdateModel from '../apollo/UpdateModel.gql'
// import { Script } from 'zhead';


interface ModelType {
  id: string | null;
  name: string | null;
  email: string | null;
  mobile: string | null;
  age: string | null;
}

const models = ref([])

const ModelInput = ref<ModelType> ({
  id: '',
  name: '',
  email: '',
  mobile: '',
  age: ''
});

const formRef = ref<FormInst | null>(null)
const message = useMessage()

const rules: FormRules = {
  id:[
    {
      validator (rule: FormItemRule, value:string) {
        const regex = /^[1-9]\d*$/;
        if (!value) {
          return new Error('id is required');
        } else if (!regex.test(value)) {
          return new Error('ID only numbers, and 0 is not allowed at the beginning');
        } else {
          return true;
        }
      },
      trigger: 'blur'
    }
  ],
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
  age:[
    {
      validator (rule: FormItemRule, value: string) {
        const regex = /^(1[89]|[2-9][0-9])$/;
        if (!value) {
          return new Error('age is required');
        } else if (!regex.test(value)) {
          return new Error('Only individuals aged 18 to 99 can register');
        } else {
          return true;
        }
      },
      trigger: 'blur'
    }
  ],
};
const load_data = (async() => {
  const { data } = await useAsyncQuery(Query)
  if(data.value?.models){
    models.value = data.value.models
  }
})

const { mutate } = useMutation(InsertModel)

const save = (async () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log(errors);
      message.success('Valid')
    } else {
      console.log(errors);
      message.error('Invalid')
    }
  })
  const result = await mutate({ data: ModelInput.value })
  console.log("result", result)
});

// const submitForm = () => {
//   formRef.value?.validate((errors) => {
//     if (!errors) {
//       console.log(errors);
//       message.success('Valid')
//     } else {
//       console.log(errors);
//       message.error('Invalid')
//     }
//   });
// };

</script>

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
<div>
  <h1>Input Form</h1>
  <NForm ref="formRef" :model="ModelInput" :rules="rules">
    <NFormItem label="id" path="id" required>
      <NInput v-model:value="ModelInput.id" placeholder="input your id number"></NInput>
    </NFormItem>
    <NFormItem label="name" path="name" required>
      <NInput v-model:value="ModelInput.name" placeholder="input your full name"></NInput>
    </NFormItem>
    <NFormItem label="email" path="email" required>
      <NInput v-model:value="ModelInput.email" placeholder="input your email"></NInput>
    </NFormItem>
    <NFormItem label="mobile-phone" path="mobile" required>
      <NInput v-model:value="ModelInput.mobile" placeholder="input your mobile phone number without hyphens"></NInput>
    </NFormItem>
    <NFormItem label="age" path="age" required>
      <NInput v-model:value="ModelInput.age" placeholder="Input your age"></NInput>
    </NFormItem>
      <NButton type="primary" @click="save"> save</NButton>
  </NForm>
<div>
  <h2>Users</h2>
  <NButton type="primary" dashed @click='load_data()'>show</NButton>
  <NTable :bordered="true" :single-line="true">
    <thead>
      <tr>
        <th>ID</th>
        <th>NAME</th>
        <th>EMAIL</th>
        <th>MOBILE NUMBER</th>
        <th>AGE</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(model,index) in models">
        <td>{{ model.id }}</td>
        <td>{{ model.name }}</td>
        <td>{{ model.email }}</td>
        <td>{{ model.mobile }}</td>
        <td>{{ model.age }}</td>
      </tr>
    </tbody>
  </NTable>
</div>
</div>
  </template>

<style>
.NInput {
  width: 200px;
}
</style>