<template>
  <div>
    <div class="controls">
      <div v-if="itemAdded">
        <el-button @click="box.posX--" type="success" icon="el-icon-arrow-left" circle></el-button>
        <el-button @click="box.posX++" type="success" icon="el-icon-arrow-right" circle></el-button>
        <el-button @click="box.posY++" type="success" icon="el-icon-arrow-up" circle></el-button>
        <el-button @click="box.posY--" type="success" icon="el-icon-arrow-down" circle></el-button>

        <el-button type="danger" icon="el-icon-delete" circle v-on:click="deleteBox()"></el-button>
      </div>
      <div v-if="!itemAdded">
        <el-button type="primary" @click="dialogVisible = true">Create Box</el-button>
      </div>

    </div>
    <el-dialog
      title="Tips"
      :visible.sync="dialogVisible"
      width="30%">
      <span>
        <div v-if="!itemAdded">
          <el-input-number v-model="box.W" :min="1" :max="10"></el-input-number>
          <el-input-number v-model="box.H" :min="1" :max="10"></el-input-number>
          <el-input-number v-model="box.D" :min="1" :max="10"></el-input-number>
          <el-color-picker v-model="box.color"></el-color-picker>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false; createBox()">Create Box</el-button>
      </span>
    </el-dialog>
    <a-scene>
      <a-camera :position="`${box.posX} ${box.posY - 5} 5`" rotation="20 0 0"></a-camera>

      <vue-box :ref="box.ID" v-for="(box, i) in items" :key="i" :data="box"></vue-box>

      <a-plane position="0 0 0" rotation="0 0 0" width="100" height="100" color="#7BC8A4"></a-plane>
    </a-scene>
  </div>
</template>

<script>
import VueBox from '@/components/shared/VueBox'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyASz5KM7KXNFasDYMa4Z8HYb4wdTrp2tM4',
  authDomain: 'openweb-4da57.firebaseapp.com',
  databaseURL: 'https://openweb-4da57.firebaseio.com',
  projectId: 'openweb-4da57',
  storageBucket: 'openweb-4da57.appspot.com',
  messagingSenderId: '360749948568'
})
const db = firebaseApp.database()

export default {
  name: 'HelloWorld',
  components: {
    VueBox
  },
  data () {
    return {
      dialogVisible: true,
      itemAdded: false,
      items: [],
      box: {
        position: '0 0 0',
        posX: 1,
        posY: 1,
        posZ: 1,
        W: 1,
        H: 1,
        D: 1,
        color: '#000000'
      }
    }
  },
  firebase: {
    items: db.ref('items')
  },
  watch: {
    box: {
      handler (val) {
        if ((val.posX > -50 && val.posX < 50) && (val.posY > -50 && val.posY < 50)) {
          this.updateBox(val.posX, val.posY)
        }
      },
      deep: true
    }
  },
  methods: {
    createBox () {
      this.box.position = `${this.box.posX} ${this.box.posY} ${this.box.posZ}`
      const key = this.$firebaseRefs.items.push(this.box).key
      this.$localStorage.set('item', key)
      this.itemAdded = true
    },
    updateBox (x, y) {
      this.$firebaseRefs.items.child(this.$localStorage.get('item')).child('position').set(`${x} ${y} 1`)
    },
    deleteBox (item) {
      this.$firebaseRefs.items.child(this.$localStorage.get('item')).remove()
      this.$localStorage.remove('item')
      this.itemAdded = false
      this.dialogVisible = true
    }
  },
  created () {
    this.itemAdded = this.$localStorage.get('item').length === '-LA5DcxzDkU-CFmaPDbx'.length
    this.dialogVisible = !this.itemAdded
  }
}
</script>

<style scoped>
  .controls {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    margin: 15px;
  }
</style>
