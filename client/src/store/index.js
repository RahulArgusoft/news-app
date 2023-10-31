// import { createStore } from "vuex";

// import categories from "./modules/categories";
// import localNews from "./modules/localNews";
// import authentication from "./modules/authentication";

// export default createStore({
//   modules: {
//     categories,
//     localNews,
//     authentication
//   },
// });

import { createStore } from 'vuex';
import user from './user';
import categories from './categories';

export default createStore({
  modules: {
    user,
    categories
  },
});