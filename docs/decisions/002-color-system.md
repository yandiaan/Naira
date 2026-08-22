# ADR 002: Canopy color system

- Status: Accepted
- Date: 2026-08-22

## Context

Naira needs a custom color language for calm public discovery and dense
planner/admin work. Green is common among mobility and outdoor products, so a
generic bright-green identity would not sufficiently distinguish Naira. The
system also needs light/dark readiness, accessible status colors, and a
separate data-visualization palette.

## Decision

- Use the Canopy direction as the working Naira palette.
- Use forest as the primary identity color and clay as the warm adventure
  accent.
- Use warm cream, stone, and ink for neutral surfaces and content.
- Keep brand, semantic status, and data-visualization palettes separate.
- Use theme-specific semantic mappings for light and dark modes.
- Require text, icon, label, shape, or pattern support when color communicates
  status or data meaning.
- Revisit after the public discovery and planner workspace specimens if map,
  imagery, or compact data states expose contrast or distinction failures.

## Alternatives considered

- Ridge: rejected for the first implementation because its action separation
  was less clear in dense controls.
- Trailhead: rejected for the first implementation because amber needed more
  dark-theme treatment and could dominate safety states.
- Bright single green: rejected because it is too close to established
  mobility/outdoor brand expectations.

## Consequences

Token work can proceed with a distinct identity and explicit semantic roles.
Status and chart roles need their own contrast and color-vision tests. A later
brand refresh can change primitive values without changing component meaning.

## Trigger for revisiting

Revisit after pilot visual review, a significant brand change, or evidence that
the selected roles fail accessibility or outdoor data comprehension.
