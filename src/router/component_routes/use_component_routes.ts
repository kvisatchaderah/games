import components_map from './components_map'

export default function () {
  return Object.keys(components_map).map((component_name) => {
    if (component_name == '/')
      return {
        path: `/`,
        component: () => import(`@/views/index/index.vue`),
      }

    return {
      path: `/${component_name}`,
      component: () =>
        import(`@/views/${component_name}/${component_name}.vue`),
    }
  })
}
