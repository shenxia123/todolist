import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)

const TODO_ITEMS = 'items'
const TODO_LISTS = 'lists'
const LIST_NUM = 'listnum'
const USERS='users'
const USER_NUM='usernum'
const IS_LOGIN='islogin'

const state = {
  items: JSON.parse(window.localStorage.getItem(TODO_ITEMS) || '[]'),
  lists: JSON.parse(window.localStorage.getItem(TODO_LISTS) || '[]'),
  users: JSON.parse(window.localStorage.getItem(USERS) || '[]'),
  islogin: window.localStorage.getItem(IS_LOGIN),
}

const getters = {
  items: state => state.items,
  lists: state => state.lists,
  users: state => state.users,
  islogin: state => state.islogin,
  getItemsbytitle: state => title => {
    let thisitems = [];
    var downitems = state.items.find(item => {
        if (item.belong == title){
          thisitems.push(item)
        }
      });
    return thisitems;
  },
  getAllfinished(state) {
    var finish = [];
    state.items.forEach((item) => {
      if(item.finished === true){
        finish.push(item);
      }
    })
    return finish;
  },
  getFinish: state => text => {
    state.items.forEach((item) => {
      if(item.text === text){
        return item.finished
      }
    })
  }
}

const mutations = {
	addUser(state, obj) {
    console.log(obj)
		var username = obj.username;
		var password = obj.password;
    state.users.push({username: username, password: password})
	},
  addList(state, obj) {
    let newList = {
        id: state.listnum++,
        title: obj.title,
        count: obj.count
      };
    state.lists.push(newList);
  },
  addItem(state, obj) {
    var newitem = {
        text: obj.text,
        date: obj.date,
        belong: obj.belong,
        finished: obj.finished,
        deadline: obj.deadline
      };
    state.items.push(newitem);
  },
  editItem(state, obj) {

  },
  deleteItem(state, text) {
    state.items.splice(state.items.findIndex(item => item.text == text), 1)
  },
  updateFinished(state, text) {
    state.items[state.items.findIndex(item => item.text == text)].finished = !state.items[state.items.findIndex(item => item.text == text)].finished;
  },
  setLogin (state, islogin) {
    state.islogin = islogin;
  }
}

const localStoragePlugin = store => {
  store.subscribe((mutation, { items, lists, islogin, users }) => {
    window.localStorage.setItem(TODO_ITEMS, JSON.stringify(items))
    window.localStorage.setItem(TODO_LISTS, JSON.stringify(lists))

    window.localStorage.setItem(IS_LOGIN, islogin)
    window.localStorage.setItem(USERS, JSON.stringify(users))

  })
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  plugins: [localStoragePlugin]
})
