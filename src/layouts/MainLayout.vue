<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <Navbar />
    
    <!-- Contenido principal -->
    <main class="container mx-auto px-4 py-6">
      <router-view />
    </main>
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>
