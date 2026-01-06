# ADR-001: Cloud Platform Selection - Microsoft Azure

**Status**: ✅ Accepted
**Date**: 2025-03-15
**Deciders**: Enterprise Architecture Leadership, CIO, CTO, Infrastructure Director
**Consulted**: Cybersecurity, Application Development, Infrastructure Operations
**Informed**: Technology Advisory Committee, Technology Subcommittee

---

## Context and Problem Statement

The utility is embarking on cloud transformation to enable:
- **Scalability**: Support growing data volumes (smart meters, DER devices, customer digital engagement)
- **Agility**: Faster deployment of new applications and capabilities
- **Cost Optimization**: Shift from capital-intensive data center investments to opex cloud consumption
- **Innovation**: Leverage cloud-native services (AI/ML, IoT, serverless, advanced analytics)

**Problem**: Which cloud platform should be our strategic choice for the next 5-10 years?

**Key Decision**: Select ONE primary cloud platform to avoid multi-cloud complexity, skills fragmentation, and vendor management overhead.

---

## Decision Drivers (Weighted Criteria)

| Criterion | Weight | Description |
|-----------|--------|-------------|
| **Utility Industry Fit** | 25% | Proven track record with utilities; understands regulatory environment |
| **Integration with Existing Stack** | 20% | Compatibility with Microsoft Office 365, Active Directory, SQL Server, .NET apps |
| **Security & Compliance** | 20% | NERC CIP support, FedRAMP, SOC 2, data residency, CISA relationships |
| **AI/ML & Analytics Capabilities** | 15% | Advanced analytics, machine learning, IoT services for smart grid |
| **Cost & Licensing** | 10% | Total cost of ownership; EA (Enterprise Agreement) pricing |
| **Vendor Relationship & Support** | 10% | Existing relationship, account team, utility expertise |

---

## Options Considered

### Option 1: Microsoft Azure ⭐ SELECTED

**Pros**:
- ✅ **Strong utility industry presence**: 60+ utilities globally; dedicated energy & utility solutions team
- ✅ **Seamless Microsoft integration**: Azure AD (identity), Office 365, Power Platform, SQL Server, .NET apps
- ✅ **Existing enterprise agreement**: Utility already has Microsoft EA; incremental Azure consumption cost-effective
- ✅ **NERC CIP support**: Azure Government region option; Microsoft works with NERC utilities on compliance
- ✅ **Hybrid cloud support**: Azure Arc for on-prem/cloud management (critical for SCADA/OT systems staying on-prem)
- ✅ **AI/ML capabilities**: Azure Machine Learning, Synapse Analytics, Cognitive Services
- ✅ **Strong partnership**: Microsoft has dedicated account team; understands utility business

**Cons**:
- ⚠️ **Less "cloud-native" perception**: AWS often seen as more innovative, broader service catalog
- ⚠️ **Learning curve**: Teams familiar with on-prem Windows/SQL but not Azure-native services (Functions, Cosmos DB, etc.)

**Scoring**: 4.3 / 5.0 (weighted average across criteria)

---

### Option 2: Amazon Web Services (AWS)

**Pros**:
- ✅ **Market leader**: Largest cloud provider; broadest service catalog
- ✅ **Mature platform**: More services, earlier to market with innovations
- ✅ **Strong AI/ML**: SageMaker, Rekognition, IoT Greengrass
- ✅ **Utility customers**: Many large utilities use AWS (Duke Energy, Exelon, etc.)

**Cons**:
- ❌ **Integration complexity**: No native integration with Microsoft stack (AD, Office 365, SQL Server)
- ❌ **New vendor relationship**: No existing EA; new procurement, contracting, account team
- ❌ **Learning curve**: Entirely new skillset (AWS != Azure); retraining required
- ❌ **Licensing costs**: Microsoft SQL Server on AWS more expensive (BYOL or pay AWS licensing premium)

**Scoring**: 3.6 / 5.0

---

### Option 3: Google Cloud Platform (GCP)

**Pros**:
- ✅ **Data & analytics strengths**: BigQuery, Looker, advanced AI/ML (TensorFlow)
- ✅ **Kubernetes leadership**: GKE (Google Kubernetes Engine) best-in-class
- ✅ **Competitive pricing**: Often 10-15% cheaper than AWS/Azure

