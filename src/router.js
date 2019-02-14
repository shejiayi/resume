import VueRouter from 'vue-router'


import index from './pages/index/index.vue'
import introduction from './pages/introduction/introduction.vue'
import skills from './pages/skills/skill.vue'
import projects from './pages/projects/projects.vue'
import information from './pages/information/information.vue'

var router = new VueRouter({
  routes: [
    {
      path:'/',
      redirect: '/index' 
    },
    {
      path:'/index',
      component: index
    },
    {
      path:'/introduction',
      component: introduction
    },
    {
      path:'/skills',
      component: skills
    },
    {
      path:'/projects',
      component: projects
    },
    {
      path:'/information',
      component: information
    }
  ],
  linkActiveClass: 'active-link'
})

export default router