# GitHub Profile Dashboard — Design Spec

Date: 2026-08-22
Repo: https://github.com/S4vz4d/S4vz4d (special GitHub profile repo, renders as the profile README)

## Goal

Turn the empty `README.md` in the `S4vz4d/S4vz4d` repo into a professional, minimalist-but-stylized GitHub profile dashboard with a **cyberpunk/blueprint** aesthetic — reads like a technical schematic, not a generic "awesome README" template.

## Content (source: `Resume_Miguel.docx` superseded by `MiguelGonzalez_Resume.pdf`, confirmed by user)

- **Name:** Miguel González
- **Titles:** AI Red Teamer · Red Teamer · Cybersecurity Engineer & Researcher
- **Location:** Madrid, Spain | Remote
- **Contact:** github.com/S4vz4d · linkedin.com/in/miguel-gonzalez-gonzalez · s4vz4d@gmail.com

**About (condensed from CV summary):** Security engineer who builds offensive tooling and hardens enterprise systems, working both sides of the fence. Three years securing critical infrastructure for major Spanish corporations and government departments; since 2024, building AI red-team tooling and running adversarial testing against LLMs — prompt injection, agent and MCP security, penetration testing, SOC operations. Looking to lead offensive security against AI/ML systems while feeding findings back into detection and defense.

**Featured projects** (repos are private — link to product sites, not GitHub):
- **Verax** — AI governance / shadow-AI discovery platform. Ingests FortiGate logs to find AI tools in use, scores vendor data-handling risk, maps Entra ID OAuth grants, exports to SIEM, generates AI risk-assessment reports. Stack: Python, FastAPI, Next.js. Site: veraxai.xyz
- **Mentra** — Chrome extension, zero to production in under 3 months. 335 downloads, 34 active users. JWT auth, SSE streaming, Stripe billing. Stack: Next.js 15, Supabase, Groq/LLaMA 3.1, Stripe. Site: mentra.cc

(Note: "AI-Triagebot-Redteam" and "Bug Bounty Recon Pipeline" are separate in-progress/CV-only projects, not featured here per user instruction.)

**Work experience:**
- **NTT** — Technical Services Engineer · Oct 2022 – Apr 2024 · Spain. End-to-end security architectures (Fortinet, Check Point, Palo Alto, Nozomi) for major Spanish corporations and government departments. -35% MTTR across 12+ clients, -40% firewall misconfig incidents, +25% delivery speed.
- **Westcon-Comstor** — Support Engineer · May 2022 – Oct 2022 · Spain. -30% incident resolution time, hardened firewalls for 5+ clients.
- **Westcon-Comstor** — Support Center Operator Trainee · Apr 2021 – May 2022 · Spain. -20% open SOC tickets.

**Certifications:**
| Cert | Issuer | Year |
|---|---|---|
| AI Red Teamer | Hack The Box | 2026 |
| Red Teaming Path | TryHackMe | 2025 |
| Jr Penetration Tester | TryHackMe | 2025 |
| NSE 3 Network Security | Fortinet | 2023 |
| NSE 1–2 | Fortinet | 2022 |

**Skills (by category):**
- Offensive Security: AI Red Teaming, Prompt Injection Testing, Pentest, Red Teaming, Bug Bounty, OSINT, Threat Hunting
- Defensive Security: Firewall Architecture, Incident Response, SIEM, SOC, Zero Trust
- Platforms: Fortinet, Check Point, Palo Alto, Nozomi, Cloud Security (AWS/Azure)
- Development: Python, Bash, JS, C, REST, JWT, OAuth, CVSS
- AI & Automation: LLM Integration, Agentic Pipelines, MCP Security, Prompt Injection Testing

## Approach

Hybrid: one high-impact custom SVG banner + small reusable SVG section dividers ("blueprint" corner-bracket style), with all actual content in plain Markdown/HTML tables. Chosen over full-SVG (regenerate-on-every-edit, poor accessibility/theme-adaptivity) and plain-badges-only (loses the blueprint identity past the banner) because it concentrates image-generation effort where it pays off visually (banner, first impression) while keeping everything Miguel will update often (experience, certs, skills) as editable plain text.

## Structure (top to bottom)

1. **Banner/Hero** — custom SVG: "MIGUEL GONZÁLEZ", rotating subtitle via typing-SVG service (AI Red Teamer · Red Teamer · Cybersecurity Engineer & Researcher), blueprint grid background, corner brackets. Contact badges below (LinkedIn, email, location).
2. **`// ABOUT`** — condensed 2–3 line summary.
3. **`// STACK & COMPETENCIES`** — skills grouped by category, shields.io badges styled to the palette.
4. **`// FEATURED PROJECTS`** — Verax and Mentra cards (name, one-liner, stack, site link).
5. **`// EXPERIENCE`** — compact log-style timeline: NTT, Westcon-Comstor ×2, with impact bullets.
6. **`// CERTIFICATIONS`** — table: cert, issuer, year.
7. **`// LIVE STATS`** — github-readme-stats + streak stats, custom-themed to match the palette (not default theme).
8. **Footer** — divider + blueprint "stamp" (coordinates/version/timestamp motif) + discreet visitor counter.

Section dividers: reusable SVG strip, full width, corner-bracket (`⌐...¬`) motif with a tick-marked "measurement" line and the section label.

## Visual system

**Palette (classic blueprint):**
- Background: `#0A1128`
- Grid/lines: `#1B3A5C`
- Primary accent: `#4FD1E8` (cyan)
- Secondary text: `#8AA9C4`
- High-contrast white: `#E8F1F8`

**Typography:** Monospace throughout (JetBrains Mono / Fira Code), embedded via Google Fonts in SVGs. Section headers as `// UPPERCASE` code-comment style.

**Badges:** shields.io `flat-square`, `labelColor=0A1128`, `color=4FD1E8`.

**Stat cards:** github-readme-stats with `theme=transparent` and explicit `bg_color`/`title_color`/`text_color`/`icon_color` params matching the palette.

## Technical implementation notes

- Banner and dividers: hand-authored SVG (or generated via a small Node script using `satori`/raw SVG templates), committed as static assets under `assets/` in the repo, referenced via relative path in the README.
- Typing subtitle: external typing-svg service URL with `color`, `background`, `font` query params matching the palette (no local asset needed, but it's a runtime dependency on an external service — acceptable for a profile README, standard practice).
- Dynamic stats: github-readme-stats query-string URLs, no API keys needed (public GitHub stats).
- README itself: GitHub-flavored Markdown + limited inline HTML (`<div align="center">`, `<table>`, `<details>`) — no client-side JS (GitHub strips it).

## Verification

- Render the README locally (e.g. `grip` or GitHub's own preview) before pushing, checking both GitHub light and dark theme rendering.
- Confirm all external image URLs (typing-svg, stats cards) load and match the palette params.
- Check banner/dividers at both desktop and mobile GitHub widths (README is responsive-ish via `max-width` on images).

## Out of scope

- No repo links for Verax/Mentra (private repos) — site links only.
- No mobile-native app, no separate landing page — this is the GitHub profile README only.
- No CI/automation to keep stats "live" beyond what github-readme-stats already provides live via its own service.
