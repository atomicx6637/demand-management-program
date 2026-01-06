# Value-Based Demand Workflow (Detailed Visual)

Consolidates the Section 8.1 stages from `demand-management-program.md` with the type-specific ServiceNow states from `demand-workflow-visual.md`.

```mermaid
flowchart TD
    %% Shared Nodes
    Start["Start: Business Need or Opportunity Identified"]
    Type{"Classify Work Type"}
    Ops["Handled via Operational / Incident Process<br/>(Outside Demand Workflow)"]
    Feedback["↩️ Return for Clarification / Re-Tiering<br/>ServiceNow: Draft / Rework"]
    Reject["❌ ServiceNow: Closed / Rejected<br/>Feedback Provided"]
    Lessons["🧠 Lessons Learned & Continuous Improvement"]
    End["End"]

    %% Enhancement Path
    EnhIntake["📝 ServiceNow: Draft / Submitted<br/><b>Intake Submission</b> – Enhancement Value Assessment"]
    EnhScreen{"Gate: Screening (Team Lead)<br/><b>Stage:</b> Screening"}
    EnhArch{"Gate: Architecture Review Triggered?<br/><b>Stage:</b> Architecture Review"}
    EnhAR["🏗️ EA/DAR Architecture Review<br/><b>Status:</b> Qualified (if escalated)"]
    EnhDecision["✅ ServiceNow: Approved<br/><b>Stage:</b> Final Decision – Product Team Lead"]
    EnhExecute["🚀 Work Added to Backlog / Kanban<br/><b>Stage:</b> Execution"]
    EnhValue["📈 Sampled Value Tracking<br/><b>Stage:</b> Value Realization"]

    %% Project Path (Tier 3/2/1)
    ProjIntake["📝 ServiceNow: Draft / Submitted<br/><b>Intake Submission</b> – Tier 3/2 Form or Tier 1 Brief"]
    ProjScreen{"🔍 ServiceNow: Screening<br/><b>Stage:</b> Screening – EA/DAR / Strategy"}
    ProjQual["📋 ServiceNow: Qualified<br/><b>Stage:</b> Qualification – Business Case Development"]
    ProjArch{"Gate: Architecture Review Needed?<br/><b>Stage:</b> Architecture Review"}
    ProjAR["🏗️ EA / DAR Architecture Review<br/>Integration, standards, complexity"]
    ProjGov["👥 Governance Review (Tech Subcommittee)<br/><b>Stage:</b> Governance"]
    ProjFinal{"Gate: Final Decision – TAC / Product Lead<br/>ServiceNow: Approved / Deferred"}
    ProjExec["🚀 ServiceNow: Approved → Completed<br/><b>Stage:</b> Execution"]
    ProjValue["📈 Value Realization Tracking<br/>Quarterly / Program cadence"]

    %% Connections
    Start --> Type
    Type -->|Break-Fix or Incident| Ops --> End
    Type -->|Enhancement under $50k| EnhIntake
    Type -->|Tier 3 / Tier 2 / Tier 1 Project| ProjIntake

    %% Enhancement Flow
    EnhIntake --> EnhScreen
    EnhScreen -->|Needs Info| Feedback --> EnhIntake
    EnhScreen -->|Reject| Reject
    EnhScreen -->|Proceed| EnhArch
    EnhArch -->|DAR Not Required| EnhDecision
    EnhArch -->|DAR / EA Review| EnhAR -->|Approved| EnhDecision
    EnhAR -->|Conditions| Feedback
    EnhAR -->|Rejected| Reject
    EnhDecision --> EnhExecute --> EnhValue --> Lessons --> End

    %% Project Flow
    ProjIntake --> ProjScreen
    ProjScreen -->|Clarify / Wrong Tier| Feedback --> ProjIntake
    ProjScreen -->|Reject| Reject
    ProjScreen -->|Proceed| ProjQual --> ProjArch
    ProjArch -->|Standard / Already Reviewed| ProjGov
    ProjArch -->|Formal Review| ProjAR -->|Approved| ProjGov
    ProjAR -->|Conditions| Feedback
    ProjAR -->|Rejected| Reject
    ProjGov -->|Recommend Reject| Reject
    ProjGov -->|Recommend Approve| ProjFinal
    ProjFinal -->|Rejected| Reject
    ProjFinal -->|Deferred / Rework| Feedback
    ProjFinal -->|Approved| ProjExec --> ProjValue --> Lessons
    Lessons --> End

    %% Styling
    classDef gates fill:#ffe4cc,stroke:#ff8800,stroke-width:2px;
    classDef stage fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;
    classDef governance fill:#cde4ff,stroke:#0050be,stroke-width:2px;
    classDef architecture fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px;

    class Type,EnhScreen,EnhArch,ProjScreen,ProjArch,ProjFinal gates;
    class EnhIntake,EnhDecision,EnhExecute,EnhValue,ProjIntake,ProjQual,ProjExec,ProjValue stage;
    class ProjGov governance;
    class EnhAR,ProjAR architecture;
```

Use this file wherever a detailed workflow visual is needed alongside the textual description.
