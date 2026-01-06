# ADR-012: Customer Portal Architecture - Composable SPA with Backend APIs

**Status**: ✅ Accepted
**Date**: 2025-09-22
**Deciders**: EA Solutions Architect, Customer Experience Director, Digital Development Lead
**Consulted**: UX/UI Team, Security Architect, Infrastructure Team
**Informed**: Technology Subcommittee, Customer Operations

---

## Context and Problem Statement

The utility needs to modernize its customer self-service web portal. Current portal is:
- **Legacy technology**: Built on WebSphere Portal (J2EE) in 2012
- **Poor user experience**: Slow page loads (5-10 seconds), not mobile-responsive
- **Limited functionality**: Bill pay and view usage only; no outage reporting, EV charging management, solar enrollment
- **High maintenance cost**: Monolithic architecture; small changes require full regression testing
- **Low adoption**: 18% customer digital engagement (target: 40%)

**Business Objectives**:
- **Improve customer experience**: Modern, fast, mobile-responsive portal
- **Increase digital adoption**: 40% of customers using portal regularly
- **Enable new capabilities**: Outage reporting, EV program enrollment, solar/battery management, paperless billing
- **Reduce call center volume**: Deflect 25% of calls to self-service

**Problem**: What architectural approach should we use for the new customer portal?

---

## Decision Drivers

| Criterion | Priority | Rationale |
|-----------|----------|-----------|
| **User Experience** | Critical | Fast page loads (<2 sec), mobile-responsive, modern UI |
| **Time to Market** | High | Launch MVP in 6 months; incremental feature releases every 2-4 weeks |
| **Scalability** | High | Support 5M customers, 50k concurrent users during outages/storms |
| **Maintainability** | High | Small teams can update features independently; reduce regression risk |
| **Integration Flexibility** | High | Integrate with CIS, billing, outage management, DER systems via APIs |
| **Cost** | Medium | Reasonable TCO; prefer cloud-native (opex) over custom infrastructure |
| **Security** | Critical | Customer PII protection; authentication/authorization; OWASP Top 10 |

---

## Options Considered

### Option 1: Composable Single-Page Application (SPA) with Backend APIs ⭐ SELECTED

**Architecture**:
```
┌─────────────────────────────────────────────────────┐
│  Frontend: React SPA (TypeScript)                   │
│  - Component library (Material UI)                  │
│  - State management (Redux)                         │
│  - Hosted in Azure Static Web Apps                  │
└──────────────┬──────────────────────────────────────┘
               │ REST APIs (OAuth 2.0)
               ▼
┌─────────────────────────────────────────────────────┐
│  BFF (Backend for Frontend): Node.js / Express      │
│  - customer-portal-exp-api (MuleSoft)               │
│  - Aggregates data from multiple Process APIs       │
│  - Tailors responses for web UI                     │
└──────────────┬──────────────────────────────────────┘
               │
     ┌─────────┼─────────┬─────────┬─────────┐
     ▼         ▼         ▼         ▼         ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│Billing  │ │ Outage  │ │  DER    │ │Account  │
│Process  │ │ Process │ │ Process │ │Process  │
│  API    │ │   API   │ │   API   │ │  API    │
└─────────┘ └─────────┘ └─────────┘ └─────────┘
```

**Technology Stack**:
- **Frontend**: React (TypeScript), Material UI, Redux, Axios (HTTP client)
- **Backend**: MuleSoft `customer-portal-exp-api` (Experience API)
- **Hosting**: Azure Static Web Apps (frontend), Azure App Service (BFF if needed)
- **CDN**: Azure CDN for global content delivery
- **Authentication**: Azure AD B2C (OAuth 2.0, social login support)

**Pros**:
- ✅ **Fast, modern UX**: React SPA feels like native app (no full page reloads)
- ✅ **Mobile-responsive**: React components adapt to screen size
- ✅ **Composable**: Features developed as independent components (billing widget, outage map widget, etc.)
- ✅ **Incremental delivery**: Deploy new features independently without full regression
- ✅ **Scalable**: Static web app + CDN scales infinitely; API layer scales via MuleSoft CloudHub
- ✅ **API-first**: Decouples UI from backend; same APIs can power mobile app in future
- ✅ **Developer productivity**: Large React ecosystem, reusable component library

