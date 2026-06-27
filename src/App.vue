<template>
  <div class="app">
    <header class="header">
      <h1>Vue3 Demo</h1>
      <nav>
        <button
          v-for="tab in tabs"
          :key="tab.key"
          :class="['nav-btn', { active: activeTab === tab.key }]"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </nav>
    </header>

    <main class="main">
      <Counter v-if="activeTab === 'counter'" />
      <TodoList v-else-if="activeTab === 'todo'" />
      <FetchDemo v-else-if="activeTab === 'fetch'" />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Counter from './components/Counter.vue'
import TodoList from './components/TodoList.vue'
import FetchDemo from './components/FetchDemo.vue'

const activeTab = ref('counter')

const tabs = [
  { key: 'counter', label: '计数器' },
  { key: 'todo', label: 'Todo 列表' },
  { key: 'fetch', label: '数据请求' },
]
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: #fff;
  padding: 16px 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 32px;
}

.header h1 {
  font-size: 20px;
  color: #42b883;
}

nav {
  display: flex;
  gap: 8px;
}

.nav-btn {
  padding: 6px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 20px;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  transition: all 0.2s;
}

.nav-btn:hover {
  border-color: #42b883;
  color: #42b883;
}

.nav-btn.active {
  background: #42b883;
  border-color: #42b883;
  color: #fff;
}

.main {
  flex: 1;
  padding: 32px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}
</style>
