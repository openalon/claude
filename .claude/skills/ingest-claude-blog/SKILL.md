---
name: ingest-claude-blog
description: 把 Claude Blog 的官方文章整理成中文学习笔记，落到 blog/。
---

# 整理 Claude Blog

用户提供 `https://claude.com/blog` 下的文章，或明确说“整理这篇 Claude Blog”时使用本 skill。单篇 source 写一篇笔记；多个独立来源的比较应先分别落盘，再转为用户明确要求的综合判断。

## 必须遵守

1. 先打开并读取官方 source。网页不可访问、需要登录、只有标题或只能读取片段时停止，说明缺失并请求可访问链接或原文；不得凭记忆补写。
2. 写入前检查 source、slug 和目标路径。已有笔记默认不覆盖；需要更新时保留原 `id`，栏目页不重复添加链接。
3. 不整篇翻译或复制原文。保留官方链接、原文标题和发布日期（如果可确认）。
4. 明确区分“官方内容”“我的理解”“实践记录”。未实践的内容不得写成已验证。
5. 成品放在 `blog/<slug>.md`，不要放进 `academy/`。

## 笔记骨架

```markdown
---
id: blog_<12 hex>
title: <中文标题>
description: <一句说明>
source: https://claude.com/blog/...
published: YYYY-MM-DD
updated: YYYY-MM-DD
tags:
  - Claude
status: published
---

# <中文标题>

<来源 chip 或官方原文链接>

## 先说结论
## 它解决什么问题
## 关键机制
## 适合谁
## 我的理解
## 实践记录

> 尚未实践的内容写明“待验证”，不要伪造结果。
```

## 完成检查

- source 可打开且与内容对应
- id 已存在且更新时保留
- 没有整篇翻译或伪造引用
- 官方内容、个人理解、实践结果边界清楚
- 文章已落盘到 `blog/`
- 栏目索引/导航更新是幂等的
