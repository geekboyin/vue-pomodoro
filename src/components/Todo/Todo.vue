<template>
  <div class="todo-wrapper item-flex">
    <div class="todo">
      <div class="todo-stat">
        <h3>Your tasks</h3>
        <span class="completed-tasks">{{ completedTasks }} done</span> /
        <span class="total-tasks">{{ todos.length }} {{ todos.length | pluralize('task')}}</span>
      </div>

      <div class="todo-form">
        <input id="task-input" placeholder="Create a task" v-model="newTask" @keypress.enter="addNewTask">
      </div><!-- end .todo-form -->

      <div class="todo-list">
        <ul class="list" v-if="todos.length > 0">
          <todo-item v-for="todo in filteredTodos" :todo="todo"></todo-item>
        </ul>
        <p class="not-found" v-if="!todos.length">No tasks found!</p>
      </div><!-- end .todo-list -->

      <div class="todo-filter" v-if="todos.length">
        <nav class="filters">
          <a v-for="(val, key) in filters"
             :href="'#/' + key"
              :class="{ selected: visibility === key }"
              @click="visibility = key">{{ key | capitalize }}</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
  import TodoItem from './TodoItem'

  const filters = {
    all: todos => todos,
    active: todos => todos.filter(todo => !todo.completed),
    completed: todos => todos.filter(todo => todo.completed)
  }

  export default {
    components: {
      TodoItem
    },
    computed: {
      todos () {
        return this.$store.getters.todos
      },
      filteredTodos () {
        return filters[this.visibility](this.todos)
      },
      completedTasks () {
        return this.todos.filter(todo => todo.completed).length
      }
    },
    data () {
      return {
        newTask: '',
        visibility: 'all',
        filters: filters
      }
    },
    methods: {
      addNewTask () {
        let value = this.newTask && this.newTask.trim()
        if (!value) {
          return
        }
        let id = this.generateRandomStr(5)
        let todo = {
          id: id,
          title: value,
          completed: false
        }
        this.$store.dispatch('insertTodo', todo)
        this.newTask = ''
      },
      generateRandomStr (length) {
        return Math.random().toString(36).substr(2, length)
      }
    },
    filters: {
      pluralize: (n, w) => n === 1 ? w : (w + 's'),
      capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
    }
  }
</script>

<style lang="scss" scoped>
  @import './../../sass/variable';
  @import './../../sass/mixins';

  .todo-wrapper {
    padding: 100px 0;
    align-self: center;
  }
  .todo {
    width: 50%;
    margin: 0 auto;
    &-stat {
      margin: 20px 0;
      h3 {
        font-size: 20px;
      }
      span {
        font-size: 14px;
      }
    }
    &-form {
      input {
        border: 1px solid #ccc;
        padding: 10px;
        font-family: inherit;
        outline: none;
        border-radius: 3px;
        width: 100%;
        box-sizing: border-box;
        font-size: 1em;
      }
    }
    &-list {
      margin-top: 10px;
    }

    &-filter {
      text-align: center;
      margin-top: 25px;
      a {
        text-decoration: none;
        color: $gray_color;
        font-size: .8em;
        padding: 0 10px;
        @include transition(color .3s ease);
        &:hover {
          color: $dark_color;
        }
        &.selected {
          color: $primary_color;
          text-decoration: underline;
        }
      }
    }

    .not-found {
      color: $gray_color;
      text-align: center;
      padding: 20px 0;
      font-style: italic;
    }
  }
</style>
