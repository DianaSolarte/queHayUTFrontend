<template>
  <article class="card p-6 group hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300">
    <!-- Header del anuncio -->
    <header class="flex items-start justify-between mb-4">
      <div class="flex items-start space-x-4 flex-1">
        <!-- Indicador de prioridad -->
        <div class="flex-shrink-0 mt-1">
          <div 
            class="w-3 h-3 rounded-full shadow-soft"
            :class="{
              'bg-red-600 shadow-red-500/20': announcement.prioridad === 'alta',
              'bg-yellow-500 shadow-yellow-500/20': announcement.prioridad === 'media',
              'bg-green-500 shadow-green-500/20': announcement.prioridad === 'baja'
            }"
          ></div>
        </div>
        
        <!-- Contenido principal -->
        <div class="flex-1 min-w-0">
          <h3 class="text-xl font-semibold text-slate-900 mb-3 group-hover:text-red-600 transition-colors leading-tight">
            {{ announcement.titulo }}
          </h3>
          
          <!-- Badges -->
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="categoria in announcement.categorias"
              :key="categoria"
              class="badge badge-gray"
            >
              {{ getCategoryName(categoria) }}
            </span>
            
            <span
              class="badge"
              :class="{
                'badge-red': announcement.prioridad === 'alta',
                'bg-yellow-100 text-yellow-800 border-yellow-200': announcement.prioridad === 'media',
                'badge-green': announcement.prioridad === 'baja'
              }"
            >
              {{ getPriorityName(announcement.prioridad) }}
            </span>
          </div>
        </div>
        
        <!-- Icono -->
        <div class="flex-shrink-0">
          <div class="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-soft">
            <MegaphoneIcon class="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </header>

    <!-- Descripción -->
    <div class="mb-6">
      <p class="text-slate-600 leading-relaxed">
        {{ announcement.descripcion }}
      </p>
    </div>

    <!-- Footer -->
    <footer class="flex items-center justify-between pt-4 border-t border-gray-100">
      <!-- Información del autor y fecha -->
      <div class="flex items-center space-x-4 text-sm text-slate-500">
        <div class="flex items-center space-x-2">
          <UserIcon class="w-4 h-4" />
          <span class="font-medium">{{ announcement.autor }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <MapPinIcon class="w-4 h-4" />
          <span class="font-medium">{{ announcement.ubicacion }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <ClockIcon class="w-4 h-4" />
          <span>{{ formatDate(announcement.fecha) }}</span>
        </div>
      </div>

      <!-- Acciones -->
      <div class="flex items-center space-x-2">
        <button
          v-if="announcement.enlace"
          @click="openLink(announcement.enlace)"
          class="btn-ghost text-sm py-2 px-3"
        >
          <ArrowTopRightOnSquareIcon class="w-4 h-4 mr-1" />
          Ver más
        </button>
        
        <button
          @click="shareAnnouncement"
          class="btn-ghost text-sm py-2 px-3"
        >
          <ShareIcon class="w-4 h-4 mr-1" />
          Compartir
        </button>
      </div>
    </footer>
  </article>
</template>

<script setup>
import {
  MegaphoneIcon,
  UserIcon,
  ClockIcon,
  ArrowTopRightOnSquareIcon,
  ShareIcon,
  MapPinIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps({
  announcement: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getCategoryName = (categoria) => {
  const names = {
    'academico': 'Académico',
    'administrativo': 'Administrativo',
    'eventos': 'Eventos',
    'becas': 'Becas',
    'investigacion': 'Investigación',
    'cultural': 'Cultural',
    'deportivo': 'Deportivo'
  }
  return names[categoria] || categoria
}

const getPriorityName = (priority) => {
  const labels = {
    'alta': 'Urgente',
    'media': 'Importante',
    'baja': 'Informativo'
  }
  return labels[priority] || 'General'
}

const openLink = (url) => {
  window.open(url, '_blank')
}

const shareAnnouncement = () => {
  if (navigator.share) {
    navigator.share({
      title: props.announcement.titulo,
      text: props.announcement.descripcion,
      url: window.location.href
    })
  } else {
    // Fallback para navegadores que no soportan Web Share API
    const url = window.location.href
    navigator.clipboard.writeText(`${props.announcement.titulo} - ${url}`)
    alert('Enlace copiado al portapapeles')
  }
}
</script>
