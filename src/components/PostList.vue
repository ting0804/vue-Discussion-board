<template>
    <h2> {{ userName }} </h2>
  <div class="container">
    <h2>文章列表</h2>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <router-link :to="`/posts/${post.id}`">
          <strong>{{ post.author }}</strong>：{{ post.content }}
        </router-link>
      </li>
    </ul>
    <hr/>
    <h3>新增文章</h3>
    <form @submit.prevent="submitPost">
      <textarea v-model="newPostContent" placeholder="輸入文章內容..." rows="3" style="width: 100%"></textarea>
      <button>送出文章</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import socket from '@/network'
import { useRouter } from 'vue-router'
const router = useRouter()
const posts = ref([])
const newPostContent = ref('')
const userName = localStorage.getItem('userName') || '訪客'

onMounted(() => {
  socket.emit('GET_POSTS')
  socket.on('POST_LIST', (data) => {
    posts.value = data
  })

  socket.on('NEW_POST', (post) => {
    posts.value.push(post)
  })
})

function submitPost() {
  if (!newPostContent.value.trim()) return
  const newPost = {
    id: Date.now(),
    author: userName,
    content: newPostContent.value,
    comments: []
  }
  socket.emit('NEW_POST', newPost)
  newPostContent.value = ''
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
}
li {
  margin-bottom: 10px;
}
</style>
