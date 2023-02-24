<script lang="ts" setup>
import {
  NConfigProvider,
  NMessageProvider,
  NNotificationProvider,
} from 'naive-ui'


import ProvideData from '../components/ProvideData.vue'

// import ApolloClient from 'apollo-boost'

import UserQuery from '../apollo/UserQuery.gql'
import PostQuery from '../apollo/PostQuery.gql'
import InsertUser from '../apollo/InsertUser.gql'
import InsertPost from '../apollo/InsertPost.gql'


interface User {
  id: number | null;
  name: string | null;
  age: number | null;
  gender: string | null;
  address: string | null;
  occupation: string | null;
}
interface Post {
  post: string | null;
}

const users = ref([])
const posts = ref([])

const UserInput = ref({
  id: '',
  name: '',
  age: '',
  gender: '',
  occupation: '',
  address: '',
});
const PostInput = ref({
  post: ''
});

const variables = {
  id: UserInput.value,
  name: UserInput.value,
  age: UserInput.value,
  gender: UserInput.value,
  address: UserInput.value,
  occupation: UserInput.value
}
//   post: PostInput.value
// };

const load_data = (async() => {
  const userData = await useAsyncQuery(UserQuery)
  if(userData.data.value?.users){
    users.value = userData.data.value.users
  }
  const postData = await useAsyncQuery(PostQuery)
  if(postData.data.value?.posts){
    posts.value = postData.data.value.posts
  }

})


// const save = async () => {
//   const { mutate, refetchQueries } = useMutation(InsertUser)
//   const { data } = await mutate({ input: UserInput.value })
//   await refetchQueries([{ query: UserQuery }])
// }

const { mutate } = useMutation(InsertUser, { variables })
  console.log(UserQuery.value)
// const { mutate: post } = useMutation(InsertPost, PostInput);
//   (async () => {
//     refetchQueries: PostQuery
//   })();

const save = (async () => {
  const result = await mutate(InsertUser)
    refetchQueries: UserQuery
})();



load_data

// const apolloClient = provideApolloClient()
// provide('apollo', apolloClient)

// const { mutate } = useMutation(InsertUser, { UserInput });
//   (async () => {
//     try {
//       const { data } = await mutate();
//       console.log('Mutation result:', data);
//     } catch (error) {
//       console.error(error);
//       }
//   })();

</script>

<template>
  <NConfigProvider inline-theme-disabled>
    <NMessageProvider>
      <NNotificationProvider>
        <ProvideData />
  <div>
    <h1>input form</h1>
    <table>
      <tbody>
        <tr>
          <th>ID</th>
          <th>name</th>
          <th>age</th>
          <th>gender</th>
          <th>occupation</th>
          <th>address</th>
          <th>post</th>
          <th>edit</th>
        </tr>
          <tr v-for="(user,index) in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.age }}</td>
            <td>{{ user.gender }}</td>
            <td>{{ user.occupation }}</td>
            <td>{{ user.address }}</td>
            <tr v-for="(post,index) in user.posts">
              <td>{{ post.post }}</td>
              <td></td>
              <td></td>
          </tr>
        </tr>
      </tbody>
    </table>
    <button @click="load_data()">query</button>
      <h2>Insert User</h2>
      <div>
        <div>
          <input v-model="UserInput.id" type="number" placeholder="id" />
        </div>
        <div>
          <input v-model="UserInput.name" type="text" placeholder="name" />
        </div>
        <div>
          <input v-model="UserInput.age" type="number" placeholder="age" />
        </div>
        <div>
          <input v-model="UserInput.gender" type="text" placeholder="gender" />
        </div>
        <div>
          <input v-model="UserInput.occupation" type="text" placeholder="occupation" />
        </div>
        <div>
          <input v-model="UserInput.address" type="text" placeholder="address" />
        </div>
        <div>
          <textarea v-model="PostInput.post" cols="30" rows="10" type="text" placeholder="post"></textarea>
        </div>
      </div>
      <button @click="save">save</button>
  </div>
      </NNotificationProvider>
    </NMessageProvider>
  </NConfigProvider>
<!-- NconfigProvider
  NMessageProvider
    NNotificationProvider
      h1 input form
      ProvideData
      table
        tr
          th ID
          th name
          th age
          th gender
          th occupation
          th address
          th post
          th edit
        tr(v-for='(user,index) in users')
          td {{ user.id }}
          td {{ user.name }}
          td {{ user.age }}
          td {{ user.gender }}
          td {{ user.occupation }}
          td {{ user.address }}
          tr(v-for='(post,index) in user.posts')
            td {{ post.post }}
            td
            td
      button(@click='load_data()') query -->
      <!-- button(@click="editUser(user)") edit
      button(@click="deleteUser(user)") delete

  div
    h2 Insert User
      div
        input(v-model='UserInput.id', type='number', placeholder='id')
      div
        input(v-model='UserInput.name', type='text', placeholder='name')
      div
        input(v-model='UserInput.age', type='number', placeholder='age')
      div
        input(v-model='UserInput.gender', type='text', placeholder='gender')
      div
        input(v-model='UserInput.occupation', type='text', placeholder='occupation')
      div
        input(v-model='UserInput.address', type='text', placeholder='address')
      div
        textarea(v-model='UserInput.post', cols="30", rows="10", type='text', placeholder='post')
      div
        button(@click='save') save -->


</template>



<style>
body {
  padding: 16px;
}
tr {
grid-auto-flow: 10px;
}

</style>
