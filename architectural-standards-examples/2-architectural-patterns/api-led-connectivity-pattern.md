# Architectural Pattern: API-Led Connectivity

**Pattern Name**: API-Led Connectivity (3-Layer API Architecture)
**Category**: Integration Patterns
**Last Updated**: 2026-01-05
**Owner**: Enterprise Architecture - Integration Lead
**Status**: ✅ Active - Mandatory for all new API development

---

## Context

**Problem**: Traditional point-to-point integrations create brittle, unmaintainable spaghetti architectures. Changes to one system cascade across all connected systems. Reuse is minimal. Business agility suffers.

**When to Use This Pattern**:
- ✅ Building new REST APIs for application integration
- ✅ Exposing data to mobile apps, portals, or external partners
- ✅ Modernizing legacy point-to-point integrations
- ✅ Creating reusable integration services

**When NOT to Use**:
- ❌ Event-driven real-time streaming (use Kafka event pattern instead)
- ❌ Batch file transfers (use ETL pattern)
- ❌ Legacy SOAP-only vendor integrations (use SOAP adapter pattern)

---

## Pattern Overview

API-Led Connectivity organizes APIs into three layers based on their purpose and audience:

```
┌─────────────────────────────────────────────────────────────┐
│                     EXPERIENCE LAYER                         │
│  (Customer/Employee-facing APIs - Business process context) │
│                                                              │
│  Examples: Mobile App API, Customer Portal API,             │
│            Field Worker API                                  │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                     PROCESS LAYER                            │
│    (Business logic, orchestration, data aggregation)        │
│                                                              │
│  Examples: Service Order Management API,                     │
│            Billing & Payment Processing API,                 │
│            Outage Management API                             │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                     SYSTEM LAYER                             │
│      (Direct system access - technology abstraction)        │
│                                                              │
│  Examples: SAP Customer API, Oracle CIS API,                 │
│            Salesforce Case API, GIS Data API                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Layer Definitions

### System Layer (System APIs)

**Purpose**: Provide direct, technology-agnostic access to underlying systems of record.

**Characteristics**:
- 1:1 mapping to backend system (one System API per source system)
- Abstract technical complexity (database schemas, SOAP services, files, etc.)
- Expose data in canonical, RESTful format
- Handle authentication, connection pooling, error handling
- Implement caching where appropriate
- **NO business logic** - pure data access/CRUD operations

**Example - Oracle Customer Information System API**:
```
GET    /customers/{customerId}
POST   /customers
PUT    /customers/{customerId}
DELETE /customers/{customerId}
GET    /customers/{customerId}/accounts
GET    /customers/{customerId}/billing-history
```

**Ownership**: IT domain teams (e.g., Customer Systems team owns CIS System API)

---

### Process Layer (Process APIs)

**Purpose**: Orchestrate business processes across multiple systems; implement business logic.

**Characteristics**:
- Calls multiple System APIs and aggregates data
- Implements business logic and validation rules
- Manages transactions across systems
- Transforms data for business context
- **Reusable** across multiple experience channels

**Example - Service Order Management Process API**:
```
POST /service-orders
  Orchestrates:
  1. Create customer record (if new) → CIS System API
  2. Check credit score → Credit Bureau System API
  3. Create service order → Work Management System API
  4. Schedule appointment → Scheduling System API
  5. Send confirmation → Notification System API

GET  /service-orders/{orderId}/status
  Aggregates status from Work Management, Scheduling, Field Mobility
```

**Ownership**: Cross-functional teams (Business + IT collaboration)

---

### Experience Layer (Experience APIs)

**Purpose**: Deliver tailored experiences for specific channels (mobile app, web portal, partner integration).

**Characteristics**:
- Optimized for specific user experience or channel
- Calls Process APIs (and occasionally System APIs if simple)
- Aggregates data specific to experience (e.g., "mobile dashboard")
- May implement channel-specific logic (responsive payloads, pagination)
- **NOT reusable** - purpose-built for one experience

**Example - Field Worker Mobile App API**:
```
GET /field-worker/dashboard
  Returns aggregated data:
  - Today's work orders (from Work Management Process API)
  - Route/navigation (from GIS Process API)
  - Weather alerts (from Weather System API)
  - Safety notifications (from Safety Process API)

POST /field-worker/work-orders/{orderId}/complete
  Orchestrates completion workflow via Process APIs
```

**Ownership**: Digital channel teams (Mobile team, Portal team, etc.)

---

## Implementation Guidelines

### Technology Stack
- **Platform**: MuleSoft Anypoint (CloudHub)
- **API Specification**: OpenAPI 3.0 (Swagger)
- **Data Format**: JSON (XML only for legacy SOAP)
- **Authentication**: OAuth 2.0 (client credentials or authorization code)
- **API Management**: MuleSoft API Manager

### Naming Conventions

**System APIs**: `{system-name}-sys-api`
- Examples: `sap-customer-sys-api`, `oracle-cis-sys-api`, `salesforce-case-sys-api`

**Process APIs**: `{business-capability}-process-api`
- Examples: `service-order-process-api`, `billing-payment-process-api`

**Experience APIs**: `{channel}-exp-api`
- Examples: `mobile-app-exp-api`, `customer-portal-exp-api`, `partner-integration-exp-api`

### Versioning
- **URL versioning**: `/v1/`, `/v2/` in path
- **Breaking changes**: Require new major version
- **Backward compatibility**: Maintain prior version for 12 months minimum

### Error Handling
- **Standard HTTP status codes**:
  - 200 OK, 201 Created, 204 No Content
  - 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found
  - 500 Internal Server Error, 503 Service Unavailable

- **Error response format**:
```json
{
  "error": {
    "code": "CUSTOMER_NOT_FOUND",
    "message": "Customer ID 12345 does not exist",
    "timestamp": "2026-01-05T10:30:00Z",
    "correlationId": "abc-123-def-456"
  }
}
```

### Performance & Caching
- **System APIs**: Implement caching for reference data (lookup tables, etc.)
- **Process APIs**: Cache aggregated results where appropriate (TTL: 5-60 minutes)
- **Experience APIs**: Minimal caching (fresh data for user experience)

---

## Example Implementation

### Use Case: Customer Self-Service Portal - "View My Bills"

**User Story**: As a customer, I want to view my current and past bills online.

**API Architecture**:

```
Customer Portal (Web UI)
       │
       ▼
