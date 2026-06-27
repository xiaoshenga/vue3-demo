<template>
  <div class="card">
    <h2>数据请求</h2>
    <p class="desc">演示 <code>watch</code>、异步请求、<code>v-if/v-else</code></p>

    <div class="input-row">
      <input
        v-model.number="userId"
        type="number"
        class="input"
        min="1"
        max="10"
        placeholder="用户 ID (1-10)"
      />
      <button class="btn btn-primary" @click="fetchUser" :disabled="loading">
        {{ loading ? '加载中...' : '查询用户' }}
      </button>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <span>加载中...</span>
    </div>

    <div v-else-if="error" class="error-box">
      <strong>请求失败：</strong>{{ error }}
    </div>

    <div v-else-if="user" class="user-card">
      <div class="avatar">{{ user.name.charAt(0).toUpperCase() }}</div>
      <div class="user-info">
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <p>{{ user.phone }}</p>
        <p>
          <a :href="'https://' + user.website" target="_blank">{{ user.website }}</a>
        </p>
        <div class="company">
          <strong>公司：</strong>{{ user.company.name }}
        </div>
        <div class="address">
          <strong>城市：</strong>{{ user.address.city }}
        </div>
      </div>
    </div>

    <div v-else class="hint">输入用户 ID 后点击查询（支持 1~10）</div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const userId = ref('')
const user = ref(null)
const loading = ref(false)
const error = ref('')

async function fetchUser() {
  const id = Number(userId.value)
  if (!id || id < 1 || id > 10) {
    error.value = '请输入 1~10 之间的用户 ID'
    user.value = null
    return
  }

  loading.value = true
  error.value = ''
  user.value = null

  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    user.value = await res.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

watch(userId, () => {
  user.value = null
  error.value = ''
})
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

.input-row { display: flex; gap: 8px; margin-bottom: 20px; }

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

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  transition: opacity 0.2s;
}

.btn-primary { background: #42b883; color: #fff; }
.btn:disabled { opacity: 0.6; cursor: not-allowed; }

.loading {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #888;
  padding: 20px 0;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #e0e0e0;
  border-top-color: #42b883;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.error-box {
  background: #fce4ec;
  color: #c62828;
  padding: 14px 18px;
  border-radius: 8px;
}

.user-card {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 10px;
}

.avatar {
  width: 60px;
  height: 60px;
  background: #42b883;
  color: #fff;
  font-size: 28px;
  font-weight: 700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-info h3 { font-size: 18px; margin-bottom: 6px; }
.user-info p { color: #666; font-size: 14px; margin-bottom: 4px; }
.user-info a { color: #42b883; text-decoration: none; }
.company, .address { font-size: 14px; margin-top: 8px; color: #555; }

.hint { text-align: center; color: #bbb; padding: 24px 0; }
</style>
