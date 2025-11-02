import api from './index.js'

export const announcementsAPI = {
  // Obtener todos los anuncios (eventos)
  getAll: () => api.get('/eventos'),
  
  // Obtener anuncio por ID
  getById: (id) => api.get(`/eventos/${id}`),
  
  // Crear nuevo anuncio
  create: (announcement) => api.post('/eventos', announcement),
  
  // Actualizar anuncio
  update: (id, announcement) => api.put(`/eventos/${id}`, announcement),
  
  // Eliminar anuncio
  delete: (id) => api.delete(`/eventos/${id}`),
  
  // Obtener anuncios recientes
  getRecent: (limit = 5) => api.get(`/eventos?limit=${limit}`),
  
  // Buscar anuncios
  search: (query) => api.get(`/eventos/buscar?q=${query}`)
}
