import api from './index.js'

export const communityAPI = {
  // Obtener todas las publicaciones de la comunidad
  getAll: () => api.get('/community/posts'),
  
  // Obtener publicación por ID
  getById: (id) => api.get(`/community/posts/${id}`),
  
  // Crear nueva publicación
  create: (post) => api.post('/community/posts', post),
  
  // Actualizar publicación
  update: (id, post) => api.put(`/community/posts/${id}`, post),
  
  // Eliminar publicación
  delete: (id) => api.delete(`/community/posts/${id}`),
  
  // Buscar publicaciones
  search: (query) => api.get(`/community/posts/buscar?q=${query}`),
  
  // Obtener publicaciones por categoría
  getByCategory: (category) => api.get(`/community/posts?categoria=${category}`)
}
