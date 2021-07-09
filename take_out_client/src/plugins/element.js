import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Icon,
  Table,
  Input,
  Radio,
  RadioGroup,
  Image,
  Avatar,
  Message,
  MessageBox,
  Loading,
  Notification
} from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Image)
Vue.use(Avatar)
Vue.use(Icon)
Vue.use(Table)
Vue.use(Radio)
Vue.use(RadioGroup)

// 挂载到原型上
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
