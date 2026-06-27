<template>
  <div class="card">
    <h2>计数器</h2>
    <p class="desc">演示 <code>ref</code> 和 <code>computed</code></p>

    <div class="counter-display">{{ count }}</div>

    <div class="actions">
      <button class="btn btn-danger" @click="decrement">-1</button>
      <button class="btn btn-secondary" @click="reset">重置</button>
      <button class="btn btn-primary" @click="increment">+1</button>
    </div>

    <div class="info">
      <span :class="['badge', count > 0 ? 'positive' : count < 0 ? 'negative' : 'zero']">
        {{ status }}
      </span>
      <span class="doubled">双倍值: {{ doubled }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const count = ref(0)

const doubled = computed(() => count.value * 2)
const status = computed(() => {
  if (count.value > 0) return '正数'
  if (count.value < 0) return '负数'
  return '零'
})

function increment() { count.value++ }
function decrement() { count.value-- }
function reset() { count.value = 0 }
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

h2 { font-size: 22px; margin-bottom: 4px; }

.desc { color: #888; font-size: 14px; margin-bottom: 32px; }
.desc code { background: #f5f5f5; padding: 2px 6px; border-radius: 4px; }

.counter-display {
  font-size: 80px;
  font-weight: 700;
  text-align: center;
  color: #42b883;
  line-height: 1;
  margin: 24px 0;
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 24px;
}

.btn {
  padding: 10px 28px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn:hover { opacity: 0.85; }
.btn-primary { background: #42b883; color: #fff; }
.btn-danger { background: #e74c3c; color: #fff; }
.btn-secondary { background: #e0e0e0; color: #555; }

.info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
}

.positive { background: #e8f5e9; color: #2e7d32; }
.negative { background: #fce4ec; color: #c62828; }
.zero { background: #f5f5f5; color: #757575; }

.doubled { color: #888; font-size: 14px; }
</style>
