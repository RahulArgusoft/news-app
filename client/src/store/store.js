// import { createStore } from "vuex";

// const store = createStore({
//   state() {
//     return {
//       isLoggedIn: !!localStorage?.token,
//       user: {
//         username: localStorage?.username,
//         email: localStorage?.email,
//         created_at: localStorage?.created_at,
//       },
//       token: localStorage?.token
//     };
//   },
//   mutations: {
//     changeLoginState(state, payload) {
//       state.isLoggedIn = !state.isLoggedIn;

//       if (state.isLoggedIn) {
//         Object.keys(payload.user).forEach((key) => {
//           localStorage.setItem(key, payload.user[key]);
//         });
//         localStorage.setItem('token', payload.token)
//         state.user = payload?.user;
//         state.token = payload?.token;
//       }
      
//     },
//   },
//   getters: {},
//   actions: {
//     login(context, payload) {
//       context.commit("changeLoginState", payload);
//     },
//     logout(context) {
//       context.commit("changeLoginState")
//       localStorage.clear()
//     }
//   },
// });

// export default store;
