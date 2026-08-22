# Naira Iconography

Naira uses `@lucide/svelte` behind the package-owned `Icon` and `IconButton`
APIs. Consumers do not import the base icon library directly.

## Contract

- Supported icon names are a closed union in `packages/ui-svelte/src/lib/Icon.svelte`.
- Decorative icons use `aria-hidden="true"`.
- Meaningful icons receive a label or adjacent visible text.
- Icon buttons always require an accessible label.
- Sizes use the shared `sm`, `md`, and `lg` control scale.
- Domain icons for trails, gear, campsite, weather, elevation, and itinerary
  are added behind the same API after their visual contract is reviewed.

## Dependency

- Package: `@lucide/svelte@1.33.0`
- License: ISC
- Source: https://lucide.dev/
