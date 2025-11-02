<template>
  <footer class="bg-gray-800 text-white mt-12">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Información del proyecto -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Qué Hay UT</h3>
          <p class="text-gray-300 text-sm leading-relaxed">
            Plataforma digital para la comunidad universitaria de la Universidad del Tolima,
            modalidad a distancia. Un proyecto open source para mejorar la comunicación estudiantil.
          </p>
        </div>

        <!-- Enlaces útiles -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Enlaces Útiles</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a href="https://www.ut.edu.co" target="_blank" class="text-gray-300 hover:text-white transition-colors">
                Portal UT
              </a>
            </li>
            <li>
              <a href="https://tuaulavirtual.ut.edu.co/login/index.php" target="_blank" class="text-gray-300 hover:text-white transition-colors">
                Plataforma Distancia
              </a>
            </li>
            <li>
              <a href="https://github.com/DiegoOrejuela/queHayUTJavat" target="_blank" class="text-gray-300 hover:text-white transition-colors">
                Código Fuente Backend
              </a>
              <a href="https://github.com/DianaSolarte/queHayUTFrontend" target="_blank" class="text-gray-300 hover:text-white transition-colors">
                Código Fuente Frontend
              </a>
            </li>
          </ul>
        </div>

        <!-- Contacto -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Proyecto</h3>
          <p class="text-gray-300 text-sm">
            Universidad del Tolima<br>
            Ingeniería de Sistemas<br>
            Modalidad a Distancia
          </p>
          <div class="mt-4">
            <span class="text-xs text-gray-400">
              Desarrollado con ❤️ para la comunidad UT - Syntax Error
            </span>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-8 pt-8 text-center">
        <p class="text-gray-400 text-sm">
          © {{ currentYear }} Qué Hay UT. Proyecto Open Source - Universidad del Tolima
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
