# Exception Request Process

**Document Type**: Governance Process
**Last Updated**: 2026-01-05
**Owner**: Enterprise Architecture Leadership
**Approval Authority**: Technology Advisory Committee (TAC) for strategic exceptions

---

## Purpose

This document defines the process for requesting exceptions to established architectural standards, patterns, and approved technology portfolio. Exceptions should be rare (target: <5% of all demands) and require rigorous justification.

---

## When to Request an Exception

### Valid Exception Scenarios

✅ **Request exception when**:
- **Approved technology CANNOT meet requirement**: Business need that no approved technology can satisfy
- **Vendor-mandated technology**: SaaS vendor (e.g., Salesforce, Workday) requires specific stack
- **Regulatory/compliance requirement**: External mandate (NERC, PUC, FERC) requires specific approach
- **Pilot/POC for future standard**: Testing new technology that may become future standard
- **Sunset/migration path**: Temporary use during migration from legacy to target architecture
- **Performance/cost at scale**: Approved technology cannot meet performance or cost requirements at utility scale

### NOT Valid Exception Reasons

❌ **Do NOT request exception for**:
- **"Developer preference"**: Team prefers different language/framework (not valid reason)
- **"Faster development"**: Perception that non-standard tool is faster (validate if approved tool truly inadequate)
- **"Industry trend"**: New technology is trendy but approved stack sufficient
- **"Vendor recommendation"**: Vendor wants to sell new product
- **"Lack of skills"**: Team unfamiliar with approved tech (training is better solution)

---

## Exception Request Process

### Step 1: Pre-Check with Domain Architecture Reviewer (DAR)

**Before formal exception request**, consult with your DAR:
- Describe business requirement and why approved technology inadequate
- DAR validates if truly an exception scenario or misunderstanding of approved tools
- DAR may suggest alternative approach using approved technologies

**Outcome**:
- **80% of "exceptions"**: DAR identifies approved solution that meets need (no exception needed)
- **20% proceed**: Genuine exception; DAR endorses moving to formal request

---

### Step 2: Submit Exception Request Form

**Requester**: Project Sponsor or Business Unit Leader
**Form**: Exception Request Template (internal Word doc—request from EA team)

**Required Information**:

1. **Business Requirement**:
   - What business problem are you solving?
   - What business outcomes are required?
   - What is the business impact if exception denied (quantify)?

2. **Proposed Solution**:
   - What non-standard technology/approach are you proposing?
   - Why is this the best solution?
   - Vendor, version, licensing model, cost

3. **Why Approved Portfolio Inadequate**:
   - What approved technologies were evaluated?
   - Specific gaps or limitations preventing approved tech from working
   - Evidence (POC results, vendor documentation, technical assessment)

4. **Risk Assessment**:
   - **Skills risk**: Do we have skills? Need new hires/training?
   - **Support risk**: Vendor viability? Support model?
   - **Integration risk**: How does it integrate with approved stack?
   - **Technical debt risk**: Long-term maintainability concerns?
   - **Security/compliance risk**: NERC CIP, data privacy, audit implications?

5. **Total Cost of Ownership (3-Year)**:
   - Licensing costs
   - Infrastructure/hosting costs
   - Implementation/professional services costs
   - Training costs
   - Operational support costs (FTEs, tools)

6. **Proposed Scope & Duration**:
   - One-time exception for single project, or ongoing use?
   - Pilot/POC with defined success criteria and sunset date?
   - If temporary, what is migration path back to standard?

---

### Step 3: EA Team Review (5-7 Business Days)

**Reviewers**: EA team + DAR (if applicable) + Security Architect (if security implications)

**Review Activities**:
- Validate business requirement and approved tech gap
- Technical deep dive (architecture review, integration assessment)
- Reference checks (peer utilities using this technology?)
- Cost-benefit analysis
- Risk assessment
- Alternative solutions brainstorming

**EA Scoring Rubric**:

| Criterion | Weight | Score 1-5 |
|-----------|--------|-----------|
| **Business Criticality** | 30% | Is this business-critical or nice-to-have? |
| **Technology Gap** | 25% | Is approved portfolio truly inadequate? |
| **Risk** | 20% | Skills, support, integration, technical debt risks acceptable? |
| **Cost** | 15% | ROI positive? TCO reasonable? |
| **Strategic Alignment** | 10% | Aligns with technology roadmap and strategy? |

**Total Exception Score**: Weighted average (max 5.0)

