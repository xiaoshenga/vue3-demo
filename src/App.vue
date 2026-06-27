<template>
  <ParticleBg />

  <div class="aurora"></div>

  <nav class="navbar" :class="{ scrolled }">
    <div class="logo font-display">
      <span class="logo-mark">◆</span> NEON<span class="logo-accent">UI</span>
    </div>
    <div class="nav-links">
      <a href="#features">特性</a>
      <a href="#" @click.prevent="scrollDemo">交互</a>
      <button class="theme-toggle" @click="toggle" :title="theme === 'dark' ? '切换到亮色' : '切换到暗色'">
        <span class="toggle-track" :class="{ light: theme === 'light' }">
          <span class="toggle-thumb">{{ theme === 'dark' ? '🌙' : '☀️' }}</span>
        </span>
      </button>
      <button class="nav-cta">开始使用</button>
    </div>
  </nav>

  <main>
    <HeroSection />
    <FeatureCards />
    <InteractiveDemo ref="demoSection" />
  </main>

  <footer class="footer">
    <div class="footer-glow"></div>
    <div class="logo font-display">
      <span class="logo-mark">◆</span> NEON<span class="logo-accent">UI</span>
    </div>
    <p>一个炫酷的演示项目</p>
    <div class="footer-tech">
      <span>Canvas</span>
      <span>CSS3</span>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ParticleBg from './components/ParticleBg.vue'
import HeroSection from './components/HeroSection.vue'
import FeatureCards from './components/FeatureCards.vue'
import InteractiveDemo from './components/InteractiveDemo.vue'
import { useTheme } from './composables/useTheme.js'

const { theme, toggle } = useTheme()
const scrolled = ref(false)
const demoSection = ref(null)

function onScroll() {
  scrolled.value = window.scrollY > 50
}

function scrollDemo() {
  demoSection.value?.$el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.aurora {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: var(--aurora-opacity);
  transition: opacity 0.5s;
  background:
    radial-gradient(ellipse 50% 40% at 20% 10%, rgba(177, 74, 255, 0.18), transparent),
    radial-gradient(ellipse 50% 40% at 80% 20%, rgba(0, 240, 255, 0.14), transparent),
    radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255, 45, 149, 0.12), transparent);
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 5vw;
  transition: all 0.4s;
}

.navbar.scrolled {
  padding: 14px 5vw;
  background: var(--nav-bg);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
}

.logo {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--text);
}

.logo-mark {
  color: var(--neon-cyan);
  text-shadow: 0 0 12px var(--neon-cyan);
}

.logo-accent {
  background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-links a {
  color: var(--text-dim);
  text-decoration: none;
  font-size: 15px;
  transition: color 0.25s;
}

.nav-links a:hover { color: var(--neon-cyan); }

.theme-toggle {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.toggle-track {
  width: 52px;
  height: 28px;
  border-radius: 20px;
  background: var(--track);
  border: 1px solid var(--border-strong);
  display: flex;
  align-items: center;
  padding: 2px;
  transition: background 0.3s;
}

.toggle-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--neon-purple), var(--neon-pink));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  box-shadow: 0 0 12px rgba(177, 74, 255, 0.6);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.toggle-track.light .toggle-thumb {
  transform: translateX(24px);
  background: linear-gradient(135deg, #ffd84a, #ff9d2d);
  box-shadow: 0 0 12px rgba(255, 180, 60, 0.7);
}

.nav-cta {
  padding: 10px 22px;
  border: 1px solid rgba(177, 74, 255, 0.5);
  border-radius: 10px;
  background: rgba(177, 74, 255, 0.12);
  color: var(--cta-text);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.25s;
}

.nav-cta:hover {
  background: rgba(177, 74, 255, 0.25);
  box-shadow: 0 0 20px rgba(177, 74, 255, 0.4);
}

.footer {
  position: relative;
  text-align: center;
  padding: 60px 24px;
  border-top: 1px solid var(--border);
  overflow: hidden;
}

.footer-glow {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--neon-purple), transparent);
}

.footer p {
  color: var(--text-muted);
  font-size: 14px;
  margin: 16px 0 24px;
}

.footer-tech {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.footer-tech span {
  padding: 5px 16px;
  border-radius: 20px;
  font-size: 12px;
  color: var(--text-dim);
  border: 1px solid var(--border);
  background: var(--panel);
}

@media (max-width: 600px) {
  .nav-links { gap: 14px; }
  .nav-links a { display: none; }
}
</style>
