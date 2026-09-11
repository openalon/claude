<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  if (document.querySelector('script[data-giscus]')) return
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.dataset.giscus = 'true'
  script.setAttribute('data-repo', 'openalon/claude')
  script.setAttribute('data-repo-id', 'R_kgDOUXcR2Q')
  script.setAttribute('data-category', 'Announcements')
  script.setAttribute('data-category-id', 'DIC_kwDOUXcR2c4DFaX1')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'top')
  script.setAttribute('data-theme', 'preferred_color_scheme')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('data-loading', 'lazy')
  document.querySelector('#giscus')?.appendChild(script)
})
</script>

<template>
  <section class="comments">
    <h2>评论</h2>
    <div id="giscus" />
  </section>
</template>

<style scoped>
.comments { margin-top: 3rem; }
.comments h2 { border-top: 1px solid var(--vp-c-divider); padding-top: 1.5rem; }
</style>
