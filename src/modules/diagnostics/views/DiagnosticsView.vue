<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">🔧 Diagnóstico de Conexión</h1>
      <p class="text-gray-600">
        Esta página te ayuda a verificar si el frontend está conectado correctamente con el backend.
      </p>
    </div>

    <!-- Pruebas de conexión -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Prueba básica del backend -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          🌐 Conexión Backend
        </h3>
        <div class="space-y-3">
          <button
            @click="testBackendConnection"
            :disabled="loading.backend"
            class="w-full btn-primary"
          >
            {{ loading.backend ? 'Probando...' : 'Probar Conexión Básica' }}
          </button>
          
          <div v-if="results.backend" class="p-3 rounded-lg" :class="getStatusClass(results.backend.status)">
            <div class="flex items-center">
              <component :is="getStatusIcon(results.backend.status)" class="w-5 h-5 mr-2" />
              <span class="font-medium">{{ results.backend.message }}</span>
            </div>
            <div v-if="results.backend.details" class="mt-2 text-sm opacity-75">
              {{ results.backend.details }}
            </div>
          </div>
        </div>
      </div>

      <!-- Prueba de eventos/anuncios -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          📢 API de Eventos
        </h3>
        <div class="space-y-3">
          <button
            @click="testEventsAPI"
            :disabled="loading.events"
            class="w-full btn-primary"
          >
            {{ loading.events ? 'Probando...' : 'Probar API de Eventos' }}
          </button>
          
          <div v-if="results.events" class="p-3 rounded-lg" :class="getStatusClass(results.events.status)">
            <div class="flex items-center">
              <component :is="getStatusIcon(results.events.status)" class="w-5 h-5 mr-2" />
              <span class="font-medium">{{ results.events.message }}</span>
            </div>
            <div v-if="results.events.details" class="mt-2 text-sm opacity-75">
              {{ results.events.details }}
            </div>
          </div>
        </div>
      </div>

      <!-- Prueba de base de datos -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          🗄️ Base de Datos
        </h3>
        <div class="space-y-3">
          <button
            @click="testDatabase"
            :disabled="loading.database"
            class="w-full btn-primary"
          >
            {{ loading.database ? 'Probando...' : 'Probar Base de Datos' }}
          </button>
          
          <div v-if="results.database" class="p-3 rounded-lg" :class="getStatusClass(results.database.status)">
            <div class="flex items-center">
              <component :is="getStatusIcon(results.database.status)" class="w-5 h-5 mr-2" />
              <span class="font-medium">{{ results.database.message }}</span>
            </div>
            <div v-if="results.database.details" class="mt-2 text-sm opacity-75">
              {{ results.database.details }}
            </div>
          </div>
        </div>
      </div>

      <!-- Información del sistema -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          ℹ️ Información del Sistema
        </h3>
        <div class="space-y-2 text-sm">
          <div><strong>Frontend URL:</strong> {{ systemInfo.frontendUrl }}</div>
          <div><strong>Backend URL:</strong> {{ systemInfo.backendUrl }}</div>
          <div><strong>Modo:</strong> {{ systemInfo.mode }}</div>
          <div><strong>Puerto Frontend:</strong> {{ systemInfo.frontendPort }}</div>
        </div>
      </div>
    </div>

    <!-- Prueba completa -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">
        🚀 Prueba Completa
      </h3>
      <button
        @click="runAllTests"
        :disabled="loading.all"
        class="btn-primary mr-3"
      >
        {{ loading.all ? 'Ejecutando pruebas...' : 'Ejecutar Todas las Pruebas' }}
      </button>
      
      <button
        @click="clearResults"
        class="btn-secondary"
      >
        Limpiar Resultados
      </button>
    </div>

    <!-- Instrucciones -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-blue-900 mb-3">
        📋 ¿Qué hacer si las pruebas fallan?
      </h3>
      <div class="text-blue-800 space-y-2 text-sm">
        <p><strong>Si la conexión backend falla:</strong></p>
        <ul class="list-disc list-inside ml-4 space-y-1">
          <li>Verifica que Spring Boot esté ejecutándose en puerto 8080</li>
          <li>Ejecuta: <code class="bg-blue-100 px-1 rounded">curl http://localhost:8080/hello</code></li>
        </ul>
        
        <p class="mt-3"><strong>Si la API de eventos falla:</strong></p>
        <ul class="list-disc list-inside ml-4 space-y-1">
          <li>Agrega los controladores REST que te proporcioné</li>
          <li>Configura CORS en Spring Boot</li>
          <li>Reinicia el backend</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'

