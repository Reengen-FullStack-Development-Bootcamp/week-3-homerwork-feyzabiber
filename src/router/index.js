import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js"
import Home from "@/views/Home.vue";
import Logs from "@/views/Logs.vue";
import Info from "@/views/Info.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/logs",
    name: "Logs",
    meta:{requiresAuth: true},
    component: Logs,

  },
  {
    path: "/info",
    name: "Info",
    component: Info,
  },
 
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


// Save each route to localstorage.
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth))
  {
    const requiresAuth = require("@/middleware/require-Auth.js")
    requiresAuth.default(store, next)
  } else
  {
    //always put next(), important!! 
    next() 
  }
  // Get route history from localstorage.
  const history = localStorage.getItem("routingHistory")
    ? JSON.parse(localStorage.getItem("routingHistory"))
    : [];
  const routerHistory = {
    from: from.fullPath, // Fullpath at from.
    to: to.fullPath, // Fullpath at to.
    date: new Date(),
  };
  history.push(routerHistory);
  localStorage.setItem("routingHistory", JSON.stringify([...history]));
  next();
});


export default router;
