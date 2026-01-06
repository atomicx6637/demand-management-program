# Architectural Pattern: Event-Driven Integration with Kafka

**Pattern Name**: Event-Driven Integration (Publish-Subscribe)
**Category**: Integration Patterns
**Last Updated**: 2026-01-05
**Owner**: Enterprise Architecture - Data & Integration Lead
**Status**: ✅ Active - Required for real-time operational data

---

## Context

**Problem**: Polling databases or calling APIs repeatedly for updates is inefficient and doesn't scale. Real-time operational systems (smart meters, DER devices, outage management) generate continuous streams of data that need to be processed by multiple consumers.

**When to Use This Pattern**:
- ✅ Real-time operational data (meter readings, outage events, DER telemetry)
- ✅ High-volume event streams (thousands of events per second)
- ✅ Multiple systems need same data simultaneously (1 publisher, many subscribers)
- ✅ Loose coupling required (publishers don't know about subscribers)
- ✅ Event history replay capability needed

**When NOT to Use**:
- ❌ Request-response synchronous APIs (use API-Led Connectivity pattern)
- ❌ Batch file transfers once per day (use ETL pattern)
- ❌ Low-volume updates (<100 events/day) (use API polling or webhooks)

---

## Pattern Overview

Event-driven integration uses **Apache Kafka** as a centralized event streaming platform. Producers publish events to topics; consumers subscribe to topics and process events asynchronously.

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│ Smart Meters │      │   Outage     │      │  DER Devices │
│  (AMI/MDM)   │      │  Management  │      │  (Inverters) │
└──────┬───────┘      └──────┬───────┘      └──────┬───────┘
       │ Publish             │ Publish             │ Publish
       │                     │                     │
       ▼                     ▼                     ▼
┌─────────────────────────────────────────────────────────┐
│              Apache Kafka Event Streaming                │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ meter-reads │  │ outage-events│  │  der-telemetry│  │
│  │   Topic     │  │    Topic     │  │     Topic     │  │
│  └─────────────┘  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────┘
       │                     │                     │
       │ Subscribe           │ Subscribe           │ Subscribe
       ▼                     ▼                     ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  Analytics   │      │   Billing    │      │ Distribution │
│  Platform    │      │   System     │      │   Planning   │
└──────────────┘      └──────────────┘      └──────────────┘
```

**Key Concepts**:
- **Event**: Immutable record of something that happened (e.g., "MeterReadReceived")
- **Topic**: Logical channel for specific event types (partitioned for scalability)
- **Producer**: Application that publishes events to topics
- **Consumer**: Application that subscribes to topics and processes events
- **Kafka Cluster**: Distributed, fault-tolerant event log

---

## Event Design Standards

### Event Structure (JSON Schema)

All events MUST follow this structure:

```json
{
  "eventId": "uuid-v4-unique-identifier",
  "eventType": "domain.entity.action",
  "eventVersion": "1.0",
  "timestamp": "2026-01-05T10:15:30.123Z",
  "source": "system-identifier",
  "data": {
    // Event-specific payload
  },
  "metadata": {
    "correlationId": "trace-id-for-debugging",
    "causationId": "event-that-caused-this-event",
    "userId": "user-or-system-that-triggered"
  }
}
```

### Event Naming Convention

**Format**: `{domain}.{entity}.{action}`

**Examples**:
- `metering.meterread.received` - New meter reading ingested
- `outage.outage.detected` - Outage detected by OMS
- `customer.serviceorder.created` - New service order created
- `der.inverter.statuschanged` - DER device status changed

**Guidelines**:
- Use lowercase with dots as separators
- Past tense for actions (`created`, `updated`, `deleted`, `completed`)
- Domain = business area (metering, outage, customer, billing, der)

---

## Topic Design Standards

### Topic Naming Convention

**Format**: `{domain}-{entity}-{event-type}`

**Examples**:
- `metering-meterreads-raw` - Raw meter readings from AMI/MDM
- `outage-events-realtime` - Real-time outage events
- `customer-serviceorders-lifecycle` - Service order lifecycle events
- `der-telemetry-realtime` - DER device telemetry

### Topic Configuration

| Topic | Partitions | Replication Factor | Retention | Use Case |
|-------|------------|-------------------|-----------|----------|
| `metering-meterreads-raw` | 12 | 3 | 30 days | High-volume meter data (10k+ events/sec) |
| `outage-events-realtime` | 6 | 3 | 90 days | Outage lifecycle (detect, restore, close) |
| `customer-serviceorders-lifecycle` | 4 | 3 | 365 days | Audit trail for service orders |
| `der-telemetry-realtime` | 8 | 3 | 7 days | DER device status and telemetry |

**Partitioning Strategy**:
- Partition by key for ordered processing within partition
- Examples: `customerId`, `meterId`, `outageId`, `deviceId`

**Retention Policy**:
- **Operational data**: 7-30 days (meter reads, telemetry)
- **Audit/compliance**: 365 days+ (service orders, billing events)
- **Compacted topics**: For entity state (retain latest per key forever)

---

## Producer Guidelines

### Publishing Events (Java Example using Spring Kafka)

```java
@Service
public class MeterReadingProducer {

    @Autowired
    private KafkaTemplate<String, MeterReadEvent> kafkaTemplate;

    private static final String TOPIC = "metering-meterreads-raw";

    public void publishMeterRead(MeterReading reading) {
        MeterReadEvent event = MeterReadEvent.builder()
            .eventId(UUID.randomUUID().toString())
            .eventType("metering.meterread.received")
            .eventVersion("1.0")
            .timestamp(Instant.now())
            .source("ami-headend-system")
            .data(reading)
            .metadata(Metadata.builder()
                .correlationId(MDC.get("traceId"))
                .build())
            .build();

        // Partition by meterId for ordered processing
        kafkaTemplate.send(TOPIC, reading.getMeterId(), event);

        log.info("Published meter read event: meterId={}, eventId={}",
                 reading.getMeterId(), event.getEventId());
    }
}
```

**Producer Best Practices**:
- ✅ Always include unique `eventId` (for deduplication)
- ✅ Include `correlationId` for distributed tracing
- ✅ Partition by business key (meterId, customerId) for ordering
- ✅ Use async publishing for high throughput
- ✅ Handle publish failures gracefully (retry with backoff)
- ❌ Don't include sensitive data (PII, credentials) in events without encryption

---

## Consumer Guidelines

### Consuming Events (Java Example using Spring Kafka)

```java
@Service
public class BillingMeterReadConsumer {

    @KafkaListener(
        topics = "metering-meterreads-raw",
        groupId = "billing-system-consumer",
        concurrency = "4"
    )
    public void consumeMeterRead(MeterReadEvent event) {
        log.info("Processing meter read: eventId={}, meterId={}",
                 event.getEventId(), event.getData().getMeterId());

        try {
            // Idempotency check (handle duplicates)
            if (billingService.isEventAlreadyProcessed(event.getEventId())) {
                log.debug("Event already processed, skipping: {}", event.getEventId());
                return;
            }

            // Process the meter reading
            billingService.processMeterRead(event.getData());

            // Mark event as processed (for idempotency)
            billingService.markEventProcessed(event.getEventId());

            log.info("Successfully processed meter read: {}", event.getEventId());

        } catch (Exception e) {
            log.error("Failed to process meter read: {}", event.getEventId(), e);
            // Let Kafka retry based on retry policy
            throw e;
        }
    }
}
```

**Consumer Best Practices**:
- ✅ Implement idempotency (handle duplicate events gracefully)
- ✅ Use consumer groups for load balancing
- ✅ Process events quickly (<1 second per event) or use async processing
- ✅ Commit offsets only after successful processing
- ✅ Implement dead-letter topic for poison messages
- ❌ Don't block consumer thread (use thread pools for heavy processing)

---

## Common Event Scenarios

### Scenario 1: Meter Reading Ingestion & Distribution

**Use Case**: AMI/MDM system receives 5 million meter reads per day. Multiple systems need this data (billing, analytics, CIS, grid operations).

**Architecture**:
```
AMI/MDM System (Producer)
       │
       ▼
  meter-reads-raw (Topic)
       │
       ├──────────┬──────────┬──────────┐
       ▼          ▼          ▼          ▼
   Billing    Analytics   CIS      Grid Ops
  (Consumer) (Consumer) (Consumer) (Consumer)
```

**Event Example**:
```json
{
  "eventId": "abc-123-def-456",
  "eventType": "metering.meterread.received",
  "eventVersion": "1.0",
  "timestamp": "2026-01-05T10:15:30Z",
  "source": "ami-headend-itron",
  "data": {
    "meterId": "MTR-12345678",
    "customerId": "CUST-98765",
    "readingTimestamp": "2026-01-05T10:00:00Z",
    "usage_kWh": 12.5,
    "voltage": 120.2,
    "quality": "VALID"
  },
  "metadata": {
    "correlationId": "trace-abc-123"
  }
}
```

**Throughput**: 10,000 events/second peak, 2,000 events/second average

---

### Scenario 2: Outage Detection & Restoration

**Use Case**: Outage Management System (OMS) detects outages from meter last gasp events and SCADA alarms. Multiple systems need outage updates (customer notifications, crew dispatch, analytics).

**Architecture**:
```
OMS (Producer)
       │
       ▼
  outage-events (Topic)
       │
       ├──────────┬──────────┬──────────┐
       ▼          ▼          ▼          ▼
 Notification  Dispatch  Analytics  Customer
   Service      System              Portal
  (Consumer)  (Consumer) (Consumer) (Consumer)
```

**Event Lifecycle**:
1. `outage.outage.detected` - OMS detects outage
2. `outage.crew.dispatched` - Crew assigned
3. `outage.outage.restored` - Power restored
4. `outage.outage.closed` - Outage investigation closed

**Event Example** (`outage.outage.detected`):
```json
{
  "eventId": "outage-evt-001",
  "eventType": "outage.outage.detected",
  "eventVersion": "1.0",
  "timestamp": "2026-01-05T14:23:45Z",
  "source": "oms-system",
  "data": {
    "outageId": "OUT-2026-00142",
    "detectionMethod": "METER_LAST_GASP",
    "affectedCustomers": 347,
    "location": {
      "latitude": 40.7128,
      "longitude": -74.0060,
      "address": "Main St & 5th Ave, Anytown"
    },
    "estimatedRestoration": "2026-01-05T16:00:00Z",
    "severity": "MAJOR"
  },
  "metadata": {
    "correlationId": "outage-trace-142"
  }
}
```

---

### Scenario 3: DER (Distributed Energy Resources) Telemetry

**Use Case**: Solar inverters, battery storage, and EV chargers send telemetry every 5-15 seconds. Grid operations and DER management systems consume for real-time monitoring and control.

**Architecture**:
```
DER Devices (Producer via IoT Gateway)
       │
       ▼
  der-telemetry-realtime (Topic)
       │
       ├──────────┬──────────┐
       ▼          ▼          ▼
    DERMS      ADMS     Analytics
  (Consumer) (Consumer) (Consumer)
```

**Event Example**:
```json
{
  "eventId": "der-telem-987654",
  "eventType": "der.inverter.statusupdated",
  "eventVersion": "1.0",
  "timestamp": "2026-01-05T15:10:05Z",
  "source": "iot-gateway-west",
  "data": {
    "deviceId": "INV-SOLAR-54321",
    "customerId": "CUST-11223",
    "deviceType": "SOLAR_INVERTER",
    "status": "GENERATING",
    "powerOutput_kW": 7.2,
    "voltage_V": 240.5,
    "frequency_Hz": 60.02,
    "temperature_C": 42.3
  },
  "metadata": {
    "correlationId": "der-trace-54321"
  }
}
```

**Throughput**: 50,000+ devices × 1 event/15 sec = ~3,300 events/second

---

## Error Handling & Resilience

### Retry Strategy

**Consumer-side retries** (Spring Kafka example):
```yaml
spring:
  kafka:
    consumer:
      enable-auto-commit: false
      properties:
        max.poll.records: 100
    listener:
      ack-mode: manual
      retry:
        max-attempts: 3
        backoff:
          initial-interval: 1000
          multiplier: 2.0
          max-interval: 10000
```

### Dead Letter Topic (DLT)

Events that fail after max retries go to Dead Letter Topic for investigation:

**DLT Naming**: `{original-topic}.DLT`
- Example: `metering-meterreads-raw.DLT`

**DLT Monitoring**: Alert when DLT receives events (indicates systematic issue)

---

## Security & Compliance

### Authentication & Authorization
- **Kafka SASL/SSL**: All producers and consumers authenticate via SASL
- **ACLs**: Topic-level access control (who can read/write)
- **Encryption**: TLS 1.2+ for data in transit

### NERC CIP Compliance
- **OT Data Isolation**: Topics with SCADA/OMS data in separate Kafka cluster within CIP zone
- **Unidirectional Flow**: Use data diodes for CIP High → CIP Low/Corporate

### Data Privacy
- **PII Encryption**: Customer PII encrypted at field level in events
- **Audit Logging**: Track who published/consumed sensitive events

---

## Monitoring & Observability

### Key Metrics to Track

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| **Producer Publish Rate** | Baseline varies by topic | Drop >50% from baseline |
| **Consumer Lag** | <1000 messages | >10,000 messages |
| **Consumer Processing Time** | <500ms per event | >2 seconds |
| **Failed Events (DLT)** | 0 | >10 events/hour |
| **Kafka Cluster Health** | All brokers healthy | Any broker down |

### Distributed Tracing
- Use `correlationId` to trace events across systems
- Integrate with OpenTelemetry or Zipkin for visualization

---

## Migration from Legacy Point-to-Point

**Legacy**: System A polls System B database every 5 minutes for updates
**Event-Driven**: System B publishes events to Kafka; System A consumes in real-time

**Migration Steps**:
1. System B starts publishing events (dual-write to database + Kafka)
2. System A consumes events in parallel with polling (validate data match)
3. System A switches to event-only consumption, disable polling
4. System B stops dual-write (Kafka only)

---

## Anti-Patterns (What NOT to Do)

| Anti-Pattern | Why It's Bad | Do This Instead |
|--------------|--------------|-----------------|
| **Using Kafka for request-response** | Kafka is async; high latency for sync | Use REST APIs for request-response |
| **Large event payloads (>1MB)** | Slows throughput, wastes resources | Store large data in blob storage; event contains URL |
| **No event versioning** | Breaking changes break consumers | Always include `eventVersion`; support multiple versions |
| **Synchronous processing in consumer** | Blocks consumer; lag builds up | Process async or use thread pools |

---

## Related Patterns
- [API-Led Connectivity Pattern](./api-led-connectivity-pattern.md) - For request-response APIs
- Change Data Capture (CDC) Pattern - For database event streaming (in development)
- CQRS Pattern - Command-Query Responsibility Segregation with events (in development)

---

## Success Metrics

- **Latency Reduction**: Real-time (seconds) vs. polling (minutes/hours)
- **Scalability**: Handle 10x volume increase without infrastructure changes
- **Coupling**: Producers and consumers deployed independently
- **Reliability**: 99.9% event delivery (no data loss)

---

## Questions or Feedback?
Contact: EA Data & Integration Lead
Email: ea-data-integration@utility.com
Slack: #architecture-events
Office Hours: Monthly DAR meetings
