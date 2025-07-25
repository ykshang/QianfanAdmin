const components = import.meta.glob('@/components/*.vue')
export default {
  install (app) {
    console.log(components)
    for (const path in components) {
      const componentName = path.match(/([^\/]+)\.[^\/]+$/);
      if (componentName) {
        components[path]().then((module) => {
          app.component(componentName[1], module.default || module)
        })
      }
    }
  },
};