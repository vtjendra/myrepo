# Claude Code Skills Comparison: slavingia/skills vs garrytan/gstack

A comparison of two Claude Code skill collections built by founders with contrasting philosophies.

---

## Overview

| | slavingia/skills | garrytan/gstack |
|---|---|---|
| **Author** | Sahil Lavingia (Gumroad founder) | Garry Tan (YC President & CEO) |
| **Based on** | *The Minimalist Entrepreneur* | Garry Tan's personal engineering workflow |
| **Number of skills** | 9 | 28+ |
| **Focus** | Business strategy & validation | Engineering execution & shipping |
| **Target user** | Solo founders / early-stage entrepreneurs | Engineers / technical teams |
| **Philosophy** | Community first, build last | Sprint structure: Think → Plan → Build → Ship |
| **Repo** | [slavingia/skills](https://github.com/slavingia/skills) | [garrytan/gstack](https://github.com/garrytan/gstack) |

---

## slavingia/skills — The Minimalist Entrepreneur Framework

9 skills covering the full entrepreneurial journey in deliberate sequence:

| Command | Purpose |
|---|---|
| `/find-community` | Identify communities you belong to; find business opportunities within them |
| `/validate-idea` | Test demand before building; assess willingness to pay |
| `/mvp` | Define a single core offering; ship in a weekend |
| `/first-customers` | Manual outreach through concentric circles (family → community → cold) |
| `/pricing` | Cost-based or value-based pricing; always charge something from day one |
| `/marketing-plan` | Content strategy; spend time before money |
| `/grow-sustainably` | Evaluate growth decisions against profitability and reversibility |
| `/company-values` | Define non-obvious, story-driven values before hiring |
| `/minimalist-review` | Checkpoint any business decision against 8 minimalist principles |

**Core philosophy:** Start with community, solve real problems manually before automating, charge early, grow at a sustainable pace. Anti-growth-at-all-costs.

---

## garrytan/gstack — The Virtual Engineering Team

28 skills simulating specialized engineering roles across the full sprint lifecycle:

| Command | Role simulated | Purpose |
|---|---|---|
| `/office-hours` | CEO | Reframe problem before writing any code |
| `/plan-ceo-review` | CEO | Scope optimization across four strategic modes |
| `/plan-eng-review` | Engineering Manager | Architecture docs, expose hidden assumptions |
| `/plan-design-review` | Designer | UX validation during planning |
| `/design-consultation` | Designer | Design input mid-build |
| `/design-review` | Designer | Review UI/UX before shipping |
| `/review` | Staff Engineer | Production bug detection, auto-fixes |
| `/qa` | QA Lead | Real Chromium browser testing + regression generation |
| `/qa-only` | QA Lead | QA reporting without fixes |
| `/cso` | Security Officer | OWASP Top 10 + STRIDE threat modeling |
| `/ship` | Release Engineer | Test validation + PR automation |
| `/land-and-deploy` | Release Engineer | Deployment through production health verification |
| `/canary` | Release Engineer | Post-deploy monitoring for regressions |
| `/document-release` | Doc Engineer | Changelog and release notes |
| `/investigate` | Staff Engineer | Debugging and root cause analysis |
| `/retro` | Team | Sprint retrospectives across projects |
| `/careful` | Safety | Warns before destructive operations |
| `/freeze` | Safety | Restrict edits to scoped directories |
| `/unfreeze` | Safety | Remove edit locks |
| `/guard` | Safety | Combined safety controls |
| `/browse` | — | Real Chromium browser integration |
| `/autoplan` | — | Automated parallel planning |
| `/gstack-upgrade` | — | Self-update utility |

**Core philosophy:** Structured sprint workflow with explicit role separation. Each skill feeds the next. Process prevents gaps. Measurable output: 600k+ lines in 60 days.

---

## Key Differences

### 1. Stage of use

**slavingia/skills** is pre-product. Use it when you're still asking "should I build this?" It prevents building the wrong thing by front-loading community discovery and manual validation.

**gstack** is post-decision. Use it once you've committed to building. It accelerates execution by simulating the team structure that typically forms around a technical project.

### 2. Depth vs breadth

slavingia/skills goes deep on business fundamentals — each skill is an interactive consultation that asks probing questions. gstack goes broad across engineering disciplines — each skill automates a specific workflow step.

### 3. Human interaction model

slavingia/skills is conversational. The AI asks questions and you answer; it coaches rather than executes.

gstack is operational. Skills trigger automated workflows — browser tests run, PRs get created, security audits execute.

### 4. Scope of audience

slavingia/skills is most useful for non-technical founders or anyone in the idea/validation phase. The value is strategic clarity.

gstack is built for engineers who already know how to ship but want to scale their personal output to team-level throughput.

### 5. Complementarity

These tools are not in competition — they occupy different phases:

```
slavingia/skills          garrytan/gstack
─────────────────         ──────────────────────────────────────
Find community      →
Validate idea       →
MVP scope           →     office-hours + plan-ceo-review
First customers     →
Pricing             →
Marketing plan      →
                          plan-eng-review + review + qa + ship
Grow sustainably    →     canary + retro + grow-sustainably
Company values      →     retro + company-values alignment
Minimalist review   →     plan-ceo-review + cso
```

The ideal workflow: use slavingia/skills to decide *what* to build and *whether* it's worth building, then switch to gstack to build it at speed.

---

## Relevance to ClaimIt

ClaimIt is past the validation stage (the problem — filing consumer complaints — is well-defined and the market exists in SEA). The relevant tools shift accordingly:

- **slavingia/skills** still useful for: `/pricing` (complaint tiers/subscriptions), `/marketing-plan` (content strategy for SEA markets), `/grow-sustainably` (before pursuing paid acquisition or fundraising), `/minimalist-review` (before adding any major new feature)
- **gstack** directly applicable for: `/review` and `/cso` on every API route, `/qa` for complaint wizard E2E flows, `/ship` for every release, `/design-review` before any UI change, `/retro` after each sprint

---

## Installation

```bash
# slavingia/skills
git clone https://github.com/slavingia/skills.git ~/.claude/plugins/skills
/plugin install ~/.claude/plugins/skills

# garrytan/gstack
# Follow setup instructions at https://github.com/garrytan/gstack
```