**Cons**:
- ⚠️ **JavaScript required**: Customers with JavaScript disabled cannot use portal (rare: <1% of users)
- ⚠️ **Initial load time**: First load downloads React bundle (~500KB); mitigated by code splitting and CDN
- ⚠️ **SEO challenges**: SPA not ideal for SEO (but customer portal is authenticated, so SEO not critical)

**Estimated Cost**: $250k build + $50k/year hosting (Azure Static Web Apps + CDN)

**Time to Market**: 6 months MVP (bill pay, view usage, outage reporting)

---

### Option 2: Server-Side Rendered (SSR) with Next.js

**Architecture**: Similar to Option 1, but using Next.js (React framework) with server-side rendering

**Pros**:
- ✅ **SEO-friendly**: Pages pre-rendered on server (better for search engines)
- ✅ **Faster initial load**: HTML sent to browser immediately (no waiting for JS bundle)
- ✅ **Progressive enhancement**: Works without JavaScript (graceful degradation)

**Cons**:
- ❌ **Infrastructure complexity**: Requires Node.js server (not just static hosting)
- ❌ **Higher hosting cost**: Azure App Service instead of Static Web Apps (~2x cost)
- ❌ **Slower development**: SSR adds complexity (hydration, server/client code separation)
- ❌ **SEO not critical**: Customer portal is authenticated; not indexed by search engines

**Estimated Cost**: $300k build + $100k/year hosting

**Time to Market**: 8 months MVP

**Decision**: **Rejected** - SSR benefits (SEO, no-JS support) not worth added complexity and cost for authenticated portal

---

### Option 3: Hybrid Portal Platform (e.g., Liferay, Adobe Experience Manager)

**Architecture**: Commercial portal platform with pre-built widgets, content management, and personalization

**Pros**:
- ✅ **Out-of-the-box features**: User management, personalization, A/B testing, CMS
- ✅ **Low-code/no-code**: Business users can update content without developer involvement
- ✅ **Proven in utilities**: Several peer utilities use Liferay or Adobe AEM

**Cons**:
- ❌ **High licensing cost**: $500k-$1M/year for enterprise portal platform
- ❌ **Vendor lock-in**: Proprietary platform; difficult to migrate away
- ❌ **Customization complexity**: Extending portal requires platform-specific development (not standard React/Angular)
- ❌ **Performance overhead**: Portal platforms heavier than lightweight SPA
- ❌ **Overkill**: Utility doesn't need enterprise CMS features (most content is dynamic from APIs, not static pages)

**Estimated Cost**: $400k build + $700k/year licensing + $150k/year hosting

**Time to Market**: 9 months MVP (platform procurement and setup adds time)

**Decision**: **Rejected** - Too expensive for benefits provided; portal needs are simpler than enterprise CMS use case

---

### Option 4: Modernize Existing WebSphere Portal

**Architecture**: Upgrade WebSphere Portal to latest version; rebuild UI with modern JavaScript framework on top

**Pros**:
- ✅ **Incremental approach**: Reuse existing backend integrations
- ✅ **Lower perceived risk**: "We know WebSphere"

**Cons**:
- ❌ **Lipstick on a pig**: Modernizing UI doesn't fix fundamental architectural issues (monolith, performance)
- ❌ **Limited WebSphere future**: IBM de-emphasizing WebSphere; pushing customers to cloud
- ❌ **Slow performance**: WebSphere heavy runtime; slow startup, high memory usage
- ❌ **Skills scarcity**: WebSphere skills rare and expensive; React skills abundant

**Estimated Cost**: $200k modernization + $200k/year infrastructure + $100k/year WebSphere licenses

**Time to Market**: 8 months (architectural debt slows development)

**Decision**: **Rejected** - Throws good money after bad; doesn't achieve transformation goals

---

## Decision

**Selected Option**: **Option 1 - Composable SPA with Backend APIs (React + MuleSoft)**

### Rationale

1. **Best User Experience**:
   - React SPA delivers fast, app-like experience customers expect
   - Material UI components look modern and professional
   - Mobile-responsive by default (60% of traffic is mobile)

2. **Fastest Time to Market**:
   - React ecosystem mature; abundant libraries, components, developers
   - Azure Static Web Apps simple to deploy (infrastructure abstracted)
   - MVP in 6 months vs. 8-9 months for alternatives

