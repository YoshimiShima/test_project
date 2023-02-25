<script lang="ts" setup>
import {
  NConfigProvider,
  NMessageProvider,
  NNotificationProvider,
  NTable
} from 'naive-ui'


import ProvideData from '../components/ProvideData.vue'

import UserQuery from '../apollo/UserQuery.gql'
import PostQuery from '../apollo/PostQuery.gql'
import InsertUser from '../apollo/InsertUser.gql'
import InsertPost from '../apollo/InsertPost.gql'
import UpdateUser from '../apollo/UpdateUser.gql'


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
  post: '',
  user_id: ''
});

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

const { mutate: insertUser } = useMutation(InsertUser)
const { mutate: insertPost } = useMutation(InsertPost)

const save = async () => {
  const userResult = await insertUser( {data:UserInput.value })
  console.log("user result", userResult)
  const UserInputValue = await insertPost({ id: posts_insert_input } )

  const postResult = await insertPost({
    data: PostInput.value
  })
  console.log("post result", postResult)

}

load_data
const { mutate: updateUser } = useMutation(UpdateUser)

const editUser = async () => {
  const updateResult = await updateUser({ data: UserInput.value })
}


</script>

<template lang="pug">
NConfigProvider
  NMessageProvider
    NNotificationProvider
      ProvideData
    div
      h1 input form
      table
        tbody
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
      button(@click="editUser(user)") edit
      button(@click="deleteUser(user)") delete
NTable(:bordered='true', :single-line='true')
  thead
    tr
      th Abandon
      th Abormal
      th Abolish
      th ...
      th It&apos;s hard to learn words
  tbody
    tr
      td &#x653E;&#x5F03;
      td &#x53CD;&#x5E38;&#x7684;
      td &#x5F7B;&#x5E95;&#x5E9F;&#x9664;
      td ...
      td Damn it! I can&apos;t remember those words.
    tr
      td ...
      td ...
      td ...
      td ...
      td ...
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

</template>

<style>
body {
  padding: 16px;
}
tr {
grid-auto-flow: 10px;
}

</style>
