import MyVue from './instance/index'
import { initGlobalApi } from './global-api/index'

initGlobalApi(MyVue)

export default MyVue