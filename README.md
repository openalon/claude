# Claude 中文学习专栏

这是一个使用 VitePress 构建的个人 Claude 学习专栏，包含两个栏目：

- `blog/`：Claude Blog 精选中文解读
- `academy/`：Claude Academy 与官方教程学习路线

站点是个人维护的非官方项目，不是 Anthropic 官方中文站。

## 本地运行

```bash
npm install
npm run docs:dev
```

构建检查：

```bash
npm run docs:build
```

## GitHub Pages

仓库的 Pages 来源选择 **GitHub Actions**。推送到 `main` 后，`.github/workflows/deploy.yml` 会自动构建并发布。

## Giscus

评论系统使用 Giscus。将仓库启用 Discussions，并在 `.vitepress/theme/Comment.vue` 中填入 Giscus 给出的公开 `repo`、`repoId`、`category`、`categoryId`。这些不是密钥，可以提交到仓库；不要放入任何 token 或私密凭据。
