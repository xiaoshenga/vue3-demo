<template>
  <section id="features" class="features">
    <div class="section-head">
      <h2 class="section-title font-display">核心特性</h2>
      <p class="section-sub">移动鼠标感受 3D 视差与霓虹辉光</p>
    </div>

    <div class="grid">
      <div
        v-for="(card, i) in cards"
        :key="card.title"
        class="card"
        :style="{ '--accent': card.color, animationDelay: i * 0.1 + 's' }"
        @mousemove="onMove($event, i)"
        @mouseleave="onLeave(i)"
        :ref="el => cardRefs[i] = el"
      >
        <div class="card-glow"></div>
        <div class="icon">{{ card.icon }}</div>
        <h3>{{ card.title }}</h3>
        <p>{{ card.desc }}</p>
        <div class="card-tag">{{ card.tag }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const cardRefs = ref([])

const cards = [
  { icon: '⚡', title: '极致性能', desc: 'Vite 闪电热更新，60fps 流畅渲染体验', tag: 'Performance', color: '#00f0ff' },
  { icon: '🎨', title: '霓虹美学', desc: '赛博朋克风格配色，玻璃态与辉光设计', tag: 'Design', color: '#b14aff' },
  { icon: '🌊', title: '流体动画', desc: '粒子交互背景，丝滑过渡与视差效果', tag: 'Motion', color: '#ff2d95' },
  { icon: '🧩', title: '组件化', desc: 'Composition API 驱动，模块清晰可复用', tag: 'Vue 3', color: '#00ff9d' },
  { icon: '📱', title: '响应式', desc: '自适应任意屏幕，移动端完美呈现', tag: 'Responsive', color: '#ffb700' },
  { icon: '🚀', title: '开箱即用', desc: '零配置启动，专注创意而非繁琐搭建', tag: 'DX', color: '#ff6b3d' },
]

function onMove(e, i) {
  const el = cardRefs.value[i]
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const rotX = ((y / rect.height) - 0.5) * -16
  const rotY = ((x / rect.width) - 0.5) * 16
  el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(20px)`
  el.style.setProperty('--mx', x + 'px')
  el.style.setProperty('--my', y + 'px')
}

function onLeave(i) {
  const el = cardRefs.value[i]
  if (el) el.style.transform = 'perspective(800px) rotateX(0) rotateY(0)'
}
</script>

<style scoped>
.features {
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 24px;
}

.section-head {
  text-align: center;
  margin-bottom: 64px;
}

.section-title {
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 700;
  background: linear-gradient(135deg, var(--heading-grad), #b14aff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 12px;
}

.section-sub {
  color: var(--text-dim);
  font-size: 16px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.card {
  position: relative;
  padding: 36px 30px;
  border-radius: 20px;
  background: var(--panel);
  border: 1px solid var(--border);
  backdrop-filter: blur(14px);
  cursor: pointer;
  transition: transform 0.15s ease, border-color 0.3s;
  transform-style: preserve-3d;
  overflow: hidden;
  animation: cardIn 0.6s ease both;
}

.card:hover {
  border-color: var(--accent);
}

.card-glow {
  position: absolute;
  top: var(--my, 50%);
  left: var(--mx, 50%);
  width: 280px;
  height: 280px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, var(--accent), transparent 65%);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  filter: blur(20px);
}

.card:hover .card-glow {
  opacity: 0.25;
}

.icon {
  font-size: 44px;
  margin-bottom: 18px;
  display: inline-block;
  filter: drop-shadow(0 0 12px var(--accent));
}

.card h3 {
  font-size: 22px;
  margin-bottom: 10px;
  color: var(--text);
}

.card p {
  color: var(--text-dim);
  font-size: 14px;
  line-height: 1.7;
  font-weight: 300;
}

.card-tag {
  display: inline-block;
  margin-top: 18px;
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 12px;
  color: var(--accent);
  border: 1px solid var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
}

@keyframes cardIn {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
