# Architecture Review Checklist

**Document Type**: Governance Tool
**Last Updated**: 2026-01-05
**Owner**: Enterprise Architecture Team
**Users**: Domain Architecture Reviewers (DARs), EA Team, Project Teams

---

## Purpose

This checklist is used by DARs and EA team to conduct architecture reviews for all demands (Enhancement, Tier 3, Tier 2, Tier 1). It ensures consistent, comprehensive review across all projects and domains.

---

## How to Use This Checklist

1. **Complete for every demand**: Enhancement through Tier 1
2. **Rate each item**: Green (✅), Yellow (⚠️), or Red (❌)
3. **Document findings**: Note concerns, risks, required mitigations
4. **Escalation decision**: If 3+ Yellow or any Red → Escalate to EA
5. **Attach to demand record**: Checklist becomes part of architecture decision documentation

---

## Section 1: Technology & Standards Compliance

### 1.1 Technology Stack

| Checkpoint | Rating | Notes |
|------------|--------|-------|
| All technologies are on **Approved Technology Portfolio** list | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| No end-of-life or **sunset technologies** being used or extended | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| Technology **vendors** are on approved vendor list with active support contracts | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| Proposed solution aligns with **domain technology roadmap** | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| If using **new/non-approved technology**, exception request submitted and approved | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |

**Red Flags**:
- ❌ Using technology not on approved list without exception
- ❌ Extending end-of-life technology (e.g., Windows Server 2012, Java 8)
- ❌ Vendor contract expired or vendor financially unstable

---

## Section 2: Integration & Data Architecture

### 2.1 Integration Approach

| Checkpoint | Rating | Notes |
|------------|--------|-------|
| Integration uses **approved patterns** (API-led connectivity, event-driven, batch ETL) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| Integration uses **MuleSoft APIs** (System, Process, or Experience APIs) where applicable | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |
| **No new point-to-point integrations** being created (use integration platform) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| Real-time integration uses **Kafka** (if event-driven) or REST APIs (if request-response) | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |
| Batch integration uses **Informatica** or approved ETL tool | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |

**Red Flags**:
- ❌ Direct database-to-database integration (bypassing API layer)
- ❌ Custom-coded point-to-point integration (not using MuleSoft/Kafka)
- ❌ File-based integration without proper error handling or monitoring

---

### 2.2 Data Architecture

| Checkpoint | Rating | Notes |
|------------|--------|-------|
| Data model follows **enterprise canonical data model** (customer, account, meter, asset entities) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| **Master data sources** identified and aligned with MDM strategy | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| Data naming conventions follow **enterprise standards** (no abbreviations, camelCase/snake_case per platform) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| **Data quality** requirements defined (validation rules, cleansing, de-duplication) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| **Data governance** roles defined (data owner, data steward, data custodian) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| No **data silos** created (data accessible to other systems via APIs) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |

**Red Flags**:
- ❌ Creating new customer master database (CIS is system of record)
- ❌ Proprietary data formats that can't be accessed by other systems
- ❌ No data quality validation (garbage in, garbage out)

---

## Section 3: Security, Privacy & Compliance

### 3.1 Security

| Checkpoint | Rating | Notes |
|------------|--------|-------|
| **Authentication** method defined and approved (Azure AD, OAuth 2.0, API keys) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| **Authorization** model defined (RBAC, ABAC, role-based access control) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| **Data in transit** encrypted (TLS 1.2 or higher) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| **Data at rest** encrypted (if storing sensitive data: PII, PHI, PCI, etc.) | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |
| **Security scanning** included in CI/CD (SAST, DAST, dependency scanning) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| **Secrets management** uses approved tool (Azure Key Vault, not hardcoded passwords) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |

**Red Flags**:
- ❌ Hardcoded passwords or API keys in code
- ❌ Unencrypted transmission of PII or credentials
- ❌ No authentication (public APIs without any access control)

---

### 3.2 Privacy & PII

| Checkpoint | Rating | Notes |
|------------|--------|-------|
| **Privacy impact assessment** conducted (if customer or employee PII involved) | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |
| PII access **logged and auditable** (who accessed what data when) | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |
| **Data minimization**: Only collect/store PII that is necessary | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |
| **Data retention** policy defined (how long to keep PII, deletion process) | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |
| **Consent management** (for customer data collection beyond utility service) | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |

