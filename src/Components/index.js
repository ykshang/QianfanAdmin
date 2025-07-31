const components = import.meta.glob('@/components/*.vue')
export default {
  install (app) {
    for (const path in components) {
    console.log(path)
      const componentName = path.match(/([^\/]+)\.[^\/]+$/);
      if (componentName) {
        components[path]().then((module) => {
          app.component(componentName[1], module.default || module)
        })
      }
    }
  },
};