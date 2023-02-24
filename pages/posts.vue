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
  posts: '',
});

// const editedUser: User = {
//   id: null,
//   name: null,
//   age: null,
//   gender: null,
//   address: null,
//   occupation: null
// };
// const editedPost: Post = {
//   post: null
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

// const { mutate, refetchQueries } = useMutation(InsertUser)

const save = async () => {
  const { mutate, refetchQueries } = useMutation(InsertUser)
  const { data } = await mutate({ input: UserInput.value })
  await refetchQueries([{ query: UserQuery }])
}
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

<template lang="pug">
NConfigProvider
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
      button(@click='load_data()') query
    //- button(@click="editUser(user)") edit
    //- button(@click="deleteUser(user)") delete

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
        button(@click='save') save


        //- ul
        //-   li(v-for='(user,index) in users') {{ user.id }} : {{ user.name }}
        //- ul
        //-   li(v-for='(post,index) in posts') {{ post.user_id }} : {{ post.post }}


</template>



<style>
body {
  padding: 16px;
}
tr {
grid-auto-flow: 10px;
}

</style>
