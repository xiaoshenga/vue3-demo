<template>
  <section class="demo">
    <div class="section-head">
      <h2 class="section-title font-display">实时交互</h2>
      <p class="section-sub">Vue3 响应式系统驱动的炫酷小组件</p>
    </div>

    <div class="demo-grid">
      <!-- 霓虹计数器 -->
      <div class="panel">
        <div class="panel-label">NEON COUNTER</div>
        <div class="counter-ring" :style="ringStyle">
          <div class="counter-num font-display">{{ count }}</div>
        </div>
        <div class="counter-btns">
          <button @click="count--" class="circle-btn">−</button>
          <button @click="count = 0" class="circle-btn reset">↺</button>
          <button @click="count++" class="circle-btn plus">+</button>
        </div>
      </div>

      <!-- 颜色生成器 -->
      <div class="panel">
        <div class="panel-label">COLOR FORGE</div>
        <div class="color-preview" :style="{ background: currentColor, boxShadow: `0 0 50px ${currentColor}` }"></div>
        <div class="color-code font-display">{{ currentColor }}</div>
        <button class="forge-btn" @click="randomColor">⚡ 随机生成</button>
      </div>

      <!-- 实时输入 -->
      <div class="panel">
        <div class="panel-label">LIVE TYPING</div>
        <input
          v-model="text"
          class="neon-input"
          placeholder="输入文字..."
          maxlength="20"
        />
        <div class="typed-display font-display">{{ text || 'HELLO VUE3' }}</div>
        <div class="char-bar">
          <div class="char-fill" :style="{ width: (text.length / 20 * 100) + '%' }"></div>
        </div>
        <div class="char-count">{{ text.length }} / 20</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const text = ref('')
const currentColor = ref('#b14aff')

const ringStyle = computed(() => {
  const hue = (count.value * 18) % 360
  return {
    borderColor: `hsl(${hue}, 100%, 60%)`,
    boxShadow: `0 0 30px hsl(${hue}, 100%, 60%), inset 0 0 30px hsl(${hue}, 100%, 60%, 0.3)`,
  }
})

function randomColor() {
  const hex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
  currentColor.value = hex.toUpperCase()
}
</script>

<style scoped>
.demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px 120px;
}

.section-head {
  text-align: center;
  margin-bottom: 64px;
}

.section-title {
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 700;
  background: linear-gradient(135deg, var(--heading-grad), #00f0ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 12px;
}

.section-sub { color: var(--text-dim); font-size: 16px; }

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.panel {
  position: relative;
  padding: 32px;
  border-radius: 20px;
  background: var(--panel);
  border: 1px solid var(--border);
  backdrop-filter: blur(14px);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 320px;
}

.panel-label {
  font-family: 'Orbitron', sans-serif;
  font-size: 12px;
  letter-spacing: 3px;
  color: var(--text-faint);
  margin-bottom: 28px;
  align-self: flex-start;
}

/* Counter */
.counter-ring {
  width: 140px;
  height: 140px;
  border: 3px solid var(--neon-purple);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 28px;
  transition: all 0.4s;
}

.counter-num {
  font-size: 52px;
  font-weight: 900;
  color: var(--text);
}

.counter-btns { display: flex; gap: 14px; }

.circle-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--border-strong);
  background: var(--panel);
  color: var(--text);
  font-size: 22px;
  cursor: pointer;
  transition: all 0.25s;
}

.circle-btn:hover { transform: scale(1.15); }
.circle-btn.plus:hover { border-color: var(--neon-cyan); box-shadow: 0 0 18px var(--neon-cyan); color: var(--neon-cyan); }
.circle-btn.reset:hover { border-color: var(--neon-purple); box-shadow: 0 0 18px var(--neon-purple); }
.circle-btn:not(.plus):not(.reset):hover { border-color: var(--neon-pink); box-shadow: 0 0 18px var(--neon-pink); color: var(--neon-pink); }

/* Color */
.color-preview {
  width: 120px;
  height: 120px;
  border-radius: 24px;
  margin-bottom: 24px;
  transition: all 0.5s;
}

.color-code {
  font-size: 20px;
  letter-spacing: 2px;
  margin-bottom: 24px;
  color: var(--text);
}

.forge-btn {
  padding: 12px 28px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--neon-cyan), var(--neon-purple));
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.25s;
}
.forge-btn:hover { transform: translateY(-2px); }

/* Typing */
.neon-input {
  width: 100%;
  padding: 12px 16px;
  background: var(--input-bg);
  border: 1px solid var(--border-strong);
  border-radius: 12px;
  color: var(--text);
  font-size: 15px;
  outline: none;
  margin-bottom: 24px;
  transition: all 0.25s;
}

.neon-input:focus {
  border-color: var(--neon-cyan);
  box-shadow: 0 0 18px rgba(0, 240, 255, 0.3);
}

.typed-display {
  font-size: 26px;
  font-weight: 700;
  text-align: center;
  background: linear-gradient(90deg, var(--neon-cyan), var(--neon-pink));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 24px;
  word-break: break-all;
  min-height: 32px;
}

.char-bar {
  width: 100%;
  height: 6px;
  background: var(--track);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 8px;
}

.char-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--neon-cyan), var(--neon-pink));
  border-radius: 3px;
  transition: width 0.3s;
}

.char-count {
  font-size: 12px;
  color: var(--text-faint);
  align-self: flex-end;
}
</style>
