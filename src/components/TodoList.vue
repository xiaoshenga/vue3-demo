<template>
  <div class="card">
    <h2>Todo 列表</h2>
    <p class="desc">演示 <code>reactive</code>、<code>v-model</code>、<code>v-for</code></p>

    <div class="input-row">
      <input
        v-model="newText"
        class="input"
        placeholder="输入新任务..."
        @keyup.enter="addTodo"
      />
      <button class="btn btn-primary" @click="addTodo">添加</button>
    </div>

    <div class="filter-row">
      <button
        v-for="f in filters"
        :key="f.key"
        :class="['filter-btn', { active: filter === f.key }]"
        @click="filter = f.key"
      >
        {{ f.label }} ({{ counts[f.key] }})
      </button>
    </div>

    <ul class="todo-list">
      <li v-if="filteredTodos.length === 0" class="empty">暂无任务</li>
      <li v-for="todo in filteredTodos" :key="todo.id" class="todo-item">
        <input type="checkbox" v-model="todo.done" class="checkbox" />
        <span :class="['todo-text', { done: todo.done }]">{{ todo.text }}</span>
        <button class="delete-btn" @click="removeTodo(todo.id)">✕</button>
      </li>
    </ul>

    <div class="footer" v-if="todos.length > 0">
      <span>{{ counts.active }} 项未完成</span>
      <button v-if="counts.done > 0" class="clear-btn" @click="clearDone">
        清除已完成
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const newText = ref('')
const filter = ref('all')
let nextId = 4

const todos = reactive([
  { id: 1, text: '学习 Vue3 Composition API', done: true },
  { id: 2, text: '研究 Vite 构建工具', done: false },
  { id: 3, text: '完成项目 Demo', done: false },
])

const filters = [
  { key: 'all', label: '全部' },
  { key: 'active', label: '未完成' },
  { key: 'done', label: '已完成' },
]

const counts = computed(() => ({
  all: todos.length,
  active: todos.filter(t => !t.done).length,
  done: todos.filter(t => t.done).length,
}))

const filteredTodos = computed(() => {
  if (filter.value === 'active') return todos.filter(t => !t.done)
  if (filter.value === 'done') return todos.filter(t => t.done)
  return todos
})

function addTodo() {
  const text = newText.value.trim()
  if (!text) return
  todos.push({ id: nextId++, text, done: false })
  newText.value = ''
}

function removeTodo(id) {
  const idx = todos.findIndex(t => t.id === id)
  if (idx !== -1) todos.splice(idx, 1)
}

function clearDone() {
  const activeOnly = todos.filter(t => !t.done)
  todos.splice(0, todos.length, ...activeOnly)
}
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

h2 { font-size: 22px; margin-bottom: 4px; }
.desc { color: #888; font-size: 14px; margin-bottom: 24px; }
.desc code { background: #f5f5f5; padding: 2px 6px; border-radius: 4px; }

.input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.input {
  flex: 1;
  padding: 10px 14px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
}

.input:focus { border-color: #42b883; }

.btn { padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; }
.btn-primary { background: #42b883; color: #fff; }

.filter-row {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.filter-btn {
  padding: 5px 14px;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  background: transparent;
  cursor: pointer;
  font-size: 13px;
  color: #666;
  transition: all 0.2s;
}

.filter-btn.active {
  background: #42b883;
  border-color: #42b883;
  color: #fff;
}

.todo-list { list-style: none; }

.empty { text-align: center; color: #bbb; padding: 24px 0; }

.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.checkbox { width: 18px; height: 18px; cursor: pointer; accent-color: #42b883; }

.todo-text { flex: 1; font-size: 15px; }
.todo-text.done { text-decoration: line-through; color: #bbb; }

.delete-btn {
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: color 0.2s;
}

.delete-btn:hover { color: #e74c3c; }

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  font-size: 13px;
  color: #888;
}

.clear-btn {
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 13px;
}
</style>
