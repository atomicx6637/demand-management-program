# Feedback on Value-Based Demand Engagement Program
## Stakeholder Review - December 2025

**Program Document Reviewed:** `ea-demand-management-program.md`
**Review Date:** December 22, 2025
**Reviewers:** Skeptical Utility Veteran, Utility Developer/Demand Manager

---

## Executive Summary

Two distinct stakeholder perspectives reviewed the Value-Based Demand Engagement Program. While both recognize the program's structural strengths, they identified critical implementation challenges that must be addressed for success.

**Consensus Findings:**
- ✅ Time and capacity commitments are underestimated across all roles
- ✅ Phased implementation is critical - avoid "big bang" rollout
- ✅ EA team capability gaps exist (business skills, modern tech, domain knowledge)
- ✅ Emergency provisions needed for compliance/regulatory demands
- ✅ Connection between demand approval and delivery capacity is the biggest gap

**Recommended Path Forward:**
- 18-24 month phased implementation (not 3-6 months)
- $150-200k Year 1 investment in EA/DAR capability development
- Pilot with 2-3 domains before enterprise-wide rollout
- Year 1 target: 150-200 demands (not 250-430) while building organizational muscle

---

## Perspective 1: Skeptical Utility Veteran (25+ Years Experience)

### Overview
*"I've been through enough 'process improvement initiatives' to know when something looks good on paper but is going to fall apart when it hits the real world."*

---

### Major Concerns

#### 1. The Interview Process - "Really? Another Meeting?"

**The Problem:**
Instead of sponsors filling out a business case as they always have, now we're asking them to:
1. Fill out a "lightweight" form
2. Schedule a 30-45 minute interview (Tier 3) or 60 minutes (Tier 2)
3. Have that interview recorded
4. Wait for EA to write what they think the sponsor said

**Concerns:**
- **Sponsor Time:** Our sponsors are already stretched thin running departments. Where do they find time for recorded interviews?
- **Domain Knowledge Gap:** What happens when the EA conducting the interview doesn't understand operational context? We'll spend more time explaining basics than discussing the project.
- **Recording Chills Candor:** Nobody talks openly when being recorded. We'll get sanitized, CYA versions, not the real story.
- **Ownership Gap:** When EA writes the business case, sponsors feel less invested in defending it.
- **Rounds of Rework:** How many "that's not what I meant" cycles before we get it right?

**Reality Check:**
This isn't going to be FASTER than the old way - it's shifting burden from sponsors to EA, which creates a bottleneck and ownership issues.

---

#### 2. The Complexity Matrix - "Who Really Understands This?"

**The Problem:**
Business sponsors are asked to classify projects as "Low," "Medium," or "High" complexity based on integration requirements, architectural implications, and technology maturity.

**Concerns:**
- **Sponsors Don't Think This Way:** They know they need a new system or need to fix something broken. They don't think about "integration requirements" or "architectural implications."
- **Guaranteed Re-Tiering:** Sponsors will guess wrong. EA will re-tier during screening. That means rework, delay, and frustration.
- **Gaming the System:** After a few rounds, sponsors will lowball complexity to get in the queue faster, knowing they'll get caught later.
- **Inconsistent Assessment:** What one architect calls "medium complexity," another calls "high complexity." Where's the calibration? Where's the consistency?

**Example:**
A sponsor thinks their middleware upgrade is "Low Complexity" because it's just updating software. EA reviews and finds 11 system integrations, legacy authentication issues, and vendor end-of-support forcing timeline compression. Re-tiered to Tier 2. Original 7-12 day cycle becomes 14-21 days, blowing past the business deadline.

---

#### 3. The Federated DAR Model - "Will DARs Actually Do This Work?"

**The Problem:**
The program plans for 6-8 Domain Architecture Representatives (DARs), each handling 8-12 Tier 3 demands per year at 50% time allocation.

**Concerns:**

**Finding DARs:**
- You're looking for people with 10+ years technical experience, deep domain knowledge, architectural aptitude, and peer respect
- Those people are BUSY - they're go-to technical leads already underwater with operational issues, technical debt, and keeping lights on
- Who does their current job when they spend 50% on demand management?

**Priority Conflicts:**
- When there's a production outage vs. writing a business case for a proposed project, which wins?
- The DAR's domain boss (who signs performance reviews) vs. EA team (dotted line) - who wins when priorities conflict?

