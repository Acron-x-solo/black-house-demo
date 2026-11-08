# Black House Demo Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement these tasks inline. Independent source research is delegated through superpowers:dispatching-parallel-agents; one fresh review covers the completed demo.

**Goal:** Build, run and publish a distinctive, accurate tyre-workshop demonstration with an interactive 3D wheel.

**Architecture:** Separate React/Vite site; verified business data and image attribution separate from presentation. Lazy Three.js wheel and native accessible photo dialog. Real contacts own appointment requests.

**Tech Stack:** React19, Vite7, Motion, Three.js, Lucide, Playwright, Node tests.

**Spec:** docs/superpowers/specs/2026-11-08-black-house-design.md and DESIGN.md.

## Global Constraints
- Separate project at C:/Users/Acron1337/Desktop/black-house-demo; port5174; preserve Jumanji.
- Russian visitor copy; primary-source facts, prices and real local photos only.
- Dark/light layout, burnt-orange controls, Roboto Condensed/Manrope; source tokens map to CSS variables.
- Native contact scrolling, reduced motion, keyboard controls, no fake booking success.

## Review Focus
- Missing prices: show quote guidance, never invent a number.
- Missing WebGL/photo: keep usable content and fallback.
- Reduced-motion/offscreen/hidden tab: no continuous rendering.
- Mobile/keyboard: service choices, gallery and contacts remain usable.
- GitHub subpath: every local asset and anchor retains the correct repository prefix.

### Task1: Source-driven content and live landing page
- [ ] Scaffold package/config, data/business.js, data/assets.js and local fonts.
- [ ] Start Vite at5174 immediately after a minimal visible shell exists.
- [ ] Write tests for source price selection if numeric prices exist; otherwise quotation text and unknown inputs. Confirm the failing test.
- [ ] Build App.jsx, components/Services.jsx, Quote.jsx, Gallery.jsx, Photo.jsx and styles.css, with genuine photos and contacts.
- [ ] Verify source semantics and gallery/contact behaviors in browser tests.

### Task2: Interactive wheel
- [ ] Write browser expectations for real WebGL, pause, exploded view and static fallback.
- [ ] Build components/WheelScene.jsx with tread, spokes, brake disc, environment and labelled controls.
- [ ] Verify rendering pause, hidden/offscreen stops, cleanup, narrow viewport and reduced motion.

### Task3: Verification and publication
- [ ] Format, unit/browser tests, build, premium strict audit and DESIGN lint.
- [ ] Inspect real desktop/mobile screenshots and get an independent review.
- [ ] Initialize separate Git repo, reuse Pages workflow, publish and verify the public page.
- [ ] Record final test/source evidence and share the live link.
