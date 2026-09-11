import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Comment from './Comment.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(Comment)
    })
  }
}
