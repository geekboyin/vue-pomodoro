<template>
  <div class="todo">
    <div class="todo-stat">
      <h3>Your tasks</h3>
      <span>{{ comletedTasks }} done / {{ todos.length }} task(s)</span>
    </div>

    <div class="todo-form">
      <input id="task-input" placeholder="Create a task" v-model="newTask" @keypress.enter="addNewTask">
    </div><!-- end .todo-form -->

    <div class="todo-list">
      <ul class="list" v-if="todos.length > 0">
        <todo-item v-for="todo in todos" :todo="todo"></todo-item>
      </ul>

      <p class="not-found" v-if="todos.length === 0">No tasks found!</p>
    </div><!-- end .todo-list -->
  </div>
</template>

<script>
  import TodoItem from './TodoItem'
  export default {
    components: {
      TodoItem
    },
    computed: {
      todos () {
        return this.$store.getters.todos
      },
      comletedTasks () {
        var count = 0
        this.todos.forEach((todo) => {
          if (todo.status === 'complete') {
            count++
          }
        })
        return count
      }
    },
    data () {
      return {
        newTask: ''
      }
    },
    methods: {
      addNewTask () {
        let value = this.newTask && this.newTask.trim()
        if (!value) {
          return
        }
        let id = this.generateRandomStr(5)
        let todo = { id: id, title: value, status: 'incomplete' }
        this.$store.dispatch('insertTodo', todo)
        this.newTask = ''
      },
      generateRandomStr (length) {
        return Math.random().toString(36).substr(2, length)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .todo {
    margin-top: 60px;
    width: 400px;
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

    .not-found {
      color: #a2a2a2;
      text-align: center;
      padding: 20px 0;
      font-style: italic;
    }
  }
</style>
