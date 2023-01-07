import components_map from './components_map'

export default function () {
  return {
    component_router_links: Object.keys(components_map).map(
      (component_name: string) => {
        return {
          path: `${component_name}`,
          name: ` ${components_map[component_name]}
          `,
        }
      },
    ),
  }
}
