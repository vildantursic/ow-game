// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'aframe'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import VueLocalStorage from 'vue-localstorage'
import {
  Dialog,
  Button,
  InputNumber,
  ColorPicker
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueLocalStorage)
Vue.use(VueFire)

Vue.component(Dialog.name, Dialog)
Vue.component(ColorPicker.name, ColorPicker)
Vue.component(InputNumber.name, InputNumber)
Vue.component(Button.name, Button)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  localStorage: {
    item: {
      type: Object
    }
  },
  components: { App },
  template: '<App/>'
})
