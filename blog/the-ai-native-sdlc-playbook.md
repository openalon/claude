---
id: blog_8f2c1a7d4e6b
title: AI 原生 SDLC：从计划到维护的交付闭环
description: 基于 Claude Blog 原文，整理 AI 参与软件开发生命周期后的阶段变化、工件链路与治理边界。
source: https://claude.com/blog/the-ai-native-sdlc-playbook
published: 2026-08-21
updated: 2026-09-12
tags:
  - Claude
  - Claude Code
  - 软件工程
status: published
---

# AI 原生 SDLC：从计划到维护的交付闭环

[阅读 Claude Blog 原文：The AI-Native SDLC playbook](https://claude.com/blog/the-ai-native-sdlc-playbook)

> 本文是对官方文章的中文学习整理，不是官方翻译。以下内容先复述文章观点，再补充我的理解；文章中的示例和产品状态以原文为准。

## 文章在解决什么问题

这篇文章讨论了一个变化：代码生成变快之后，软件交付的瓶颈可能从构建阶段转移到其他环节。

传统软件开发生命周期（SDLC）的计划、设计、构建、测试、部署和维护，通常按照“人写代码”的速度设计。代理能够快速生成大量代码后，新的排队点可能出现在：

- 需求和设计还没有被澄清；
- 人工逐行审查无法跟上 diff 的数量；
- 安全与合规审查形成队列；
- 测试、部署和生产维护仍依赖人工处理。

因此，文章主张不要只加速 Build 阶段，而要把 AI 放进整个交付循环中。

## AI-native SDLC 是什么

文章把 AI-native SDLC 描述为一个由代理参与、由工件衔接的循环，而不是一条单向流水线：

```text
原始问题
  → intent.md
  → spec.md
  → plan.md
  → 代码与测试
  → PR 与 review findings
  → 部署与生产信号
  → 新的 intent.md
```

这里的关键不是文件名本身，而是每个阶段都留下可提交、可追踪、可被下一阶段读取的结果。接受 `intent.md` 可以触发 Design；批准 `spec.md` 可以进入 Plan；合并 PR 可以触发后续 pipeline；生产控制带被突破，则可以生成新的 `intent.md`。

人类并没有从流程中消失。文章把人的重点放在意图确认、风险判断、政策例外和生产授权上，把重复性的整理、检查和诊断交给代理或自动化系统。

## 1. Plan：先把问题记录成 intent.md

文章建议，需求不要只停留在 backlog、user story 或多轮口头转述中。最初提出问题的人直接用自己的语言描述背景、用户、限制和期望结果，再与 Claude 对话，把内容整理成版本控制中的 `intent.md`。

一个典型流程是：

1. 提出者描述问题、受影响的用户、约束和成功标准；
2. Claude 通过提问澄清范围和未决问题；
3. Claude 按组织模板生成 `intent.md`；
4. 提出者纠正误解并提交文件；
5. Product owner 审查，接受或拒绝进入 Design。

原文用“理赔状态自助查询”举例：客户频繁打电话询问理赔进度，理赔处理人员约三分之一的通话时间用于状态查询。目标是在门户显示状态、下一步和预计日期；相关团队包括 claims handlers、portal team 和 claims-core API；约束包括沿用现有认证、不能在门户会话中引入新的 PII；第三方损失理算师是否需要访问则作为未决问题保留下来。

这个例子说明，`intent.md` 不只是“做一个查询页面”，还要保留问题规模、参与者、技术依赖、隐私约束和需要决策的事项。

**角色边界**：提出者负责表达和校正意图，Claude 负责提问和整理，Product owner 负责批准。git 历史记录作者、时间和修订过程。

**衡量方式**：可以观察首次对话到提交 `intent.md` 的时间，以及被接受进入 Design 的比例和后续需求修改次数。

## 2. Design：从意图生成规格与风险清单

在 Design 阶段，Claude 读取已批准的 `intent.md`，结合组织的品牌、安全、合规和 UX skills，生成 `spec.md`。这一步不是让代理自由设计，而是把组织规则带入规格生成过程，并提前标出冲突和风险。

流程通常是：

1. Product owner 提供 `intent.md` 和适用的组织 skills；
2. Claude 生成需求、设计和风险说明；
3. Product owner 对照原始意图审查；
4. 政策负责人处理安全、合规等问题；
5. 提交 `intent.md`、`spec.md`、生成提示和 skills 版本；
6. 高风险事项交由技术负责人参与判断。

文章还提到，前端工作可以先在 Claude Design 中依据 `intent.md` 创建和迭代 mock，再导出到 Claude Code 实现。

这里的前置条件很重要：没有批准的 `intent.md`，就不应直接进入规格生成；而人类始终决定规格是否满足目标、是否可以进入 Build。

## 3. Build：先计划，再让代理执行

### Plan mode 与 plan.md

文章建议工程师先在只读 plan mode 中分析代码库，生成 `plan.md`，由人审查后再允许修改代码。计划至少应说明：

- 要修改或新增哪些文件；
- 修改的顺序；
- 测试和验证方式；
- 最高风险步骤；
- 可能破坏的现有行为；
- 没有采用的方案及原因。

原文示例计划包括新建 `StatusPanel.tsx`、修改 `status.py`、添加 `test_status.py`，先实现受现有认证保护的状态接口，再实现前端面板，最后接入门户导航，同时检查 claims-core API 的速率限制，并用四种理赔状态和截图验证结果。

计划不是一次性文档：如果实现偏离计划，应在同一提交中更新 `plan.md`。之后的 PR review 也可以用它对照“原本打算做什么”和“实际做了什么”。

### Auto mode、并行会话与 subagents

当 `CLAUDE.md`、skills、hooks 和测试已经成熟后，文章认为常规、低风险、小范围任务可以使用 auto mode。但并行并不等于无限增加代理：共享文件的任务不能随意并行，工程师还要有能力审查所有结果。文章建议从两到三个会话开始。

Worktree 可以隔离多个 Claude Code 会话；subagents 可以承担验证、审查等专门任务。原文的 `verifier` 示例只负责启动应用、检查修改后的行为、报告结果和与 `plan.md` 的偏差，不负责自行修复。

## 4. 让组织知识成为可复用上下文

### CLAUDE.md

`CLAUDE.md` 用来记录代理和新成员都需要知道的仓库事实，例如构建、测试和 lint 命令，技术栈约定，金额必须使用 `BigDecimal`，每个 endpoint 必须有 integration test，generated classes 不得手工修改，冻结的 `v1/` 包不能修改。

文章建议：

- 用 `/init` 生成初稿；
- 只保留新成员第一天必须知道的内容；
- 同一错误出现两次后再加入；
- 像代码一样通过 PR 和 code owner 审查；
- 不把正式政策全部塞进这个文件。

### Skills

Skills 适合承载需要一致执行、但仍需代理理解和判断的组织知识。例如 `secure-api-review` 可以要求外部接口使用 gateway JWT、依据 OpenAPI schema 校验请求体、状态变更写审计事件、禁止把 PII 写入日志，并执行 `scripts/check-endpoints.sh`。

Skill 本身是 advisory control。如果一条规则必须无条件执行，就不应只依赖 skill，而要使用 hooks、CI 或 PR review 等确定性机制。

### Hooks

Hooks 在代理执行动作时提供确定性控制，可以：

- 阻止修改生成文件或冻结路径；
- 自动运行 formatter 和 linter；
- 阻止凭据进入 diff；
- 在生产部署前要求授权；
- 防止修复任务修改测试文件。

文章给出的分工是：平台团队负责非协商性 hooks，项目级 hooks 可以放在 `.claude/settings.json`，受监管环境则使用工程师不能绕过的 managed settings。

## 5. Test：让代理在交付前获得反馈

测试阶段的重点是把反馈前移。每次代理会话都应该能运行测试、构建、静态检查或截图验证，而不是等到 CI、QA 或生产环境才发现问题。

文章建议：

1. 把复杂验证封装成单一命令；
2. 在 `CLAUDE.md` 中写明命令和成功输出；
3. 为任务定义可量化的完成标准；
4. 修复 bug 时先写失败测试；
5. UI 工作使用浏览器或截图形成闭环；
6. 完成前运行并展示验证结果；
7. 用 hook 防止代理削弱测试或修改测试文件。

如果组织还要评估代理配置本身，可以把近期 20–50 个真实任务组成 eval suite。当模型、提示、`CLAUDE.md`、skills 或 hooks 发生变化时，在 CI 中运行这些 eval，以通过率作为配置变更的门槛。生产事故也可以转化为新的 eval。文章同时提醒，eval 会随着模型能力提高而失去区分度，需要持续维护。

## 6. Deploy：代理可以审查，但不能自我批准

### PR review

文章建议用 `REVIEW.md` 定义三类 review pass：

- **Bugs**：逻辑错误和回归；
- **Security**：注入、认证、PII 等风险；
- **Compliance**：是否符合 `spec.md`、`plan.md` 和设计原则。

文件还应规定 Important 与 Nit 的标准、Nit 数量上限、已经由 CI 强制执行的检查，以及生成文件等排除项。

Claude 可以处理机械性检查、响应 `@claude` 评论和分析失败检查；人类主要判断行为是否符合意图、风险是否可接受。代理不能批准自己生成的代码，branch protection 和 code owner 审批仍然有效。

### Hooks 与生产审批

Hooks 也可以作为发布闸门。例如，当命令同时包含 `deploy` 和 `production` 时，如果没有 `RELEASE_APPROVAL`，hook 就阻止执行。代理可以执行到这道门，但不能越过它。

### CI/CD

文章建议从只读任务开始，例如分析失败构建、起草 changelog；之后再逐步加入通过 PR 的写操作。代理应运行在隔离容器中，使用短期凭据和分级网络权限，并通过 MCP 访问部署、状态和回滚工具。

原文的 CI 示例是：Claude 读取构建日志，判断失败更像 flaky test 还是真实故障，然后把三行摘要写入 PR。生产环境则必须保留 release gate，代理不能直接推送 `main`，rollback 也应是经过验证的单一命令或 runbook。

## 7. Maintain：让生产信号重新进入计划阶段

Maintain 阶段使流程从“由人启动”变成“由事件启动”。监控发现异常后，确定性脚本判断是否越过阈值，Claude 负责诊断或提出受控行动，并把结果写回新的 `intent.md`。

一个安全的流程是：

1. 选择有稳定滚动基线的指标；
2. 用确定性脚本检测异常；
3. 在 `bands.yaml` 中定义响应等级；
4. 由定时任务、webhook 或 Cron Job 启动 Claude；
5. Claude 生成诊断或新的 `intent.md`；
6. service owner 或 on-call 工程师分诊；
7. 修复上线后把事故加入 eval suite。

文章以 CI 测试失败率为例：

- 1σ：只记录；
- 2σ：允许 Claude 只读诊断；
- 3σ：允许提出 PR，或触发已批准的 rollback runbook。

这里的边界是：检测必须完全确定性，不能让模型判断“是否异常”；Claude 只能通过 PR 或预批准 runbook 行动，高风险生产操作仍需要人工授权。

## 8. 周期性安全扫描与事件入口

文章还把周期性代码扫描和团队协作工具纳入闭环。一次性安全扫描会随着代码和模型变化而过时，因此可以按仓库、服务或团队定期扫描，将发现送入既有 PR 和治理流程。扫描不能替代 CI 中的确定性静态分析和依赖扫描，修复也不能绕过 PR review gate。

在事件响应方面，Claude Tag 可以从 Slack、Teams、工单等入口读取上下文，通过 MCP 验证指标，协助形成小型修复 PR；大型问题则写成 `intent.md`，post-mortem 可以保存为版本控制中的 lessons 文件。通信频道保留请求、诊断、授权和修复过程，但不替代人类授权。

原文提到的 Claude Security、Claude Code on the Web、Claude Tag 等能力有具体产品和可用性前提，不能把它们当成所有团队默认拥有的基础设施。

## 9. 不必替换遗留系统，但必须明确事实来源

AI-native SDLC 不要求组织立刻替换 Jira、ServiceNow、Figma 或监管要求的系统。文章提出三种做法：

1. **仓库是事实来源**：markdown 工件是权威记录；
2. **遗留系统是事实来源**：Jira、ServiceNow 等系统权威，markdown 是工作副本；
3. **至少建立关联**：两边记录业务系统 ID、commit SHA 或链接。

关键不是选择哪一种，而是明确每类工件由谁负责、哪里是权威来源，以及如何从一边追溯到另一边。否则，自动化只会制造两套无法解释的记录。

## 我的理解

我认为这篇文章最值得带走的不是“让 Claude 参与六个阶段”，而是三条工程原则：

1. **用工件传递上下文**：`intent.md`、`spec.md`、`plan.md`、测试和 review findings 让需求不会只存在于一次对话里；
2. **把组织知识写下来**：`CLAUDE.md` 和 skills 让代理能够复用团队约定，但不能替代确定性政策；
3. **把自治放在边界内**：hooks、sandbox、branch protection、code owner 和 release gate 负责限制代理，代理负责整理、实现、诊断和提出变更。

因此，AI-native SDLC 不是“完全自动化的软件开发”，而是把人的工作从大量重复操作，转向意图、风险、例外和生产授权等判断。

## 实践边界

以上是对官方文章的整理，不代表本专栏已经在真实团队或生产系统中验证了完整方案。若要开始尝试，较稳妥的最小闭环是：

1. 选一个低风险需求，创建 `intent.md`；
2. 由 Product owner 审查后生成 `spec.md`；
3. 用 plan mode 生成并批准 `plan.md`；
4. 让代理实现，并运行测试或截图验证；
5. 通过 PR review 和人工审批发布；
6. 将一次失败或事故记录为新的 eval 或维护任务。

不要一开始就开放生产写权限。先让工件链、验证命令、review 规则和审批边界稳定下来，再逐步增加代理的自主程度。
