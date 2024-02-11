import { createPinia } from 'pinia'
import { useStoreProducts } from './modules/storeProducts'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export { useStoreProducts }
export default pinia
