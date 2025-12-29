🤖 BunnyEra AI — Modular Intelligence Engine
BunnyEra LLC · 2025
BunnyEra AI 是 BunnyEra 品牌体系中的 独立智能模块，负责多智能体协作、自动化逻辑、任务规划、代码生成、审查与执行。
本仓库采用 企业级模块化结构，并与 BunnyEra Console、System、Matrix 等核心系统深度联动。

📌 Overview 概述
This repository contains the AI-driven core of the BunnyEra ecosystem, including:
- Multi‑agent architecture
- Prompt engineering system
- Automation logic
- Task planning and execution
- Integration with BunnyEra Console & System
这是 BunnyEra 的 智能驱动层，负责所有 AI 行为、自动化流程与智能代理协作。

🧠 Core Modules 核心模块
1. Agent System（智能代理系统）
Located in:
modules/AgentModule/
包含五大核心智能体：
|  |  |  | 
|  |  |  | 
|  |  |  | 
|  |  |  | 
|  |  |  | 
|  |  |  | 


所有 prompt 文件均为 可扩展、可替换、可版本化 的模块。
2. Automation（自动化逻辑）
- RPA 自动化
- Cron 任务
- Worker 队列
- Webhook 处理
- 系统级自动化流程

3. Integration（系统联动）
BunnyEra AI 与以下系统深度集成：
- BunnyEra Console（桌面端）
- BunnyEra System（主系统）
- BunnyEra Matrix（账号矩阵）
- BunnyEra NotifyCenter（通知中心）

🏗 Repository Structure 仓库结构
bunnyera-ai/
│
├── modules/
│   ├── AgentModule/        # 多智能体系统（Leader / Planner / Coder / Reviewer / Executor）
│   └── LogModule/          # 日志模块
│
├── prompts/                # Prompt 体系（可扩展）
├── scripts/                # 自动化脚本
├── tests/                  # Playwright / E2E 测试
└── README.md               # 当前文档



🔗 Features 功能特性
- 多智能体协作（Leader / Planner / Coder / Reviewer / Executor）
- Prompt 体系（模块化、可扩展）
- 自动化任务执行
- 系统级联动（Console / System / Matrix）
- 可扩展的插件式架构
- 企业级分支结构（feature/ui, feature/gateway, feature/agents 等）

🚀 Development Workflow 开发流程
1. 创建功能分支
git checkout -b feature/<module>


2. 提交代码
git add .
git commit -m "feat: update <module>"


3. 推送到远程
git push -u origin feature/<module>


4. 创建 Pull Request
所有 PR 必须通过：
- 自动化测试
- 代码审查
- 架构检查

📜 License
MIT License
© 2025 BunnyEra LLC

⬅️ Back to Brand Overview
Go to BunnyEra Ecosystem README