**Time Underestimation:**
- 3-4 hours per Tier 3 demand? Really?
- Interview prep, interview facilitation, writing 5-7 page business case, coordinating with sponsors, preparing for Tech Sub meetings
- First dozen times? Way more than 4 hours each

**Reality Check:**
This assumes a level of organizational discipline and protected time that utility IT organizations rarely demonstrate. DARs will deprioritize this work when operational fires burn.

---

#### 4. Time Commitments - "Where Will People Find This Time?"

**The Math Doesn't Add Up:**

The program asks for:
- Business Sponsors (Tier 3): 5-10% of their role
- Business Sponsors (Tier 2): 10-15% of their role
- Executive Sponsors (Tier 1): 20-30% of their role
- Benefit Owners: 5-10% during project, ongoing after
- Product Team Leads: 5-10% for Enhancement reviews
- DARs: 50% of their time
- EA team: 40% on demand management

**Questions:**
- Has anyone checked if these people HAVE this capacity?
- Our directors and VPs already work 50-60 hour weeks. Where is this 10-15% coming from?
- Are we asking people to work MORE hours, or are current responsibilities not getting done?
- EA team spending 40% on demand management = 1.5 FTEs just doing interviews and business cases. Where's that capacity from? What STOPS getting done?

---

#### 5. Process vs. Reality - "What Problem Are We Solving?"

**Fundamental Question:**
Yes, our current process has issues. But is THIS the solution, or are we creating more elaborate bureaucracy that slows things down?

**Reality Check on Cycle Times:**

**Enhancement - "3 Days":**
- Promised: 3-day approval
- Reality: DAR review triggered for any integration, customer data, cloud services, or deviation from patterns
- That's basically EVERY enhancement that matters
- 3 days becomes 1 week, becomes 2 weeks

**Tier 3 - "7-12 Days":**
- Promised: 7-12 days to governance-ready
- Doesn't include: screening (1-2 days), interview scheduling (2-5 days based on calendars), governance cycles (bi-weekly Tech Sub, monthly TAC)
- Real-world calendar time: 6-8 weeks

**No Emergency Override:**
- What happens when NERC CIP audit finding needs remediation with immovable regulatory deadline?
- What happens when vendor end-of-support forces 6-month upgrade window?
- What happens when executive decision creates "top priority, start immediately" initiative?
- Governance cycles don't care about external deadlines

---

#### 6. Failure Modes - "What Could Go Wrong?"

**EA Team Overwhelmed:**
- Document says "temporarily supplement" or "defer lower-priority demands"
- Who decides what's lower priority? Every sponsor thinks THEIR project is critical
- Creates political battles

**System Dependencies:**
- Entire process built in ServiceNow
- ServiceNow outage = can't take demand?
- No email backup option?

**Governance Scheduling:**
- Tech Sub bi-weekly, TAC monthly
- Meetings get canceled, executives travel, priorities shift
- Demand scheduled for March TAC gets postponed - everything slips a month?

**Executive Circumvention:**
- VP frustrated after 3 weeks calls CIO directly
- CIO asks EA "why is this taking so long?"
- Pressure to rush through
- How do you maintain process discipline when executives demand exceptions?

---

#### 7. Value Tracking - "Good Idea, Brutal Execution"

**I Like This:**
Tracking whether we delivered promised value is smart. Should have been doing this all along.

**But the Reality:**
- Benefit owners report quarterly, compare actual vs. planned, explain variances, implement corrective actions
- On top of their day job
- What happens when value ISN'T realized?
  - Project promised $500k labor savings
  - Year later, no staff reductions due to political/union constraints
  - Does sponsor get in trouble?
  - Or do we quietly revise: "achieved CAPABILITY to reduce staff, chose not to"?

**I've Seen This Before:**
Value tracking starts with good intentions, ends as check-the-box exercise where everyone inflates results to avoid looking bad.

---

### Bottom Line from Veteran Perspective

**I understand the goals:** Rigor, accountability, investing in the right things, getting value from investments. Good goals.

**But I worry:**
1. **Too complex** for consistent execution - people will find workarounds
2. **Time commitments unrealistic** given current workloads
3. **Federated model assumes DARs prioritize this** when real job is keeping systems running
4. **Interview approach might improve quality** but definitely slows things down and adds handoffs
5. **Shifting responsibility to EA** - if they can't handle volume, becomes bottleneck
6. **Assumes organizational discipline** we haven't demonstrated

