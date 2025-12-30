# 🌐 BunnyEra AI — API Gateway Documentation  
### Module: gateway/  
### BunnyEra LLC · 2025

This document describes the API Gateway module inside BunnyEra AI, including its architecture, routing model, authentication flow, rate‑limiting logic, and integration with agents, automation, Console, and Matrix.

The API Gateway is the **single entry point** for all BunnyEra AI traffic.

---

# 1. Overview

The BunnyEra AI API Gateway provides:

- Unified API entrypoint  
- Authentication & authorization  
- Rate limiting  
- Routing to controllers/services  
- Logging & monitoring hooks  
- Integration with BunnyEra Console  
- Integration with multi‑agent workflows  
- Error handling & response normalization  

The gateway ensures that all requests entering the system follow a consistent, secure, and observable path.

---

# 2. Gateway Architecture

```
┌──────────────────────────────┐
│         External Clients      │
│  Web / Mobile / Console / AI │
└───────────────┬──────────────┘
                ▼
      ┌───────────────────┐
      │    API Gateway    │
      │ Auth / Rate / Log │
      └─────────┬─────────┘
                ▼
   ┌──────────────────────────┐
   │      Controllers         │
   └─────────────┬────────────┘
                 ▼
     ┌────────────────────────┐
     │        Services         │
     └─────────────┬──────────┘
                   ▼
         ┌──────────────────┐
         │      Models       │
         └──────────────────┘
```

---

# 3. Core Responsibilities

## 3.1 Authentication  
The gateway validates:

- API keys  
- Tokens  
- Session signatures  
- Console‑issued credentials  
- Internal service tokens  

Invalid requests are rejected before reaching controllers.

---

## 3.2 Rate Limiting  
The gateway enforces:

- Per‑IP rate limits  
- Per‑token rate limits  
- Burst protection  
- Abuse prevention  

Future upgrade (v1.1+):

- Redis‑backed distributed rate limiting  

---

## 3.3 Routing  
The gateway maps incoming requests to:

- Controllers  
- Services  
- Agent workflows  
- Automation tasks  
- Matrix resource handlers  

Routing rules are defined in:

```
routes/
```

---

## 3.4 Logging & Monitoring  
The gateway logs:

- Request metadata  
- Response time  
- Errors  
- Agent triggers  
- Automation triggers  

Logs are forwarded to:

- BunnyEra Console  
- Local log system (`logs/`)  

---

## 3.5 Error Handling  
The gateway normalizes all errors into a consistent format:

```
{
  success: false,
  error: {
    code: "...",
    message: "...",
    details: {...}
  }
}
```

This ensures predictable behavior across all clients.

---

# 4. Request Lifecycle

```
Client Request
   ↓
API Gateway
   ↓
Auth → Rate Limit → Logging
   ↓
Routing
   ↓
Controller
   ↓
Service
   ↓
Model / Agent / Automation
   ↓
Response → Gateway → Client
```

---

# 5. Integration Points

## 5.1 Multi‑Agent System  
The gateway can trigger:

- Planner  
- Leader  
- Executor  
- Automation tasks via agents  

Example:

```
POST /ai/execute → Gateway → Controller → Leader Agent
```

---

## 5.2 Automation Engine  
The gateway can:

- Trigger automation tasks  
- Receive webhook events  
- Forward automation logs to Console  

---

## 5.3 BunnyEra Console  
The gateway exposes:

- System metrics  
- Logs  
- Agent status  
- Task progress  
- Resource pool data  

Console can also call gateway endpoints for:

- Manual triggers  
- System checks  
- Resource refresh  

---

## 5.4 BunnyEra Matrix  
The gateway routes requests for:

- Phone pool  
- Email pool  
- Virtual card system  
- Identity workflows  

Example:

```
GET /matrix/phone/next
POST /matrix/card/charge
```

---

# 6. Directory Structure

```
gateway/
  ├── auth.js
  ├── rateLimit.js
  ├── router.js
  ├── logger.js
  └── index.js
```

Each file contains:

- Middleware logic  
- Validation rules  
- Routing definitions  
- Logging hooks  

---

# 7. Future Enhancements

Planned for v1.1+:

- Distributed gateway cluster  
- Redis‑based rate limiting  
- API analytics dashboard  
- Console‑controlled gateway rules  
- Zero‑downtime hot reload  

---

# 8. Document Version

API Gateway Module Documentation v1.0  
Aligned with BunnyEra AI v1.0 Release

© 2025 BunnyEra LLC
