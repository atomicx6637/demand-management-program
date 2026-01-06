# Technology Evaluation Criteria

**Document Type**: Standards & Process
**Last Updated**: 2026-01-05
**Owner**: Enterprise Architecture Leadership
**Approval Authority**: Technology Advisory Committee (TAC)

## Purpose
This document defines the criteria and process for evaluating new technologies proposed for addition to the enterprise technology portfolio. Use this framework when a project requires technology NOT currently on the approved list.

---

## When to Use This Process

Trigger a formal technology evaluation when:
- ✅ Proposed technology is NOT on approved portfolio list
- ✅ Strategic decision with enterprise-wide implications
- ✅ Total cost of ownership >$50k over 3 years
- ✅ Creates new vendor relationship or platform dependency
- ✅ Required for regulatory compliance or business-critical initiative

Do NOT trigger for:
- ❌ Open-source libraries/frameworks used within approved platforms (handled by development standards)
- ❌ Desktop productivity tools (handled by IT standards)
- ❌ One-time professional services engagements

---

## Evaluation Criteria Framework

### 1. Strategic Alignment (Weight: 25%)

| Criterion | Questions to Answer | Rating Scale |
|-----------|---------------------|--------------|
| **Business Value** | Does this technology enable strategic business capabilities? Quantify business outcomes. | 1-5: Limited value → Transformational value |
| **Capability Gap** | Does it fill a gap NOT addressed by current portfolio? Can existing tools be extended instead? | 1-5: Redundant → Critical gap |
| **Industry Adoption** | Is this proven in utility industry? References from peer utilities? | 1-5: Experimental → Industry standard |
| **Future Roadmap Fit** | Aligns with 3-5 year technology roadmap? Supports grid modernization, DER, electrification? | 1-5: Misaligned → Core to strategy |

**Scoring**: Average of 4 criteria × 25% weight = Strategic Alignment Score

---

### 2. Vendor Viability (Weight: 20%)

| Criterion | Questions to Answer | Rating Scale |
|-----------|---------------------|--------------|
| **Financial Stability** | Is vendor financially healthy? Revenue growth, profitability, funding? | 1-5: At risk → Strong financials |
| **Utility Customer Base** | How many utilities use this? Tier 1 utilities (>1M customers)? | 1-5: No utilities → 20+ utilities |
| **Product Maturity** | Version history, release cadence, production deployments? | 1-5: Beta/new → Mature (v3.0+) |
| **Strategic Commitment** | Is this vendor's core product or side project? R&D investment? | 1-5: Side project → Flagship product |
| **Exit Risk** | If vendor acquired or exits market, what's our fallback? Data portability? | 1-5: Locked in → Open standards |

**Scoring**: Average of 5 criteria × 20% weight = Vendor Viability Score

---

### 3. Technical Fit (Weight: 25%)

| Criterion | Questions to Answer | Rating Scale |
|-----------|---------------------|--------------|
| **Interoperability** | Integrates with existing platforms (MuleSoft, Informatica, Salesforce, SAP, etc.)? | 1-5: Siloed → Native integration |
| **Architecture Alignment** | Fits our cloud strategy (Azure), API-led, microservices principles? | 1-5: Conflicts → Perfect fit |
| **Security & Compliance** | Meets NERC CIP, SOC 2, data privacy requirements? Utility-grade security? | 1-5: Non-compliant → Exceeds standards |
| **Scalability** | Handles utility scale (5M+ customers, 50k+ devices, etc.)? | 1-5: Limited → Proven at scale |
| **Performance** | Meets performance requirements (latency, throughput, availability SLAs)? | 1-5: Inadequate → Exceeds needs |

**Scoring**: Average of 5 criteria × 25% weight = Technical Fit Score

---

### 4. Total Cost of Ownership (Weight: 15%)

| Cost Component | 3-Year TCO Analysis |
|----------------|---------------------|
| **Licensing** | Subscription or perpetual? Per user/device/transaction? Growth assumptions? |
| **Infrastructure** | Cloud hosting, servers, storage, network bandwidth? |
| **Implementation** | Professional services, customization, integration development? |
| **Training** | Initial and ongoing training for IT and business users? |
| **Support & Maintenance** | Annual support fees, vendor escalation costs? |
| **Operational Costs** | Staffing (FTEs), monitoring tools, disaster recovery? |
| **Decommissioning** | Costs to retire/replace systems if technology doesn't work out? |

**TCO Rating**:
- 5 = <$100k total (low cost)
- 4 = $100k-$250k (moderate)
- 3 = $250k-$500k (significant)
- 2 = $500k-$1M (high)
- 1 = >$1M (very high)

**Scoring**: TCO Rating × 15% weight = TCO Score

---

### 5. Implementation Risk (Weight: 15%)

| Criterion | Questions to Answer | Rating Scale |
|-----------|---------------------|--------------|
| **Skills Availability** | Do we have in-house skills or need new hires/contractors? Training timeline? | 1-5: Scarce skills → Existing expertise |
| **Complexity** | Implementation complexity? Months to deploy? Organizational change required? | 1-5: Very complex → Straightforward |
| **Vendor Support** | Support quality, response times, utility expertise, onsite support available? | 1-5: Poor support → Excellent support |
| **Proof of Concept** | Can we pilot/POC before full commitment? Vendor willing to demo in our environment? | 1-5: No POC option → POC encouraged |
| **Reference Checks** | Positive references from peer utilities? Successful implementations? | 1-5: Poor references → Excellent references |

