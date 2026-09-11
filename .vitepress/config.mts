import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar'

const isGithubActions = Boolean(process.env.GITHUB_ACTIONS)
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = isGithubActions && repoName ? `/${repoName}/` : '/'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Claude 中文学习专栏',
  description: '精选 Claude 官方内容，记录中文学习路线与实践。',
  base,
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ['**/.claude/**', '**/node_modules/**', '**/.vitepress/**'],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'Blog 精选', link: '/blog/' },
      { text: 'Academy 学习路线', link: '/academy/' },
      { text: '关于', link: '/about' }
    ],
    sidebar,
    search: { provider: 'local' },
    outline: { level: [2, 3], label: '目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '最后更新' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/openalon/claude' }]
  },
  vite: { server: { port: 5281 } }
})
