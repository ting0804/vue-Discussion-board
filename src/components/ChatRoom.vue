<script setup>
import io from "socket.io-client";
import { reactive, ref } from "vue";
import { useStore } from 'vuex'


const store = useStore()


const socket = io("http://localhost:3000", { transports: ['websocket'] });
//const socket = io();
const newMessage = ref(null)
const messages = reactive([])
function send() {
    if (newMessage.value) {
        let userName = store.state.userName
        socket.emit('chat message', `${userName}: ${newMessage.value}`);
        newMessage.value = null;
    }
}
socket.on('chat message', function (msg) {
    messages.push({
        message: msg
    })
    window.scrollTo(0, document.body.scrollHeight);
});
</script>
<template>
    <!-- <h1>ChatRoom</h1> -->
    <ul id="messages">
        <li v-for="(msg, index) in messages" :key="index">
            {{ msg.message }}
        </li>
    </ul>
    <form id="form" @submit.prevent="send">
        <input id="input" autocomplete="off" v-model="newMessage" />
        <button>Send</button>
    </form>
</template>

<style scoped>

.post-block {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.comment-form {
  display: flex;
  margin-top: 1rem;
}

.comment-form input {
  flex: 1;
  padding: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.comment-form button {
  padding: 0.5rem 1rem;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
}
</style>
