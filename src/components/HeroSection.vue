<template>
  <section class="hero">
    <h1 class="title font-display">
      <span class="line">未来</span>
      <span class="line gradient-text">视觉体验</span>
    </h1>

    <p class="subtitle">
      探索下一代 Web 交互 · 霓虹光效 · 流体动画 · 沉浸式设计
    </p>

    <div class="cta">
      <button class="btn-glow" @click="scrollTo">
        立即体验
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="btn-ghost">查看文档</button>
    </div>

    <div class="stats">
      <div class="stat" v-for="s in stats" :key="s.label">
        <div class="stat-num font-display">{{ s.value }}</div>
        <div class="stat-label">{{ s.label }}</div>
      </div>
    </div>

    <div class="scroll-hint">
      <div class="mouse"><div class="wheel"></div></div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: '99+', label: '炫酷组件' },
  { value: '60fps', label: '流畅动画' },
  { value: '∞', label: '无限可能' },
]

function scrollTo() {
  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 24px;
  position: relative;
}

.title {
  font-size: clamp(42px, 8vw, 96px);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: 2px;
  margin-bottom: 24px;
}

.line {
  display: block;
  animation: fadeUp 0.9s ease both;
}
.line:nth-child(2) { animation-delay: 0.15s; }

.gradient-text {
  position: relative;
  background: linear-gradient(90deg, var(--neon-cyan), var(--neon-purple), var(--neon-pink), var(--neon-cyan));
  background-size: 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fadeUp 0.9s ease 0.15s both, shimmer 4s linear infinite;
}

.subtitle {
  font-size: clamp(15px, 2.5vw, 20px);
  color: var(--text-dim);
  max-width: 600px;
  margin-bottom: 44px;
  font-weight: 300;
  animation: fadeUp 0.9s ease 0.3s both;
}

.cta {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 72px;
  animation: fadeUp 0.9s ease 0.45s both;
}

.btn-glow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 15px 36px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.25s, box-shadow 0.25s;
  box-shadow: 0 0 25px rgba(177, 74, 255, 0.5);
}

.btn-glow:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 0 45px rgba(255, 45, 149, 0.7);
}

.btn-ghost {
  padding: 15px 36px;
  border: 1px solid var(--border-strong);
  border-radius: 14px;
  background: var(--panel);
  color: var(--text);
  font-size: 16px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.25s;
}

.btn-ghost:hover {
  border-color: var(--neon-cyan);
  color: var(--neon-cyan);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
}

.stats {
  display: flex;
  gap: clamp(32px, 8vw, 80px);
  animation: fadeUp 0.9s ease 0.6s both;
}

.stat-num {
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 700;
  background: linear-gradient(135deg, var(--neon-cyan), var(--neon-purple));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-label {
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 6px;
}

.scroll-hint {
  position: absolute;
  bottom: 32px;
  animation: fadeIn 1s ease 1s both;
}

.mouse {
  width: 26px;
  height: 42px;
  border: 2px solid var(--border-strong);
  border-radius: 14px;
  display: flex;
  justify-content: center;
  padding-top: 8px;
}

.wheel {
  width: 4px;
  height: 8px;
  border-radius: 2px;
  background: var(--neon-cyan);
  animation: wheel 1.5s infinite;
}

@keyframes shimmer {
  to { background-position: 300% 50%; }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes wheel {
  0% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(14px); }
}
</style>
