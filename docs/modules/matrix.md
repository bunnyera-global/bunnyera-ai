# 🗂 BunnyEra AI — Matrix Resource Pool Documentation  
### Module: Matrix (Phone / Email / Virtual Card / Identity)  
### BunnyEra LLC · 2025

This document describes the Matrix Resource Pool system used by BunnyEra AI.  
Matrix is the unified identity and resource layer that provides:

- Virtual phone numbers  
- Email inboxes  
- Virtual cards (AgentCardOS)  
- Identity automation workflows  

Matrix is a core dependency for BunnyEra AI, BunnyEra Console, and BunnyEra System.

---

# 1. Overview

Matrix is the **central identity resource pool** for the entire BunnyEra ecosystem.  
It provides:

- Disposable & persistent phone numbers  
- Email inboxes for verification  
- Virtual cards for payments  
- Identity bundles for automation  
- API endpoints for resource allocation  
- Automated refresh & recycling  

Matrix is designed for:

- Account registration  
- Verification workflows  
- Payment automation  
- Multi‑platform identity management  
- AI‑driven resource allocation  

---

# 2. Matrix Architecture

```
┌──────────────────────────────┐
│        BunnyEra Console       │
│  (Monitor / Logs / Resource)  │
└───────────────┬──────────────┘
                ▼
      ┌───────────────────┐
      │   BunnyEra AI     │
      │  (Agents / RPA)   │
      └─────────┬─────────┘
                ▼
   ┌──────────────────────────┐
   │        Matrix API        │
   │ Phone / Email / Card     │
   └─────────────┬────────────┘
                 ▼
     ┌────────────────────────┐
     │  External Providers    │
     │  SMS / Email / Card    │
     └────────────────────────┘
```

---

# 3. Resource Types

Matrix currently manages **四大资源池**：

---

## 3.1 Phone Number Pool  
Used for:

- SMS verification  
- Account registration  
- Multi‑platform identity automation  

Features:

- Auto‑refresh  
- Auto‑recycle  
- Multi‑country support  
- AI‑driven provider selection  

Example API:

```
GET /matrix/phone/next
POST /matrix/phone/release
```

---

## 3.2 Email Inbox Pool  
Used for:

- Email verification  
- OTP retrieval  
- Account onboarding  

Features:

- Auto‑inbox scanning  
- Auto‑OTP extraction  
- Spam filtering  
- AI‑based provider fallback  

Example API:

```
GET /matrix/email/next
GET /matrix/email/inbox?id=xxxx
```

---

## 3.3 Virtual Card System (AgentCardOS)  
Used for:

- Payment automation  
- Subscription management  
- Platform verification  
- International services  

Features:

- Instant virtual card issuance  
- Optional physical card upgrade  
- Crypto‑funded balance  
- ATM withdrawal support  
- Low fees  
- No monthly cost  

Example API:

```
POST /matrix/card/create
POST /matrix/card/charge
GET  /matrix/card/balance?id=xxxx
```

---

## 3.4 Identity Bundles  
A bundle may include:

- Phone number  
- Email inbox  
- Virtual card  
- Device fingerprint  
- Proxy endpoint  

Used for:

- Automated account creation  
- Multi‑platform identity rotation  
- AI‑driven risk control  

---

# 4. Integration with BunnyEra AI

Matrix is deeply integrated with:

## 4.1 Multi‑Agent System  
Agents can:

- Request phone numbers  
- Fetch email OTP  
- Charge virtual cards  
- Trigger identity workflows  

Example:

```
Planner → Leader → Executor → Matrix API
```

---

## 4.2 Automation Engine  
Automation tasks can:

- Refresh phone pools  
- Clean expired inboxes  
- Auto‑charge virtual cards  
- Sync provider status  

---

## 4.3 BunnyEra Console  
Console displays:

- Resource usage  
- Pool health  
- Provider status  
- Card balance  
- Identity logs  

Console can also trigger:

- Manual refresh  
- Resource allocation  
- Provider switching  

---

# 5. Directory Structure (Planned)

```
matrix/
  ├── phone.js
  ├── email.js
  ├── card.js
  ├── identity.js
  └── provider/
        ├── sms/
        ├── email/
        └── card/
```

---

# 6. Future Enhancements

Planned for v1.1+:

- Distributed resource pool cluster  
- Provider auto‑switching AI  
- Real‑time inbox streaming  
- Virtual card automation dashboard  
- Identity fingerprint generator  
- Proxy pool integration  

---

# 7. Document Version

Matrix Module Documentation v1.0  
Aligned with BunnyEra AI v1.0 Release

© 2025 BunnyEra LLC