---

### Step 4: Exception Decision

#### Tier 1: EA Team Decision (Score ≥ 3.5, Low Impact)

**Criteria**: Score ≥ 3.5 AND (Cost <$100k OR single project, non-strategic)

**Decision Maker**: EA Team Lead

**Timeline**: 5-7 business days from submission

**Outcomes**:
- **Approved**: Proceed with conditions/monitoring
- **Approved as Pilot**: 90-day pilot with go/no-go decision criteria
- **Denied**: Use approved portfolio; EA provides guidance on alternative approach

---

#### Tier 2: Technology Subcommittee Decision (Score 2.5-3.5 OR High Impact)

**Criteria**: Score 2.5-3.5 OR (Cost >$100k OR strategic impact OR enterprise-wide use)

**Decision Maker**: Technology Subcommittee

**Timeline**: 10-14 business days (includes Tech Subcommittee meeting cycle)

**Presentation**: EA team presents exception request with recommendation

**Outcomes**:
- **Approved**: Proceed with conditions
- **Approved with Conditions**: Address specific concerns (security, cost, skills)
- **Pilot Approved**: Time-boxed pilot (60-90 days) with success criteria
- **Denied**: Use approved technology; may revisit if new evidence

---

#### Tier 3: Technology Advisory Committee (TAC) Decision (Score <2.5 OR Executive Impact)

**Criteria**: Score <2.5 OR significant strategic/financial impact OR executive sponsor disagreement

**Decision Maker**: TAC (CIO, CTO, Business Unit VPs)

**Timeline**: 3-4 weeks (TAC meets monthly)

**Presentation**: EA + Business Sponsor present to TAC

**Outcomes**:
- Rarely approved at this level (low score indicates poor fit)
- May approve if compelling business case overrides technical concerns
- May direct EA to update approved portfolio (technology gap identified)

---

## Exception Approval Conditions

### Standard Conditions (Typically Apply to All Exceptions)

1. **Monitoring & Reporting**:
   - Quarterly report to EA on exception usage, issues, benefits
   - Participate in annual exception review

2. **Skills & Support**:
   - Document skills plan (training, hiring, vendor support)
   - Identify on-call support model and escalation path

3. **Documentation**:
   - Architecture diagrams, integration points, runbooks
   - Add to enterprise asset inventory and CMDB

4. **Security & Compliance**:
   - Security assessment and approval before production
   - NERC CIP review if touching OT systems

5. **Financial**:
   - Budget allocated for 3-year TCO (not just initial cost)
   - No surprise costs (all costs identified upfront)

### Pilot-Specific Conditions

6. **Success Criteria**:
   - Define measurable success criteria (performance, cost, user adoption)
   - Go/No-Go decision date (typically 60-90 days)

7. **Sunset Plan**:
   - If pilot fails, what is migration path back to approved technology?
   - Exit strategy and decommissioning costs

---

## Exception Tracking & Governance

### Exception Registry

EA maintains registry of all active exceptions:

| Exception ID | Technology | Business Unit | Approved Date | Expiry/Review Date | Status |
|--------------|------------|---------------|---------------|-------------------|--------|
| EXC-2025-001 | Snowflake (Data Warehouse) | Analytics | 2025-04-15 | 2028-04-15 (3 years) | ✅ Active |
| EXC-2025-012 | Tableau (BI Tool) | Customer Ops | 2025-08-20 | 2026-08-20 (Pilot) | ⚠️ Under Review |
| EXC-2024-007 | MongoDB (NoSQL DB) | Engineering | 2024-06-10 | 2025-06-10 (Expired) | ❌ Migrated to Cosmos DB |

### Annual Exception Review

**When**: Q1 each year
**Who**: EA Team reviews all active exceptions with business owners

**Review Questions**:
- Is exception still needed or can we migrate to approved tech now?
- Are conditions being met (monitoring, reporting, support)?
- Should this technology be added to approved portfolio (if widely successful)?
- Any issues or risks that have emerged?

**Outcomes**:
- **Renew**: Exception continues for another year
- **Graduate**: Add technology to approved portfolio (successful exception becomes standard)
- **Sunset**: Migrate to approved technology by defined date
- **Escalate**: Issues identified; remediation plan required

---

## Exception Categories & Examples

### Category 1: Vendor-Mandated Technology ✅ Usually Approved

