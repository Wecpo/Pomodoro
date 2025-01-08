<script setup lang="ts">
import type { TODO_STATUS } from '@/types/enums/TodoStatus';
import type { Todo } from '@/types/interfaces/Todo';
import TodoCard from '@/components/todo/TodoCard.vue';
import { useTodoStore } from '@/store/todoStore';
import { useDragAndDrop } from '@formkit/drag-and-drop/vue';
import { computed, watch } from 'vue';

const props = defineProps<{
  label: string
  todoStatus: TODO_STATUS
}>();

const todoStore = useTodoStore();

const writableTodos = computed(() => todoStore.getTodosByStatus(props.todoStatus));

const [todoList, todos] = useDragAndDrop(writableTodos.value, {
  group: 'todoList',
  onTransfer: (data) => {
    const todo = data.draggedNodes[0].data.value as Todo;
    const newStatus = data.targetParent.el.dataset.status as TODO_STATUS;
    todoStore.changeTodoStatus(todo, newStatus);
  },
  onSort: (data) => {
    const newStatus = data.parent.el.dataset.status as TODO_STATUS;
    const newTodos = data.values;
    todoStore.updateTodosOrder(newStatus, newTodos as Todo[]);
  },

});

watch(() => writableTodos.value, newTodos => todos.value = newTodos);
</script>

<template>
  <div class="todo-list__containter">
    <h2>
      {{ props.label }}
    </h2>
    <ol ref="todoList" :data-status="props.todoStatus" class="todo-list">
      <li v-for="todo in todos" :key="todo.id">
        <TodoCard :todo="todo" />
      </li>
    </ol>
  </div>
</template>

<style scoped>
.todo-list__containter {
  background-color: #e4e9d7;
  border-radius: 8px;
}

.todo-list__containter h2 {
  text-align: center;
  margin-bottom: 1rem;
  text-decoration: underline;
  color: rgb(59, 55, 55);
}

.todo-list {
  list-style-type: none;
  min-height: 200px;
  padding: 1rem;
  border-radius: 4px;
}

.todo-list__li {
  margin-bottom: 1rem;
  cursor: grab;
}

.todo-list__li:active {
  cursor: grabbing;
}
</style>
