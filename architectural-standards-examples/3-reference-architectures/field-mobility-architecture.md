# Reference Architecture: Field Mobility

**Architecture Name**: Field Mobility for Field Service Workers
**Business Domain**: Field Operations, Work & Asset Management
**Last Updated**: 2026-01-05
**Owner**: Enterprise Architecture + Distribution IT
**Status**: ✅ Active - Standard for all field mobility solutions

---

## Business Context

### Problem Statement
Field service workers (line crews, meter technicians, inspectors, vegetation management) need mobile access to work orders, asset data, safety information, and customer details while in the field. Legacy paper-based or laptop-tethered processes slow crews, create data quality issues, and delay work completion.

### Business Objectives
- **Improve Crew Productivity**: Reduce non-productive time by 20% (travel, waiting for information)
- **Enhance Safety**: Real-time access to hazard info, permits, safety procedures
- **Improve Data Quality**: Eliminate paper forms; capture data at point of work
- **Enable Real-Time Visibility**: Dispatchers see crew location and status in real-time
- **Reduce Customer Callbacks**: Complete work right first time with accurate asset data

### Scope
- **In Scope**: Field service workers (distribution, metering, vegetation), work order management, asset inspections, time tracking, safety checklists
- **Out of Scope**: Engineering design tools (use desktop GIS), SCADA operator interfaces

---

## High-Level Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                      FIELD WORKERS                             │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│   │ iOS Tablets  │  │Android Phones│  │  Rugged      │       │
│   │ (iPad)       │  │              │  │  Devices     │       │
│   └──────┬───────┘  └──────┬───────┘  └──────┬───────┘       │
└──────────┼──────────────────┼──────────────────┼──────────────┘
           │                  │                  │
           ▼                  ▼                  ▼
┌────────────────────────────────────────────────────────────────┐
│              MOBILE APPLICATION LAYER                          │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Field Mobility App (Native iOS/Android)                 │ │
│  │  - Work order management & completion                    │ │
│  │  - Asset viewing & inspection                            │ │
│  │  - Safety checklists & permits                           │ │
│  │  - Time & materials capture                              │ │
│  │  │  - Offline mode (local storage)                        │ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
           │
           ▼
┌────────────────────────────────────────────────────────────────┐
│            API LAYER (MuleSoft - Azure Cloud)                  │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  field-mobile-exp-api (Experience API)                   │ │
│  │  - Optimized mobile payloads (lightweight JSON)          │ │
│  │  - Offline sync coordination                             │ │
│  │  - Push notifications                                     │ │
│  └──────────────────────────────────────────────────────────┘ │
│                          │                                     │
│                          ▼                                     │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  work-management-process-api (Process API)               │ │
│  │  - Orchestrates work order lifecycle                     │ │
│  │  - Aggregates asset, customer, safety data               │ │
│  │  - Business logic for work completion validation         │ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
           │
           ├─────────────┬─────────────┬─────────────┬──────────┐
           ▼             ▼             ▼             ▼          ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Work &     │ │  GIS/Asset   │ │   Customer   │ │   Safety &   │
