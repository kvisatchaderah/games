import { defineComponent } from 'vue'
import use_component_router_links from '@/router/component_routes/use_component_router_links'

export default defineComponent({
  setup() {
    return { ...use_component_router_links() }
  },
})
