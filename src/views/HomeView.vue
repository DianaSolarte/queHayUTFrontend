<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="relative pt-20 pb-16 lg:pt-28 lg:pb-24 overflow-hidden">
      <!-- Background pattern -->
      <div class="absolute inset-0 -z-10">
        <svg class="absolute w-full h-full" viewBox="0 0 1200 800" fill="none">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div class="container-padding">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Logo animado -->
          <div class="flex justify-center mb-8">
            <div class="relative">
              <img 
                src="@/assets/LogoUtolima.svg" 
                alt="Universidad del Tolima" 
                class="w-24 h-24 lg:w-32 lg:h-32 object-contain float-animation"
              />
              <div class="absolute inset-0 bg-red-500/10 rounded-full blur-xl"></div>
            </div>
          </div>
          
          <!-- Título principal -->
          <h1 class="text-4xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Qué Hay 
            <span class="gradient-text">UT</span>
          </h1>
          
          <p class="text-xl lg:text-2xl text-slate-600 mb-4 max-w-3xl mx-auto text-balance">
            Plataforma digital para la comunidad de <strong class="text-red-600">Ingeniería de Sistemas</strong>
          </p>
          
          <p class="text-lg text-slate-500 mb-12 max-w-2xl mx-auto">
            Conecta, organiza y mantente informado sobre todo lo que necesitas en la Universidad del Tolima
          </p>

          <!-- Botones de acción -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <router-link to="/anuncios" class="btn-primary group">
              <MegaphoneIcon class="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
              Explorar Anuncios
            </router-link>
            
            <router-link to="/calendario" class="btn-outline group">
              <CalendarDaysIcon class="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
              Ver Calendario
            </router-link>
          </div>

          <!-- Estadísticas -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="text-3xl lg:text-4xl font-bold text-red-600 mb-1">{{ stats.announcements }}+</div>
              <div class="text-slate-600 font-medium">Anuncios</div>
            </div>
            <div class="text-center">
              <div class="text-3xl lg:text-4xl font-bold text-red-600 mb-1">{{ stats.events }}+</div>
              <div class="text-slate-600 font-medium">Eventos</div>
            </div>
            <div class="text-center">
              <div class="text-3xl lg:text-4xl font-bold text-red-600 mb-1">{{ stats.students }}+</div>
              <div class="text-slate-600 font-medium">Estudiantes</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="section-padding bg-white">
      <div class="container-padding">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Todo lo que necesitas en un solo lugar
          </h2>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto">
            Herramientas diseñadas específicamente para estudiantes de ingeniería
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Feature 1 -->
          <div class="card p-8 text-center group hover:scale-105 transition-all duration-300">
            <div class="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <MegaphoneIcon class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-slate-900 mb-3">Anuncios</h3>
            <p class="text-slate-600">
              Información oficial actualizada sobre la universidad y tu programa
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="card p-8 text-center group hover:scale-105 transition-all duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <CalendarDaysIcon class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-slate-900 mb-3">Eventos</h3>
            <p class="text-slate-600">
              Calendario de actividades académicas, culturales y deportivas
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="card p-8 text-center group hover:scale-105 transition-all duration-300">
            <div class="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <UserGroupIcon class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-slate-900 mb-3">Comunidad</h3>
            <p class="text-slate-600">
              Conecta con compañeros y participa en la vida universitaria
            </p>
          </div>

          <!-- Feature 4 -->
          <div class="card p-8 text-center group hover:scale-105 transition-all duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <AcademicCapIcon class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-slate-900 mb-3">Docentes</h3>
            <p class="text-slate-600">
              Directorio de profesores y horarios de atención
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding gradient-bg relative overflow-hidden">
      <!-- Decorative elements -->
      <div class="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-32 -translate-y-32"></div>
      <div class="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-32 translate-y-32"></div>
      
      <div class="container-padding relative">
        <div class="max-w-4xl mx-auto text-center text-white">
          <h2 class="text-3xl lg:text-4xl font-bold mb-6">
            ¿Listo para comenzar?
          </h2>
          <p class="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Únete a la comunidad digital de la Universidad del Tolima y mantente siempre conectado
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link
              to="/anuncios"
              class="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Empezar ahora
              <ArrowRightIcon class="w-5 h-5 ml-2" />
            </router-link>
            <router-link
              to="/diagnostics"
              class="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-red-600 transition-all duration-200"
            >
              Estado del Sistema
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  MegaphoneIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ArrowRightIcon
} from '@heroicons/vue/24/outline'

// Estado reactivo para las estadísticas
const stats = ref({
  announcements: 0,
  events: 0,
  students: 0
})

// Animación de conteo para las estadísticas
const animateStats = () => {
  const finalStats = {
    announcements: 150,
    events: 75,
    students: 12000
  }
  
  const duration = 2000 // 2 segundos
  const steps = 60
  const stepTime = duration / steps
  
  Object.keys(finalStats).forEach(key => {
    const final = finalStats[key]
    const increment = final / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= final) {
        stats.value[key] = final
        clearInterval(timer)
      } else {
        stats.value[key] = Math.floor(current)
      }
    }, stepTime)
  })
}

onMounted(() => {

  setTimeout(() => {
    animateStats()
  }, 500)
})
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
