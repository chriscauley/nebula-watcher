import { reactive } from 'vue'
import qs from 'query-string'

const state = reactive({
  categories: {}
})

const intercepted = []

const interceptXHR = window.__NW.interceptXHR = ({ response, url }) => {
  intercepted.push({ response, url })
  const [path, query_string] = url.split('?')
  const query = qs.parse(query_string)
  const resource = path.split('/').pop()
  if (resource === 'categories') {
    response.forEach(({ friendly_title, title, values }) => {
      if (!state.categories[friendly_title]) {
        state.categories[friendly_title] = { friendly_title, title, values }
      } else {
        values.forEach(v => {
          if (!state.categories[friendly_title].values.includes(v)) {
            console.log('missing value', v, state.categories[friendly_title].values.slice())
          }
        })
      }
    })
  }
}

window.__NW.xhr_backlog.forEach(interceptXHR)

export default { state }