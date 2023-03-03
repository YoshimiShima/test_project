<script lang="ts" setup>
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NSpace,
  NTable,
  useDialog,
  useMessage,
} from 'naive-ui';
import type {
  FormItemRule,
  FormInst,
  FormRules
} from 'naive-ui';

import Query from '../apollo/Query.gql'
import InsertUser from '../apollo/InsertUser.gql'
import UpdateUser from '../apollo/UpdateUser.gql'
import DeleteUser from '../apollo/DeleteUser.gql'
import { createEmitAndSemanticDiagnosticsBuilderProgram, updateSpreadAssignment } from 'typescript';



interface UserType {
  id: string | null;
  name: string | null;
  email: string | null;
  mobile: string | null;
  age: string | null;
}

const users = ref([])
const editUser = ref();

const UserInput = ref<UserType> ({
  id: '',
  name: '',
  email: '',
  mobile: '',
  age: ''
});

const formRef = ref<FormInst | null>(null)
const message = useMessage()
const dialog = useDialog()
const editingRow = ref(false)
// const UserEdit = reactive({
//       name: '',
//       email: '',
//       mobile: '',
//       age: ''
//     })

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
      validator (rule: FormItemRule, value: string, type:number) {
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


const load_data = async() => {
  const { data } = await useAsyncQuery(Query)
  if(data.value?.users){
    users.value = data.value.users
  }
}

const { mutate: insertUser } = useMutation(InsertUser)
const save_user = async () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log(errors);
      message.success('Successfully created User data')
    } else {
      console.log(errors);
      message.error('Failed to create User data')
    }
  })
  const insertResult = await insertUser({ data: UserInput.value })
  console.log("insert result", insertResult)
  UserInput.value = {
  id: '',
  name: '',
  email: '',
  mobile: '',
  age: ''
};
  load_data();
};


const edit = (user) => {
  editingRow.value = user.id
  console.log(user.name)
}
const cancel = () => {
  editingRow.value = false
  load_data()
}
const { mutate: updateUser } = useMutation(UpdateUser)
const update_user = async (user) => {
  try {
    const updateResult = await updateUser({
      id: user.id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      age: user.age
    });
    console.log(user.id)
    console.log("update result", updateResult);
    message.success("User updated");
    load_data();
    editingRow.value = false
  } catch (error) {
    console.log("update error", error);
    message.error("Failed to update user");
  }
}



const { mutate: deleteUser } = useMutation(DeleteUser);
const handleButtonClick = async (user) => {
  const chosenResult = await dialog.success({
    title: 'Delete User',
    content: 'Are you sure?',
    positiveText: 'Yes',
    negativeText: 'No',
    maskClosable: false,
    onPositiveClick: async() => {
      message.success('User deleted successfully')
      try {
        const deleteResult = await deleteUser({ id: user.id })
        console.log("delete result", deleteResult)
        await load_data();
      } catch (error) {
        console.error(error)
        message.error('Failed to delete user')
      }
    },
    onNegativeClick: () => {
      message.error('Failed to delete user')
    }
  });
}

</script>

<!-- <template>
<NSpace class="resultView" vertical>
  <h1>Users</h1>
  <NButton type="primary" dashed @click="load_data()">show</NButton>
  <NTable :bordered="true" :single-line="true">
    <thead>
      <tr>
        <th>ID</th>
        <th>NAME</th>
        <th>EMAIL</th>
        <th>MOBILE NUMBER</th>
        <th>AGE</th>
        <th>--- EDIT --- / == delete ==</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user,index) in users" :key="user.id">
        <td>{{ user.id }}</td>
        <template v-if="user.id !== editingRow">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.mobile }}</td>
          <td>{{ user.age }}</td>
        </template>
        <template v-else>
          <td>
            <NForm ref="formRef" :model=user :rules="rules">
              <NFormItem path="name" :rules="rules.name">
                <NInput v-model:value="user.name" />
              </NFormItem>
            </NForm>
          </td>
          <td>
            <NForm ref="formRef" :model=user :rules="rules">
              <NFormItem path="email" :rules="rules.email">
                <NInput v-model:value="user.email" />
              </NFormItem>
            </NForm>
          </td>
          <td>
            <NForm ref="formRef" :model=user :rules="rules">
              <NFormItem path="mobile" :rules="rules.mobile">
                <NInput v-model:value="user.mobile" />
              </NFormItem>
            </NForm>
          </td>
          <td>
            <NForm ref="formRef" :model=user :rules="rules">
              <NFormItem path="age" :rules="rules.age">
                <NInput v-model:value="user.age" />
              </NFormItem>
            </NForm>
          </td>
            <NButton type="primary" v-if="editingRow" @click="update_user(user)"> update </NButton>
            <NButton type="info" v-if="editingRow" @click="cancel()"> cancel </NButton>
        </template>
          <div class="nButton">
          <NButton type="warning" v-if="!editingRow" @click="edit(user)"> edit</NButton>
          <NButton type="error" v-if="!editingRow" @click="handleButtonClick(user)"> delete</NButton>
          </div>
      </tr>
    </tbody>
  </NTable>