**What I'd Rather See:**

**Start Simple. Pilot. Prove. THEN Scale.**

- Pick ONE domain
- Work with their DAR
- Test interview process for Tier 3
- Track cycle times
- Measure satisfaction
- Learn what works and what doesn't
- THEN iterate and expand

Don't roll out this entire framework enterprise-wide on Day 1. Because right now, this looks like a consulting firm's dream framework - beautiful charts, clear roles, elegant processes - but I've been in the trenches long enough to know beautiful frameworks often crumple when they hit operational reality.

---

## Perspective 2: Utility Developer / Demand Manager

### Overview
*"I appreciate the structure and have serious concerns about real-world implementation. Let me provide honest feedback on strengths and practical challenges."*

---

### What I Appreciate

#### 1. Interview-Based Approach for Tier 2/3

**The Intention:**
EA facilitates interviews and develops business cases, reducing sponsor burden and improving quality.

**Reality Check:**
- Assumes EA has **business acumen** and **domain knowledge** to synthesize complex requirements
- Business context is everything - can an EA who doesn't live in operations daily capture nuances?
- 30-45 minute interview feels optimistic for complex projects - need multiple conversations with SMEs

**Where This Could Fail:**
- Sponsors feel **ownership is taken away** - didn't write it, less invested in defending it
- EA-written business cases might be **technically sound but business-tone-deaf**
- Miss political, relational, organizational realities that determine success
- **Recording reduces candor** - people less open about organizational challenges or vendor issues

**What Would Make This Work Better:**
- Make it **collaborative** - EA facilitates but sponsor co-authors, not just reviews draft
- Allow **follow-up interviews** - one session won't capture everything
- **Train EA team** in interviewing, active listening, business case writing (not trivial skills)

---

#### 2. Cost × Complexity Matrix

**The Intention:**
Smart to tier by both cost AND complexity, not just dollars.

**Reality Check:**
- Complexity assessment is **incredibly subjective** and **changes as you learn more**
- What looks "Low Complexity" during intake often reveals "Medium" during architecture review, "High" during implementation
- Creates many **re-tiering scenarios** - the churn isn't addressed

**Real Example:**
"Simple" middleware upgrade - Low Complexity / Tier 3:
- During qualification discovered:
  - 11 systems integrated (not 3)
  - Legacy authentication patterns incompatible with new version
  - Vendor end-of-support forcing timeline compression
- **Re-tiered to Tier 2**
- Governance cycle: 7-12 days → 14-21 days
- **Blew past business deadline**

**What Would Make This Work Better:**
- **Complexity validation workshops** early (before full business case investment)
- Expect 20-30% re-tiering and **build buffer into timelines**
- Create **"escalation-pending" status** where work proceeds while complexity validated

---

#### 3. Federated DAR Model for Scalability

**The Intention:**
Distributing Tier 3 qualification to DARs prevents EA bottleneck.

**Serious Concerns:**

**DAR Requirements (from Section 8.2.3):**
- 10+ years technical experience
- Deep domain knowledge
- Architectural aptitude
- Peer respect
- Facilitate interviews, write business cases, perform architecture reviews
- 50% time allocation to demand management

**My Questions:**

**1. Who Are These People?**
In most utility IT organizations, senior technical people with this profile are:
- Already overloaded with operational firefighting
- Not interested in "process work" - want to solve technical problems
- Compensated as individual contributors, not facilitators/writers

**2. Do DARs Have Technical Depth for Modern Architecture?**
Can they assess:
- Cloud-native architecture patterns?
- Microservices, API management, event-driven architecture?
- SaaS integration security models?
- Or are they mainframe/on-prem experts asked to vet modern tech?

**3. How Prevent DAR Drift and Inconsistency?**
- DAR in OT domain applies standards one way
- DAR in Customer domain applies differently
- EA quarterly spot-checks won't catch real-time drift

**What Would Make This Work Better:**
- **Start with 2-3 pilot DARs** in high-volume domains (not 6-8 on Day 1)
- **Extensive training:** interviewing, business case writing, architecture review (not currently mentioned)
- **DAR community of practice** with bi-weekly calibration sessions
- **Career development pathway** with compensation/recognition beyond "career benefits"

---

### Critical Gaps Identified

#### 4. Integration with Agile/Sprint Planning

