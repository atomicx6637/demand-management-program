# Reference Architecture: SCADA/OT to IT Integration

**Architecture Name**: Operational Technology (OT) to Information Technology (IT) Integration
**Business Domain**: Grid Operations, Distribution Automation, NERC CIP Compliance
**Last Updated**: 2026-01-05
**Owner**: Enterprise Architecture + Grid Operations IT + Cybersecurity
**Status**: ✅ Active - Mandatory for all OT/IT integration

---

## Business Context

### Problem Statement
Operational Technology (OT) systems—SCADA, Energy Management System (EMS), Distribution Management System (DMS), Advanced Distribution Management System (ADMS)—generate critical operational data needed by IT systems for analytics, customer notifications, regulatory reporting, and business operations. However, OT and IT systems operate in different security zones with strict NERC CIP compliance requirements, making integration complex and high-risk.

### Business Objectives
- **Enable Real-Time Operational Insights**: IT systems access OT data for outage notifications, load forecasting, DER management
- **Maintain NERC CIP Compliance**: Respect CIP zone boundaries, electronic security perimeters (ESP)
- **Protect Critical Infrastructure**: Prevent cyber threats from IT propagating to OT
- **Support Grid Modernization**: Enable DER integration, ADMS, demand response programs

### Regulatory Context
- **NERC CIP-005**: Electronic Security Perimeter (ESP) protections
- **NERC CIP-007**: System Security Management (patch management, ports, malware)
- **NERC CIP-010**: Configuration Change Management
- Any architecture MUST be approved by Cybersecurity and NERC CIP compliance team

---

## High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│             CORPORATE IT ZONE (CIP Low/No Impact)                │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Customer    │  │  Analytics   │  │   Billing &  │         │
│  │  Portal      │  │  Platform    │  │   CIS        │         │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │
│         │                  │                  │                  │
│         └──────────────────┼──────────────────┘                  │
│                            │                                     │
└────────────────────────────┼─────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│                    DMZ / INTEGRATION ZONE                        │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  OT Data Integration Platform (MuleSoft + Kafka)           │ │
│  │  - Data historian (PI System or OSIsoft)                   │ │
│  │  - Kafka event streaming                                   │ │
│  │  - MuleSoft integration APIs                               │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
                             ▲
                             │
                   ┌─────────┴─────────┐
                   │  Unidirectional   │
                   │  Data Diode or    │
                   │  Approved Firewall│
                   │  (OT → IT Only)   │
                   └─────────┬─────────┘
                             │
┌────────────────────────────┼─────────────────────────────────────┐
│            SCADA / OT ZONE (NERC CIP Medium/High Impact)         │
│                            │                                     │
│  ┌──────────────┐  ┌──────┴───────┐  ┌──────────────┐         │
│  │  SCADA/EMS   │  │  DMS/ADMS    │  │  Substation  │         │
│  │  (Grid Ops)  │  │ (Distribution)│  │  Automation  │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  OT Historian / Data Concentrator                          │ │
│  │  (Collects SCADA points, alarms, breaker status, etc.)    │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

---

## Architecture Principles

### 1. Unidirectional Data Flow (OT → IT Only)
**Principle**: Data flows ONE WAY from OT zone to IT zone. IT systems CANNOT send commands or data back to OT.

**Rationale**: Prevents cyberattacks or malware from corporate IT compromising operational systems.

**Implementation**:
- **Data Diode** (hardware-enforced unidirectional flow) for CIP High impact systems
- **Firewall with strict ACLs** (OT → IT allowed, IT → OT blocked) for CIP Medium systems
- **No remote desktop or VPN** from IT to OT

**Exceptions**:
- Authorized control commands (e.g., demand response signals) use separate, highly secured path with change management and audit logging.

---

### 2. Zone Segmentation
**Principle**: OT, DMZ, and IT zones physically and logically separated with firewalls and monitoring.

**Zones Defined**:
| Zone | Systems | NERC CIP Impact | Access Control |
|------|---------|----------------|----------------|
| **OT Zone** | SCADA, EMS, DMS, ADMS, substation automation | High/Medium | Strict ACLs, multi-factor auth, air-gapped where possible |
| **DMZ / Integration Zone** | OT data historian, Kafka, MuleSoft, data diode | Medium/Low | Firewalls on both sides (OT and IT) |
| **IT Zone** | CIS, billing, analytics, customer portal, mobile apps | Low/No Impact | Standard corporate security |

---

### 3. Data Minimization
**Principle**: Only transfer data REQUIRED for IT business functions. Do NOT replicate entire SCADA database to IT.