**Cons**:
- ❌ **Limited utility presence**: Few utilities using GCP as primary platform
- ❌ **Integration challenges**: Microsoft stack integration poor
- ❌ **Smaller service catalog**: Fewer services than AWS/Azure
- ❌ **Vendor relationship**: No existing relationship; smallest account team of three options

**Scoring**: 3.1 / 5.0

---

### Option 4: Multi-Cloud (Best-of-Breed from Multiple Providers)

**Pros**:
- ✅ **Avoid vendor lock-in**: Use best service from each cloud
- ✅ **Negotiating leverage**: Play vendors against each other for pricing

**Cons**:
- ❌ **Complexity**: Skills fragmentation (team needs AWS + Azure + GCP expertise)
- ❌ **Integration overhead**: Data movement between clouds costly and complex
- ❌ **Cost**: Multi-cloud networking, data egress charges, duplicate tooling
- ❌ **Governance**: Difficult to enforce standards across multiple platforms

**Scoring**: 2.4 / 5.0 (**Rejected** - too complex for utility of our size)

---

## Decision

**Selected Option**: **Microsoft Azure** as the strategic cloud platform

### Rationale

1. **Integration with Existing Microsoft Stack** (Critical Factor):
   - Utility has significant investment in Microsoft ecosystem:
     - Microsoft 365 (email, Teams, SharePoint) - 5,000+ users
     - Active Directory (identity and access management)
     - SQL Server (50+ databases)
     - .NET applications (70% of custom apps)
   - Azure provides seamless integration: Azure AD, Azure SQL, App Service for .NET
   - **Cost avoidance**: Replatforming to AWS/GCP would require rewriting .NET apps or expensive licensing

2. **Utility Industry Fit**:
   - Microsoft has dedicated Energy & Utilities industry team
   - Reference customers: Duke Energy (Azure for smart grid analytics), Exelon (Azure IoT for grid edge)
   - Understand regulatory environment (NERC CIP, FERC, PUC compliance)

3. **Existing Vendor Relationship**:
   - Microsoft is already strategic vendor (Enterprise Agreement)
   - Incremental Azure consumption cost-effective
   - Proven account team; responsive support

4. **Hybrid Cloud for SCADA/OT**:
   - SCADA, EMS, DMS staying on-premises (NERC CIP, latency requirements)
   - Azure Arc enables hybrid management (on-prem + cloud)
   - Azure Stack for edge computing in substations (future roadmap)

5. **AI/ML & Analytics**:
   - Azure Synapse Analytics for data warehouse
   - Azure Machine Learning for load forecasting, DER optimization
   - Power BI (already deployed) integrates natively with Azure

### Commitments & Conditions

- **Not 100% Azure**: Exceptions allowed where Azure lacks capability
  - Example: Snowflake (data warehouse) - best-in-class, multi-cloud
  - Example: Salesforce (SaaS CRM) - not migrating to Dynamics just for cloud
- **Hybrid approach**: SCADA/OT remain on-prem; cloud for IT applications
- **Multi-year EA**: Negotiate favorable pricing with Microsoft (3-year commit)
- **Skills development**: Invest in Azure training and certifications for IT team (50+ staff)

---

## Consequences

### Positive Consequences

- ✅ **Accelerated cloud migration**: Leverage existing Microsoft skills; faster time-to-value
- ✅ **Cost optimization**: EA pricing; SQL Server licensing included
- ✅ **Unified identity**: Azure AD single sign-on for cloud and on-prem
- ✅ **Simplified governance**: One cloud platform to govern (policies, security, compliance)
- ✅ **Innovation enablement**: Access to Azure AI, IoT, Synapse for grid modernization

### Negative Consequences / Risks

- ⚠️ **Vendor lock-in**: Heavy investment in Azure makes switching costly
  - **Mitigation**: Use open standards where possible (Kubernetes, Terraform); avoid proprietary services for critical workloads
- ⚠️ **Skills gap**: Azure-native services (Functions, Cosmos DB, etc.) require upskilling
  - **Mitigation**: Training program, certifications (Azure Solutions Architect), hire cloud-native talent
