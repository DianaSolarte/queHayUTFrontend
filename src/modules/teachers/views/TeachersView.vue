<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Directorio de Docentes</h1>
          <p class="text-gray-600 mt-1">
            Encuentra información de contacto y recursos de tus profesores
          </p>
        </div>
        
        <!-- Búsqueda -->
        <div class="mt-4 sm:mt-0">
          <div class="relative">
            <MagnifyingGlassIcon class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar docente..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Filtros -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div class="flex flex-wrap gap-4 items-center">
        <span class="text-sm font-medium text-gray-700">Filtrar por:</span>
        
        <select
          v-model="selectedProgram"
          class="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="">Todos los programas</option>
          <option value="sistemas">Ingeniería de Sistemas</option>
          <option value="civil">Ingeniería Civil</option>
          <option value="industrial">Ingeniería Industrial</option>
          <option value="administracion">Administración</option>
        </select>

        <select
          v-model="selectedFaculty"
          class="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="">Todas las facultades</option>
          <option value="ingenieria">Ingeniería</option>
          <option value="ciencias">Ciencias</option>
          <option value="humanidades">Humanidades</option>
        </select>

        <button
          @click="clearFilters"
          class="text-sm text-red-600 hover:text-red-800 font-medium"
        >
          Limpiar filtros
        </button>
      </div>
    </div>

    <!-- Grid de docentes -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="teacher in filteredTeachers"
        :key="teacher.id"
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
      >
        <!-- Foto y nombre -->
        <div class="text-center mb-4">
          <div class="w-20 h-20 bg-red-100 rounded-full mx-auto mb-3 flex items-center justify-center">
            <AcademicCapIcon class="w-10 h-10 text-red-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900">{{ teacher.nombre }}</h3>
          <p class="text-sm text-gray-600">{{ teacher.titulo }}</p>
        </div>

        <!-- Información -->
        <div class="space-y-3">
          <div class="flex items-center text-sm">
            <BuildingOfficeIcon class="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
            <span class="text-gray-700">{{ teacher.facultad }}</span>
          </div>
          
          <div class="flex items-center text-sm">
            <BookOpenIcon class="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
            <span class="text-gray-700">{{ teacher.programa }}</span>
          </div>
          
          <div class="flex items-start text-sm">
            <ClipboardDocumentListIcon class="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p class="text-gray-700 font-medium">Materias:</p>
              <p class="text-gray-600">{{ teacher.materias.join(', ') }}</p>
            </div>
          </div>
        </div>

        <!-- Contacto -->
        <div class="mt-4 pt-4 border-t border-gray-100">
          <div class="space-y-2">
            <div class="flex items-center text-sm">
              <EnvelopeIcon class="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
              <a
                :href="`mailto:${teacher.email}`"
                class="text-red-600 hover:text-red-800 truncate"
              >
                {{ teacher.email }}
              </a>
            </div>
            
            <div v-if="teacher.telefono" class="flex items-center text-sm">
              <PhoneIcon class="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
              <span class="text-gray-700">{{ teacher.telefono }}</span>
            </div>
            
            <div v-if="teacher.oficina" class="flex items-center text-sm">
              <MapPinIcon class="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
              <span class="text-gray-700">{{ teacher.oficina }}</span>
            </div>
          </div>
        </div>

        <!-- Horario de atención -->
        <div v-if="teacher.horarioAtencion" class="mt-4 p-3 bg-gray-50 rounded-lg">
          <div class="flex items-center text-sm">
            <ClockIcon class="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
            <div>
              <p class="font-medium text-gray-700">Horario de atención:</p>
              <p class="text-gray-600">{{ teacher.horarioAtencion }}</p>
            </div>
          </div>
        </div>

        <!-- Acciones -->
        <div class="mt-4 flex space-x-2">
          <button
            @click="sendEmail(teacher.email)"
            class="flex-1 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
          >
            Contactar
          </button>
          
          <button
            v-if="teacher.recursos"
            @click="viewResources(teacher)"
            class="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
          >
            Recursos
          </button>
        </div>
      </div>
    </div>

    <!-- Estado vacío -->
    <div v-if="filteredTeachers.length === 0" class="text-center py-12">
      <AcademicCapIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">No se encontraron docentes</h3>
      <p class="text-gray-600">
        Intenta ajustar los filtros de búsqueda
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  MagnifyingGlassIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/vue/24/outline'

