import Vue from 'vue'
import {
  Container,
  CheckboxGroup,
  Checkbox,
  Main,
  Aside,
  Header,
  Menu,
  MenuItemGroup,
  MenuItem,
  Submenu,
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
  Row,
  Col,
  Tooltip,
  Tag,
  Card,
  Breadcrumb,
  BreadcrumbItem,
  Skeleton,
  Select,
  SkeletonItem,
  TableColumn,
  Pagination,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Dialog,
  DatePicker,
  Cascader,
  Option,
  Autocomplete,
  TimeSelect,
  InputNumber,
  Upload,
  Switch,
  Message,
  MessageBox,
  Loading,
  Notification
} from 'element-ui'
Vue.use(Container)
Vue.use(Dialog)
Vue.use(Header)
Vue.use(Switch)
Vue.use(Checkbox)
Vue.use(Tag)
Vue.use(Upload)
Vue.use(Option)
Vue.use(Select)
Vue.use(CheckboxGroup)
Vue.use(InputNumber)
Vue.use(TimeSelect)
Vue.use(Main)
Vue.use(Autocomplete)
Vue.use(Aside)
Vue.use(DatePicker)
Vue.use(Menu)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(MenuItem)
Vue.use(Skeleton)
Vue.use(SkeletonItem)
Vue.use(MenuItemGroup)
Vue.use(BreadcrumbItem)
Vue.use(Breadcrumb)
Vue.use(Cascader)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Pagination)
Vue.use(Card)
Vue.use(Row)
Vue.use(Submenu)
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tooltip)
Vue.use(Image)
Vue.use(Avatar)
Vue.use(Icon)
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
