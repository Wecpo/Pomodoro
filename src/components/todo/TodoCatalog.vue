<script setup lang="ts">
import TodoCard from '@/components/todo/TodoCard.vue';
import { useTodoStore } from '@/store/todoStore';
import { TODO_STATUS } from '@/types/enums/TodoStatus';

const todoStore = useTodoStore();
</script>

<template>
  <div class="todo-status">
    <ol
      @dragover.prevent
      @drop="todoStore.changeTodoOnDrop($event.dataTransfer?.getData('todoId'), TODO_STATUS.BACKLOG)"
    >
      Backlog
      <li
        v-for="todo in todoStore.getBacklogTodos" :key="todo.id" draggable="true"
        @dragstart="($event.dataTransfer?.setData('todoId', todo.id))"
      >
        <TodoCard :todo="todo" />
      </li>
    </ol>
    <ol
      @dragover.prevent
      @drop="todoStore.changeTodoOnDrop($event.dataTransfer?.getData('todoId'), TODO_STATUS.IN_PROGRESS)"
    >
      In Progress
      <li
        v-for="todo in todoStore.getInProgressTodos" :key="todo.id" draggable="true"
        @dragstart="($event.dataTransfer?.setData('todoId', todo.id))"
      >
        <TodoCard :todo="todo" />
      </li>
    </ol>
    <ol
      @dragover.prevent
      @drop="todoStore.changeTodoOnDrop($event.dataTransfer?.getData('todoId'), TODO_STATUS.STOPPED)"
    >
      Stopped
      <li
        v-for="todo in todoStore.getStoppedTodos" :key="todo.id" draggable="true"
        @dragstart="($event.dataTransfer?.setData('todoId', todo.id))"
      >
        <TodoCard :todo="todo" />
      </li>
    </ol>
    <ol
      @dragover.prevent
      @drop="todoStore.changeTodoOnDrop($event.dataTransfer?.getData('todoId'), TODO_STATUS.DONE)"
    >
      Done
      <li
        v-for="todo in todoStore.getDoneTodos" :key="todo.id" draggable="true"
        @dragstart="($event.dataTransfer?.setData('todoId', todo.id))"
      >
        <TodoCard :todo="todo" />
      </li>
    </ol>
  </div>
</template>

<style scoped>
.todo-status {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px;
}

ol {
  border: 1px solid #ccc;
  padding: 1rem;
  min-height: 200px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

li {
  margin-bottom: 1rem;
  cursor: grab;
}

li:active {
  cursor: grabbing;
}
</style>
