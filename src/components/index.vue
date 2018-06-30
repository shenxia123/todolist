<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="overlap" style="height: 800px">
      <md-app-toolbar class="md-primary md-large" >
        <div class="md-toolbar-row" >
          <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
            <md-icon>menu</md-icon>
          </md-button>

          <span class="md-title">人生需要规划</span>

          <md-avatar style="position:relative;right:780px;top:50px;"><img src="../assets/toxiang.png" style="width:200px"></md-avatar>
        </div>

      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" style="height: 700px">
        <md-toolbar class="md-transparent" md-elevation="0">
         Menu
        </md-toolbar>
        <md-list>
          <md-list-item href="#" @click="goTitle('all')">
              <span class="md-list-item-text">All</span>
          </md-list-item>
          <md-list-item href="#" v-for="list in lists" @click="goTitle(list.title)">
              <span class="md-list-item-text">{{list.title}}</span>
          </md-list-item>

          <md-list-item href="#" v-if="isAdd">
              <md-field>
                <label>新建清单</label>
                <md-input @keyup.enter="addList" v-model="newTitle"></md-input>
              </md-field>
          </md-list-item>

          <md-list-item href="#" @click="isAdd = true">
              <span class="md-list-item-text">+新建清单</span>
          </md-list-item>


        </md-list>
      </md-app-drawer>

     <md-app-content style="height: 600px ">
        <todo></todo>
      </md-app-content>
    </md-app>
  </div>
</template>


<script>
import todo from './todo'
import bus from '../assets/eventBus'

export default {
  data: () => ({
    id: 0,
    newTitle: '',
    menuVisible: false,
    isAdd: false,
  }),
  computed: {
    lists() {
      return this.$store.getters.lists;
    }
  },
  components: {
    todo
  },
  methods: {
    addList() {
      let newList = {
        title: this.newTitle,
        count: 0
      };
      this.$store.commit('addList', newList);
      this.newTitle = '';
      this.isAdd = false
    },
    goTitle(title) {
      bus.$emit('goListbyTitle', title)
    }
  }
}
</script>

<style scoped>

.md-list{
  background-color:pink;
}
.md-app-content{
  background-color:pink;
}
.md-toolbar{
   background:-webkit-linear-gradient(top,palevioletred,palevioletred);
}
.page-container{
  background-color: palevioletred;
}
</style>
