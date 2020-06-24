export default {
    namespaced: true,
    state: {
        userObj: null,
        userIsLogin: false,
    },
    mutations: {
        userStatus(state, userObj) {
            if (userObj) {
                state.userObj = userObj
                state.userIsLogin = true
            } else if (userObj == null) {
                sessionStorage.setItem("user", null);
                state.userObj = null;
                state.userIsLogin = false;
            }
        },
        logout(state) {
            state.userObj = null
        }
    },
    actions: {},
    getters: {
        isLogin: state => {
            return state.userIsLogin
        }
    },
    modules: {}
}