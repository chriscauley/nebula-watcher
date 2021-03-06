<template>
<div class="app-trigger" @click="toggle">
  <img src="../public/icons/icon64.png" />
</div>
<div class="modal" v-if="open">
  <div class="modal-mask" @click="toggle" />
  <div class="modal-content">
    <div class="modal-close" @click="toggle" />
    <h2>Videos</h2>
    <div class="flex-list">
      <div v-for="video in videos" :key="video.friendly_title" class="item">
        {{ video.title }}
      </div>
    </div>
    <h2>Categories</h2>
    <div class="flex-list">
      <div v-for="category in categories" :key="category.friendly_title" class="item">
        {{ category.title }}
      </div>
    </div>
  </div>
</div>
</template>

<script>
import store from '@/store'

export default {
  name: 'App',
  data() {
    return {open: false}
  },
  computed: {
    categories: store.nebula.listCategories,
    videos: store.nebula.listVideos,
  },
  methods: {
    toggle() {
      this.open = !this.open
    }
  }
}
</script>
