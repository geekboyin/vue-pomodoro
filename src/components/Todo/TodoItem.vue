<template>
  <li class="todo-item" :class="{ completed: todo.completed }">
    <div class="todo-item__form" v-if="editing">
      <input type="text"
             :value="todo.title"
             v-focus="editing"
             @keyup.enter="saveTodo"
             @keyup.esc="cancelEditing">
      <nav class="edit-action">
        <span class="edit-action__item color-success" @click="saveTodo"><i class="ion-checkmark"></i>Save</span>
        <span class="edit-action__item color-danger" @click="cancelEditing"><i class="ion-close"></i>Cancel</span>
      </nav>
    </div>


    <template v-if="!editing">
      <span v-text="todo.title" class="title"></span>
      <span class="action">
        <span class="mark-done" title="Complete" @click="done(todo)" v-if="! todo.completed"><i class="ion-checkmark"></i></span>
        <span class="mark-undone" title="Redo" @click="undone(todo)" v-if="todo.completed"><i class="ion-refresh"></i></span>
        <span class="mark-edit" title="Edit" @click="editing = true"><i class="ion-edit"></i></span>
        <span class="mark-trash" title="Delete" @click="trash(todo)"><i class="ion-trash-a"></i></span>
      </span>
    </template>
  </li>
</template>

<script>
  import $ from 'jquery'
  export default {
    props: ['todo'],
    computed: {
    },
    data () {
      return {
        editing: false
      }
    },
    directives: {
      focus (el, { value }, { context }) {
        if (value) {
          context.$nextTick(() => {
            el.focus()
          })
        }
      }
    },
    methods: {
      done (todo) {
        this.$store.dispatch('updateTodoStatus', { todo: todo, completed: true })
      },
      undone (todo) {
        this.$store.dispatch('updateTodoStatus', { todo: todo, completed: false })
      },
      cancelEditing () {
        this.editing = false
      },
      saveTodo (event) {
        let form = $(event.currentTarget).parents('.todo-item__form')
        let value = form.find('input').val().trim()
        if (!value) {
          return
        }
        this.editing = false
        this.$store.dispatch('updateTodoTitle', { todo: this.todo, title: value })
      },
      trash (todo) {
        let confirm = window.confirm('Are you sure to delete this task?')
        if (confirm === true) {
          this.$store.dispatch('deleteTodo', todo)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './../../sass/variable';
  @import './../../sass/mixins';

  .color-success {
    color: $success_color;
  }
  .color-danger {
    color: $danger_color;
  }

  .todo-item {
    padding: 12px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &.completed {
      color: $gray_color;
      .title {
        text-decoration: line-through;
      }
    }
    .action {
      flex-basis: 90px;
      text-align: right;
      span {
        padding: 0 3px;
        font-size: 14px;
        color: #ccc;
        cursor: pointer;
        @include transition(color .3s ease);
        &:last-child {
          padding-right: 0;
        }
        &:hover {
          color: $dark_color;
        }
      }
    }
    &:last-child {
      border: none;
    }
    /** Form edit **/
    &__form {
      width: 100%;
      position: relative;
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
      .edit-action {
        display: block;
        text-align: right;
        &__item {
          font-size: .75em;
          padding-left: 5px;
          cursor: pointer;
          i {
            padding: 0 5px;
          }
        }
      }
      button {
        position: absolute;
        top: 0;
        right: 0;
        background: none;
        border: none;
        background: #16c98d;
        color: #fff;
        height: 100%;
        padding: 0 15px;
        border-radius: 0 3px 3px 0;
        font-size: 1em;
        cursor: pointer;
        outline: none;
      }
    }
  }
</style>
