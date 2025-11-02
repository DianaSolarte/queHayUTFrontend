<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <div class="w-16 h-16 bg-red-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
          <span class="text-white font-bold text-2xl">UT</span>
        </div>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Bienvenido a Qué Hay UT
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Inicia sesión con tu cuenta universitaria
        </p>
      </div>

      <!-- Formulario -->
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Correo institucional
            </label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="mt-1 input-field"
              placeholder="tu.email@ut.edu.co"
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="mt-1 input-field"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="form.rememberMe"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Recordarme
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-red-600 hover:text-red-500">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            </span>
            {{ loading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
          </button>
        </div>

        <!-- Información adicional -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-gray-50 text-gray-500">O</span>
            </div>
          </div>

          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              ¿Eres nuevo en la UT?
              <a href="https://www.ut.edu.co" target="_blank" class="font-medium text-red-600 hover:text-red-500">
                Más información aquí
              </a>
            </p>
          </div>
        </div>
      </form>

      <!-- Demo notice -->
      <div class="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div class="flex">
          <InformationCircleIcon class="w-5 h-5 text-blue-400 mt-0.5" />
          <div class="ml-3">
            <h3 class="text-sm font-medium text-blue-800">
              Modo Demostración
            </h3>
            <p class="mt-1 text-sm text-blue-700">
              Esta es una versión de demostración. Usa cualquier email y contraseña para continuar.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { InformationCircleIcon } from '@heroicons/vue/24/outline'

const router = useRouter()

// Estado reactivo
const loading = ref(false)
const form = ref({
  email: '',
  password: '',
  rememberMe: false
})

// Funciones
const handleLogin = async () => {
  loading.value = true
  
  try {
    // Simular autenticación (en producción esto se conectaría al backend)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Simular guardado de token
    localStorage.setItem('auth_token', 'demo_token_12345')
    localStorage.setItem('user_info', JSON.stringify({
      name: 'Usuario Demo',
      email: form.value.email,
      program: 'Ingeniería de Sistemas'
    }))
    
    // Redirigir a la página principal
    router.push('/anuncios')
  } catch (error) {
    alert('Error al iniciar sesión. Inténtalo de nuevo.')
  } finally {
    loading.value = false
  }
}
</script>
