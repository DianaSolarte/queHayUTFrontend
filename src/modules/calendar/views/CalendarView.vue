<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Calendario Académico</h1>
          <p class="text-gray-600 mt-1">
            Fechas importantes, eventos y actividades universitarias
          </p>
        </div>
        
        <div class="mt-4 sm:mt-0 flex space-x-2">
          <select
            v-model="selectedMonth"
            @change="onMonthChange"
            class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option v-for="(month, index) in months" :key="index" :value="index">
              {{ month }}
            </option>
          </select>
          
          <select
            v-model="selectedYear"
            @change="onYearChange"
            class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option v-for="year in years" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Filtros de eventos -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div class="flex flex-wrap gap-4 items-center">
        <span class="text-sm font-medium text-gray-700">Mostrar:</span>
        
        <label class="flex items-center">
          <input
            v-model="filters.academic"
            type="checkbox"
            class="rounded border-gray-300 text-red-600 focus:ring-red-500"
          />
          <span class="ml-2 text-sm text-gray-700">Académico</span>
        </label>
        
        <label class="flex items-center">
          <input
            v-model="filters.events"
            type="checkbox"
            class="rounded border-gray-300 text-red-600 focus:ring-red-500"
          />
          <span class="ml-2 text-sm text-gray-700">Eventos</span>
        </label>
        
        <label class="flex items-center">
          <input
            v-model="filters.deadlines"
            type="checkbox"
            class="rounded border-gray-300 text-red-600 focus:ring-red-500"
          />
          <span class="ml-2 text-sm text-gray-700">Fechas límite</span>
        </label>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Calendario visual -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-semibold text-gray-900">
              {{ months[selectedMonth] }} {{ selectedYear }}
            </h2>
            
            <div class="flex space-x-2">
              <button
                @click="previousMonth"
                class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <ChevronLeftIcon class="w-5 h-5" />
              </button>
              <button
                @click="nextMonth"
                class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <ChevronRightIcon class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Días de la semana -->
          <div class="grid grid-cols-7 gap-1 mb-2">
            <div
              v-for="day in dayNames"
              :key="day"
              class="text-center text-sm font-medium text-gray-500 py-2"
            >
              {{ day }}
            </div>
          </div>

          <!-- Días del mes -->
          <div class="grid grid-cols-7 gap-1">
            <div
              v-for="day in calendarDays"
              :key="`${day.date}-${day.month}`"
              :class="[
                'min-h-[80px] p-2 border border-gray-100 rounded-lg relative',
                {
                  'bg-gray-50 text-gray-400': !day.isCurrentMonth,
                  'bg-red-50 border-red-200': day.isToday,
                  'hover:bg-gray-50': day.isCurrentMonth && !day.isToday
                }
              ]"
            >
              <span class="text-sm font-medium">{{ day.date }}</span>
              
              <!-- Eventos del día -->
              <div class="mt-1 space-y-1">
                <div
                  v-for="event in day.events"
                  :key="event.id"
                  :class="[
                    'text-xs px-2 py-1 rounded text-white truncate cursor-pointer',
                    getEventColor(event.type)
                  ]"
                  :title="event.title"
                  @click="selectEvent(event)"
                >
                  {{ event.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Panel lateral con eventos -->
      <div class="space-y-6">
        <!-- Próximos eventos -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Próximos Eventos</h3>
          
          <div v-if="upcomingEvents.length" class="space-y-3">
            <div
              v-for="event in upcomingEvents"
              :key="event.id"
              class="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              @click="selectEvent(event)"
            >
              <div class="flex items-start space-x-3">
                <div :class="['w-3 h-3 rounded-full mt-1', getEventColor(event.type)]"></div>
                <div class="flex-1">
                  <h4 class="text-sm font-medium text-gray-900">{{ event.title }}</h4>
                  <p class="text-xs text-gray-500 mt-1">{{ formatEventDate(event.date) }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else class="text-center text-gray-500 text-sm">
            No hay eventos próximos
          </div>
        </div>

        <!-- Leyenda -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Leyenda</h3>
          
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span class="text-sm text-gray-700">Académico</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              <span class="text-sm text-gray-700">Eventos</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span class="text-sm text-gray-700">Fechas límite</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'

// Estado reactivo
const selectedMonth = ref(new Date().getMonth())
const selectedYear = ref(new Date().getFullYear())
const filters = ref({
  academic: true,
  events: true,
  deadlines: true
})

// Datos estáticos
const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

const years = ref([2024, 2025, 2026])

// Eventos de ejemplo
const events = ref([
  {
    id: 1,
    title: 'Inicio de clases',
    date: '2025-02-03',
    type: 'academic',
    description: 'Inicio del período académico 2025-1'
  },
  {
    id: 2,
    title: 'Fecha límite inscripciones',
    date: '2025-01-31',
    type: 'deadlines',
    description: 'Último día para inscribir materias'
  },
  {
    id: 3,
    title: 'Semana de inducción',
    date: '2025-01-27',
    type: 'events',
    description: 'Actividades de bienvenida para nuevos estudiantes'
  }
])

// Computed properties
const calendarDays = computed(() => {
  const year = selectedYear.value
  const month = selectedMonth.value
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const firstDayOfWeek = firstDay.getDay()
  const daysInMonth = lastDay.getDate()
  
  const days = []
  
  // Días del mes anterior
  const prevMonth = new Date(year, month - 1, 0)
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = prevMonth.getDate() - i
    days.push({
      date,
      month: month - 1,
      year: month === 0 ? year - 1 : year,
      isCurrentMonth: false,
      isToday: false,
      events: []
    })
  }
  
  // Días del mes actual
  const today = new Date()
  for (let date = 1; date <= daysInMonth; date++) {
    const currentDate = new Date(year, month, date)
    const isToday = currentDate.toDateString() === today.toDateString()
    const dayEvents = getEventsForDate(currentDate)
    
    days.push({
      date,
      month,
      year,
      isCurrentMonth: true,
      isToday,
      events: dayEvents
    })
  }
  
  // Días del mes siguiente
  const remainingDays = 42 - days.length // 6 semanas × 7 días
  for (let date = 1; date <= remainingDays; date++) {
    days.push({
      date,
      month: month + 1,
      year: month === 11 ? year + 1 : year,
      isCurrentMonth: false,
      isToday: false,
      events: []
    })
  }
  
  return days
})

const upcomingEvents = computed(() => {
  const today = new Date()
  return events.value
    .filter(event => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5)
})

// Funciones
const getEventsForDate = (date) => {
  const dateString = date.toISOString().split('T')[0]
  return events.value.filter(event => event.date === dateString)
}

const getEventColor = (type) => {
  const colors = {
    academic: 'bg-blue-500',
    events: 'bg-green-500',
    deadlines: 'bg-yellow-500'
  }
  return colors[type] || 'bg-gray-500'
}

const formatEventDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const previousMonth = () => {
  if (selectedMonth.value === 0) {
    selectedMonth.value = 11
    selectedYear.value--
  } else {
    selectedMonth.value--
  }
}

const nextMonth = () => {
  if (selectedMonth.value === 11) {
    selectedMonth.value = 0
    selectedYear.value++
  } else {
    selectedMonth.value++
  }
}

const onMonthChange = () => {
  // Reactivo automáticamente
}

const onYearChange = () => {
  // Reactivo automáticamente
}

const selectEvent = (event) => {
  alert(`Evento: ${event.title}\nFecha: ${formatEventDate(event.date)}\nDescripción: ${event.description}`)
}

onMounted(() => {
})
</script>
