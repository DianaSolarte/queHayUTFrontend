import api from './index.js'

export const teachersAPI = {
  // Obtener todos los docentes (usuarios)
  getAll: () => api.get('/docentes'),
  
  // Obtener docente por ID
  getById: (id) => api.get(`/usuarios/${id}`),
  
  // Crear nuevo docente
  create: (teacher) => api.post('/usuarios', teacher),
  
  // Actualizar docente
  update: (id, teacher) => api.put(`/usuarios/${id}`, teacher),
  
  // Eliminar docente
  delete: (id) => api.delete(`/usuarios/${id}`),
  
  // Buscar docentes
  search: (query) => api.get(`/usuarios/buscar?q=${query}`)
}
