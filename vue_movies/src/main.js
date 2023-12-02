import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'

// Función para cargar dinámicamente las traducciones
function loadLocaleMessages() {
  // Indicamos cual es el fichero de traducciones, en funcion de la estructura  
  const locales = require.context('./translations', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

const i18n = createI18n({
  // creamos el idioma por defecto  
  locale: 'es',
  messages: loadLocaleMessages()
})

createApp(App).use(router).use(i18n).mount('#app')
