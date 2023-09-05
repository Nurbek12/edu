import { createStore } from 'vuex'
import Cookies from 'js-cookie'

export default createStore({
    state: {
        user: JSON.parse(Cookies.get('user') || '{}'),
        token: Cookies.get('token') || '',
    },
    getters: {
        user: state => state.user,
        token: state => state.token,
        logged: state => !!state.token,
        role: state => state.user?.role || '',
        userid: state => state.user?._id || '',
    },
    actions: {
        
    },
    mutations: {
        logout(state){
            state.token = ''
            state.user = {}
            Cookies.remove('user')
            Cookies.remove('token')
            window.location.href = '/login'
        },
        setUser(state, user){
            state.user = user
            Cookies.set('user', JSON.stringify(user));
        },
        setToken(state, token){
            state.token = token
            const expires = new Date(new Date().getTime() + 2 * 60 * 60 * 1000); // Текущая дата + 2 часа
            Cookies.set('token', token, { expires })
        },
    }
})