┌──────────────────────────────────┐
│  customer-portal-exp-api         │  ← Experience Layer
│  GET /customer/billing-summary   │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│  billing-payment-process-api     │  ← Process Layer
│  GET /customers/{id}/bills       │
│  (Aggregates billing data +      │
│   payment history + preferences) │
└──────┬───────────────────────────┘
       │
       ├─────────────────┬──────────────────┐
       ▼                 ▼                  ▼
┌─────────────┐   ┌──────────────┐   ┌──────────────┐
│ oracle-cis- │   │ payment-     │   │ customer-    │  ← System Layer
│ sys-api     │   │ gateway-     │   │ pref-sys-api │
│             │   │ sys-api      │   │              │
│ GET /bills  │   │ GET /payments│   │ GET /prefs   │
└─────────────┘   └──────────────┘   └──────────────┘
```

**Request Flow**:
1. User clicks "View Bills" in portal → `customer-portal-exp-api`
2. Experience API calls `billing-payment-process-api`
3. Process API orchestrates:
   - Get bills from `oracle-cis-sys-api`
   - Get payment history from `payment-gateway-sys-api`
   - Get paperless preferences from `customer-pref-sys-api`
4. Process API aggregates and transforms data
5. Experience API tailors response for portal UI (pagination, summaries)
6. Portal renders bills

---

## Benefits

| Benefit | Description |
|---------|-------------|
| **Reusability** | Process and System APIs reused across mobile, web, partners (70% reuse achieved) |
| **Agility** | New experiences (chatbot, voice assistant) built rapidly by composing existing APIs |
| **Maintainability** | Change backend system without breaking consumers (System API absorbs changes) |
| **Scalability** | Each layer scales independently based on load |
| **Testability** | Each layer tested independently; mocking simplified |

---

## Consequences / Trade-offs

**Advantages**:
- ✅ High reusability and composability
- ✅ Clear separation of concerns
- ✅ Faster time-to-market for new channels
- ✅ Backend system changes isolated to System Layer

**Disadvantages**:
- ⚠️ Additional latency (3 layers vs. direct integration)
- ⚠️ More APIs to build and maintain initially (investment required)
- ⚠️ Requires discipline to not bypass layers (governance needed)

**Mitigation**:
- Use caching to reduce latency
- Start with Process and System APIs for high-value capabilities
- Enforce pattern through architecture reviews (DARs validate compliance)

---

## Anti-Patterns (What NOT to Do)

| Anti-Pattern | Why It's Bad | Do This Instead |
|--------------|--------------|-----------------|
| **Bypassing layers** (Experience API calls System API directly) | Defeats reusability; business logic scattered | Always route through Process API for orchestration |
| **Business logic in System APIs** | Breaks abstraction; limits reuse | Pure data access only in System APIs |
| **Creating one giant "Utility API"** | Monolithic, hard to maintain | Separate APIs by business capability |
| **Skipping versioning** | Breaking changes break consumers | Always version APIs; maintain backward compatibility |

---

## Compliance & Security

**Authentication**:
- **Internal APIs**: OAuth 2.0 client credentials (app-to-app)
- **External APIs**: OAuth 2.0 authorization code (user delegation)

**Authorization**:
- Implement fine-grained permissions at Process Layer
- System Layer assumes caller (Process API) is authorized

**NERC CIP**:
- APIs accessing OT systems (SCADA, DMS, ADMS) require:
  - Separate API instances in CIP zones
  - Unidirectional gateways where applicable
  - Enhanced logging and monitoring

**Data Privacy**:
- Customer PII encrypted in transit (TLS 1.2+) and at rest
- PII access logged for audit (who, what, when)

---

## Related Patterns
- [Event-Driven Integration Pattern](./event-driven-integration-pattern.md) - For real-time event streaming
- Master Data Management Pattern - For canonical data models (in development)
- Security Authentication Pattern (OAuth2) - For API security (in development)

---

## Success Metrics

Track API-Led Connectivity adoption and effectiveness:
- **Reuse Rate**: % of new experiences using existing Process/System APIs (Target: >70%)
- **Time to Market**: Weeks to build new experience using APIs (Target: <4 weeks)
- **API Performance**: P95 latency <500ms for Experience APIs
- **Compliance**: % of new integrations following pattern (Target: 100%)

---

## Questions or Feedback?
Contact: EA Integration Lead
Email: ea-integration@utility.com
Slack: #architecture-integration
Office Hours: Monthly DAR meetings
