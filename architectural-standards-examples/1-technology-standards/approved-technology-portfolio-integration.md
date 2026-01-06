# Approved Technology Portfolio - Integration & Middleware

**Category**: Integration & Middleware
**Last Updated**: 2026-01-05
**Owner**: Enterprise Architecture - Integration Lead
**Review Cycle**: Quarterly

## Purpose
This document defines the approved integration technologies and middleware platforms for connecting applications, systems, and data across the utility enterprise.

---

## Approved Technologies

### Enterprise Service Bus (ESB) / Integration Platform

| Technology | Version | Use Case | Status | Support End Date |
|------------|---------|----------|--------|------------------|
| **MuleSoft Anypoint Platform** | CloudHub 2.0 | Primary integration platform for all API and application integration | ✅ Strategic | 2030+ (SaaS) |
| Dell Boomi | AtomSphere | Legacy integrations only; migrate to MuleSoft | ⚠️ Sunset (2027) | Dec 2027 |

**Decision**: MuleSoft is the strategic integration platform. All new integrations MUST use MuleSoft unless exception granted.

---

### API Management

| Technology | Version | Use Case | Status | Support End Date |
|------------|---------|----------|--------|------------------|
| **MuleSoft API Manager** | Cloud | API governance, lifecycle, security | ✅ Strategic | 2030+ (SaaS) |
| Apigee | - | Not approved | ❌ Prohibited | N/A |

---

### Message Queuing / Event Streaming

| Technology | Version | Use Case | Status | Support End Date |
|------------|---------|----------|--------|------------------|
| **Apache Kafka** | 3.6+ | Event streaming for real-time operational data | ✅ Strategic | Ongoing |
| **IBM MQ** | 9.3+ | Legacy messaging; limited to existing SCADA/OMS integrations | ⚠️ Maintain | 2028 |
| RabbitMQ | - | Not approved for new use | ⚠️ Evaluate Only | N/A |

**Decision**: Kafka for event streaming. IBM MQ for legacy OT systems only.

---

### File Transfer / ETL

| Technology | Version | Use Case | Status | Support End Date |
|------------|---------|----------|--------|------------------|
| **Informatica PowerCenter** | 10.5+ | Enterprise data integration and ETL | ✅ Strategic | 2029 |
| **Informatica Cloud** | SaaS | Cloud-to-cloud and hybrid integrations | ✅ Strategic | Ongoing (SaaS) |
| MOVEit | Secure managed file transfer | Secure file transfer (PII, financial) | ✅ Approved | 2028 |
| Custom SFTP scripts | - | Not approved; use MOVEit | ❌ Prohibited | N/A |

---

## Integration Pattern Mapping

| Pattern | Approved Technology | When to Use |
|---------|-------------------|-------------|
| RESTful API | MuleSoft (API-led connectivity) | Synchronous data exchange, mobile apps, portals |
| SOAP Web Services | MuleSoft (legacy support only) | Existing vendor integrations requiring SOAP |
| Event-Driven | Apache Kafka | Real-time operational events (meter data, outages, DER) |
| Batch File Transfer | Informatica PowerCenter or MOVEit | Nightly data loads, regulatory reporting |
| Database Replication | Informatica CDC | Master data synchronization |

---

## Evaluation Criteria for New Integration Tools

Before proposing a new integration technology, validate against:

1. **Does MuleSoft, Kafka, or Informatica already solve this?** (95% of cases: yes)
2. **Vendor viability**: Is vendor financially stable with utility customer base?
3. **Skills availability**: Can existing team support, or need new hires/training?
4. **Total cost of ownership**: Include licenses, infrastructure, training, support
5. **Interoperability**: Does it integrate with our approved stack?
6. **Security & compliance**: Meets NERC CIP and utility security standards?

---

## Exception Process

If a project requires integration technology NOT on this list:

1. **Submit Technology Evaluation Request** to EA team
2. **Provide business justification**: Why approved tools cannot meet requirements
3. **Complete technology assessment**: EA team evaluates against criteria
4. **Present to Technology Subcommittee** if cost >$100k or strategic impact
5. **If approved**: Add to portfolio or grant one-time exception

**Recent Exceptions Granted**:
- None in past 12 months (all demands met by approved portfolio)

---

## Sunset Technologies (Do Not Use)

| Technology | Sunset Date | Migration Path | Projects Affected |
|------------|-------------|----------------|-------------------|
| Dell Boomi | Dec 2027 | Migrate to MuleSoft | 47 integrations |
| Talend Open Studio | Jun 2026 | Migrate to Informatica | 12 data pipelines |
| Custom Point-to-Point JDBC | Immediate | Re-architect via MuleSoft APIs | ~200 legacy connections |

---

## Compliance & Security Notes

**NERC CIP Considerations**:
- Any integration with SCADA, EMS, DMS, or other OT systems MUST:
  - Respect CIP zone boundaries
  - Use approved data diodes or unidirectional gateways where required
  - Document in CIP compliance records
  - Engage Cybersecurity team in design review

**Data Privacy**:
- Customer PII integrations MUST use encryption in transit (TLS 1.2+) and at rest
- PCI-DSS scope: Payment data integrations require additional security controls

---

## Related Documents
- [Integration Patterns Library](../2-architectural-patterns/integration-patterns/)
- [SCADA/OT to IT Integration Reference Architecture](../3-reference-architectures/scada-ot-to-it-integration.md)
- [API Standards and Governance](./api-standards-governance.md)

---

## Questions?
Contact: Enterprise Architecture - Integration Lead
Email: ea-integration@utility.com
Office Hours: Monthly DAR Office Hours (last Wednesday)
