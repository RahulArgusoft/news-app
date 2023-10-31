export default {
  namespaced: true,
  state() {
    return {
      isLoggedIn: !!localStorage?.token,
      user: {
        username: localStorage?.username,
        email: localStorage?.email,
        created_at: localStorage?.created_at,
        name: localStorage?.name,
      },
      token: localStorage?.token,
      location: localStorage?.location,
    };
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    user: (state) => state.user,
    token: (state) => state.token,
    location: (state) => state.location,
  },
  mutations: {
    changeLoginState(state, payload) {
      state.isLoggedIn = !state.isLoggedIn;

      if (state.isLoggedIn) {
        Object.keys(payload.user).forEach((key) => {
          localStorage.setItem(key, payload.user[key]);
        });
        localStorage.setItem("token", payload.token);
        localStorage.setItem("location", JSON.stringify(payload.location));
        state.user = payload.user;
        state.token = payload.token;
        state.location = payload.location
      }
    },
  },
  actions: {
    login(context, payload) {
      context.commit("changeLoginState", payload);
    },
    logout({ commit }) {
      commit("changeLoginState");
      localStorage.clear();
    },
    isUserLoggedIn() {

    },
  },
};

// improved code
// const state = {
//     isLoggedIn: !!localStorage?.token,
//     user: {
//       username: localStorage?.username,
//       email: localStorage?.email,
//       created_at: localStorage?.created_at,
//     },
//     token: localStorage?.token,
//   };

//   const getters = {
//     isLoggedIn: (state) => state.isLoggedIn,
//     user: (state) => state.user,
//     token: (state) => state.token,
//   };

//   const mutations = {
//     SET_USER(state, user) {
//       state.user = user;
//     },
//     SET_TOKEN(state, token) {
//       state.token = token;
//     },
//     TOGGLE_LOGIN_STATE(state) {
//       state.isLoggedIn = !state.isLoggedIn;
//     },
//   };

//   const actions = {
//     async login({ commit }, payload) {
//       try {
//         // Simulate an API call to authenticate the user
//         // Replace this with your actual authentication logic
//         // If successful, commit mutations
//         const user = payload.user;
//         const token = payload.token;
//         commit('SET_USER', user);
//         commit('SET_TOKEN', token);
//         commit('TOGGLE_LOGIN_STATE');

//         // Store user data in localStorage
//         Object.keys(user).forEach((key) => {
//           localStorage.setItem(key, user[key]);
//         });
//         localStorage.setItem('token', token);
//       } catch (error) {
//         // Handle authentication error
//         console.error('Authentication failed:', error);
//         throw error;
//       }
//     },

//     logout({ commit }) {
//       // Clear user data from state and localStorage
//       const emptyUser = {
//         username: null,
//         email: null,
//         created_at: null,
//       };
//       commit('SET_USER', emptyUser);
//       commit('SET_TOKEN', null);
//       commit('TOGGLE_LOGIN_STATE');
//       localStorage.clear();
//     },
//   };

//   export default {
//     namespaced: true,
//     state,
//     getters,
//     mutations,
//     actions,
//   };
