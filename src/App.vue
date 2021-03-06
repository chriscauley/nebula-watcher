<template>
<div class="app-trigger" @click="toggle">
  <img src="../public/icons/icon64.png" />
</div>
<div class="modal" v-if="open">
  <div class="modal-mask" @click="toggle" />
  <div class="modal-content">
    <div class="modal-close" @click="toggle" />
    Woo!
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
  methods: {
    toggle() {
      this.open = !this.open
    }
  }
}
</script>
