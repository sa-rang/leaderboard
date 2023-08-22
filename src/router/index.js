import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import { auth } from '../firebase'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,

  },
  {
    path: '/admin',
    name: 'Admin',
    redirect: { path: "/admin/manage-player" },
    component: async () => await import('../views/AdminView.vue'),
    children: [
      {
        path: "manage-player",
        name: "Manage-Player",
        component: async () => await import('../components/admin/PlayersForm.vue'),
      },
      {
        path: "manage-score",
        name: "Manage-Score",
        component: async () => await import('../components/admin/ScoreForm.vue'),
      },
      {
        path: "manage-shoutout",
        name: "Manage-Shoutout",
        component: async () => await import('../components/admin/ShoutoutForm.vue'),
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: async () => await import('../views/Login.vue'),
  },
  {
    path: '/player',
    name: 'player',
    component: async () => await import('../views/PlayerView.vue'),
  },
  {
    path: '/user-guide',
    name: 'user-guide',
    component: async () => await import('../views/UserGuide.vue'),
  }
]

const router = createRouter({
  //history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory("/leaderboard/"),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' && auth.currentUser) {
    next('/admin')
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/login')
    return;
  }

  next();
})

export default router