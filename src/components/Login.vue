<template>
    <div class="login">
        <h1>Discussion board</h1>
        <p>Name:</p><input type="text" v-model="user.name">
        <button @click="btnSubmit"> Join</button>
    </div>
</template>
<script setup>
import { reactive } from 'vue';
import router from '@/router';
import { useStore } from 'vuex'
import socket from '@/network'
const store = useStore()
const user = reactive({
    name: ''
})
function btnSubmit() {
    if (!user.name) {
        alert('Name required.');
        return true
    }
    console.log(user.name);
    localStorage.setItem('userName', user.name)
    store.commit('updateUserName', user.name)
    socket.emit('JOIN_CHAT_ROOM', { userName: user.name, email: 'foo@goo.com' });
    router.push({ path: '/posts' })
}
</script>

<style>
.login {
    margin: auto;
    padding: 10px;
    background-color: rgb(123, 205, 233);
    width: 300px;
    height: 200px;
}


.login p {
    margin-right: 10px;
    display: inline-block;
}
</style>
