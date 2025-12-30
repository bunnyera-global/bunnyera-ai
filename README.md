# 🐇 BunnyEra AI — Enterprise Multi‑Agent Intelligence Engine  
### BunnyEra LLC · 2025

BunnyEra AI 是 BunnyEra 品牌体系中的核心智能引擎，负责多智能体协作、自动化执行、任务规划、代码生成、审查与系统级集成。  
本仓库采用企业级模块化架构，并与 BunnyEra Console、BunnyEra System、BunnyEra Matrix、NotifyCenter 深度联动。

---

## 🚀 Overview

This repository contains the AI-driven core of the BunnyEra ecosystem, including:

- Multi‑agent architecture  
- Prompt engineering system  
- Automation & workflow engine  
- Task planning and execution  
- Integration with BunnyEra Console & System  
- Modular, scalable enterprise architecture  

---

## 🧠 Core Modules

### 1. Multi‑Agent System  
Located in: `agents/`

| Agent     | Role        | Description           |
|-----------|-------------|-----------------------|
| Leader    | Coordinator | Task coordination     |
| Planner   | Strategist  | Step planning         |
| Coder     | Developer   | Code generation       |
| Reviewer  | QA          | Quality review        |
| Executor  | Operator    | Task execution        |

---

### 2. Automation Engine  
Located in: `automation/`

Includes:

- RPA automation  
- Cron jobs  
- Worker queues  
- Webhook processing  
- System‑level automation  

---

### 3. API Gateway  
Located in: `gateway/`

Responsibilities:

- Unified API entry  
- Authentication  
- Rate limiting  
- Routing  
- Service orchestration  

---

### 4. System Integration

Integrated with:

- **BunnyEra Console**（日志、监控、信号、资源池）  
- **BunnyEra System**（核心服务）  
- **BunnyEra Matrix**（手机号池、邮箱池、虚拟卡系统）  
- **BunnyEra NotifyCenter**（通知系统）  

---

## 📁 Repository Structure

```
bunnyera-ai/
│
├── agents/               # Multi-agent core
├── automation/           # Automation & RPA
├── bunnyera-ai-web/      # Web frontend
├── config/               # Configurations
├── controllers/          # Controllers
├── gateway/              # API gateway
├── logs/                 # Log system
├── middleware/           # Middlewares
├── mobile/               # Mobile module
├── models/               # Database models
├── routes/               # API routes
├── services/             # Business logic
├── tests/                # Test cases
│
├── .env
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── database.sqlite
├── package.json
├── server.js
└── push-bunnyera-ai.bat
```

---

## 🏗 System Architecture

```
                        ┌──────────────────────────┐
                        │      BunnyEra Console     │
                        │  (Logs / Monitor / Signal)│
                        └──────────────┬───────────┘
                                       │
                                       ▼
                         ┌──────────────────────────┐
                         │      API Gateway         │
                         │ (Auth / Rate / Routing)  │
                         └──────────────┬───────────┘
                                       │
        ┌──────────────────────────────┼──────────────────────────────┐
        ▼                              ▼                              ▼
┌──────────────┐              ┌────────────────┐             ┌────────────────┐
│   Controllers │────────────▶│    Services    │────────────▶│    Models      │
└──────────────┘              └────────────────┘             └────────────────┘
                                       │
                                       ▼
                         ┌──────────────────────────┐
                         │      Automation / RPA     │
                         │ (Tasks / Schedulers / RPA)│
                         └──────────────┬───────────┘
                                       │
                                       ▼
                         ┌──────────────────────────┐
                         │     Multi‑Agent Core      │
                         │ Planner / Leader / Coder  │
                         │ Reviewer / Executor       │
                         └──────────────┬───────────┘
                                       │
                                       ▼
                         ┌──────────────────────────┐
                         │   Resource Pools (Matrix) │
                         │ Phone / Email / Card      │
                         └──────────────────────────┘
```

---

## ✨ Features

- Multi‑agent collaboration  
- Modular prompt system  
- Automation execution engine  
- System‑level integration  
- Plugin‑ready architecture  
- Enterprise Git branch workflow  

---

## 🧩 Development Workflow

### Create feature branch
```
git checkout -b feature/<module>
```

### Commit changes
```
git add .
git commit -m "feat: update <module>"
```

### Push branch
```
git push -u origin feature/<module>
```

### Pull Request Requirements
- Automated tests  
- Code review  
- Architecture validation  

---

## 🐳 Deployment

### Docker
```
docker build -t bunnyera-ai .
docker run -p 3000:3000 bunnyera-ai
```

### Docker Compose
```
docker-compose up -d
```

---

## 📜 License

MIT License  
© 2025 BunnyEra LLC

---

## 🔗 Related Repositories

- BunnyEra Console  
- BunnyEra System  
- BunnyEra Matrix  
- BunnyEra NotifyCenter  
