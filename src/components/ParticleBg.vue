<template>
  <canvas ref="canvas" class="particle-bg"></canvas>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../composables/useTheme.js'

const { theme } = useTheme()
const canvas = ref(null)
let ctx, raf, w, h
let particles = []
let lineAlpha = 0.25
const mouse = { x: -9999, y: -9999 }

const COLORS = ['#00f0ff', '#b14aff', '#ff2d95']

watch(theme, (val) => {
  lineAlpha = val === 'light' ? 0.18 : 0.25
}, { immediate: true })

function resize() {
  w = canvas.value.width = window.innerWidth
  h = canvas.value.height = window.innerHeight
}

function initParticles() {
  const count = Math.min(110, Math.floor((w * h) / 16000))
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    r: Math.random() * 2 + 1,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }))
}

function draw() {
  ctx.clearRect(0, 0, w, h)

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]

    // mouse repulsion
    const dx = p.x - mouse.x
    const dy = p.y - mouse.y
    const dist = Math.hypot(dx, dy)
    if (dist < 120) {
      const force = (120 - dist) / 120
      p.x += (dx / dist) * force * 2
      p.y += (dy / dist) * force * 2
    }

    p.x += p.vx
    p.y += p.vy

    if (p.x < 0 || p.x > w) p.vx *= -1
    if (p.y < 0 || p.y > h) p.vy *= -1

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fillStyle = p.color
    ctx.shadowBlur = 12
    ctx.shadowColor = p.color
    ctx.fill()

    // connections
    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j]
      const d = Math.hypot(p.x - q.x, p.y - q.y)
      if (d < 130) {
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(q.x, q.y)
        ctx.strokeStyle = p.color
        ctx.globalAlpha = (1 - d / 130) * lineAlpha
        ctx.lineWidth = 0.6
        ctx.shadowBlur = 0
        ctx.stroke()
        ctx.globalAlpha = 1
      }
    }
  }

  raf = requestAnimationFrame(draw)
}

function onMove(e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

function onLeave() {
  mouse.x = -9999
  mouse.y = -9999
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  resize()
  initParticles()
  draw()
  window.addEventListener('resize', () => { resize(); initParticles() })
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseout', onLeave)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseout', onLeave)
})
</script>

<style scoped>
.particle-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
</style>
