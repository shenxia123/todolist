<template>
  <div class="tablelist">
    <md-field>
      <label><md-icon>add</md-icon>if you want add lists,please input here...</label>
      <md-input v-model="newText" @keyup.enter="addItem"></md-input>
    </md-field>
    <md-tabs class="md-transparent" md-alignment="fixed">
      <md-tab id="tab-home" md-label="所有事项">
        <md-table v-model="items" md-card>
          <md-table-toolbar>
            <div class="md-toolbar-section-start">
              <h1 class="md-title"></h1>
            </div>

            <md-field md-clearable class="md-toolbar-section-end">
              <md-icon>search</md-icon>
              <md-input placeholder="搜索事项." v-model="searchinfo" @keyup.enter="toSearch" />
            </md-field>
          </md-table-toolbar>
          <md-table-row slot="md-table-row" slot-scope="{ item }" >
            <md-table-cell md-label="是否完成" md-sort-by="id" md-numeric>
              <md-checkbox v-model="item.finished" @change="onchange(item.text, item.finished)">
              </md-checkbox>
            </md-table-cell>
            <md-table-cell md-label="事项" >{{ item.text }}</md-table-cell>
            <md-table-cell md-label="创建时间" md-sort-by="date" >{{ item.date }}</md-table-cell>
            <md-table-cell md-label="属于清单" md-sort-by="date" >{{ item.belong }}</md-table-cell>
            <md-table-cell md-label="完成情况" md-sort-by="finished" >{{ item.finished }}</md-table-cell>
            <md-table-cell md-label="是否删除">
              <a href="#" @click="deleteItem(item.text)">删除</a>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </md-tab>
      <md-tab id="tab-pages" md-label="已完成">
        <md-table v-model="sortItems" md-card>
          <md-table-row slot="md-table-row" slot-scope="{ item }" v-if="item.finished">
            <md-table-cell md-label="事项" >{{ item.text }}</md-table-cell>
            <md-table-cell md-label="创建时间" md-sort-by="date" >{{ item.date }}</md-table-cell>
            <md-table-cell md-label="完成情况" md-sort-by="finished" >{{ item.finished }}</md-table-cell>
          </md-table-row>
        </md-table>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
import bus from '../assets/eventBus'

const toLower = text => {
  return text.toString().toLowerCase()
}

const searchByName = (items, term) => {
  if (term) {
  return items.filter(item => toLower(item.text).includes(toLower(term)))
    }
return items
}

const sortBytext = (items) => {
  let sortItems = items;
  sortItems.sort((a, b) => {
    return a.text > b.text
  })
  return sortItems;
}
export default {

  data() {
    return {
      newText: '',
      upDeadline: false,
      title: 'all',
      newtext: '',
      searchinfo: '',
      isAddline: false,
      items: []
    }
  },
  created() {
    this.init();
  },
  computed: {
    sortItems() {
      let sortItems = this.items;
      sortItems = sortBytext(sortItems);
      return sortItems;
    }
  },
  methods: {
    init() {
      if (this.title === "all") {
        this.items = this.$store.getters.items;
      }
      else{
        this.items = this.$store.getters.getItemsbytitle(this.title);
      }

    },
    addItem() {
      let newItem = {
        text: this.newText,
        date: new Date(),
        belong: this.title,
        finished: false,
        deadline: '请选择截止日期'
      };
      this.$store.commit('addItem', newItem)
      this.newText = '';
      this.init()
    },
    toSearch() {
      console.log(this.searchinfo)
      this.items = searchByName(this.$store.getters.items, this.searchinfo);
      this.searchinfo = ''
    },
    updateFinished(text) {
      this.$store.commit('updateFinished', text)
    },
    deleteItem(text) {
      this.$store.commit('deleteItem', text);
      this.init()
    },
    onchange(item) {
      this.$store.commit('editItem', item);
    }
  },
  mounted() {
    var self = this;
    bus.$on('goListbyTitle', function(msg) {
        self.title = msg;
        self.init()
    });
  }

}
</script>

<style>


</style>

