<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Comunidad Estudiantil</h1>
          <p class="text-gray-600 mt-1">
            Comparte, conecta y colabora con otros estudiantes de la UT
          </p>
        </div>
        
        <button class="mt-4 sm:mt-0 btn-primary">
          <PlusIcon class="w-5 h-5 inline mr-2" />
          Nueva Publicación
        </button>
      </div>
    </div>

    <!-- Filtros y búsqueda -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <div class="relative">
            <MagnifyingGlassIcon class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar en la comunidad..."
              class="input-field pl-10"
            />
          </div>
        </div>
        
        <select
          v-model="selectedCategory"
          class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="">Todas las categorías</option>
          <option value="venta">Venta</option>
          <option value="estudio">Grupos de Estudio</option>
          <option value="ayuda">Ayuda Académica</option>
          <option value="general">General</option>
        </select>
      </div>
    </div>

    <!-- Publicaciones -->
    <div class="space-y-6">
      <div
        v-for="post in filteredPosts"
        :key="post.id"
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <!-- Header del post -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <UserIcon class="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">{{ post.autor }}</h3>
              <div class="flex items-center text-sm text-gray-500">
                <span>{{ post.programa }}</span>
                <span class="mx-2">•</span>
                <span>{{ formatDate(post.fecha) }}</span>
              </div>
            </div>
          </div>
          
          <span
            :class="getCategoryBadgeClass(post.categoria)"
            class="px-2 py-1 text-xs font-medium rounded-full"
          >
            {{ getCategoryLabel(post.categoria) }}
          </span>
        </div>

        <!-- Contenido -->
        <div class="mb-4">
          <h4 class="text-lg font-medium text-gray-900 mb-2">{{ post.titulo }}</h4>
          <p class="text-gray-700 leading-relaxed">{{ post.contenido }}</p>
          
          <!-- Precio si es venta -->
          <div v-if="post.precio" class="mt-3">
            <span class="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              ${{ post.precio.toLocaleString() }}
            </span>
          </div>
        </div>

        <!-- Acciones -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-100">
          <div class="flex items-center space-x-4">
            <button class="flex items-center space-x-1 text-gray-500 hover:text-red-600">
              <HeartIcon class="w-5 h-5" />
              <span class="text-sm">{{ post.likes || 0 }}</span>
            </button>
            <button class="flex items-center space-x-1 text-gray-500 hover:text-red-600">
              <ChatBubbleLeftIcon class="w-5 h-5" />
              <span class="text-sm">{{ post.comentarios || 0 }}</span>
            </button>
            <button class="flex items-center space-x-1 text-gray-500 hover:text-red-600">
              <ShareIcon class="w-5 h-5" />
              <span class="text-sm">Compartir</span>
            </button>
          </div>
          
          <button
            v-if="post.contacto"
            class="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
          >
            Contactar
          </button>
        </div>
      </div>
    </div>

    <!-- Estado vacío -->
    <div v-if="filteredPosts.length === 0" class="text-center py-12">
      <UserGroupIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">No hay publicaciones</h3>
      <p class="text-gray-600">
        Sé el primero en compartir algo con la comunidad
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  PlusIcon,
  MagnifyingGlassIcon,
  UserIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  UserGroupIcon
} from '@heroicons/vue/24/outline'

// Estado reactivo
const searchQuery = ref('')
const selectedCategory = ref('')

// Datos de ejemplo
const posts = ref([
  {
    id: 1,
    titulo: "Vendo libros de Ingeniería de Software",
    contenido: "Vendo libros en excelente estado: 'Ingeniería de Software' de Sommerville y 'Análisis y Diseño de Sistemas' de Kendall. Ideales para estudiantes de sistemas.",
    autor: "María González",
    programa: "Ingeniería de Sistemas",
    fecha: "2025-01-15T10:30:00Z",
    categoria: "venta",
    precio: 80000,
    contacto: "maria.gonzalez@ut.edu.co",
    likes: 5,
    comentarios: 2
  },
  {
    id: 2,
    titulo: "Grupo de estudio para Cálculo Diferencial",
    contenido: "Estamos formando un grupo de estudio virtual para Cálculo Diferencial. Nos reunimos los sábados por la mañana. ¡Únete!",
    autor: "Carlos Ramírez",
    programa: "Ingeniería Civil",
    fecha: "2025-01-14T16:20:00Z",
    categoria: "estudio",
    likes: 12,
    comentarios: 8
  },
  {
    id: 3,
    titulo: "¿Alguien tiene apuntes de Programación II?",
    contenido: "Hola! Perdí mis apuntes de la clase pasada de Programación II. ¿Alguien me podría ayudar compartiendo los suyos?",
    autor: "Ana Martínez",
    programa: "Ingeniería de Sistemas",
    fecha: "2025-01-13T14:15:00Z",
    categoria: "ayuda",
    likes: 3,
    comentarios: 5
  }
])

// Computed
const filteredPosts = computed(() => {
  let filtered = [...posts.value]

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(post => 
      post.titulo.toLowerCase().includes(query) ||
      post.contenido.toLowerCase().includes(query) ||
      post.autor.toLowerCase().includes(query)
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(post => post.categoria === selectedCategory.value)
  }

  return filtered.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
})

// Funciones
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return 'Hace 1 día'
  if (diffDays < 7) return `Hace ${diffDays} días`
  
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getCategoryBadgeClass = (category) => {
  const classes = {
    'venta': 'bg-green-100 text-green-800',
    'estudio': 'bg-blue-100 text-blue-800',
    'ayuda': 'bg-yellow-100 text-yellow-800',
    'general': 'bg-gray-100 text-gray-800'
  }
  return classes[category] || 'bg-gray-100 text-gray-800'
}

const getCategoryLabel = (category) => {
  const labels = {
    'venta': 'Venta',
    'estudio': 'Estudio',
    'ayuda': 'Ayuda',
    'general': 'General'
  }
  return labels[category] || 'General'
}
</script>
