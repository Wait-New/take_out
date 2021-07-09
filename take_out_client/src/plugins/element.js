import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Icon,
  Table,
  Message,
  MessageBox,
  Loading,
  Notification
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Icon)
Vue.use(Table)

// 挂载到原型上
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