**The Document is Silent On:**
How approved demands translate into actual dev team capacity and sprint planning.

**The Real Problem:**
- TAC approves Tier 2 project in Month 3
- PMO transitions to delivery
- Dev teams already committed 2-3 sprint increments (6-9 weeks out)
- Earliest realistic start: Month 5-6
- But business case assumed Month 4 start for value realization

**Unanswered Questions:**
1. How does demand approval connect to **actual dev team capacity planning**?
2. Who decides priority when **multiple projects approved but capacity limited**?
3. How handle **incremental delivery** when business case assumed big-bang?
4. What happens when Tier 3 approved but **product team has no capacity for 3 months**?

**What's Missing:**
- **Capacity Planning Integration:** Link TAC approval to actual team availability
- **Portfolio Sequencing:** Prioritize across approved-but-not-started projects
- **Incremental Value Realization:** Business cases assume waterfall; agile delivers incrementally
- **MVP Frameworks:** Phase projects to deliver value earlier than business case timeline

---

#### 5. The "Business Wants It NOW" vs. 14-21 Day Cycle Time Problem

**The Document Says:**
Tier 2 cycle: 14-21 days; Tier 3: 7-12 days

**My Reality:**
- NERC CIP audit finding needs remediation: **regulatory deadline immovable**
- Vendor end-of-support notice: **6-month window or lose support**
- Executive decision creates initiative: **"Top priority, start immediately"**

**No "Emergency Override" Provided:**
- What happens when 14-day cycle isn't fast enough?
- **"Emergency tier"** for compliance/regulatory/security?
- How handle **externally-imposed deadlines** that don't respect governance cycle?

**Real Scenario I've Lived:**
PUC issued new reporting requirement - 90-day implementation deadline:
- Intake (3 days) + screening (2 days) + interview scheduling (5 days) = 10 days burned before business case starts
- 14 days qualification + architecture review + Tech Sub + TAC = Day 35-40 before **project charter**
- Leaves 50 days for design, dev, test, deploy = **impossible**

**What Would Make This Work Better:**
- **"Fast Track" provision** for regulatory/compliance/security with lightweight governance (CIO/CFO/Sponsor decision within 48 hours)
- **"Work at risk" authorization** - start before full governance approval, with checkpoints
- **Staged funding** - approve Phase 1 quickly, full funding follows as business case develops

---

#### 6. EA Team Capacity to Assess Modern Architecture

**The Document Assumes:**
EA team has deep expertise across all technology domains - cloud, OT/SCADA, mobile, everything.

**My Concern:**
Many utility EA teams are strong in:
- Traditional enterprise architecture
- Data center/on-prem infrastructure
- Vendor package integration
- Regulatory compliance frameworks

But struggle with:
- Cloud-native architecture (serverless, containers, K8s)
- Modern API management and microservices
- Real-time data streaming and event-driven architecture
- DevSecOps and CI/CD pipelines
- SaaS security and integration patterns
- IoT/OT convergence and edge computing

**Questions:**
1. Can EA team **credibly review** cloud-native customer portal architecture?
2. Do they have **hands-on experience** or reviewing based on documentation?
3. How **stay current** when technology evolves faster than utility procurement cycles?

**What Would Make This Work Better:**
- **Acknowledge expertise gaps** - bring in external architects for specialized reviews
- **Continuous learning budget** for EA team hands-on with modern tech
- **Vendor/partner technical reviews** to supplement EA assessment
- **"Architecture spike" funding** for teams to prototype before full review

---

#### 7. Demand Approval ≠ Development Capacity

**The Critical Gap:**
Program focuses on **approving demands** but barely addresses **actual development capacity**.

**Realities I See Every Day:**
- 3 product teams (30 developers total)
- Approved 18 projects last year
- Delivered 11
- Why? **Capacity already committed** when projects approved

**What's Missing:**
- **"Approval" should include capacity allocation**, not just funding
- **Quarterly capacity planning:** "We have 40 dev-months in Q2, here's what can start"
- **Portfolio prioritization** for when approved projects exceed capacity
- **Transparency to sponsors:** "Approved, but earliest start is Q3 due to capacity constraints"

**Real Risk:**
TAC approves 6 Tier 2 projects in January, all with Q1 start dates. But dev capacity handles only 2 in Q1. Who decides which 4 get delayed? How reset value realization when start dates slip 6 months?

