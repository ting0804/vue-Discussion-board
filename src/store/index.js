import { createStore } from 'vuex'
// Create a new store instance.
const store = createStore({
    state: {
        userName: ''
    },
    mutations: {
        updateUserName(state, val) {
            state.userName = val
        }
    },
    getters: {},
    actions: {},
    modules: {}
})
export default store