- ⚠️ **AWS service envy**: Some developers prefer AWS's broader service catalog
  - **Mitigation**: Azure service catalog sufficient for 95% of use cases; exception process for genuine gaps

---

## Implementation Plan

### Phase 1: Foundation (Months 1-3)
- Set up Azure Landing Zones (hub-spoke network architecture)
- Configure Azure AD (single sign-on, conditional access)
- Establish Azure DevOps for CI/CD pipelines
- Define cloud governance policies (naming, tagging, cost controls)

### Phase 2: Pilot Workloads (Months 4-6)
- Migrate 3-5 non-critical applications to Azure (proof of concept)
- Examples: Internal HR portal, reporting databases, file shares
- Validate cost, performance, security

### Phase 3: Core Platform Services (Months 7-12)
- Deploy Azure Synapse Analytics (data warehouse)
- Migrate MuleSoft to Azure (CloudHub)
- Azure Kubernetes Service (AKS) for containerized apps
- Azure IoT Hub for smart meter data ingestion

### Phase 4: Application Migration (Year 2-3)
- Migrate 30+ applications to Azure using 6 R's strategy:
  - Rehost (lift-and-shift): 50%
  - Replatform (e.g., SQL Server → Azure SQL): 30%
  - Rearchitect (cloud-native refactor): 15%
  - Retire (decommission): 5%
- Target: 70% of applications in Azure by end of Year 3

---

## Validation & Success Metrics

### Year 1 Metrics (Post-Decision)

| Metric | Target | Actual (Q4 2025) | Status |
|--------|--------|------------------|--------|
| **Workloads migrated to Azure** | 15 applications | 18 applications | ✅ Exceeded |
| **Cloud cost vs. on-prem TCO** | 20% savings | 23% savings | ✅ Exceeded |
| **Azure-certified staff** | 25 certifications | 31 certifications | ✅ Exceeded |
| **Incident rate (cloud vs. on-prem)** | <5% increase | 2% decrease | ✅ Exceeded |
| **Pilot project success rate** | 80% on-time delivery | 85% | ✅ Met |

**Conclusion**: Decision validated. Azure meeting/exceeding expectations.

---

## Review & Update

**Review Frequency**: Annual review with Technology Advisory Committee

**Last Reviewed**: 2026-01-05
**Next Review**: 2027-01-05

**Potential Triggers for Revisiting Decision**:
- Microsoft acquired by another company (changes strategic relationship)
- Azure suffers major outage or security breach affecting utilities
- Significant service gaps emerge that AWS/GCP address better
- NERC CIP compliance requirements change (e.g., data sovereignty)

---

## References

- **Technology Evaluation Scorecard**: Azure vs AWS vs GCP Evaluation (internal workbook)
- **Utility Reference Calls**: Duke Energy, Exelon, Southern Company (Azure customers)
- **Microsoft Proposal**: Azure Enterprise Agreement Proposal (internal document)
- **Security Assessment**: Azure NERC CIP Compliance Review (internal assessment)

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2025-03-15 | Initial decision - Azure selected | EA Leadership |
| 2025-12-10 | Added Year 1 validation metrics | EA Leadership |
| 2026-01-05 | Annual review - decision reaffirmed | EA Leadership |

---

## Approval Signatures

| Role | Name | Signature | Date |
|------|------|-----------|------|
| CIO | [Name Redacted] | ✅ Approved | 2025-03-15 |
| CTO | [Name Redacted] | ✅ Approved | 2025-03-15 |
| EA Leadership | [Name Redacted] | ✅ Approved | 2025-03-15 |
| Cybersecurity Director | [Name Redacted] | ✅ Approved | 2025-03-15 |
| CFO (Cost Approval) | [Name Redacted] | ✅ Approved | 2025-03-20 |

---

**Document Owner**: Enterprise Architecture Leadership
**Classification**: Internal - Confidential
**Related ADRs**:
- ADR-002: Data Warehouse Platform - Snowflake (in development)
- ADR-015: Hybrid Cloud Strategy for SCADA/OT (in development)