// Estado reactivo
const searchQuery = ref('')
const selectedProgram = ref('')
const selectedFaculty = ref('')

// Datos de ejemplo
const teachers = ref([
  {
    id: 1,
    nombre: "Dr. Juan Carlos Pérez",
    titulo: "Profesor Titular",
    facultad: "Facultad de Ingeniería",
    programa: "Ingeniería de Sistemas",
    materias: ["Programación Orientada a Objetos", "Ingeniería de Software", "Bases de Datos"],
    email: "juan.perez@ut.edu.co",
    telefono: "+57 (8) 123-4567",
    oficina: "Edificio A - Oficina 201",
    horarioAtencion: "Lunes a Viernes: 8:00 AM - 10:00 AM",
    recursos: true
  },
  {
    id: 2,
    nombre: "Mg. María Elena Rodríguez",
    titulo: "Profesora Asociada",
    facultad: "Facultad de Ingeniería",
    programa: "Ingeniería de Sistemas",
    materias: ["Algoritmos y Estructuras de Datos", "Programación I", "Matemáticas Discretas"],
    email: "maria.rodriguez@ut.edu.co",
    telefono: "+57 (8) 123-4568",
    oficina: "Edificio A - Oficina 203",
    horarioAtencion: "Martes y Jueves: 2:00 PM - 4:00 PM",
    recursos: false
  },
  {
    id: 3,
    nombre: "Ing. Carlos Alberto Martínez",
    titulo: "Profesor Asistente",
    facultad: "Facultad de Ingeniería",
    programa: "Ingeniería Civil",
    materias: ["Estática", "Resistencia de Materiales", "Estructuras"],
    email: "carlos.martinez@ut.edu.co",
    telefono: "+57 (8) 123-4569",
    oficina: "Edificio B - Oficina 105",
    horarioAtencion: "Lunes, Miércoles y Viernes: 10:00 AM - 12:00 PM",
    recursos: true
  },
  {
    id: 4,
    nombre: "Dra. Ana Sofía González",
    titulo: "Profesora Titular",
    facultad: "Facultad de Ciencias",
    programa: "Administración de Empresas",
    materias: ["Administración Estratégica", "Gestión de Recursos Humanos", "Liderazgo"],
    email: "ana.gonzalez@ut.edu.co",
    telefono: "+57 (8) 123-4570",
    oficina: "Edificio C - Oficina 301",
    horarioAtencion: "Martes y Jueves: 9:00 AM - 11:00 AM",
    recursos: true
  }
])

// Computed
const filteredTeachers = computed(() => {
  let filtered = [...teachers.value]

  // Filtro por búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(teacher => 
      teacher.nombre.toLowerCase().includes(query) ||
      teacher.materias.some(materia => materia.toLowerCase().includes(query)) ||
      teacher.programa.toLowerCase().includes(query)
    )
  }

  // Filtro por programa
  if (selectedProgram.value) {
    const programMap = {
      'sistemas': 'Ingeniería de Sistemas',
      'civil': 'Ingeniería Civil',
      'industrial': 'Ingeniería Industrial',
      'administracion': 'Administración de Empresas'
    }
    filtered = filtered.filter(teacher => 
      teacher.programa === programMap[selectedProgram.value]
    )
  }

  // Filtro por facultad
  if (selectedFaculty.value) {
    const facultyMap = {
      'ingenieria': 'Facultad de Ingeniería',
      'ciencias': 'Facultad de Ciencias',
      'humanidades': 'Facultad de Humanidades'
    }
    filtered = filtered.filter(teacher => 
      teacher.facultad === facultyMap[selectedFaculty.value]
    )
  }

  return filtered.sort((a, b) => a.nombre.localeCompare(b.nombre))
})

// Funciones
const clearFilters = () => {
  searchQuery.value = ''
  selectedProgram.value = ''
  selectedFaculty.value = ''
}

const sendEmail = (email) => {
  window.location.href = `mailto:${email}`
}

const viewResources = (teacher) => {
  alert(`Recursos de ${teacher.nombre}:\n\n• Material de clase\n• Ejercicios prácticos\n• Bibliografía recomendada\n• Enlaces útiles`)
}
</script>