3. **Scalability & Cost**:
   - Static web app + CDN scales to millions of customers without infrastructure management
   - Pay-per-use pricing (not fixed enterprise licenses)
   - Total cost 50% lower than portal platform approach

4. **Maintainability & Agility**:
   - Feature teams can work independently on components
   - Small changes don't require full regression (unlike monolith)
   - API-first architecture enables mobile app and other channels in future

5. **Skills Availability**:
   - React developers abundant (easier to hire/train than WebSphere or Liferay)
   - Existing MuleSoft investment leveraged (customer-portal-exp-api)

### Architecture Decisions

**Frontend**:
- **Framework**: React 18+ (with TypeScript for type safety)
- **UI Library**: Material UI (Google's Material Design)
- **State Management**: Redux Toolkit (for complex state) + React Query (for API state)
- **Routing**: React Router v6
- **Build Tool**: Vite (faster than Webpack)
- **Testing**: Jest (unit tests), React Testing Library, Playwright (E2E)

**Backend**:
- **BFF (Backend for Frontend)**: MuleSoft `customer-portal-exp-api` (Experience API)
- **Authentication**: Azure AD B2C (supports social login: Google, Facebook, Apple)
- **Authorization**: OAuth 2.0 + JWT tokens
- **Session Management**: Stateless (JWT tokens); refresh tokens for long sessions

**Hosting**:
- **Frontend**: Azure Static Web Apps (auto-scales, integrated CDN)
- **APIs**: MuleSoft CloudHub (already deployed)
- **CDN**: Azure CDN (caching static assets, images)

**Security**:
- **Authentication**: Multi-factor authentication (MFA) optional for customers
- **Encryption**: TLS 1.2+ for data in transit
- **Content Security Policy (CSP)**: Prevent XSS attacks
- **API security**: OAuth 2.0 tokens; rate limiting; input validation
- **PII protection**: Customer data encrypted at rest; access logged for audit

---

## Consequences

### Positive Consequences

- ✅ **Modern customer experience**: Fast, responsive, mobile-friendly portal
- ✅ **Increased digital adoption**: Target 40% customer engagement (vs. 18% baseline)
- ✅ **Reduced call center volume**: Deflect 25% of calls to self-service
- ✅ **Agile feature delivery**: New features deployed every 2-4 weeks
- ✅ **Cost savings**: $450k/year vs. portal platform approach
- ✅ **API reuse**: Same APIs power future mobile app, chatbot, voice assistant

### Negative Consequences / Risks

- ⚠️ **JavaScript dependency**: Portal requires JavaScript enabled (mitigation: <1% of users affected)
- ⚠️ **Browser compatibility**: Must test across browsers (Chrome, Safari, Edge, Firefox)
  - **Mitigation**: Automated cross-browser testing (BrowserStack)
- ⚠️ **Accessibility (WCAG 2.1)**: SPA accessibility requires careful development
  - **Mitigation**: Accessibility training, automated testing (Axe), manual audits
- ⚠️ **Security risks (OWASP Top 10)**: XSS, CSRF, insecure dependencies
  - **Mitigation**: Security scanning (Snyk, OWASP ZAP), code reviews, penetration testing

---

## Implementation Plan

### Phase 1: Foundation (Months 1-2)
- **Architecture**: Finalize component architecture, design system, API contracts
- **Infrastructure**: Set up Azure Static Web Apps, Azure AD B2C, CI/CD pipelines
- **Design**: UX/UI design system, wireframes, prototypes
- **API**: Build `customer-portal-exp-api` (MuleSoft Experience API)

### Phase 2: MVP Features (Months 3-4)
- **Authentication**: Login, registration, password reset (Azure AD B2C)
- **Dashboard**: Account summary, quick pay, usage overview
- **Bill Pay**: View bills, pay by credit card, autopay enrollment
- **Usage**: View daily/monthly usage (charts), compare to last year
- **Outage Reporting**: Report outage, view outage status

### Phase 3: Testing & Launch (Months 5-6)
- **Testing**: Functional, performance (load testing), security (pen test), accessibility
- **Pilot**: 10,000 beta customers (friendly users)
- **Refinement**: Fix bugs, optimize performance based on pilot feedback
- **Go-Live**: Full launch to 5M customers (phased rollout by region)

### Phase 4: Post-Launch Features (Months 7-12)
- **EV Programs**: Enroll in EV charging programs, view EV-specific rates
- **Solar/DER**: Solar enrollment, battery storage monitoring, export credits
- **Paperless Billing**: Enroll in paperless, email notifications
- **Payment Plans**: Set up payment arrangements, view payment history
- **Personalization**: Personalized tips (energy saving, programs you qualify for)

---

## Validation & Success Metrics

### 6-Month Post-Launch Metrics (Target vs. Actual)

| Metric | Baseline (Legacy) | Target (New Portal) | Actual (Q2 2026) | Status |
|--------|-------------------|---------------------|------------------|--------|
| **Digital Adoption Rate** | 18% | 40% | 37% | ✅ On track |
| **Page Load Time (P95)** | 8.5 seconds | <2 seconds | 1.8 seconds | ✅ Exceeded |
| **Mobile Traffic** | 45% | 60% | 64% | ✅ Exceeded |
| **Call Center Deflection** | 0% | 25% | 22% | ✅ On track |
| **Customer Satisfaction (CSAT)** | 3.2 / 5.0 | >4.0 / 5.0 | 4.3 / 5.0 | ✅ Exceeded |
| **Feature Release Frequency** | 2 per year | Every 2-4 weeks | Every 3 weeks | ✅ Met |

**Conclusion**: Decision validated. React SPA architecture delivering expected results.

---

## Lessons Learned (Post-Launch)

### What Worked Well
- ✅ **Component library accelerated development**: Material UI components saved ~30% dev time
- ✅ **API-first approach**: Same APIs used by mobile app (launched 3 months post-portal)
- ✅ **Azure Static Web Apps**: Deployment simple; auto-scaling handled storms (50k concurrent users)
- ✅ **Pilot program**: Beta customers identified UX issues early (saved post-launch rework)

### Challenges & Mitigations
- ⚠️ **Challenge**: Initial bundle size 800KB (too large, slow first load)
  - **Mitigation**: Code splitting by route; lazy load components; reduced to 350KB
- ⚠️ **Challenge**: Accessibility gaps (screen reader support incomplete)
  - **Mitigation**: Hired accessibility consultant; remediated to WCAG 2.1 AA compliance
- ⚠️ **Challenge**: API performance during peak (bill due dates)
  - **Mitigation**: Caching in BFF layer; rate limiting to prevent spikes

---

## Review & Update

**Review Frequency**: Annual review or if major architecture issues surface

**Last Reviewed**: 2026-01-05
**Next Review**: 2027-01-05

**Potential Triggers for Revisiting Decision**:
- React falls out of favor (e.g., new framework emerges as clear winner)
- Security vulnerabilities in SPA architecture discovered
- Customer feedback indicates SPA UX issues
- Business requirements change (e.g., need server-side rendering for SEO)

---

## References

- **Design Prototypes**: [Figma - Customer Portal Designs](https://figma.com/customer-portal-designs)
- **API Specifications**: [OpenAPI Spec - customer-portal-exp-api](./supporting-docs/ADR-012-customer-portal-api-spec.yaml)
- **Security Assessment**: [Penetration Test Report](./supporting-docs/ADR-012-pen-test-report.pdf)
- **Load Testing**: [Performance Test Results](./supporting-docs/ADR-012-load-test-results.pdf)

---

## Approval Signatures

| Role | Name | Signature | Date |
|------|------|-----------|------|
| EA Solutions Architect | [Name Redacted] | ✅ Approved | 2025-09-22 |
| Customer Experience Director | [Name Redacted] | ✅ Approved | 2025-09-22 |
| Digital Development Lead | [Name Redacted] | ✅ Approved | 2025-09-22 |
| Security Architect | [Name Redacted] | ✅ Approved | 2025-09-25 |
| Technology Subcommittee | [Name Redacted] | ✅ Approved | 2025-10-01 |

---

**Document Owner**: EA Solutions Architect - Digital Channels
**Classification**: Internal - Confidential
**Related ADRs**:
- [ADR-001: Cloud Platform Selection - Azure](./ADR-001-cloud-platform-selection.md)
- [ADR-008: API-Led Connectivity Standard](./ADR-008-api-led-connectivity.md)
- [ADR-019: Authentication - Azure AD B2C for Customer Portal](./ADR-019-customer-auth-azure-ad-b2c.md)
