<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container-padding">
      <!-- Header -->
      <header class="card p-8 mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 class="text-3xl lg:text-4xl font-bold text-ut-black-900 mb-2">
              Anuncios <span class="gradient-text">Oficiales</span>
            </h1>
            <p class="text-lg text-ut-black-600">
              Información actualizada de la Universidad del Tolima
            </p>
          </div>
          
          <!-- Barra de búsqueda -->
          <div class="w-full lg:w-96">
            <div class="relative">
              <MagnifyingGlassIcon class="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-ut-black-400" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Buscar anuncios..."
                class="input-field pl-12"
                @input="onSearch"
              />
            </div>
          </div>
        </div>
      </header>

      <!-- Filtros -->
      <section class="card p-6 mb-8">
        <div class="flex flex-wrap gap-4 items-center">
          <span class="text-sm font-semibold text-ut-black-700">Filtrar por:</span>
          
          <select
            v-model="selectedCategory"
            @change="onFilterChange"
            class="input-field w-auto min-w-44"
          >
            <option value="">Todas las categorías</option>
            <option value="academico">Académico</option>
            <option value="administrativo">Administrativo</option>
            <option value="eventos">Eventos</option>
            <option value="becas">Becas</option>
          </select>

          <select
            v-model="selectedPriority"
            @change="onFilterChange"
            class="input-field w-auto min-w-44"
          >
            <option value="">Todas las prioridades</option>
            <option value="alta">Urgente</option>
            <option value="media">Importante</option>
            <option value="baja">Informativo</option>
          </select>

          <button
            @click="clearFilters"
            class="btn-ghost text-sm"
          >
            Limpiar filtros
          </button>
        </div>
      </section>

      <!-- Estado de carga -->
      <div v-if="loading" class="flex justify-center py-16">
        <div class="w-8 h-8 border-4 border-ut-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>

      <!-- Estado de error -->
      <div v-else-if="error" class="card p-8 border-ut-red-200 bg-ut-red-50">
        <div class="flex items-center text-ut-red-700 mb-4">
          <ExclamationTriangleIcon class="w-6 h-6 mr-3" />
          <span class="font-semibold">{{ error }}</span>
        </div>
        <button @click="fetchAnnouncements" class="btn-primary">
          Reintentar
        </button>
      </div>

      <!-- Lista de anuncios -->
      <div v-else-if="filteredAnnouncements.length" class="grid gap-6">
        <AnnouncementCard
          v-for="announcement in filteredAnnouncements"
          :key="announcement.id"
          :announcement="announcement"
          class="fade-in-up"
        />
      </div>

      <!-- Estado vacío -->
      <div v-else class="text-center py-16">
        <div class="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-2xl flex items-center justify-center">
          <MegaphoneIcon class="w-10 h-10 text-gray-400" />
        </div>
        <h3 class="text-2xl font-semibold text-ut-black-900 mb-3">No hay anuncios</h3>
        <p class="text-ut-black-600 max-w-md mx-auto">
          {{ searchQuery || selectedCategory || selectedPriority 
            ? 'No se encontraron anuncios con los filtros aplicados.' 
            : 'Aún no hay anuncios publicados.' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  MagnifyingGlassIcon,
  MegaphoneIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'
import AnnouncementCard from '@/components/AnnouncementCard.vue'
import { announcementsAPI } from '@/api/announcements.api.js'

// Estado reactivo
const announcements = ref([])
const loading = ref(false)
const error = ref(null)
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedPriority = ref('')

// Computed para filtrar anuncios
const filteredAnnouncements = computed(() => {
  let filtered = [...announcements.value]

  // Filtro por búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(announcement => 
      announcement.titulo.toLowerCase().includes(query) ||
      announcement.descripcion.toLowerCase().includes(query)
    )
  }

  // Filtro por categoría
  if (selectedCategory.value) {
    filtered = filtered.filter(announcement => 
      announcement.categorias?.includes(selectedCategory.value)
    )
  }

  // Filtro por prioridad
  if (selectedPriority.value) {
    filtered = filtered.filter(announcement => 
      announcement.prioridad === selectedPriority.value
    )
  }

  // Ordenar por fecha (más recientes primero)
  return filtered.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
})

// Funciones
const fetchAnnouncements = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await announcementsAPI.getAll()
    // Mapear los datos del backend al formato esperado por el frontend
    announcements.value = response.data.map(evento => ({
      id: evento.id,
      titulo: evento.nombre,
      descripcion: evento.descripcion,
      autor: evento.organizador || 'Universidad del Tolima',
      fecha: evento.createdAt || evento.fechaInicio,
      prioridad: evento.estado === 'PROGRAMADO' ? 'alta' : 'media',
      categorias: ['academico'], 
      enlace: null
    }))
  } catch (err) {
    error.value = 'Error al cargar los anuncios del servidor.'
    console.error('Error fetching announcements:', err)
    
    // Datos de respaldo si falla la API
    announcements.value = [
      {
        id: 1,
        titulo: "Inscripciones abiertas para el período 2025-1",
        descripcion: "Las inscripciones para el primer período académico del 2025 ya están disponibles. Los estudiantes pueden realizar el proceso a través de la plataforma SABER.",
        autor: "Secretaría Académica",
        fecha: "2025-01-15T08:00:00Z",
        prioridad: "alta",
        categorias: ["academico", "inscripciones"],
        enlace: "https://saber.ut.edu.co"
      },
      {
        id: 2,
        titulo: "Nuevo horario de atención en biblioteca virtual",
        descripcion: "La biblioteca virtual amplía su horario de atención para brindar mejor servicio a los estudiantes de modalidad a distancia.",
        autor: "Biblioteca UT",
        fecha: "2025-01-10T14:30:00Z",
        prioridad: "media",
        categorias: ["administrativo", "servicios"]
      }
    ]
  } finally {
    loading.value = false
  }
}

const onSearch = () => {
}

const onFilterChange = () => {
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedPriority.value = ''
}


onMounted(() => {
  fetchAnnouncements()
})
</script>