**Example**: Salesforce CRM requires Heroku for custom apps
- **Justification**: Strategic SaaS vendor; Heroku only supported platform for Salesforce extensibility
- **Mitigation**: Limit Heroku to Salesforce integrations only; don't use for general-purpose apps

---

### Category 2: Regulatory/Compliance Mandate ✅ Usually Approved

**Example**: PUC requires specific reporting format only supported by vendor tool
- **Justification**: Regulatory compliance; no alternative
- **Mitigation**: Use tool ONLY for PUC reporting; don't expand scope

---

### Category 3: Pilot for Future Standard ✅ Approved as Pilot

**Example**: Evaluating Grafana for operational monitoring (vs. approved Azure Monitor)
- **Justification**: Azure Monitor lacks utility-specific dashboards; Grafana has better grid ops visualizations
- **Conditions**: 90-day pilot, 20 users, success criteria defined
- **Outcome**: If successful, add Grafana to approved portfolio

---

### Category 4: Legacy/Sunset Technology ⚠️ Approved Temporarily

**Example**: Using Dell Boomi for 12 months during migration to MuleSoft
- **Justification**: 47 integrations on Boomi; can't migrate all at once
- **Conditions**: Migration plan with milestones; Boomi sunset date Dec 2027
- **Monitoring**: Monthly report on migration progress

---

### Category 5: Performance/Scale ✅ Approved if Justified

**Example**: Using Cassandra (NoSQL) for IoT telemetry (50M devices, 1M events/sec)
- **Justification**: Approved SQL databases (Azure SQL, CosmosDB) cannot handle scale/cost
- **Evidence**: Load testing showed Azure CosmosDB 3x more expensive at required scale
- **Conditions**: Use Cassandra ONLY for IoT telemetry; not for general-purpose data

---

### Category 6: Developer Preference ❌ Usually Denied

**Example**: Team wants to use Python instead of approved .NET for API development
- **Justification**: "Team prefers Python; faster development"
- **EA Response**: **Denied**. Preference is not valid reason. .NET is approved; provide .NET training.
- **Exception**: Python approved ONLY for data science/ML workloads where it's industry standard

---

## Metrics & Reporting

### Exception Metrics (Tracked Monthly)

| Metric | Target | Purpose |
|--------|--------|---------|
| **Exception Request Rate** | <5% of demands | Validate approved portfolio meeting 95%+ of needs |
| **Exception Approval Rate** | 40-60% | Too high = rubber stamp; too low = may be too strict |
| **Time to Decision** | Tier 1: 7 days, Tier 2: 14 days | Responsiveness to business |
| **Exceptions Graduated to Approved** | 2-3 per year | Successful pilots become standards |
| **Exceptions Sunset on Time** | >90% | Temporary exceptions don't become permanent |

### Quarterly Report to Technology Subcommittee

**Contents**:
- Number of exception requests (approved, denied, pending)
- Exception request rate trend (decreasing = approved portfolio improving)
- Active exceptions by category
- Exceptions graduated to approved portfolio
- Exceptions sunset or migrated
- Top reasons for denials (inform portfolio improvements)

---

## FAQs

**Q: How long does exception approval take?**
A: Tier 1 (EA decision): 5-7 days. Tier 2 (Tech Subcommittee): 10-14 days. Tier 3 (TAC): 3-4 weeks.

**Q: Can I start using the technology while exception is pending?**
A: No. Wait for approval. Starting early = architecture bypass (policy violation).

**Q: What if my exception is denied?**
A: EA will provide guidance on approved alternative. If you believe decision is wrong, you can appeal to Technology Subcommittee.

**Q: Can I request exception for open-source library/framework?**
A: Depends. Open-source libraries within approved platforms (e.g., npm packages in Node.js app) covered by development standards, not exception process. Open-source infrastructure platforms (e.g., Kubernetes vs. approved Azure App Service) require exception.

**Q: What happens if I use non-approved tech without exception?**
A: Architecture bypass. EA flags to management. Project may be stopped until compliant. Repeat offenses = performance issue.

---

## Templates & Tools

- Exception Request Form (Word) - internal template supplied by EA team
- Exception Evaluation Scorecard (Excel) - internal template supplied by EA team
- Pilot Success Criteria Template - internal guidance document from EA team

---

## Contact

**Questions**: EA Leadership
**Email**: ea-exceptions@utility.com
**Office Hours**: Monthly DAR Office Hours (last Wednesday)
**Submit Exception Request**: [ServiceNow Portal](https://servicenow.utility.com/exception-request)
