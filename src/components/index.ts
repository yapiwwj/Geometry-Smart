import SvgIcon from './SvgIcon/mySvg.vue'

const allGlobalComponent: Record<string, any> = { SvgIcon }

export default {
  install(app: any) {
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key])
    })
  }
}