---

#### 8. Context Switching and Meeting Overhead

**The Document Describes:**
Bi-weekly Tech Sub (2-3 hrs), monthly TAC (2-3 hrs), interviews, architecture reviews, value tracking, governance reporting.

**My Developer Reality (serving in demand management while doing development):**

**Current Meeting Load** (before this program):
- Sprint planning: 2 hrs bi-weekly
- Daily standups: 2.5 hrs/week
- Sprint reviews/retros: 2 hrs bi-weekly
- Architecture office hours: 2 hrs/week
- Incident response: 3-5 hrs/week average
- **Total: 12-15 hrs/week**

**This Program Adds** (if I'm DAR or EA):
- Tech Subcommittee: 2-3 hrs bi-weekly
- DAR calibration: 1-2 hrs bi-weekly (my suggestion)
- Qualification interviews: 24-48 hrs/year (8-12 demands × 3-4 hrs)
- Architecture reviews: 5-7 hrs per review
- Governance prep: 2-3 hrs/month

**Risk:**
Meeting overhead crowds out actual technical work. Become facilitator/writer, not builder.

**What Would Make This Work Better:**
- **Dedicated demand management FTEs** (not "50% allocation" to people with other jobs)
- **Batch interview sessions** - 2 back-to-back more efficient than scattered
- **Async collaboration** where possible
- **Realistic workload planning** - 8-12 Tier 3/year = ~100 hrs minimum, not counting Enhancements

---

#### 9. The 250-430 Demands/Year Capacity Is Aspirational

**The Document Claims (Section 8.0.1):**
- 200-300 Enhancements
- 48-96 Tier 3
- 15-25 Tier 2
- 3-8 Tier 1
- **Total: 266-429 demands/year**

**My Reality Check:**

**Enhancements (200-300/year):**
- Assumes 12-15 product teams × ~20 Enhancements/team/year
- That's 1-2 Enhancements per team per month
- **Realistic?** Only if teams well-staffed, have clear product ownership, aren't firefighting
- **My experience:** Utility teams spend 40-60% capacity on break-fix, support, technical debt. Enhancement capacity limited.

**Tier 3 (48-96/year):**
- Assumes 6-8 DARs × 8-12 Tier 3 each
- **Realistic?** Only if:
  - Successfully recruit and train 6-8 qualified DARs (12-18 month ramp)
  - Protected time (50% allocation hard to defend when ops fires burning)
  - Interview-to-business-case actually takes 3-4 hrs (likely 6-8 hrs with rework)

**Tier 2 (15-25/year):**
- Assumes 3-4 senior EA × 8-12 hrs per Tier 2
- 3-4 EAs × 150 hrs = 450-600 hrs capacity
- 15-25 Tier 2 × 10-14 hrs each = 150-350 hrs demand
- **Math works** - but assumes EA team **isn't also doing strategic architecture, standards, technology research, firefighting**

**My Estimate:**
**Year 1 realistic: 60-70% of these numbers** (150-200 demands) while organization learns. Hit 250-430 by Year 2-3 if successful.

---

### Recommended Phased Implementation

**Don't Launch This All at Once.**

I've seen too many "big bang" process rollouts fail.

#### Phase 1 (Months 1-6): Stabilize Tier 2/1 with Existing EA Team
- Focus on high-value, high-complexity demands through new process
- EA handles Tier 2 interview approach (pilot with 3-5 projects)
- Prove model works before federating to DARs
- **Success metric:** 80% of Tier 2 business cases approved on first Tech Sub review

#### Phase 2 (Months 4-9): Pilot Federated Model with 2-3 DARs
- Select 2-3 DARs in high-volume domains
- Intensive training (2-3 day workshop + ongoing coaching)
- EA shadows first 2-3 Tier 3 qualifications per DAR
- **Success metric:** DAR-led business cases same approval rate as EA-led

#### Phase 3 (Months 7-12): Scale to Enhancement Tier
- Product Team Lead decision authority for <$50k
- Lightweight governance with DAR review triggers
- **Success metric:** 3-day Enhancement cycle time achieved 70% of time

#### Phase 4 (Months 10-18): Expand DAR Coverage
- Scale from 2-3 DARs to 6-8 based on demand volume
- Refine templates and processes from lessons learned
- **Success metric:** 250+ demands managed annually with 90% stakeholder satisfaction

---

### Bridge the Capacity Planning Gap

**Add "Capacity Gate" to Approval Process:**

When TAC approves funding, **also approve capacity allocation**:
- "Tier 2 Project Alpha approved for $750k funding and **8 FTE-months dev capacity in Q2-Q3**"
- If capacity not available in business case timeline, **TAC decides:** defer other work, fund contractors, or reset timeline

**Quarterly Portfolio & Capacity Planning:**
- Tech Subcommittee reviews **approved-but-not-started backlog vs. available capacity**
- Prioritizes which approved projects start next quarter
- Resets expectations with sponsors on start dates

**Transparency Dashboard:**
- Real-time view of dev capacity: committed vs. available by team/quarter
- Prevents TAC from approving more work than can be delivered

---

### Create Fast-Track for Unavoidable Deadlines

**"Emergency Tier" Provision:**

For regulatory/compliance/security demands with **externally-imposed, immovable deadlines**:
- Lightweight intake (1-page submission)
- CIO/CFO/Sponsor review within 48 hours
- Approval to start work "at risk"
- Full business case follows within 30 days (retrospective documentation)
- Value realization still tracked

**Criteria for Emergency Tier:**
- Regulatory mandate with legal deadline
- Security incident remediation
- Vendor end-of-support forcing upgrade
- Executive directive tied to Board commitment

**Guardrails:**
- Limited to 5-8 per year (prevents abuse)
- CFO confirms funding available
- Post-implementation review validates emergency classification

---

### Invest in EA/DAR Capability Development

**If This Program Will Succeed, EA Team Needs NEW SKILLS:**

**Business Skills:**
- Interviewing and active listening techniques
- Business case writing and financial modeling
- Facilitation and stakeholder management
- Change management and influence without authority

**Technical Skills:**
- Hands-on experience with modern architecture (cloud, APIs, microservices)
- DevSecOps and CI/CD understanding
- SaaS integration and security models
- Data architecture and analytics platforms

**Demand Management Skills:**
- Process design and continuous improvement
- Capacity planning and portfolio management
- Value measurement and benefits realization

**Recommended Investment:**
- **Year 1:** $150-200k training budget for EA team and DARs
- **Ongoing:** 80 hours/year per EA and DAR for professional development
- **External coaching:** Bring in demand management expert for first 6-12 months

---

### Bottom Line Assessment from Developer Perspective

#### What I Like:
1. **Tiered approach is smart** - right-sized governance
2. **Value discipline at all levels** - even Enhancements articulate value
3. **Interview-based qualification** could work if EA has right skills and capacity
4. **Federated DAR model** only way to scale, but needs heavy investment
5. **Clear EA/PMO handoff** reduces confusion

#### What Worries Me:
1. **Assumes EA capacity and capability that may not exist** - 3-4 senior EAs doing Tier 2 qualification, strategic architecture, standards, and tech leadership is unrealistic
2. **No connection to actual development capacity** - approving demands doesn't create developers or time
3. **Interview approach shifts burden to EA** but creates ownership gap for sponsors
4. **Cycle times are optimistic** given re-tiering, rework, and learning curves
5. **No emergency provisions** for unavoidable deadlines
6. **250-430 demands/year requires organizational maturity** that takes 2-3 years to build

#### What Would Make Me Confident:
1. **Phased implementation** - 18-24 months to full operation
2. **EA team expansion** (5-6 EAs, not 3-4) or **acceptance that strategic architecture suffers**
3. **Dedicated DAR training and support** - 6-12 month investment per DAR
4. **Capacity planning integration** - connect demand approval to dev availability
5. **Fast-track provision** for regulatory/compliance/security
6. **Year 1 target of 150-200 demands** while building muscle, not 250-430

---

## Final Recommendation (Developer Perspective)

**This program has the right bones**, but needs **realistic implementation planning** that accounts for:
- **Organizational change management** - big shift in how demand managed
- **Capability development** - EA team and DARs need significant training
- **Capacity constraints** - both EA qualification capacity and dev delivery capacity
- **Learning curves** - Year 1 will be messy; plan for it

**If implemented thoughtfully over 18-24 months with investment in people and skills**, this could genuinely improve how the organization makes investment decisions.

**If rushed to implementation in 3-6 months** with existing capacity, it will create **process burden without value** and stakeholders will revolt.

I'm cautiously optimistic but want to see **detailed implementation planning** before committing this will work.

---

## Cross-Cutting Themes and Recommendations

### Common Concerns Across Both Perspectives

Both the skeptical veteran and the developer identified these critical issues:

1. **Time/Capacity Underestimation**
   - EA team 40% allocation assumes strategic architecture work stops
   - DAR 50% allocation unrealistic given operational firefighting
   - Sponsor time commitments don't account for existing workload
   - 3-4 hours per Tier 3 demand will be 6-8 hours in reality

2. **Phased Implementation Critical**
   - Enterprise-wide rollout on Day 1 will fail
   - Start with 1-2 domains to prove model
   - Scale over 18-24 months as capability builds
   - Year 1 target 150-200 demands (60-70% of plan)

3. **EA Capability Gaps**
   - Business skills: interviewing, facilitation, business case writing
   - Modern technical skills: cloud-native, microservices, DevSecOps
   - Domain knowledge: understanding operational context
   - Requires $150-200k Year 1 training investment

4. **Emergency Provisions Missing**
   - Regulatory/compliance deadlines don't wait for governance cycles
   - Need "Fast Track" with CIO/CFO approval within 48 hours
   - Limited to 5-8 per year to prevent abuse

5. **Delivery Capacity Not Connected**
   - Approving demands doesn't create developer capacity
   - Need "capacity gate" at approval: funding + FTE allocation
   - Quarterly portfolio planning to match backlog to capacity
   - Transparency dashboard showing committed vs. available capacity

---

### Recommended Immediate Actions

#### 1. Revise Implementation Timeline
- Change from 3-6 months to **18-24 months phased approach**
- Pilot with 1-2 domains before enterprise rollout
- Build organizational muscle gradually

#### 2. Right-Size Year 1 Expectations
- Target 150-200 demands (not 250-430)
- Start with 2-3 DARs (not 6-8)
- Accept learning curve and rework

#### 3. Invest in Capability Development
- $150-200k budget for EA/DAR training
- 2-3 day intensive workshops
- External coaching for 6-12 months
- 80 hrs/year ongoing professional development

#### 4. Add Missing Process Elements
- **Fast Track tier** for regulatory/compliance (48-hour approval)
- **Capacity gate** at TAC approval (funding + FTE allocation)
- **Quarterly portfolio planning** to sequence approved projects
- **Complexity validation workshops** before full business case investment

#### 5. Expand EA Team or Acknowledge Trade-offs
- Hire 1-2 additional senior EAs, OR
- Explicitly state that strategic architecture work will be reduced, OR
- Bring in external architects for specialized reviews

#### 6. Create Success Metrics for Pilot
- 80% business case approval rate on first review
- Average cycle time within ±20% of targets
- 70% stakeholder satisfaction with process
- No more than 25% re-tiering rate

---

### Critical Success Factors

For this program to succeed, the organization must commit to:

1. **Realistic Timeline:** 18-24 months, not 3-6 months
2. **Capability Investment:** Training and coaching for EA team and DARs
3. **Protected Capacity:** DARs need genuine 50% allocation, not "when you have time"
4. **Executive Sponsorship:** CIO/CTO must defend process discipline and resist circumvention
5. **Continuous Improvement:** Monthly retrospectives during pilot to identify issues
6. **Transparency:** Real-time dashboards showing cycle times, backlogs, and capacity
7. **Change Management:** Extensive communication and stakeholder engagement

---

## Conclusion

Both perspectives recognize the value of a structured, tiered demand management approach with value discipline. However, both also identify significant implementation risks that must be addressed.

**The program is viable IF:**
- Implementation is phased over 18-24 months
- Significant investment made in EA/DAR capability development
- Realistic capacity expectations set for Year 1 (150-200 demands)
- Missing elements added (fast track, capacity gate, portfolio planning)
- Organization commits to change management and continuous improvement

**The program will fail IF:**
- Rushed to enterprise-wide implementation in 3-6 months
- Expected to operate at full capacity (250-430 demands) from Day 1
- EA team and DARs expected to execute without training and support
- Time commitments treated as "nice to have" rather than protected capacity
- Executives circumvent process when frustrated with cycle times

**Recommendation:** Proceed with the program framework, but commit to phased implementation, capability investment, and realistic Year 1 targets. Pilot with 2 domains, learn, adjust, then scale.

---

**End of Feedback Document**
