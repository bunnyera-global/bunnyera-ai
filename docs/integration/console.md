# 🖥 BunnyEra Console — Integration Documentation  
### Integration: BunnyEra AI ↔ BunnyEra Console  
### BunnyEra LLC · 2025

This document describes how BunnyEra AI integrates with BunnyEra Console, including log streaming, system monitoring, agent status reporting, automation visibility, and Matrix resource synchronization.

BunnyEra Console acts as the **central operations dashboard** for the entire BunnyEra ecosystem.

---

# 1. Overview

BunnyEra Console provides:

- Real‑time logs  
- System monitoring  
- Agent activity visualization  
- Automation task tracking  
- Matrix resource insights  
- Manual trigger controls  
- Health checks & diagnostics  

BunnyEra AI connects to Console through a structured integration layer.

---

# 2. Integration Architecture

```
┌──────────────────────────────┐
│        BunnyEra Console       │
│  (Logs / Monitor / Resource)  │
└───────────────┬──────────────┘
                ▼
      ┌───────────────────┐
      │   Integration     │
      │  (Console Bridge) │
      └─────────┬─────────┘
                ▼
   ┌──────────────────────────┐
   │       BunnyEra AI        │
   │ Agents / Automation / API│
   └─────────────┬────────────┘
                 ▼
     ┌────────────────────────┐
     │     Matrix Resource     │
     └────────────────────────┘
```

---

# 3. Integration Responsibilities

## 3.1 Log Streaming  
BunnyEra AI sends logs to Console for:

- Agent activity  
- Automation tasks  
- API gateway events  
- Errors & warnings  
- System metrics  

Log types include:

- `info`  
- `warn`  
- `error`  
- `agent`  
- `automation`  
- `matrix`  

Console displays logs in real time.

---

## 3.2 System Monitoring  
Console receives:

- CPU usage  
- Memory usage  
- Disk usage  
- Active tasks  
- Queue length  
- Agent load  
- Automation status  

These metrics are collected by:

```
modules/LogModule
modules/MonitorModule
```

---

## 3.3 Agent Status Visualization  
Console shows:

- Planner activity  
- Leader orchestration  
- Coder generation  
- Reviewer validation  
- Executor execution  

Each agent sends:

- Start event  
- End event  
- Error event  
- Output summary  

---

## 3.4 Automation Tracking  
Console displays:

- Scheduled tasks  
- RPA workflows  
- Webhook events  
- Task success/failure  
- Execution time  
- Retry attempts  

Automation engine sends:

```
automation → consoleBridge → Console
```

---

## 3.5 Matrix Resource Sync  
Console shows:

- Phone pool status  
- Email inbox status  
- Virtual card balance  
- Provider health  
- Identity bundle usage  

Matrix sends:

- Resource allocation events  
- Resource release events  
- Provider errors  
- Balance updates  

---

# 4. Communication Model

```
AI → ConsoleBridge → Console
Console → ConsoleBridge → AI
```

### Outbound (AI → Console)
- Logs  
- Metrics  
- Agent events  
- Automation events  
- Matrix updates  

### Inbound (Console → AI)
- Manual triggers  
- Resource refresh  
- Automation start  
- System checks  

---

# 5. Console Modules (v1.0)

Console currently includes：

| Module | Description |
|--------|-------------|
| **LogModule** | Receives logs from AI |
| **MonitorModule** | Displays system metrics |
| **SignalModule** | Handles verification, translation, rates |
| **ResourceModule** | Shows Matrix resource pools |
| **TaskModule** | Shows automation tasks |
| **AgentModule** | Visualizes multi‑agent activity |

---

# 6. Integration Endpoints (Planned)

```
POST /console/log
POST /console/metrics
POST /console/agent
POST /console/automation
POST /console/matrix
POST /console/signal
```

Console → AI:

```
POST /ai/trigger/automation
POST /ai/trigger/refresh
POST /ai/trigger/diagnostic
```

---

# 7. Directory Structure (Planned)

```
console/
  ├── consoleBridge.js
  ├── logAdapter.js
  ├── metricsAdapter.js
  ├── agentAdapter.js
  ├── automationAdapter.js
  └── matrixAdapter.js
```

---

# 8. Future Enhancements

Planned for v1.1+:

- Real‑time WebSocket channel  
- Distributed monitoring cluster  
- Visual agent timeline  
- Automation flow builder  
- Matrix provider analytics  
- Console‑controlled gateway rules  

---

# 9. Document Version

Console Integration Documentation v1.0  
Aligned with BunnyEra AI v1.0 Release

© 2025 BunnyEra LLC
