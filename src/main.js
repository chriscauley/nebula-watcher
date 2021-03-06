import { createApp } from 'vue'
import App from './App.vue'

const APP_ID = "nebula-watcher-app"
if (!document.getElementById(APP_ID)) {
  const el = document.createElement('div')
  el.id = APP_ID
  document.body.appendChild(el)
}

createApp(App).mount('#' + APP_ID)

console.log('arst')