import api from './index.js'

export const calendarAPI = {
  // Obtener todos los eventos
  getAll: () => api.get('/eventos'),
  
  // Obtener eventos por rango de fechas
  getByDateRange: (startDate, endDate) => 
    api.get(`/eventos/rango?inicio=${startDate}&fin=${endDate}`),
  
  // Obtener eventos próximos
  getUpcoming: (limit = 10) => api.get(`/eventos/proximos?limit=${limit}`),
  
  // Obtener evento por ID
  getById: (id) => api.get(`/eventos/${id}`),
  
  // Crear nuevo evento
  create: (event) => api.post('/eventos', event),
  
  // Actualizar evento
  update: (id, event) => api.put(`/eventos/${id}`, event),
  
  // Eliminar evento
  delete: (id) => api.delete(`/eventos/${id}`)
}