**Red Flags**:
- ❌ Collecting PII without business justification
- ❌ No audit trail for PII access (can't answer "who looked at customer X's data?")
- ❌ Storing PII indefinitely without retention policy

---

### 3.3 Regulatory Compliance

| Checkpoint | Rating | Notes |
|------------|--------|-------|
| **NERC CIP requirements** assessed (if OT/SCADA integration or BES Cyber System) | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |
| NERC CIP **zone boundaries** respected (OT→IT unidirectional, no IT→OT) | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |
| **PUC reporting** requirements identified (if customer billing or service data) | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |
| **PCI-DSS** compliance (if handling credit card payment data) | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |
| **FERC/FERC standards** applicable (if transmission grid or wholesale market data) | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |

**Red Flags**:
- ❌ IT→OT integration without cybersecurity approval (NERC CIP violation)
- ❌ Storing credit card numbers without PCI-DSS compliance
- ❌ No plan for PUC audit compliance

**Action if ❌ on NERC CIP**: **STOP**. Escalate to Cybersecurity team immediately. Do not proceed.

---

## Section 4: Technical Debt & Quality

### 4.1 Technical Debt

| Checkpoint | Rating | Notes |
|------------|--------|-------|
| **No new technical debt** introduced (or explicitly documented and accepted by business) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| **Existing technical debt** in affected systems reduced where feasible | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |
| No **anti-patterns** introduced (e.g., monolithic code in microservices architecture) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| Code is **modular and loosely coupled** (not tightly coupled spaghetti) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| **Configuration externalized** (not hardcoded; use config files, env variables, Azure App Config) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |

**Red Flags**:
- ❌ "We'll fix it later" (technical debt with no remediation plan)
- ❌ Copy-paste code instead of reusable functions/modules
- ❌ Hardcoded configuration (URLs, IPs, credentials)

---

### 4.2 Code Quality & Testing

| Checkpoint | Rating | Notes |
|------------|--------|-------|
| **Testing strategy** defined (unit tests, integration tests, UAT, performance tests) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| **Code coverage** target ≥70% (unit test coverage) | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |
| **CI/CD pipeline** includes automated tests (not manual testing only) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| **Code reviews** required before merge (peer review, not solo development) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| Solution is **maintainable** with existing team skills (not esoteric technology) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |

**Red Flags**:
- ❌ No testing (manual testing only, no automated tests)
- ❌ No code reviews (developer commits directly to main branch)
- ❌ Using technology no one on team knows (bus factor = 1)

---

## Section 5: Operational Readiness & Business Continuity

### 5.1 Deployment & Operations

| Checkpoint | Rating | Notes |
|------------|--------|-------|
| **Deployment approach** follows established CI/CD patterns (Azure DevOps, GitHub Actions) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| **Blue-green or canary deployment** for zero-downtime releases (if customer-facing) | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |
| **Rollback plan** defined (if deployment fails, how to revert) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| **Monitoring and alerting** configured (application health, performance, errors) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| **Logging** centralized (Azure Monitor, ELK stack, not local files) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| **Operational runbooks** documented (how to troubleshoot common issues) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |

**Red Flags**:
- ❌ Manual deployment (no automation)
- ❌ No monitoring (can't tell if application is healthy)
- ❌ Logs on local server (lost when server crashes)

---

### 5.2 Vendor Supportability

| Checkpoint | Rating | Notes |
|------------|--------|-------|
| **Vendor support** model confirmed (SLAs, support hours, escalation paths) | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |
| Vendor provides **24/7 support** (if mission-critical application) | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |
| **Patch/upgrade** process defined (how often, testing process) | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |
| **End-of-life plan** understood (when will vendor sunset this product?) | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |

**Red Flags**:
- ❌ Vendor support ends in <3 years (end-of-life imminent)
- ❌ No SLA for business-critical application
- ❌ Vendor provides only email support (no phone, no emergency escalation)

---

### 5.3 Disaster Recovery & Business Continuity

| Checkpoint | Rating | Notes |
|------------|--------|-------|
| **RTO/RPO** (Recovery Time Objective, Recovery Point Objective) defined | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| **Backup strategy** defined (what is backed up, frequency, retention) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| **Disaster recovery plan** tested (not just documented, but actually tested) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| **High availability** configured (if RTO <4 hours: redundancy, failover, load balancing) | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |
| **Geographic redundancy** (if mission-critical: multi-region deployment) | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |

**Red Flags**:
- ❌ No backup (single point of failure)
- ❌ DR plan exists but never tested (will it work when needed?)
- ❌ Business requires 99.9% uptime but no redundancy/failover

---

## Section 6: Performance & Scalability

### 6.1 Performance

| Checkpoint | Rating | Notes |
|------------|--------|-------|
| **Performance requirements** defined (response time, throughput, latency) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| **Load testing** conducted (if high volume: simulate expected load) | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |
| Performance **meets requirements** (e.g., web page load <2 seconds, API response <500ms) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| **Caching strategy** implemented where appropriate (reduce redundant processing/queries) | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |

**Red Flags**:
- ❌ No performance testing (don't know if it will handle production load)
- ❌ Database queries without indexes (slow performance)
- ❌ No caching (repeated expensive operations)

---

### 6.2 Scalability

| Checkpoint | Rating | Notes |
|------------|--------|-------|
| **Scalability assessed** for expected volumes (users, transactions, data growth) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| Architecture supports **horizontal scaling** (add more instances, not bigger servers) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| **Stateless design** (if applicable; enables easy scaling) | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |
| Database can handle **projected data growth** (5-year projection) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |

**Red Flags**:
- ❌ Vertical scaling only (can't add more servers; hits ceiling)
- ❌ Stateful design prevents horizontal scaling
- ❌ Database will run out of capacity in <2 years at current growth rate

---

## Section 7: Total Cost of Ownership (TCO)

### 7.1 Cost Analysis

| Checkpoint | Rating | Notes |
|------------|--------|-------|
| **All costs identified** (licenses, infrastructure, implementation, training, support) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| **Operational costs** analyzed over 5 years (not just capital investment) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| **Decommissioning costs** for replaced systems included (if retiring legacy system) | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |
| **Opportunity for reuse** explored (can other projects use this capability?) | ☐ ✅ ☐ ⚠️ ☐ ❌ |  |
| **Shared services** considered (vs. domain-specific solution, can it be enterprise service?) | ☐ ✅ ☐ ⚠️ ☐ ❌ ☐ N/A |  |

**Red Flags**:
- ❌ Only looking at license cost (ignoring infrastructure, support, training)
- ❌ No plan for decommissioning legacy system (double-paying for old and new)
- ❌ Building domain-specific solution when enterprise service exists

---

## Section 8: Summary & Decision

### 8.1 Overall Assessment

**Total Checkpoints**:
- ✅ Green: _____ (meets standards)
- ⚠️ Yellow: _____ (minor concerns, mitigation needed)
- ❌ Red: _____ (significant concerns, escalation required)

### 8.2 Escalation Decision

☐ **Approve (DAR Decision)**: All Green or Green with 1-2 Yellow (mitigation plan documented)

☐ **Escalate to EA**: 3+ Yellow OR any Red

☐ **Reject**: Critical Red flags; use approved technology instead

### 8.3 Conditions & Mitigations

| Issue | Mitigation | Owner | Due Date |
|-------|------------|-------|----------|
| Example: No monitoring configured | Implement Azure Application Insights before production | Dev Team | Before go-live |
|  |  |  |  |
|  |  |  |  |

---

### 8.4 DAR Signature

**Reviewed By**: ______________________ (DAR Name)
**Date**: ______________________
**Demand ID**: ______________________
**Decision**: ☐ Approved  ☐ Escalated to EA  ☐ Rejected

---

## Appendix: Rating Guidelines

### ✅ Green (Fully Compliant)
- Meets architectural standards
- No concerns or risks
- Can proceed without mitigation

### ⚠️ Yellow (Minor Concerns)
- Slight deviation from standards OR
- Risk identified but mitigable
- Requires mitigation plan before approval

### ❌ Red (Significant Concerns)
- Violates architectural standards OR
- High risk (security, compliance, technical debt) OR
- No viable mitigation
- **Requires EA escalation or rejection**

---

## Document Templates

- [Architecture Review Checklist (Excel)](./templates/architecture-review-checklist.xlsx) - Fillable version
- [Architecture Review Summary Report](./templates/architecture-review-summary.docx) - For EA presentation

---

## Questions?
**Contact**: EA Team
**Email**: ea-architecture-review@utility.com
**Office Hours**: Monthly DAR Meetings
