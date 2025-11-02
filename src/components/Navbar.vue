<template>
  <nav class="bg-white/95 backdrop-blur-md shadow-soft border-b border-gray-100 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo y título -->
        <router-link to="/" class="flex items-center space-x-4 group">
          <div class="relative">
            <img 
              src="@/assets/LogoUtolima.svg" 
              alt="Universidad del Tolima" 
              class="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-red-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-slate-900 tracking-tight">
              Qué Hay <span class="text-red-600">UT</span>
            </h1>
            <p class="text-sm text-slate-500 font-medium">Universidad del Tolima</p>
          </div>
        </router-link>

        <!-- Menú de navegación - Desktop -->
        <div class="hidden lg:flex items-center space-x-1">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="group relative flex items-center space-x-2 px-4 py-2.5 rounded-xl text-slate-600 hover:text-red-600 transition-all duration-300"
            :class="{ 
              'text-red-600 bg-red-50': $route.path === item.path,
              'hover:bg-gray-50': $route.path !== item.path 
            }"
          >
            <component 
              :is="item.icon" 
              class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" 
            />
            <span class="font-medium text-sm">{{ item.name }}</span>
            
            <!-- Indicador activo -->
            <div 
              v-if="$route.path === item.path"
              class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-600 rounded-full"
            ></div>
          </router-link>
        </div>

        <!-- Botón menú móvil -->
        <div class="lg:hidden">
          <button
            @click="toggleMobileMenu"
            class="relative p-2 text-slate-600 hover:text-red-600 focus:outline-none transition-colors duration-200"
          >
            <div class="w-6 h-6 relative">
              <span 
                class="absolute block w-full h-0.5 bg-current transform transition-all duration-300"
                :class="mobileMenuOpen ? 'rotate-45 top-2.5' : 'top-1'"
              ></span>
              <span 
                class="absolute block w-full h-0.5 bg-current transform transition-all duration-300"
                :class="mobileMenuOpen ? 'opacity-0' : 'top-2.5'"
              ></span>
              <span 
                class="absolute block w-full h-0.5 bg-current transform transition-all duration-300"
                :class="mobileMenuOpen ? '-rotate-45 top-2.5' : 'top-4'"
              ></span>
            </div>
          </button>
        </div>
      </div>

      <!-- Menú móvil -->
      <div 
        class="lg:hidden overflow-hidden transition-all duration-300"
        :class="mobileMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'"
      >
        <div class="pt-4 space-y-1">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            @click="mobileMenuOpen = false"
            class="group flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-600 hover:text-red-600 hover:bg-gray-50 transition-all duration-200"
            :class="{ 'text-red-600 bg-red-50': $route.path === item.path }"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span class="font-medium">{{ item.name }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import {
  MegaphoneIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  HomeIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

const mobileMenuOpen = ref(false)

const menuItems = [
  {
    name: 'Inicio',
    path: '/',
    icon: HomeIcon
  },
  {
    name: 'Anuncios',
    path: '/anuncios',
    icon: MegaphoneIcon
  },
  {
    name: 'Calendario',
    path: '/calendario',
    icon: CalendarDaysIcon
  },
  {
    name: 'Comunidad',
    path: '/comunidad',
    icon: UserGroupIcon
  },
  {
    name: 'Docentes',
    path: '/docentes',
    icon: AcademicCapIcon
  },
  {
    name: 'Diagnóstico',
    path: '/diagnostics',
    icon: WrenchScrewdriverIcon
  }
]

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>
