<!-- 参照用に残していますがもう使っていないファイル -->
- <script lang="ts" setup>
import {
  NConfigProvider,
  NMessageProvider,
  NNotificationProvider,
  NTable
} from 'naive-ui'


import ProvideData from '../components/ProvideData.vue'

import Query from '../apollo/Query.gql'
import InsertModel from '../apollo/InsertModel.gql'
import UpdateModel from '../apollo/UpdateModel.gql'


interface Model {
  id: number | null;
  name: string | null;
  email: string | null;
  mobile_number: string | null;
  birth_date: number | null;
}

const models = ref([])

const ModelInput = ref({
  id: '',
  name: '',
  email: '',
  mobile_number: '',
  birth_date: ''
});

// const variables = (UserInput.value)
  // id: UserInput.value,
  // name: UserInput.value,
  // age: UserInput.value,
  // gender: UserInput.value,
  // address: UserInput.value,
  // occupation: UserInput.value

//   post: PostInput.value
// };

// const load_data = (async() => {
//   const userData = await useAsyncQuery(UserQuery)
//   if(userData.data.value?.users){
//     users.value = userData.data.value.users
//   }
//   const postData = await useAsyncQuery(PostQuery)
//   if(postData.data.value?.posts){
//     posts.value = postData.data.value.posts
//   }

// })
const load_data = (async() => {
  const { data } = await useAsyncQuery(Query)
  if(data.value?.models){
    models.value = data.value.models
  }
})

const { mutate } = useMutation(InsertModel)
const save = (async () => {
  const result = await mutate({ data: ModelInput.value })
  console.log("result", result)
});
  // const { mutate: insertPost } = useMutation(InsertPost)

// const { mutate: post } = useMutation(InsertPost, PostInput);
//   (async () => {
//     refetchQueries: PostQuery
//   })();
  // const save = async () => {
  //   const userResult = await insertUser( {data:UserInput.value })
  //   console.log("user result", userResult)
  // const PostInputValue = await insertPost({ user_id: userResult.id } )
  // const postInputValue = {
  //   ...PostInput.value,
  //   user_id: userResult.id
  // }

  // const postResult = await insertPost({
  //   data: PostInput.value
  // })
  // console.log("post result", postResult)
  // const result = await mutate({ variables })
  //   refetchQueries: UserQuery


load_data
const { mutate: updateModel } = useMutation(UpdateModel)

const editModel = async () => {
  const updateResult = await updateModel({ data: ModelInput.value })
}

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
      //- ProvideData
    div
      h1 input form
      table
        tbody
          tr
            th ID
            th name
            th email
            th mobile_number
            th birth_date
            th edit
            th delete
          tr(v-for='(model,index) in models')
            td {{ model.id }}
            td {{ model.name }}
            td {{ model.email }}
            td {{ model.mobile_number }}
            td {{ model.birth_date }}
            button(@click="editModel()") edit
            button(@click="deleteModel()") delete

      button(@click='load_data()') query
      button(@click="editModel()") edit
      button(@click="deleteModel()") delete

    div
      h2 Insert User
      div
        input(v-model='ModelInput.id', type='number', placeholder='id')
      div
        input(v-model='ModelInput.name', type='text', placeholder='name')
      div
        input(v-model='ModelInput.email', type='text', placeholder='email')
      div
        input(v-model='ModelInput.mobile_number', type='text', placeholder='mobile number')
      div
        input(v-model='ModelInput.birth_date', type='date', placeholder='birth date')
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

</style> --> -->
