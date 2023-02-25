<script lang="ts" setup>
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NSpace,
  // FormItemRule,
  // FormInst,
  // FormValidationError,
  NTable,
  useMessage,
  // FormRules
} from 'naive-ui';
import Query from '../apollo/Query.gql'
import InsertUser from '../apollo/InsertUser.gql'
import UpdateUser from '../apollo/UpdateUser.gql'
import DeleteUser from '../apollo/DeleteUser.gql'
// import { Script } from 'zhead';


interface UserType {
  id: string | null;
  name: string | null;
  email: string | null;
  mobile: string | null;
  age: string | null;
}

const users = ref([])

const UserInput = ref<UserType> ({
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
  if(data.value?.users){
    users.value = data.value.users
  }
})

const { mutate: insertUser } = useMutation(InsertUser)
const save_user = (async () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log(errors);
      message.success('Valid')
    } else {
      console.log(errors);
      message.error('Invalid')
    }
  })
  const insertResult = await insertUser({ data: UserInput.value })
  console.log("insert result", insertResult)
});

const { mutate: updateUser } = useMutation(UpdateUser)
const update_user = (async () => {
  const updateResult = await updateUser({ data: UserInput.value })
});

const { mutate: deleteUser } = useMutation(DeleteUser);
// const delete_user = async (user) => {
//   console.log(DeleteUser.value)
//   const deleteResult = await deleteUser({ variables: { id: user.id } })
//   console.log("delete result", deleteResult)
// }

// async function handleDeleteUser(id: number) {
//   const result = await deleteUser({
//     variables: { id },
//   });
// }
const delete_user = async (user) => {
  const deleteResult = await deleteUser({
    variables: { id: user.value.id }
  })
  console.log("delete result", deleteResult)
}


</script>

<template lang="pug">
.inputForm
  h1 Input Form
  NForm(ref='formRef', :model='UserInput', :rules='rules')
    NFormItem(label='id', path='id', required='')
      NInput(v-model:value='UserInput.id', placeholder='input your id number')
    NFormItem(label='name', path='name', required='')
      NInput(v-model:value='UserInput.name', placeholder='input your name')
    NFormItem(label='email', path='email', required='')
      NInput(v-model:value='UserInput.email', placeholder='input your email')
    NFormItem(label='mobile-phone', path='mobile', required='')
      NInput(v-model:value='UserInput.mobile', placeholder='input your mobile phone number without hyphens')
    NFormItem(label='age', path='age', required='')
      NInput(v-model:value='UserInput.age', placeholder='Input your age')
  .nButton
    NButton(type='primary', @click='save_user')  save
    NButton(type='warning', @click='update_user')  update
    NButton(type='error', @click='() => delete_user(users)')  delete

.resultView
  h1 Users
  NButton(type='primary', dashed='', @click='load_data()') show
  NTable(:bordered='true', :single-line='true')
    thead
      tr
        th ID
        th NAME
        th EMAIL
        th MOBILE NUMBER
        th AGE
    tbody
      tr(v-for='(user,index) in users')
        td {{ user.id }}
        td {{ user.name }}
        td {{ user.email }}
        td {{ user.mobile }}
        td {{ user.age }}
//- <div>
//-   <h1>Input Form</h1>
//-   <NForm ref="formRef" :model="UserInput" :rules="rules">
//-     <NFormItem label="id" path="id" required>
//-       <NInput v-model:value="UserInput.id" placeholder="input your id number"></NInput>
//-     </NFormItem>
//-     <NFormItem label="name" path="name" required>
//-       <NInput v-model:value="UserInput.name" placeholder="input your full name"></NInput>
//-     </NFormItem>
//-     <NFormItem label="email" path="email" required>
//-       <NInput v-model:value="UserInput.email" placeholder="input your email"></NInput>
//-     </NFormItem>
//-     <NFormItem label="mobile-phone" path="mobile" required>
//-       <NInput v-model:value="UserInput.mobile" placeholder="input your mobile phone number without hyphens"></NInput>
//-     </NFormItem>
//-     <NFormItem label="age" path="age" required>
//-       <NInput v-model:value="UserInput.age" placeholder="Input your age"></NInput>
//-     </NFormItem>
//-       <NButton type="primary" @click="save"> save </NButton>
//-       <NButton type="warning" @click="edit"> edit </NButton>
//-       <NButton type="error" @click="delete"> delete </NButton>
//-   </NForm>
//- </div>
//- <div>
//-   <h1>Users</h1>
//-   <NButton type="primary" dashed @click='load_data()'>show</NButton>
//-   <NTable :bordered="true" :single-line="true">
//-     <thead>
//-       <tr>
//-         <th>ID</th>
//-         <th>NAME</th>
//-         <th>EMAIL</th>
//-         <th>MOBILE NUMBER</th>
//-         <th>AGE</th>
//-       </tr>
//-     </thead>
//-     <tbody>
//-       <tr v-for="(user,index) in users">
//-         <td>{{ user.id }}</td>
//-         <td>{{ user.name }}</td>
//-         <td>{{ user.email }}</td>
//-         <td>{{ user.mobile }}</td>
//-         <td>{{ user.age }}</td>
//-       </tr>
//-     </tbody>
//-   </NTable>
//- </div>
</template>

<style>
body {
  padding: 16px;
}
.nButton{
  display: flex;
  gap: 20px;
}
</style>