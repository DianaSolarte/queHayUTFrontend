import { createRouter, createWebHistory } from 'vue-router'

// Importar las vistas principales
import LoginView from '@/modules/auth/views/LoginView.vue'
import CommunityView from '@/modules/community/views/CommunityView.vue'
import TeachersView from '@/modules/teachers/views/TeachersView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/anuncios',
    name: 'announcements',
    component: () => import('@/modules/announcements/views/AnnouncementsView.vue')
  },
  {
    path: '/calendario',
    name: 'calendar',
    component: () => import('@/modules/calendar/views/CalendarView.vue')
  },
  {
    path: '/comunidad',
    name: 'community',
    component: CommunityView
  },
  {
    path: '/docentes',
    name: 'teachers',
    component: TeachersView
  },
  {
    path: '/diagnostics',
    name: 'diagnostics',
    component: () => import('@/modules/diagnostics/views/DiagnosticsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
