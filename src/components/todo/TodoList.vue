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
  onDragend(data) {
    const newStatus = data.parent.el.dataset.status as TODO_STATUS;
    const todo = data.draggedNode.data.value as Todo;
    if (newStatus && todo) {
      todoStore.changeTodoStatus(todo, newStatus);
    }
    if (newStatus) {
      todoStore.updateTodosOrder(newStatus, data.values as Todo[]);
    }
  },

});

watch(() => writableTodos.value, newTodos => todos.value = newTodos);
</script>

<template>
  <ol ref="todoList" :data-status="props.todoStatus" class="todo-list">
    {{ props.label }}
    <li v-for="todo in todos" :key="todo.id">
      <TodoCard :todo="todo" />
    </li>
  </ol>
</template>

<style scoped>
.todo-list {
  border: 1px solid #ccc;
  padding: 1rem;
  min-height: 200px;
  background-color: #f9f9f9;
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
