<template>
  <h2>{{ userName }}</h2>
  <div class="container" v-if="post">
    <h2>{{ post.author }} 的文章</h2>
    <p>{{ post.content }}</p>

    <h3>留言區：</h3>
    <ul v-if="post.comments && post.comments.length">
      <li v-for="(comment, index) in post.comments" :key="index">
        <strong>{{ comment.author }}:</strong> {{ comment.content }}
      </li>
    </ul>
    <p v-else>目前尚無留言</p>

    <form @submit.prevent="submitComment">
      <input
        v-model="newComment"
        placeholder="輸入留言..."
        style="width: 100%; padding: 0.5rem;"
      />
      <button type="submit">送出留言</button>
      <button type="button" @click="btnBack">返回</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import socket from '@/network'

const route = useRoute()
const router = useRouter()
const postId = route.params.id
const post = ref(null)
const newComment = ref('')
const userName = localStorage.getItem('userName') || '訪客'

function btnBack() {
  router.push('/posts')
}

onMounted(() => {
  socket.emit('GET_POSTS')

  socket.on('POSTS_LIST', (data) => {
    const found = data.find(p => p.id.toString() === postId.toString())
    if (found) {
      if (!found.comments) found.comments = []
      post.value = found
    }
  })

  socket.on('NEW_COMMENT', (data) => {
    if (data.postId.toString() === postId.toString() && post.value) {
      post.value.comments.push(data.comment)
    }
  })
})

function submitComment() {
  if (!newComment.value.trim()) return
  socket.emit('NEW_COMMENT', {
    postId: postId.toString(),
    comment: {
      author: userName,
      content: newComment.value
    }
  })
  newComment.value = ''
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
}
</style>
