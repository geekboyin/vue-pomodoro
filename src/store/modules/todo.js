import _ from 'lodash'
// state
const state = {
  all: window.localStorage.getItem('todos') ? JSON.parse(window.localStorage.getItem('todos')) : []
}

// update state
const updateState = (state, todo) => {
  var index = _.indexOf(state.all, _.find(state.all, {id: todo.id}))
  state.all.splice(index, 1, todo)
}
const updateLocalStorage = (key, value) => {
  window.localStorage.setItem(key, value)
}

// mutations
const mutations = {
  'SAVE_TODO' (state, { todo }) {
    state.all.unshift(todo)
    updateLocalStorage('todos', JSON.stringify(state.all))
  },
  'UPDATE_TODO' (state, { data }) {
    let todo = data.todo
    let status = data.status
    todo.status = status
    updateState(state, todo)
    updateLocalStorage('todos', JSON.stringify(state.all))
  },
  'UPDATE_TODO_TITLE' (state, { data }) {
    let todo = data.todo
    let title = data.title
    todo.title = title
    updateState(state, todo)
    updateLocalStorage('todos', JSON.stringify(state.all))
  },
  'DELETE_TODO' (state, { todo }) {
    state.all = _.remove(state.all, (item) => {
      return item.id !== todo.id
    })
    console.log(state.all)
    updateLocalStorage('todos', JSON.stringify(state.all))
  }
}

export default { state, mutations }