**Implementation**:
- Define specific data points needed (e.g., outage events, load data, breaker status)
- Filter out operational control data, sensitive security data
- Aggregate/summarize where appropriate (15-minute averages vs. 2-second telemetry)

---

### 4. Immutable Audit Trail
**Principle**: All data transfers from OT to IT logged and auditable for NERC CIP compliance.

**Implementation**:
- Log all data flows through data diode/firewall
- Kafka event log provides immutable record of events
- Retain logs per NERC CIP retention policy (90 days to 3 years depending on CIP standard)

---

## Component Details

### 1. OT Zone Components

#### SCADA / EMS (Energy Management System)
- **Vendor**: Examples: GE ADMS, Schneider EcoStruxure, Siemens Spectrum
- **Function**: Monitor and control transmission grid, generation, substations
- **Data Generated**:
  - Real-time telemetry (voltage, current, power flow) - 2-second updates
  - Alarms and events (breaker trips, voltage violations)
  - Load forecasts, generation dispatch

#### DMS / ADMS (Distribution Management System)
- **Vendor**: Examples: Oracle Utilities Network Management, Advanced Distribution Management
- **Function**: Monitor and control distribution grid, outage management, switching
- **Data Generated**:
  - Outage events (outage detected, crew dispatched, power restored)
  - Switch status (open/closed)
  - Load data by feeder/substation

#### Substation Automation
- **Function**: Local control and protection in substations
- **Data Generated**: Breaker status, relay trips, fault currents

#### OT Data Historian / Concentrator
- **Vendor**: OSIsoft PI System, GE Proficy Historian
- **Function**: Collect and buffer OT data before sending to IT zone
- **Purpose**: Isolate SCADA systems from direct external connections; data diode sources from historian

---

### 2. DMZ / Integration Zone Components

#### Data Diode (Unidirectional Gateway)
- **Vendor**: Examples: Owl Cyber Defense, Waterfall Security
- **Function**: Hardware-enforced one-way data flow (OT → IT)
- **Use Case**: CIP High impact systems (SCADA/EMS)
- **How It Works**:
  - Physically disconnects transmit pins on IT side (cannot send data back)
  - Optical or hardware-based (not software firewall)
  - Validated and certified for NERC CIP compliance

**Example Product**: Owl DualDiode
- Two data diodes in series for redundancy
- Application proxy for replicating files, databases, messages

#### Firewall with ACLs (for CIP Medium)
- **Vendor**: Palo Alto, Fortinet (industrial/OT firewalls)
- **Configuration**:
  - OT → DMZ: Allow specific ports/IPs (e.g., PI System data port 5450)
  - DMZ → IT: Allow specific Kafka ports (9092) and MuleSoft APIs (443)
  - IT → OT: **DENY ALL**

#### Apache Kafka (Event Streaming Platform)
- **Purpose**: Ingest real-time OT events and distribute to IT consumers
- **Topics**:
  - `scada-telemetry-realtime` - Real-time meter, load, voltage data
  - `outage-events` - Outage lifecycle events
  - `substation-alarms` - Critical alarms from substations
  - `breaker-status-changes` - Circuit breaker open/close events

**Configuration**:
- Kafka cluster in DMZ (isolated from OT and IT)
- Producers: OT historian pushes data to Kafka
- Consumers: IT systems subscribe to topics

#### MuleSoft Integration APIs (in DMZ)
- **Purpose**: Provide REST APIs for IT systems to query OT data
- **APIs**:
  - `ot-telemetry-sys-api` - Historical telemetry queries (read-only)
  - `outage-events-sys-api` - Outage event history
  - `grid-status-sys-api` - Current grid status (load, voltage, alarms)

**Data Source**: Kafka or OT historian (not direct SCADA connection)

---

### 3. IT Zone Components

#### Analytics Platform
- **Use Case**: Load forecasting, DER optimization, grid analytics
- **Data Consumed**: Historical load data (15-min intervals), weather, DER generation

#### Customer Portal & Mobile App
- **Use Case**: Outage notifications ("Power out in your area, estimated restore 2pm")
- **Data Consumed**: Real-time outage events from Kafka topic `outage-events`

#### Billing & CIS
- **Use Case**: Time-of-use billing, demand charges
- **Data Consumed**: Meter reads (for customers with interval meters)

---

## Data Flow Examples

### Use Case 1: Outage Notification to Customers

**Scenario**: Circuit breaker trips in substation, causing outage for 500 customers. Customer portal needs to notify affected customers.

**Data Flow**:

1. **OT Zone**:
   - Substation relay detects fault, trips breaker
   - SCADA/DMS receives breaker trip event
   - DMS correlates affected customers (500 accounts)
   - DMS Outage Management creates outage record `OUT-2026-00543`

2. **OT → DMZ**:
   - OT historian receives outage event from DMS
   - Historian pushes event through **data diode** to Kafka in DMZ
   - Kafka topic: `outage-events`

3. **DMZ → IT**:
   - Kafka consumer (Customer Notification Service) subscribes to `outage-events`
   - Receives event:
     ```json
     {
       "eventType": "outage.outage.detected",
       "outageId": "OUT-2026-00543",
       "affectedCustomers": 500,
       "location": "Substation Alpha, Feeder 3",
       "estimatedRestore": "2026-01-05T16:00:00Z"
     }
     ```

4. **IT Zone**:
   - Customer Notification Service queries CIS for affected customer contact info
   - Sends SMS/email to 500 customers: "Power outage in your area. Estimated restore: 4:00 PM."
   - Updates Customer Portal with outage map

**Total Latency**: <30 seconds from breaker trip to customer notification

---

### Use Case 2: Load Forecasting with Historical Data

**Scenario**: Analytics team building load forecasting model; needs 2 years of historical 15-minute load data from SCADA.

**Data Flow**:

1. **IT Zone Request**:
   - Analytics platform calls MuleSoft API: `GET /ot-telemetry/substation/{id}/load?start=2024-01-01&end=2025-12-31&interval=15min`

2. **DMZ Processing**:
   - MuleSoft `ot-telemetry-sys-api` queries OT historian (PI System) in DMZ
   - Historian retrieves historical load data (read-only query)
   - MuleSoft returns aggregated CSV file (or paginated JSON)

3. **IT Zone Consumption**:
   - Analytics platform downloads data
   - Loads into Snowflake data warehouse for ML model training

**Security Note**: This is READ-ONLY data query; no commands sent to SCADA.

---

### Use Case 3: Demand Response Signal (IT → OT) - EXCEPTION PATH

**Scenario**: Demand response program needs to send "curtail load" signal to DER devices during peak demand. This is **IT → OT flow**, which requires special approval.

**Architecture**:

**Standard Unidirectional Flow Does NOT Support This** - Requires separate, secured bidirectional path:

```
IT Zone: Demand Response Platform
       │
       ▼
Secure API Gateway (Highly Restricted)
       │
       ▼
ADMS / DERMS (in OT Zone)
       │
       ▼
DER Devices (Solar Inverters, Battery Storage)
```

**Security Controls**:
- **Dedicated API endpoint** (not shared with other integrations)
- **Multi-factor authentication** and role-based access
- **Change management approval** required for any command
- **Audit logging** of every command (who, what, when)
- **Rate limiting** (prevent flood of commands)
- **NERC CIP exception approval** from cybersecurity team

**Alternative (Preferred)**: Use DERMS as intermediary; IT sends "curtail request" to DERMS via API; DERMS (in OT zone) executes control commands. IT never directly controls devices.

---

## Security & Compliance

### NERC CIP Compliance Checklist

| CIP Standard | Requirement | Implementation |
|--------------|-------------|----------------|
| **CIP-005-6** | Electronic Security Perimeter (ESP) | Firewalls between OT, DMZ, IT zones |
| **CIP-005-6** | Access control (inbound/outbound) | ACLs: OT → IT allowed, IT → OT denied |
| **CIP-007-6** | Ports and services | Minimal ports open; only required services |
| **CIP-007-6** | Malware prevention | Anti-malware on all systems; DMZ isolated |
| **CIP-010-4** | Configuration change management | All firewall/diode config changes logged and approved |
| **CIP-011-2** | Information protection | Data classification; PII/critical data encrypted |

### Data Classification

| Data Type | Classification | Security Requirement |
|-----------|---------------|---------------------|
| **Real-time SCADA telemetry** | CIP Confidential | Encrypted in transit (TLS 1.2+), access restricted |
| **Outage events (public-facing)** | CIP Low Impact | Standard encryption, broader access |
| **Control commands / setpoints** | CIP Restricted | NEVER sent from IT to OT without exception approval |
| **Customer data** | PII Confidential | NERC CIP + data privacy regulations (encrypt, audit) |

### Firewall Rules (Example)

**OT Zone → DMZ**:
```
Source: OT Historian (10.1.1.100)
Destination: Kafka Broker (10.2.1.50)
Port: 9092 (Kafka)
Action: ALLOW
Log: Yes
```