// Estado reactivo
const loading = ref({
  backend: false,
  events: false,
  database: false,
  all: false
})

const results = ref({
  backend: null,
  events: null,
  database: null
})

// Información del sistema
const systemInfo = ref({
  frontendUrl: window.location.origin,
  backendUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  mode: import.meta.env.DEV ? 'Desarrollo' : 'Producción',
  frontendPort: window.location.port || '5177'
})

// Funciones de utilidad
const getStatusClass = (status) => {
  const classes = {
    success: 'bg-green-100 text-green-800 border border-green-200',
    error: 'bg-red-100 text-red-800 border border-red-200',
    warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200'
  }
  return classes[status] || classes.error
}

const getStatusIcon = (status) => {
  const icons = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    warning: ExclamationTriangleIcon
  }
  return icons[status] || XCircleIcon
}

// Pruebas individuales
const testBackendConnection = async () => {
  loading.value.backend = true
  try {
    const response = await axios.get('http://localhost:8080/hello', {
      timeout: 5000
    })
    
    results.value.backend = {
      status: 'success',
      message: '✅ Backend conectado correctamente',
      details: `Respuesta: "${response.data}"`
    }
  } catch (error) {
    results.value.backend = {
      status: 'error',
      message: '❌ No se puede conectar al backend',
      details: `Error: ${error.message}. Verifica que Spring Boot esté ejecutándose en puerto 8080.`
    }
  } finally {
    loading.value.backend = false
  }
}

const testEventsAPI = async () => {
  loading.value.events = true
  try {
    const response = await axios.get('http://localhost:8080/api/eventos', {
      timeout: 5000
    })
    
    results.value.events = {
      status: 'success',
      message: '✅ API de eventos funcionando',
      details: `Se encontraron ${response.data.length} eventos`
    }
  } catch (error) {
    if (error.response?.status === 404) {
      results.value.events = {
        status: 'warning',
        message: '⚠️ Endpoint de eventos no encontrado',
        details: 'Necesitas agregar el EventoController al backend Spring Boot'
      }
    } else {
      results.value.events = {
        status: 'error',
        message: '❌ Error en API de eventos',
        details: `Error: ${error.message}`
      }
    }
  } finally {
    loading.value.events = false
  }
}

const testDatabase = async () => {
  loading.value.database = true
  try {
    // Intentamos obtener usuarios como proxy para verificar la DB
    const response = await axios.get('http://localhost:8080/api/usuarios', {
      timeout: 5000
    })
    
    results.value.database = {
      status: 'success',
      message: '✅ Base de datos conectada',
      details: `Se encontraron ${response.data.length} registros`
    }
  } catch (error) {
    if (error.response?.status === 404) {
      results.value.database = {
        status: 'warning',
        message: '⚠️ API de usuarios no encontrada',
        details: 'Los controladores REST no están implementados aún'
      }
    } else {
      results.value.database = {
        status: 'error',
        message: '❌ Error de base de datos',
        details: `Error: ${error.message}`
      }
    }
  } finally {
    loading.value.database = false
  }
}

const runAllTests = async () => {
  loading.value.all = true
  await testBackendConnection()
  await testEventsAPI()
  await testDatabase()
  loading.value.all = false
}

const clearResults = () => {
  results.value = {
    backend: null,
    events: null,
    database: null
  }
}
</script>