</NSpace>

  <h1>Input Form</h1>
  <NSpace class="inputForm">
    <NForm ref="formRef" :model="UserInput" :rules="rules">
      <NFormItem label="id" path="id" required>
        <NInput v-model:value="UserInput.id" placeholder="input your id number"></NInput>
      </NFormItem>
      <NFormItem label="name" path="name" required>
        <NInput v-model:value="UserInput.name" placeholder="input your name"></NInput>
      </NFormItem>
      <NFormItem label="email" path="email" required>
        <NInput v-model:value="UserInput.email" placeholder="input your email"></NInput>
      </NFormItem>
      <NFormItem label="mobile-phone" path="mobile" required>
        <NInput v-model:value="UserInput.mobile" placeholder="input your mobile phone number without hyphens"></NInput>
      </NFormItem>
      <NFormItem label="age" path="age" required>
        <NInput v-model:value="UserInput.age" placeholder="Input your age"></NInput>
      </NFormItem>
      <NButton type="primary" @click="save_user"> save </NButton>
    </NForm>
  </NSpace> -->

<template lang="pug">
NSpace.resultView(vertical)
  NF Users
  NButton(type='primary', dashed, @click='load_data()') show
  NTable(:bordered='true', :single-line='true')
    thead
      tr
        th ID
        th NAME
        th EMAIL
        th MOBILE NUMBER
        th AGE
        th --- EDIT --- / == delete ==
    tbody
      tr(v-for='(user,index) in users', :key='user.id')
        td {{ user.id }}
        template(v-if='user.id !== editingRow')
          td {{ user.name }}
          td {{ user.email }}
          td {{ user.mobile }}
          td {{ user.age }}
        template(v-else='')
          td
            NForm(ref='formRef', :model='user', :rules='rules')
              NFormItem(path='name', :rules='rules.name')
                NInput(v-model:value='user.name')
          td
            NForm(ref='formRef', :model='user', :rules='rules')
              NFormItem(path='email', :rules='rules.email')
                NInput(v-model:value='user.email')
          td
            NForm(ref='formRef', :model='user', :rules='rules')
              NFormItem(path='mobile', :rules='rules.mobile')
                NInput(v-model:value='user.mobile')
          td
            NForm(ref='formRef', :model='user', :rules='rules')
              NFormItem(path='age', :rules='rules.age')
                NInput(v-model:value='user.age')
          NButton(type='primary', v-if='editingRow', @click='update_user(user)')  update
          NButton(type='info', v-if='editingRow', @click='cancel()')  cancel
        .nButton
          NButton(type='warning', v-if='!editingRow', @click='edit(user)')  edit
          NButton(type='error', v-if='!editingRow', @click='handleButtonClick(user)')  delete
h1 Input Form
NSpace.inputForm
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
    NButton(type='primary', @click='save_user')  save
</template>

<style>


@media only screen and (max-width: 1000px) and (min-width: 768px) {

}
@media only screen and (max-width: 767px) {}

body {
  padding: 16px;

}
.nButton{
  display: flex;
  gap: 20px;
}
.nTable{
  width: 100%;
}
</style>