**DMZ → IT Zone**:
```
Source: MuleSoft API (10.2.1.60)
Destination: IT Subnet (10.3.0.0/16)
Port: 443 (HTTPS)
Action: ALLOW
Log: Yes
```

**IT Zone → OT Zone**:
```
Source: Any IT (10.3.0.0/16)
Destination: Any OT (10.1.0.0/16)
Port: ANY
Action: **DENY**
Log: Yes, Alert: Yes (security incident if attempted)
```

---

## Monitoring & Incident Response

### Monitoring

**OT-to-IT Data Flow Health**:
- Kafka topic lag (should be <1 minute)
- Data diode throughput and error rate
- Firewall denied connection attempts (IT → OT)
- API latency for OT data queries

**Security Monitoring**:
- Intrusion detection system (IDS) on DMZ
- SIEM (Security Information and Event Management) for log aggregation
- Alert on any IT → OT connection attempt (security violation)

**Metrics Dashboard**:
- Real-time: Kafka event throughput, API response times
- Daily: Data volume transferred OT → IT
- Weekly: Firewall rule violations, security incidents

### Incident Response

**Incident: IT → OT Connection Attempt Detected**

1. **Alert**: SIEM detects denied connection from IT to OT zone
2. **Investigation**: Cybersecurity team reviews logs (source IP, user, timestamp)
3. **Response**:
   - If malicious: Isolate compromised IT system, investigate breach
   - If accidental (misconfigured app): Remediate app, training for developer
4. **Remediation**: Update firewall rules if needed, document incident
5. **Reporting**: Report to NERC CIP compliance if BES Cyber System affected

---

## Implementation Roadmap

### Phase 1: Design & Approval (Month 1-2)
- Architecture review with Cybersecurity and NERC CIP compliance team
- Data diode vendor selection and procurement
- Firewall rule design and approval
- Identify data points to transfer (inventory SCADA tags)

### Phase 2: Infrastructure Build (Month 3-4)
- Install data diode between OT and DMZ
- Configure firewalls (OT ↔ DMZ ↔ IT)
- Deploy Kafka cluster in DMZ
- Deploy MuleSoft APIs in DMZ
- Network segmentation and testing

### Phase 3: Data Integration (Month 5-6)
- Configure OT historian to push data through diode to Kafka
- Develop Kafka producers and topics
- Build MuleSoft System APIs for OT data access
- Testing: Validate data flow, latency, accuracy

### Phase 4: IT Consumer Onboarding (Month 7-8)
- Onboard first IT consumer (e.g., Customer Portal for outage notifications)
- Validate end-to-end flow (SCADA → Kafka → Customer Portal)
- Performance testing (peak load scenarios)

### Phase 5: NERC CIP Audit Prep (Month 9)
- Document architecture for NERC CIP audit
- Validate compliance controls (firewalls, logging, access control)
- Conduct internal audit / mock NERC audit
- Remediate any gaps

### Phase 6: Production Launch (Month 10)
- Go-live with outage notification use case
- Monitor for 30 days
- Onboard additional IT consumers (analytics, billing, etc.)

---

## Lessons Learned from Similar Utilities

### Best Practices
- ✅ **Start with read-only OT data** (outage events, telemetry). Avoid bidirectional until mature.
- ✅ **Involve Cybersecurity early** - Architecture won't succeed without their buy-in.
- ✅ **Use data historian as intermediary** - Never integrate IT directly to SCADA.
- ✅ **Invest in data diode for CIP High** - Hardware-enforced security worth the cost.

### Common Pitfalls
- ❌ **Underestimating NERC CIP approval time** - Budget 3-6 months for compliance review.
- ❌ **Transferring too much data** - IT doesn't need 2-second telemetry; 15-minute is sufficient for most use cases.
- ❌ **Weak firewall rules** - "Allow all OT → IT" defeats purpose; be specific (ports, IPs).
- ❌ **No monitoring** - If data flow breaks, IT and OT teams blame each other; monitoring critical.

---

## Related Documents
- [Event-Driven Integration Pattern](../2-architectural-patterns/event-driven-integration-pattern.md)
- [NERC CIP Compliance Standards](../1-technology-standards/nerc-cip-compliance.md)
- [Cybersecurity Architecture Principles](../1-technology-standards/cybersecurity-principles.md)

---

## Questions or Feedback?
**Architecture Owner**: EA Infrastructure Architect + Cybersecurity Architect
**Email**: ea-ot-it-integration@utility.com
**Slack**: #architecture-scada-integration
**Approval Required**: Cybersecurity and NERC CIP Compliance must approve any changes
