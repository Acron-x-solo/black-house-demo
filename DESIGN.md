---
version: alpha
name: Black House
colors:
  background: '#eff0ec'
  surface: '#ffffff'
  dark: '#171a1c'
  text: '#202528'
  muted: '#5b6364'
  primary: '#e85d24'
  line: '#d7dbd7'
typography:
  body:
    fontFamily: 'Manrope, Arial, sans-serif'
  display:
    fontFamily: 'Roboto Condensed, Arial, sans-serif'
rounded:
  button: '6px'
  card: '16px'
spacing:
  unit: '8px'
components:
  button:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.dark}'
    rounded: '{rounded.button}'
  card:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.text}'
    rounded: '{rounded.card}'
  caption:
    textColor: '{colors.muted}'
  divider:
    backgroundColor: '{colors.line}'
---

# Black House

## Overview
Russian sales demonstration for the Black house tyre workshop at 1-я Чулымская, 112/1 к2, Novosibirsk. The user selected a dark hero combined with light service and price sections, with genuine 3D and smooth motion. The main visitor action is to contact the workshop for an appointment.

## Colors
Industrial charcoal, aluminium silver, pale workshop grey, black type and a restrained burnt-orange service signal. Runtime CSS variables are the token owner: background maps to --bg, surface to --surface, dark to --dark, text to --text, muted to --muted, primary to --accent, line to --line. Orange buttons use dark text for accessible contrast; dark secondary actions use light text.

## Typography
Condensed, bold Roboto Condensed for Cyrillic headings and oversized BLACK HOUSE lettering. Manrope for readable service copy, prices and controls. Locally hosted fonts, never tiny body copy. The hero has a confident workshop voice; avoid unsupported speed, warranty or equipment promises.

## Layout
Graphite header/hero with a real metallic 3D wheel crossing a giant brand wordmark. A thin mechanical rule and rounded panel edge lead into a pale service area. Alternate white information panels, a dark photographic gallery, and a clear contact section with a local map. Responsive desktop gutters and 20px mobile gutters; native page scrolling, readable content at 360px.

## Elevation & Depth
Three.js tyre, rim, hub and brake disc: realistic rubber tread, reflective spokes, a slow axle rotation and pointer response. A labelled exploded-view toggle separates the parts. A visible pause button, keyboard rotation controls, reduced motion, offscreen and hidden-tab pauses, GPU cleanup and a static fallback are required. Avoid expensive scrolling effects and layout animation.

## Shapes
Real tread shapes and circular wheel proportions carry the identity. Corners are practical and restrained; small slanted mechanic accents have a reason. Never reuse jungle assets or show stock workshop photographs as this business.

## Components
Booking links scroll to #contacts in the same tab. Telephone and verified messengers are the real contact paths. Published source prices alone may be displayed; when a rate is missing, show that a quote is available from the workshop. A service/diameter selector may prepare a quote request, never claim a reservation or payment occurred. The photo dialog supports keyboard arrows, Escape and focus restoration. All company photos retain source attribution. A subtle footer identifies the demo.

## Do's and Don'ts
- Preserve the user's existing Jumanji repository and its running preview.
- Use primary 2GIS facts and downloaded real photos, recording snapshot dates.
- Never invent prices, discounts, capacity, staff, operating hours, reviews or social URLs.
- Keep useful keyboard focus, contrast, reduced motion, 44px controls and visible scrollbars.
- Publish this separate demonstration through GitHub Pages using the existing session authorization.
