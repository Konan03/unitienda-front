/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

//veutify
import vuetify from './plugins/vuetify'

//router
import router from './router';



const app = createApp(App)

registerPlugins(app)

app.use(vuetify)
//app.use(router); 

app.mount('#app')