│   Asset Mgmt │ │  Management  │ │  Information │ │  Permitting  │
│   (Maximo)   │ │  (Esri ArcGIS│ │   (Oracle    │ │   (Custom)   │
│              │ │   / Smallworld│ │    CIS)      │ │              │
│  System APIs │ │  System APIs │ │  System APIs │ │  System APIs │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

---

## Component Details

### 1. Mobile Application

**Platform**: Native iOS (Swift) and Android (Kotlin)
- **Why Native?** Superior performance, offline capabilities, access to device features (GPS, camera, barcode scanner)
- **Alternative Considered**: React Native (rejected due to offline complexity and performance)

**Key Features**:
- **Work Order Management**:
  - View assigned work orders with priority, location, customer info
  - Accept/decline/defer work orders
  - Update status (traveling, on-site, working, completed)
  - Capture completion details (labor hours, materials used, notes)

- **Asset Viewing & Inspection**:
  - View asset details from GIS (poles, transformers, meters, cables)
  - Perform inspections with digital forms
  - Capture photos with GPS tagging
  - Scan barcodes/QR codes for asset identification

- **Safety**:
  - View safety permits and hazard warnings
  - Digital safety checklists (pre-job briefing, tailboard)
  - Emergency contacts and procedures
  - Report safety incidents

- **Offline Mode**:
  - Download work orders and asset data for offline use
  - Local SQLite database for offline storage
  - Queue updates for sync when online
  - Conflict resolution (server wins unless user modified)

**Technology Stack**:
- **iOS**: Swift, SwiftUI, Core Data (offline storage)
- **Android**: Kotlin, Jetpack Compose, Room (offline storage)
- **Mapping**: Esri ArcGIS Runtime SDK (offline maps)
- **Device Management**: Microsoft Intune (MDM)

---

### 2. API Layer

#### field-mobile-exp-api (Experience API)
**Purpose**: Mobile-optimized endpoints tailored for field worker app

**Key Endpoints**:
```
GET  /field-worker/work-orders/assigned
GET  /field-worker/work-orders/{id}/details
POST /field-worker/work-orders/{id}/accept
POST /field-worker/work-orders/{id}/complete
GET  /field-worker/assets/{assetId}
POST /field-worker/inspections
POST /field-worker/time-entries
GET  /field-worker/sync/delta?lastSync={timestamp}
```

**Optimizations**:
- Lightweight JSON (omit unnecessary fields for mobile bandwidth)
- Pagination for large lists
- Delta sync (only send changed data since last sync)
- Image compression and thumbnails

---

#### work-management-process-api (Process API)
**Purpose**: Orchestrate work order business logic across multiple systems

**Responsibilities**:
- Fetch work orders from Maximo
- Enrich with customer data from CIS
- Enrich with asset data from GIS
- Fetch safety permits and hazards
- Validate work completion (required fields, business rules)
- Trigger downstream processes (billing, asset updates)

---

### 3. Backend Systems (System APIs)

#### IBM Maximo (Work & Asset Management)
- **System API**: `maximo-sys-api`
- **Data**: Work orders, labor, materials, inventory, preventive maintenance
- **Integration**: REST API (Maximo Integration Framework)

#### Esri ArcGIS / GE Smallworld (GIS)
- **System API**: `gis-sys-api`
- **Data**: Asset locations, attributes, connectivity, maps
- **Integration**: ArcGIS REST API / Smallworld SCADA adapter

#### Oracle CIS (Customer Information System)
- **System API**: `oracle-cis-sys-api`
- **Data**: Customer details, service address, account status, special needs
- **Integration**: REST API (custom)

#### Safety & Permitting System
- **System API**: `safety-sys-api`
- **Data**: Safety permits, hazard assessments, incident reports
- **Integration**: REST API (custom)

---

## Data Flow Examples

### Use Case 1: Field Worker Completes Service Order

**Step-by-Step Flow**:

1. **Morning - Sync Work Orders**:
   - Field worker opens app, triggers sync
   - `GET /field-worker/work-orders/assigned`
   - App downloads today's work orders (5-10 orders) with asset and customer data
   - Data cached locally for offline access

2. **At Job Site - Accept Work Order**:
   - Worker arrives at site, marks status "On Site"
   - `POST /field-worker/work-orders/WO-12345/accept`
   - Status updated in Maximo via `work-management-process-api`

3. **During Work - View Asset Details**:
   - Worker needs to verify transformer specifications
   - `GET /field-worker/assets/XFMR-98765` (retrieved from local cache if offline)
   - GIS data displayed (nameplate rating, install date, maintenance history)

4. **Complete Work**:
   - Worker captures completion details in app:
     - Labor hours: 2.5 hours
     - Materials used: 1x transformer fuse
     - Photos: 3 photos of completed work
     - Notes: "Replaced blown fuse, tested load, restored service"
   - Worker marks work order "Complete"
   - `POST /field-worker/work-orders/WO-12345/complete` (with payload)

5. **Backend Processing**:
   - `work-management-process-api` receives completion
   - Validates completion (required fields present, business rules pass)
   - Updates Maximo work order status → "COMPLETE"
   - Updates CIS service order status → "WORK COMPLETE"
   - Photos uploaded to Azure Blob Storage, linked to work order
   - Triggers billing process if billable work

6. **Confirmation**:
   - App displays "Work Order WO-12345 Completed Successfully"
   - Next work order presented to worker

---

### Use Case 2: Offline Work Completion

**Scenario**: Field worker in remote area with no cellular connectivity

**Flow**:
1. Worker synced work orders in morning (while online)
2. Worker completes work offline:
   - All data stored in local SQLite database
   - Photos stored on device
   - "Pending sync" indicator shown in app
3. Worker returns to area with connectivity
4. App automatically syncs pending updates:
   - Uploads completion details and photos
   - Backend processes as normal
   - Local "pending" records marked as synced

**Conflict Resolution**:
- If work order was cancelled by dispatcher while offline:
  - Server rejects completion
  - Worker notified: "Work order cancelled, please contact dispatch"

---

## Security Architecture

### Authentication & Authorization
- **Mobile Device**: Enrolled in Microsoft Intune (MDM)
- **User Authentication**: Azure AD (multi-factor authentication)
- **API Authentication**: OAuth 2.0 (authorization code flow)
- **Token Refresh**: Refresh tokens for long-lived sessions
- **Session Timeout**: 8 hours (typical work shift)

### Data Security
- **Data at Rest**: Mobile database encrypted (iOS FileVault, Android EncryptedSharedPreferences)
- **Data in Transit**: TLS 1.2+ for all API calls
- **Lost Device Protection**: Remote wipe via Intune
- **Data Minimization**: Only download data needed for today's work (not entire asset database)

### NERC CIP Considerations
- Field mobility app does NOT access SCADA/OMS systems directly
- Any OT data displayed (e.g., circuit status) flows through approved integration layer with CIP zone boundaries respected

---

## Offline Capabilities

### Offline Data Strategy
- **Work Orders**: Download today's assignments + tomorrow's (for early starts)
- **Assets**: Download assets within worker's service territory (not entire utility)
- **Maps**: Offline basemaps for worker's territory (Esri offline map packages)
- **Safety Data**: All safety permits and procedures cached

### Offline Storage Limits
- **iOS**: Max 2GB local storage (Apple guideline)
- **Android**: Max 2GB local storage
- **Typical Usage**: 200-500MB per worker

### Sync Strategy
- **Auto-sync**: Every 15 minutes when online (background)
- **Manual sync**: Worker can trigger anytime
- **Delta sync**: Only changed data since last sync (efficient)
- **Conflict resolution**: Server wins for conflicting updates (with user notification)

---

## Non-Functional Requirements

| Requirement | Target | Measurement |
|-------------|--------|-------------|
| **Performance** | Work order list loads in <2 seconds | App performance monitoring |
| **Offline Availability** | 100% offline capability for core functions | Testing in airplane mode |
| **Reliability** | 99.5% uptime for APIs | Azure monitoring |
| **Scalability** | Support 2,000 concurrent field workers | Load testing |
| **Battery Life** | <15% battery drain per 8-hour shift | Device testing |
| **Data Usage** | <50MB data per worker per day | Network monitoring |

---

## Deployment & Device Management

### Supported Devices
- **iOS**: iPad (9th gen or newer), iOS 15+
- **Android**: Rugged tablets (Samsung Galaxy Tab Active, Panasonic Toughbook), Android 12+
- **Accessories**: External GPS (for improved accuracy), barcode scanners

### Device Management (Microsoft Intune)
- **App Deployment**: Push app updates via Intune
- **Configuration**: Centralized config (API endpoints, feature flags)
- **Security Policies**: Enforce encryption, passcode, remote wipe
- **Monitoring**: Track app crashes, usage, performance

### App Versioning
- **Backward Compatibility**: Maintain API compatibility for N-1 app versions
- **Forced Upgrades**: Critical security updates require upgrade before app use
- **Release Cadence**: Monthly feature releases, weekly bug fixes

---

## Integration Points

| System | Direction | Integration Method | Data Exchanged |
|--------|-----------|-------------------|----------------|
| Maximo | Bidirectional | REST API (MuleSoft) | Work orders, labor, materials |
| GIS | Read-only | ArcGIS REST API | Asset data, maps, connectivity |
| CIS | Read-only | REST API (MuleSoft) | Customer info, service address |
| Safety System | Bidirectional | REST API | Permits, incidents, checklists |
| Azure Blob Storage | Write | Azure SDK | Photos, documents |
| Push Notifications | Receive | Firebase (Android), APNs (iOS) | Urgent work orders, safety alerts |

---

## Monitoring & Support

### Application Monitoring
- **Tool**: Azure Application Insights + Firebase Analytics
- **Metrics**:
  - App crashes and errors
  - API response times
  - Offline mode usage
  - Feature adoption rates
  - User flows and drop-offs

### Support Model
- **Tier 1**: Help desk (app login, basic navigation)
- **Tier 2**: Field mobility support team (work order issues, sync problems)
- **Tier 3**: Development team (app bugs, API issues)

### Incident Response
- **Critical (P1)**: App unusable for >50 workers → 1-hour response
- **High (P2)**: Feature broken but workaround exists → 4-hour response
- **Medium (P3)**: Minor bug, low impact → 1-day response

---

## Migration Strategy

### Phased Rollout (6-Month Plan)

**Phase 1 - Pilot (Month 1-2)**:
- 2 field crews (20 workers)
- Distribution work orders only
- Run parallel with legacy process (paper/laptop)
- Daily feedback sessions

**Phase 2 - Early Adopters (Month 3-4)**:
- 10 field crews (100 workers)
- Add metering and vegetation work types
- Retire legacy process for pilot crews
- Training program developed

**Phase 3 - Full Rollout (Month 5-6)**:
- All field crews (500+ workers)
- All work types
- Legacy process retired
- Continuous improvement backlog

---

## Success Metrics (12-Month Post-Deployment)

| Metric | Baseline (Paper) | Target (Mobile) | Actual |
|--------|------------------|-----------------|--------|
| **Work Orders Completed per Day** | 4.2 | 5.5 (+30%) | 5.3 ✅ |
| **Data Entry Errors** | 12% | <2% | 1.8% ✅ |
| **Customer Callbacks (incomplete work)** | 8% | <3% | 3.2% ✅ |
| **Time to Complete Work Order** | 2.1 hours | 1.6 hours | 1.7 hours ✅ |
| **User Satisfaction (1-5)** | 2.8 (paper) | >4.0 | 4.2 ✅ |

**ROI**: $2.4M annual productivity savings (20% reduction in non-productive time for 500 workers)

---

## Lessons Learned

### What Worked Well
- ✅ Native app approach (offline and performance superior to hybrid)
- ✅ Pilot with friendly crews (identified issues early)
- ✅ Delta sync strategy (minimized data usage and sync time)
- ✅ Offline-first design (workers productive regardless of connectivity)

### Challenges & Mitigations
- ⚠️ **Challenge**: GIS data size too large for offline download
  - **Mitigation**: Spatial filtering (download only worker's territory)
- ⚠️ **Challenge**: Maximo API performance slow (5+ second response)
  - **Mitigation**: Caching layer in Process API, async background sync
- ⚠️ **Challenge**: Worker resistance to change (prefer paper)
  - **Mitigation**: Intensive training, champions program, early wins celebrated

---

## Future Enhancements (Roadmap)

| Enhancement | Business Value | Target Date |
|-------------|----------------|-------------|
| **Voice-to-text notes** | Faster data capture, hands-free | Q2 2026 |
| **Augmented reality** (overlay asset data on camera) | Improve asset identification | Q4 2026 |
| **Predictive work routing** (AI-optimized) | Reduce travel time 15% | Q1 2027 |
| **Integration with wearables** (smartwatches) | Quick status updates without phone | Q3 2027 |

---

## Related Documents
- [API-Led Connectivity Pattern](../2-architectural-patterns/api-led-connectivity-pattern.md)
- Work & Asset Management Integration (in development)
- Mobile Application Security Standards (in development)

---

## Questions or Feedback?
**Architecture Owner**: EA Solutions Architect - Field Operations
**Email**: ea-field-operations@utility.com
**Slack**: #architecture-field-mobility
