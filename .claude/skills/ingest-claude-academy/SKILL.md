---
name: ingest-claude-academy
description: 把 Claude Academy 或官方 tutorial 整理成中文学习路线与实践笔记，落到 academy/。
---

# 整理 Claude Academy / Tutorials

用户提供 Academy 课程、官方 tutorial、学习页面，或明确说“整理这个 Claude 教程”时使用本 skill。

## 必须遵守

1. 先读取课程或 tutorial source。不可访问、需要登录、只有目录或只能读取片段时停止，说明缺失并请求可访问链接、正文或截图；不得凭记忆补写完整教程。
2. 写入前检查 source、slug 和目标路径。已有笔记默认不覆盖；更新时保留原 `id`，学习路线不重复插入同一条。
3. 不复制整套课程材料。保留官方入口，用中文写学习目标、关键概念、步骤摘要、练习结果和限制。
4. 明确区分官方步骤、我的理解和实践结果；没有亲自执行的步骤标记“未验证”。
5. 成品放在 `academy/<slug>.md`，不要放进 `blog/`。

## 笔记骨架

```markdown
---
id: academy_<12 hex>
title: <课程或教程中文标题>
description: <一句说明>
source: https://academy.claude.com/...
course: <课程名>
level: beginner
updated: YYYY-MM-DD
tags:
  - Claude
status: published
---

# <标题>

## 这节课学什么
## 适合谁
## 学习路线
## 关键概念
## 动手练习
## 我的实践记录
## 下一步
```

## 完成检查

- source 可打开且课程范围可确认
- id 已存在且更新时保留
- 未把未执行步骤写成已完成
- 没有复制大段课程原文或完整代码材料
- 文章已落盘到 `academy/`
- 学习路线/栏目索引更新是幂等的