**Scoring**: Average of 5 criteria × 15% weight = Implementation Risk Score

---

## Overall Technology Score

**Total Score** = Strategic Alignment (25%) + Vendor Viability (20%) + Technical Fit (25%) + TCO (15%) + Implementation Risk (15%)

**Maximum Score**: 5.0

### Decision Thresholds

| Score Range | Recommendation | Approval Required |
|-------------|----------------|-------------------|
| **4.0 - 5.0** | **Approve** - Strong fit, proceed with procurement | EA Team + CIO |
| **3.0 - 3.9** | **Approve with Conditions** - Address gaps, consider pilot first | EA Team + TAC |
| **2.0 - 2.9** | **Reconsider** - Significant concerns, explore alternatives | TAC + Executive Sponsor |
| **< 2.0** | **Reject** - Does not meet standards, use approved alternatives | EA Team (can reject) |

---

## Evaluation Process

### Step 1: Request Submission (Week 1)
**Who**: Project Sponsor or Business Unit Leader
**Deliverable**: Technology Evaluation Request Form
**Contents**:
- Business problem and current gap
- Proposed technology and vendor
- Preliminary business case
- Estimated costs and timeline
- Why approved portfolio cannot meet need

---

### Step 2: Initial Assessment (Week 1-2)
**Who**: EA Team
**Activities**:
- Validate if approved portfolio truly cannot meet need (80% of requests stop here)
- Assign EA evaluator
- Schedule vendor demo/presentation (if proceeding)
- Notify Technology Subcommittee of pending evaluation

---

### Step 3: Detailed Evaluation (Week 2-4)
**Who**: EA Team (lead) + Domain Technical SME + Cybersecurity + Procurement
**Activities**:
- Vendor demos and Q&A
- Reference checks (call 3 peer utilities)
- Technical deep dive (architecture review, integration assessment)
- Security assessment
- TCO analysis with Finance
- Complete evaluation scorecard

**Deliverable**: Technology Evaluation Report (10-15 pages)

---

### Step 4: Decision & Approval (Week 5-6)
**Who**: Varies by score and impact
**Process**:
- **Score ≥4.0**: EA Team presents recommendation to CIO, proceed if approved
- **Score 3.0-3.9**: Present to Technology Subcommittee, define conditions
- **Score <3.0**: Present alternatives to project sponsor

**Deliverable**: Approval decision + conditions/next steps

---

### Step 5: Pilot / Proof of Concept (Optional, Week 7-18)
**Who**: Project team + EA oversight
**Activities**:
- Limited scope pilot (one business unit or use case)
- 60-90 day evaluation period
- Validate technical fit, vendor support, user adoption
- Refine TCO based on actual experience
- Go/No-Go decision after pilot

---

### Step 6: Add to Portfolio (if approved)
**Who**: EA Team
**Activities**:
- Add to Approved Technology Portfolio with usage guidelines
- Update architectural patterns and reference architectures
- Develop standards and best practices
- Train DARs and technical teams
- Establish support model

---

## Example: Recent Technology Evaluation

**Technology**: Snowflake (Cloud Data Warehouse)
**Requested By**: Analytics & Data Science team
**Date**: Q3 2025

| Criterion | Score | Rationale |
|-----------|-------|-----------|
| Strategic Alignment | 4.5 | Critical for advanced analytics roadmap; peer utilities adopting |
| Vendor Viability | 4.0 | Strong financials, many utility customers, cloud-native leader |
| Technical Fit | 4.5 | Integrates with Azure, Informatica, PowerBI; exceeds performance needs |
| TCO | 3.5 | ~$400k/year subscription + migration costs; competitive for capability |
| Implementation Risk | 4.0 | Existing SQL skills transferable; vendor excellent support; successful POC |
| **Overall Score** | **4.1** | **APPROVED** |

**Decision**: Approved for enterprise data warehouse. Migrate from on-prem Teradata over 18 months.

**Conditions**:
- Start with 90-day pilot (Analytics team only)
- EA architects review all data models before production
- Develop cost governance (prevent runaway compute costs)

---

## Red Flags: Automatic Reject

Regardless of score, **reject** if any of these present:
- ❌ Vendor refuses reference checks or utility customers unavailable
- ❌ Security vulnerabilities or unwilling to meet NERC CIP requirements
- ❌ Proprietary lock-in with no data export capability
- ❌ Technology approaching end-of-life (vendor roadmap shows replacement)
- ❌ Single-source dependency (only one vendor provides capability) without mitigation

---

## Templates & Tools

- Technology Evaluation Request Form - internal Word template (contact EA Leadership)
- Technology Evaluation Scorecard (Excel) - internal tool for scoring
- Reference Check Interview Guide - internal PDF guide
- Technology Evaluation Report Template - internal document for final summaries

---

## Questions?
Contact: Enterprise Architecture Leadership
Email: ea-leadership@utility.com
Monthly Office Hours: Last Wednesday, 2-3pm
